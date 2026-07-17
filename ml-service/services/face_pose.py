import math


def calculate_head_roll(landmarks):
    left_eye = landmarks[33]
    right_eye = landmarks[263]

    delta_x = right_eye.x - left_eye.x
    delta_y = right_eye.y - left_eye.y

    roll_degrees = math.degrees(
        math.atan2(delta_y, delta_x)
    )

    return round(roll_degrees, 2)


def calculate_head_yaw(landmarks):
    left_face = landmarks[234]
    right_face = landmarks[454]
    nose = landmarks[1]

    left_distance = abs(nose.x - left_face.x)
    right_distance = abs(right_face.x - nose.x)

    total_distance = left_distance + right_distance

    if total_distance == 0:
        return 0.0

    yaw_score = (
        (left_distance - right_distance)
        / total_distance
    ) * 100

    return round(yaw_score, 2)


def calculate_head_pitch(landmarks):
    forehead = landmarks[10]
    nose = landmarks[1]
    chin = landmarks[152]

    forehead_to_nose = abs(nose.y - forehead.y)
    nose_to_chin = abs(chin.y - nose.y)

    total_distance = forehead_to_nose + nose_to_chin

    if total_distance == 0:
        return 0.0

    pitch_score = (
        (forehead_to_nose - nose_to_chin)
        / total_distance
    ) * 100

    return round(pitch_score, 2)