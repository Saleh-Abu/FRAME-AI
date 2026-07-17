FRAME_CATALOG = [
    {
        "id": "soft-square",
        "name": "Soft Square",
        "style": "square",
        "bestFor": ["heart", "oval", "round"],
    },
    {
        "id": "cat-eye",
        "name": "Modern Cat Eye",
        "style": "cat-eye",
        "bestFor": ["heart", "oval", "diamond"],
    },
    {
        "id": "oval-metal",
        "name": "Oval Metal",
        "style": "oval",
        "bestFor": ["square", "heart", "oblong"],
    },
    {
        "id": "wayfarer",
        "name": "Classic Wayfarer",
        "style": "wayfarer",
        "bestFor": ["oval", "round", "heart"],
    },
    {
        "id": "geometric",
        "name": "Modern Geometric",
        "style": "geometric",
        "bestFor": ["oval", "round", "heart"],
    },
    {
        "id": "round-metal",
        "name": "Round Metal",
        "style": "round",
        "bestFor": ["square", "oblong", "diamond"],
    },
]


def recommend_frames(face_shape):
    primary_shape = face_shape["primaryShape"]
    secondary_shape = face_shape["secondaryShape"]

    recommendations = []

    for frame in FRAME_CATALOG:
        score = 0

        if primary_shape in frame["bestFor"]:
            score += 70

        if secondary_shape in frame["bestFor"]:
            score += 25

        recommendations.append(
            {
                "id": frame["id"],
                "name": frame["name"],
                "style": frame["style"],
                "matchScore": score,
            }
        )

    recommendations.sort(
        key=lambda frame: frame["matchScore"],
        reverse=True,
    )

    return recommendations[:3]