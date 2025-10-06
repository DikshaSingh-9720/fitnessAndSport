import cv2
import numpy as np
import os
from tensorflow.keras.models import load_model

# path to  trained model
model_path = r"C:\Users\HP\Desktop\yoga\yoga_model.h5"



model = load_model(model_path)

# Path to train folder to get class names
train_dir = r"C:\Users\HP\Desktop\yoga\107 yoga poses\train"


class_names = [folder for folder in os.listdir(train_dir) if os.path.isdir(os.path.join(train_dir, folder))]
class_names.sort()
print(f"Detected {len(class_names)} classes for real-time prediction.")

# Start webcam
cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    
    img = cv2.resize(frame, (128,128))
    img = img / 255.0
    img = np.expand_dims(img, axis=0)

    # Predict pose
    pred = model.predict(img)
    class_id = np.argmax(pred)
    confidence = np.max(pred)

    
    if confidence > 0.7:
        text = f"{class_names[class_id]} - Correct!"
    else:
        text = "Incorrect pose,  pls adjust!"

    
    cv2.putText(frame, text, (10,30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,255,0), 2)
    cv2.imshow("AI Yoga Coach", frame)

    # Quit on 'q' key
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
