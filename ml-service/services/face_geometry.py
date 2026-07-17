import math


def landmark_to_pixel(landmark, image_width, image_height):
    return {
        "x": landmark.x * image_width,
        "y": landmark.y * image_height,
    }


def calculate_distance(point_a, point_b):
    return math.sqrt(
        (point_b["x"] - point_a["x"]) ** 2
        + (point_b["y"] - point_a["y"]) ** 2
    )


def calculate_face_geometry(landmarks, image_width, image_height):
    forehead_top = landmark_to_pixel(
        landmarks[10], image_width, image_height
    )

    chin = landmark_to_pixel(
        landmarks[152], image_width, image_height
    )

    left_cheek = landmark_to_pixel(
        landmarks[234], image_width, image_height
    )

    right_cheek = landmark_to_pixel(
        landmarks[454], image_width, image_height
    )

    left_forehead = landmark_to_pixel(
        landmarks[127], image_width, image_height
    )

    right_forehead = landmark_to_pixel(
        landmarks[356], image_width, image_height
    )

    left_jaw = landmark_to_pixel(
        landmarks[172], image_width, image_height
    )

    right_jaw = landmark_to_pixel(
        landmarks[397], image_width, image_height
    )

    face_length = calculate_distance(
        forehead_top,
        chin,
    )

    cheekbone_width = calculate_distance(
        left_cheek,
        right_cheek,
    )

    forehead_width = calculate_distance(
        left_forehead,
        right_forehead,
    )

    jaw_width = calculate_distance(
        left_jaw,
        right_jaw,
    )

    return {
        "faceLength": round(face_length, 2),
        "cheekboneWidth": round(cheekbone_width, 2),
        "foreheadWidth": round(forehead_width, 2),
        "jawWidth": round(jaw_width, 2),
        "faceRatio": round(face_length / cheekbone_width, 3),
        "foreheadToJawRatio": round(forehead_width / jaw_width, 3),
        "jawToCheekRatio": round(jaw_width / cheekbone_width, 3),
    }