# 👓 FRAME.AI

> AI-powered face shape analysis, personalized eyewear recommendation, and virtual try-on using Computer Vision and Machine Learning.

![Status](https://img.shields.io/badge/Status-Active%20Development-blue)
![React](https://img.shields.io/badge/Frontend-React-61DAFB)
![Go](https://img.shields.io/badge/Backend-Go-00ADD8)
![FastAPI](https://img.shields.io/badge/ML-FastAPI-009688)
![Python](https://img.shields.io/badge/Python-3.12-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📖 Overview

FRAME.AI is an AI-powered web application that analyzes a user's facial geometry using Computer Vision techniques and recommends eyewear best suited to their face shape.

The application combines facial landmark detection, geometric analysis, machine learning, and a modern web interface to deliver personalized frame recommendations and an interactive virtual try-on experience.

---

## ✨ Features

- 📷 Face Detection
- 😊 Facial Landmark Detection
- 📏 Facial Geometry Analysis
- 🧠 Face Shape Classification
- 👓 Personalized Frame Recommendation
- 📊 Confidence Score
- 🎯 AI-based Recommendation Logic
- 🖥️ Interactive User Interface
- 🔄 Virtual Try-On

---

## 🏗️ System Architecture

```text
                User
                  │
                  ▼
        React Frontend (Vite)
                  │
        REST API Requests
                  │
                  ▼
           Go Backend API
                  │
        Sends Image to ML Service
                  │
                  ▼
      FastAPI + Computer Vision
                  │
      MediaPipe Face Landmarker
                  │
                  ▼
      Face Geometry Analysis
                  │
                  ▼
      Face Shape Classification
                  │
                  ▼
    Eyewear Recommendation Engine
                  │
                  ▼
        Results sent to Frontend
```

---

# 🛠️ Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- JavaScript

## Backend

- Go

## AI / Machine Learning

- Python
- FastAPI
- OpenCV
- MediaPipe

## Database

- PostgreSQL *(planned)*

---

# 📂 Project Structure

```text
FRAME-AI/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── ml-service/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── main.py
│   └── test_model.py
│
└── README.md
```

---

# 🚀 How It Works

1. User uploads or captures a face image.
2. Face is detected.
3. Facial landmarks are extracted.
4. Face geometry is calculated.
5. Face shape is classified.
6. AI recommends suitable eyewear.
7. User previews the recommended frame using virtual try-on.

---

# 🎯 Face Shapes Supported

- Oval
- Round
- Square
- Heart
- Diamond
- Oblong

---

# 📸 Screenshots

> Screenshots will be added after the UI is completed.

---

# 🎥 Demo

Demo video coming soon.

---

# 🚀 Future Improvements

- User Authentication
- User Profiles
- Recommendation History
- AI Feedback System
- Real-time Webcam Analysis
- 3D Frame Visualization
- Cloud Deployment
- Mobile Responsive Version

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Saleh-Abu/FRAME-AI.git
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

## ML Service

```bash
cd ml-service

python -m venv .venv

# Windows
.venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

---

# 🤝 Contributing

Contributions are welcome.

Feel free to fork the repository, create a feature branch, and submit a pull request.

---

# 📌 Project Status

🚧 Currently under active development.

New features and improvements are continuously being added.

---

# 👨‍💻 Author

**Abu Saleh**

- GitHub: https://github.com/Saleh-Abu

---

