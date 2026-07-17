from pathlib import Path

from mediapipe.tasks import python
from mediapipe.tasks.python import vision


MODEL_PATH = Path("models/face_landmarker.task")

if not MODEL_PATH.exists():
    raise FileNotFoundError(
        f"Model not found at: {MODEL_PATH.resolve()}"
    )

base_options = python.BaseOptions(
    model_asset_path=str(MODEL_PATH)
)

options = vision.FaceLandmarkerOptions(
    base_options=base_options,
    running_mode=vision.RunningMode.IMAGE,
    num_faces=5,
)

with vision.FaceLandmarker.create_from_options(options) as landmarker:
    print("Face Landmarker loaded successfully!")
    print(f"Model path: {MODEL_PATH.resolve()}")