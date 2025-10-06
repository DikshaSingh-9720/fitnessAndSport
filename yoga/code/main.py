import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
from tensorflow.keras.preprocessing.image import ImageDataGenerator


import os
from tensorflow.keras.preprocessing.image import ImageDataGenerator

#  data directory
base_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '107 yoga poses')
train_dir = os.path.join(base_dir, 'train')
val_dir = os.path.join(base_dir, 'val')
test_dir  = os.path.join(base_dir, 'test')

# Get class names from train
class_names = [folder for folder in os.listdir(train_dir) if os.path.isdir(os.path.join(train_dir, folder))]
class_names.sort()
print("Detected classes:", class_names)

# ImageDataGenerator for training
train_datagen = ImageDataGenerator(rescale=1./255)
train_generator = train_datagen.flow_from_directory(
    train_dir,
    target_size=(128,128),
    batch_size=32,
    class_mode='categorical'
)

val_datagen = ImageDataGenerator(rescale=1./255)
val_generator = val_datagen.flow_from_directory(
    val_dir,
    target_size=(128,128),
    batch_size=32,
    class_mode='categorical'
)



valid_datagen = ImageDataGenerator(rescale=1./255)


# Create generators
train_generator = train_datagen.flow_from_directory(
train_dir,
target_size=(128, 128),
batch_size=32,
class_mode='categorical'
)


val_generator = val_datagen.flow_from_directory(
val_dir,
target_size=(128, 128),
batch_size=32,
class_mode='categorical'
)


num_classes = len(train_generator.class_indices)


# CNN Model
model = Sequential()
model.add(Conv2D(32, (3,3), activation='relu', input_shape=(128,128,3)))
model.add(MaxPooling2D(2,2))
model.add(Conv2D(64, (3,3), activation='relu'))
model.add(MaxPooling2D(2,2))
model.add(Flatten())
model.add(Dense(128, activation='relu'))
model.add(Dropout(0.3))
model.add(Dense(num_classes, activation='softmax'))


model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])


# Train model
model.fit(
train_generator,
epochs=10,
validation_data=val_generator
)


# Save trained model
model.save(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'yoga_model.h5'))


print('Model trained! comp ...')