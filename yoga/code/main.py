from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import cv2
import os
import mediapipe as mp
import tensorflow as tf
from io import BytesIO
from PIL import Image

app = FastAPI()

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model

model_path = os.path.join(os.path.dirname(__file__), "..", "yoga_model.h5")
model = tf.keras.models.load_model(model_path)


# MediaPipe pose
mp_pose = mp.solutions.pose
mp_drawing = mp.solutions.drawing_utils

POSE_CLASSES = ["Warrior", "Tree", "Cobra", "DownwardDog", "Chair"]

# ---- Helper Functions ----
def read_image(file: UploadFile):
    img = Image.open(BytesIO(file.file.read()))
    img = img.convert("RGB")
    return np.array(img)

def get_joint_angle(a, b, c):
    """Calculate angle between three points (in degrees)."""
    a = np.array(a)
    b = np.array(b)
    c = np.array(c)
    ba = a - b
    bc = c - b
    cosine_angle = np.dot(ba, bc) / (np.linalg.norm(ba) * np.linalg.norm(bc))
    angle = np.degrees(np.arccos(cosine_angle))
    return int(angle)

def analyze_pose_landmarks(landmarks):
    """Check body alignment & return tips"""
    tips = []
    # key landmarks
    left_shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x,
                     landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
    left_elbow = [landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x,
                  landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y]
    left_wrist = [landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x,
                  landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y]
    left_hip = [landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x,
                landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y]
    left_knee = [landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].x,
                 landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].y]
    left_ankle = [landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].x,
                  landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].y]

    # Angles
    elbow_angle = get_joint_angle(left_shoulder, left_elbow, left_wrist)
    knee_angle = get_joint_angle(left_hip, left_knee, left_ankle)
    back_angle = get_joint_angle(left_shoulder, left_hip, left_knee)

    # Rules
    if elbow_angle < 150:
        tips.append("Straighten your arms.")
    if knee_angle > 160:
        tips.append("Bend your knees slightly.")
    if back_angle < 150:
        tips.append("Keep your back straight.")

    if not tips:
        tips.append("Perfect alignment! Keep it up.")

    return tips


@app.post("/predict")
async def predict_pose(file: UploadFile = File(...)):
    image = read_image(file)
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    # MediaPipe pose detection
    with mp_pose.Pose(static_image_mode=True) as pose:
        result = pose.process(image_rgb)
        if not result.pose_landmarks:
            return {"error": "No person detected"}

        landmarks = result.pose_landmarks.landmark
        feedback_tips = analyze_pose_landmarks(landmarks)

    # Model prediction
    resized = cv2.resize(image_rgb, (224, 224))
    normalized = resized / 255.0
    pred = model.predict(np.expand_dims(normalized, axis=0))
    class_idx = np.argmax(pred)
    confidence = float(np.max(pred))
    class_name = POSE_CLASSES[class_idx]

    return {
        "pose": class_name,
        "confidence": round(confidence * 100, 2),
        "feedback": feedback_tips
    }
