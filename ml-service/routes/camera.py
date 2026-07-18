import cv2
import numpy as np

from fastapi import APIRouter, File, HTTPException, UploadFile

from services.face_landmarker import detect_face_landmarks
from services.face_pose import (
    calculate_head_roll,
    calculate_head_yaw,
)

router = APIRouter()


# Camera guidance thresholds
MAX_ROLL = 10
MAX_YAW = 15

MIN_FACE_WIDTH = 0.20
MAX_FACE_WIDTH = 0.65

CENTER_MIN_X = 0.38
CENTER_MAX_X = 0.62

CENTER_MIN_Y = 0.32
CENTER_MAX_Y = 0.68


@router.post("/camera-check")
async def camera_check(image: UploadFile = File(...)):

    # Read camera frame
    image_bytes = await image.read()

    if not image_bytes:
        raise HTTPException(
            status_code=400,
            detail="Empty camera frame.",
        )

    # Decode frame
    np_array = np.frombuffer(
        image_bytes,
        dtype=np.uint8,
    )

    decoded_image = cv2.imdecode(
        np_array,
        cv2.IMREAD_COLOR,
    )

    if decoded_image is None:
        raise HTTPException(
            status_code=400,
            detail="Could not decode camera frame.",
        )

    # Convert BGR → RGB
    rgb_image = cv2.cvtColor(
        decoded_image,
        cv2.COLOR_BGR2RGB,
    )

    # Detect face
    result = detect_face_landmarks(rgb_image)

    face_count = len(result.face_landmarks)

    # ----------------------------------
    # NO FACE
    # ----------------------------------

    if face_count == 0:
        return {
            "faceDetected": False,
            "faceCount": 0,
            "ready": False,
            "status": "NO_FACE",
            "message": "Position your face inside the guide.",
        }

    # ----------------------------------
    # MULTIPLE FACES
    # ----------------------------------

    if face_count > 1:
        return {
            "faceDetected": True,
            "faceCount": face_count,
            "ready": False,
            "status": "MULTIPLE_FACES",
            "message": "Only one person should be visible.",
        }

    landmarks = result.face_landmarks[0]

    # ----------------------------------
    # FACE BOUNDING BOX
    # ----------------------------------

    x_values = [landmark.x for landmark in landmarks]
    y_values = [landmark.y for landmark in landmarks]

    min_x = min(x_values)
    max_x = max(x_values)

    min_y = min(y_values)
    max_y = max(y_values)

    face_width = max_x - min_x

    face_center_x = (min_x + max_x) / 2
    face_center_y = (min_y + max_y) / 2

    # ----------------------------------
    # DISTANCE CHECK
    # ----------------------------------

    if face_width < MIN_FACE_WIDTH:
        return {
            "faceDetected": True,
            "faceCount": 1,
            "ready": False,
            "status": "TOO_FAR",
            "message": "Move closer to the camera.",
        }

    if face_width > MAX_FACE_WIDTH:
        return {
            "faceDetected": True,
            "faceCount": 1,
            "ready": False,
            "status": "TOO_CLOSE",
            "message": "Move slightly away from the camera.",
        }

    # ----------------------------------
    # CENTER CHECK
    # ----------------------------------

    if face_center_x < CENTER_MIN_X:
        return {
            "faceDetected": True,
            "faceCount": 1,
            "ready": False,
            "status": "MOVE_RIGHT",
            "message": "Move slightly to your right.",
        }

    if face_center_x > CENTER_MAX_X:
        return {
            "faceDetected": True,
            "faceCount": 1,
            "ready": False,
            "status": "MOVE_LEFT",
            "message": "Move slightly to your left.",
        }

    if face_center_y < CENTER_MIN_Y:
        return {
            "faceDetected": True,
            "faceCount": 1,
            "ready": False,
            "status": "MOVE_DOWN",
            "message": "Move your face slightly down.",
        }

    if face_center_y > CENTER_MAX_Y:
        return {
            "faceDetected": True,
            "faceCount": 1,
            "ready": False,
            "status": "MOVE_UP",
            "message": "Move your face slightly up.",
        }

    # ----------------------------------
    # HEAD POSE CHECK
    # ----------------------------------

    head_roll = calculate_head_roll(landmarks)
    head_yaw = calculate_head_yaw(landmarks)

    if abs(head_roll) > MAX_ROLL:
        return {
            "faceDetected": True,
            "faceCount": 1,
            "ready": False,
            "status": "HEAD_TILTED",
            "message": "Keep your head upright.",
            "pose": {
                "roll": head_roll,
                "yaw": head_yaw,
            },
        }

    if abs(head_yaw) > MAX_YAW:
        return {
            "faceDetected": True,
            "faceCount": 1,
            "ready": False,
            "status": "FACE_TURNED",
            "message": "Look directly at the camera.",
            "pose": {
                "roll": head_roll,
                "yaw": head_yaw,
            },
        }

    # ----------------------------------
    # READY
    # ----------------------------------

    return {
        "faceDetected": True,
        "faceCount": 1,
        "ready": True,
        "status": "READY",
        "message": "Perfect. Hold still.",
        "pose": {
            "roll": head_roll,
            "yaw": head_yaw,
        },
    }