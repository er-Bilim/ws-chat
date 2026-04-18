# 💬 Real-time Messenger Practice

> ⚠️ **Educational Purpose** – This project is designed to master WebSockets, real-time data synchronization, and persistent chat storage.

## 🎯 Learning Objectives

- **WebSockets:** Bi-directional communication between client and server.
- **Persistent Storage:** Saving real-time chat history in a database.
- **State Management:** Handling real-time updates via Zustand.
- **Authentication:** Managing tokens over WebSocket connections.

## 🛠 Tech Stack

- **Frontend:** React, TypeScript, Zustand
- **Backend:** Node.js, Express, WebSocket (ws), Mongoose
- **Database:** MongoDB
- **Communication:** HTTP (Auth) + WebSocket (Messaging)

## 📡 API & Socket Overview

### HTTP Routes
- `POST /users` — Registration.
- `POST /users/sessions` — Login.

### WebSocket Messages


## ⚙️ Features

- **Real-time Presence:** See who is online in real-time.
- **History:** Loads the last 30 messages upon joining.
- **Auto-Reconnect:** Client automatically attempts to restore lost connections.
- **Moderation (Extra):** Moderators can delete messages globally.
- **Private Messaging (Extra):** Secure messaging visible only to specific participants.

## 🚀 Launch

```bash
# Backend & Frontend
npm install
npm run dev