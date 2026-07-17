def clamp(value, minimum=0.0, maximum=1.0):
    return max(minimum, min(value, maximum))


def closeness(value, target, tolerance):
    distance = abs(value - target)
    return clamp(1 - (distance / tolerance))


def classify_face_shape(geometry):
    face_ratio = geometry["faceRatio"]
    forehead_to_jaw = geometry["foreheadToJawRatio"]
    jaw_to_cheek = geometry["jawToCheekRatio"]

    scores = {
        "oval": (
            0.45 * closeness(face_ratio, 1.25, 0.25)
            + 0.30 * closeness(jaw_to_cheek, 0.84, 0.15)
            + 0.25 * closeness(forehead_to_jaw, 1.10, 0.25)
        ),
        "round": (
            0.55 * closeness(face_ratio, 1.05, 0.18)
            + 0.45 * closeness(jaw_to_cheek, 0.95, 0.15)
        ),
        "square": (
            0.45 * closeness(face_ratio, 1.10, 0.20)
            + 0.55 * closeness(jaw_to_cheek, 1.00, 0.15)
        ),
        "heart": (
            0.55 * closeness(forehead_to_jaw, 1.25, 0.25)
            + 0.45 * closeness(jaw_to_cheek, 0.78, 0.15)
        ),
        "oblong": (
            0.70 * closeness(face_ratio, 1.50, 0.30)
            + 0.30 * closeness(jaw_to_cheek, 0.85, 0.20)
        ),
        "diamond": (
            0.50 * closeness(forehead_to_jaw, 1.05, 0.20)
            + 0.50 * closeness(jaw_to_cheek, 0.75, 0.15)
        ),
    }

    ranked_shapes = sorted(
        scores.items(),
        key=lambda item: item[1],
        reverse=True,
    )

    primary_shape, primary_score = ranked_shapes[0]
    secondary_shape, secondary_score = ranked_shapes[1]

    score_gap = primary_score - secondary_score

    if score_gap < 0.08:
        status = "AMBIGUOUS"
    elif score_gap < 0.18:
        status = "MODERATE"
    else:
        status = "CONFIDENT"

    return {
        "primaryShape": primary_shape,
        "secondaryShape": secondary_shape,
        "confidence": round(primary_score, 2),
        "scoreGap": round(score_gap, 2),
        "status": status,
        "scores": {
            shape: round(score, 2)
            for shape, score in scores.items()
        },
    }