import cv2
import numpy as np

from fastapi import APIRouter, File, UploadFile

from services.face_landmarker import detect_face_landmarks

router = APIRouter()


@router.post("/camera-check")
async def camera_check(image: UploadFile = File(...)):
    image_bytes = await image.read()

    np_array = np.frombuffer(image_bytes, np.uint8)

    image = cv2.imdecode(np_array, cv2.IMREAD_COLOR)

    rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    result = detect_face_landmarks(rgb)

    face_count = len(result.face_landmarks)

    return {
        "faceDetected": face_count == 1,
        "faceCount": face_count,
        "ready": face_count == 1,
    }