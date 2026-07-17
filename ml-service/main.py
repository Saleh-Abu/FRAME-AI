import cv2
import numpy as np
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from services.face_classifier import classify_face_shape
from services.face_geometry import calculate_face_geometry
from services.face_landmarker import detect_face_landmarks
from services.face_pose import (
    calculate_head_pitch,
    calculate_head_roll,
    calculate_head_yaw,
)
from services.frame_recommender import recommend_frames
from routes.camera import router as camera_router


app = FastAPI(
    title="FRAME.AI Vision Service",
    version="0.1.0",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(camera_router)

MAX_ROLL_DEGREES = 10
MAX_YAW_SCORE = 15


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "FRAME.AI Vision Service",
    }


@app.post("/analyze")
async def analyze_face(image: UploadFile = File(...)):
    # 1. Validate uploaded file type
    if not image.content_type or not image.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="Please upload a valid image file.",
        )

    # 2. Read uploaded image as raw bytes
    image_bytes = await image.read()

    if not image_bytes:
        raise HTTPException(
            status_code=400,
            detail="The uploaded image is empty.",
        )

    # 3. Convert raw bytes into a NumPy array
    numpy_array = np.frombuffer(
        image_bytes,
        dtype=np.uint8,
    )

    # 4. Decode the image with OpenCV
    decoded_image = cv2.imdecode(
        numpy_array,
        cv2.IMREAD_COLOR,
    )

    if decoded_image is None:
        raise HTTPException(
            status_code=400,
            detail="The uploaded file could not be decoded as an image.",
        )

    height, width, channels = decoded_image.shape

    # 5. Convert BGR to RGB for MediaPipe
    rgb_image = cv2.cvtColor(
        decoded_image,
        cv2.COLOR_BGR2RGB,
    )

    # 6. Detect facial landmarks
    result = detect_face_landmarks(rgb_image)

    face_count = len(result.face_landmarks)

    # 7. Reject images with no face
    if face_count == 0:
        return {
            "success": False,
            "code": "NO_FACE",
            "message": (
                "No face detected. "
                "Please upload a clear front-facing photo."
            ),
            "faceCount": 0,
        }

    # 8. Reject images with multiple faces
    if face_count > 1:
        return {
            "success": False,
            "code": "MULTIPLE_FACES",
            "message": "Please upload a photo containing only one face.",
            "faceCount": face_count,
        }

    # 9. Get landmarks for the single detected face
    landmarks = result.face_landmarks[0]

    # 10. Calculate head pose
    head_roll = calculate_head_roll(landmarks)
    head_yaw = calculate_head_yaw(landmarks)
    head_pitch = calculate_head_pitch(landmarks)

    # 11. Reject excessive sideways tilt
    if abs(head_roll) > MAX_ROLL_DEGREES:
        return {
            "success": False,
            "code": "HEAD_TILTED",
            "message": "Please keep your head upright and try again.",
            "faceCount": 1,
            "pose": {
                "roll": head_roll,
                "yaw": head_yaw,
                "pitch": head_pitch,
                "maxAllowedRoll": MAX_ROLL_DEGREES,
            },
        }

    # 12. Reject faces turned too far left or right
    if abs(head_yaw) > MAX_YAW_SCORE:
        return {
            "success": False,
            "code": "FACE_TURNED",
            "message": "Please face the camera directly and try again.",
            "faceCount": 1,
            "pose": {
                "roll": head_roll,
                "yaw": head_yaw,
                "pitch": head_pitch,
                "maxAllowedYaw": MAX_YAW_SCORE,
            },
        }

    # 13. Calculate facial geometry
    geometry = calculate_face_geometry(
        landmarks,
        width,
        height,
    )

    # 14. Classify the face shape
    face_shape = classify_face_shape(geometry)

    # 15. Select the top 3 recommended frames
    recommendations = recommend_frames(face_shape)

    # 16. Keep sample landmarks for development/debugging
    sample_landmarks = []

    for index in [10, 33, 263, 1, 152]:
        landmark = landmarks[index]

        sample_landmarks.append(
            {
                "index": index,
                "x": landmark.x,
                "y": landmark.y,
                "z": landmark.z,
            }
        )

    # 17. Return complete FRAME.AI analysis
    return {
        "success": True,
        "code": "ANALYSIS_COMPLETE",
        "message": "Face analysis completed successfully.",
        "faceCount": 1,
        "image": {
            "width": width,
            "height": height,
            "channels": channels,
        },
        "pose": {
            "roll": head_roll,
            "yaw": head_yaw,
            "pitch": head_pitch,
        },
        "geometry": geometry,
        "faceShape": face_shape,
        "recommendations": recommendations,
        "landmarks": sample_landmarks,
    }