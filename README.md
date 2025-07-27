# Samanvaya AI Networks  
**Empowering Teachers in Multi-Grade Classrooms**  
*Google Cloud Agentic AI Day Submission — README*

## Table of Contents

- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Solution Summary](#solution-summary)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Unique Differentiators](#unique-differentiators)
- [Impact](#impact)
- [Future Scope](#future-scope)
- [Profit/Monetization Plan](#profitmonetization-plan)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Overview

Samanvaya AI Networks is an agentic AI-driven ecosystem designed for teachers managing multi-grade classrooms, especially in rural areas. This platform empowers teachers rather than replacing them, acting as a real-time co-teacher that supports personalized lesson planning, adaptive instruction, monitoring progress, and engaging both students and coordinators.

## Problem Statement

Multi-grade classrooms are prevalent in rural regions, where a single teacher manages students from different grades at once. Teachers in such environments lack time and resources for:

- Personalized lesson planning
- Tracking student progress
- Adaptive, multi-language teaching strategies

## Solution Summary

**Samanvaya AI Network** is built to address these unique challenges by:

- Assisting teachers in real-time with AI-based lesson planning and adaptive content
- Dynamically grouping students for optimal learning
- Monitoring classroom progress
- Providing multilingual, voice/text-based interactive assistance

The solution operates with an offline-first approach to ensure seamless functionality in areas with limited internet access.

## Key Features

- **AI-Curated, Grade-Wise Lesson Plans:** Automatic lesson generation using student proficiency and classroom context.
- **Agentic Teaching Assistant:** Multilingual voice/text interaction for adaptive guidance in real-time.
- **Offline-First Mobile App:** Flutter-powered app for teachers that works without continuous connectivity.
- **Dynamic Student Group Formation:** Real-time grouping for differentiated instruction.
- **Auto-Generated Progress Reports:** Actionable analytics and dashboards for students and teachers.
- **Cluster Coordinator Dashboard:** React-based web dashboard to monitor, analyze, and report at the school/cluster level.
- **Seamless Cloud Sync:** Data is automatically synced when connectivity is available.
- **Data-Driven Insights:** Advanced analytics and reporting on performance, usage, and learning outcomes.

## Tech Stack

| Technology             | Purpose                                                                          |
|------------------------|----------------------------------------------------------------------------------|
| Google Cloud Platform  | Hosting, backend, database, analytics                                            |
| Vertex AI (PaLM/Gemini)| LLM-powered lesson/content generation, adaptive teaching strategies              |
| Dialogflow CX          | Agentic teaching assistant, multi-turn, multilingual conversations               |
| Cloud Functions        | Event-driven backend orchestration                                               |
| BigQuery               | Centralized analytics and reporting                                              |
| Firebase               | Real-time sync, Auth, Firestore, offline support, cloud storage                  |
| Flutter                | Cross-platform offline-first teacher mobile app                                  |
| React                  | Coordinator web dashboard                                                        |

## Architecture

```
[Teacher Mobile App (Flutter)]
      |                ↑
   Voice/Text      Real-time Data Sync
      ↓                |
[Dialogflow CX] ---- [Firebase (Auth, Firestore, Storage)]
      |                ↑
 [Vertex AI LLMs]      |
      ↓                |
[Cloud Functions]  [BigQuery Analytics]
      ↑                |
 [Coordinator Dashboard (React Web)]
```

- **Offline-first** mobile app for teachers with local storage & background sync.
- **React dashboard** for cluster coordinators to generate, filter, and download reports.
- **AI agent** (Dialogflow + Vertex AI) for voice/text assistance in multiple languages.
- **BigQuery** supports advanced trend, proficiency, usage, and outcome analytics.

## Unique Differentiators

- **Human-AI Collaboration:** Supports and augments teachers rather than replacing them.
- **Real-Time Support:** Instant multi-grade classroom guidance, not just post-lesson analysis.
- **Offline-First:** Works efficiently in low-connectivity rural environments.
- **Multilingual, Context-Aware:** Supports regional languages, customizable for local curricula.
- **Agentic AI Planning:** Uses LLM planning agents for dynamic, contextual lesson/group generation.

## Impact

- **Teachers:** Reduces manual planning and tracking, provides in-class adaptive guidance.
- **Students:** Enables personalized, adaptive, and engaging learning. Early gap identification.
- **Rural Education:** Bridges digital divide with offline-first operation, boosts engagement and outcomes.
- **Ecosystem:** Scalable across many schools; data-driven dashboards enhance monitoring and management.

### Sample Dashboard Metrics

| Teacher        | Performance | Student Engagement | Resource Utilization | Feedback         |
|----------------|-------------|--------------------|----------------------|------------------|
| Ms. Rodriguez  | 85          | 90                 | 75                   | Positive         |
| Mr. Zhong      | 78          | 82                 | 80                   | Neutral          |
| Ms. Carter     | 92          | 95                 | 90                   | Excellent        |
| Mr. Patel      | 65          | 70                 | 60                   | Needs Improvement|
| Ms. Williams   | 88          | 92                 | 85                   | Positive         |

## Future Scope

- **Personalized Learning (90% Impact)**
- **Rural Education Enhancement (80%)**
- **Market Growth & Adoption (85%)**
- **Teacher Support & Automation (75%)**
- **Analytics & Assessment (70%)**
- **Immersive Learning (AR/VR) (65%)**
- **Vocational Training & Skill Development (60%)**

## Profit/Monetization Plan

| Revenue Stream                   | Percentage (%) |
|----------------------------------|---------------|
| Subscription Fees                | 40            |
| Customization & Premium Services | 25            |
| Teacher Training & Support       | 15            |
| Analytics & Reporting            | 12            |
| Content Partnerships             | 8             |

## Getting Started

### Prerequisites

- Flutter SDK (for mobile app)
- Node.js & npm (for React dashboard)
- Google Cloud CLI & Firebase tools

### Setup Teacher Mobile App (Flutter)

1. Clone the repository.
2. Install dependencies with `flutter pub get`.
3. Connect to Firebase project (`flutterfire configure`).
4. Run with `flutter run`.

### Setup Coordinator Dashboard (React)

1. Navigate to `/dashboard` directory.
2. Install dependencies with `npm install`.
3. Set Firebase/BigQuery config in `.env`.
4. Run with `npm start`.


