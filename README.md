# 🏠 Smart Home IoT Dashboard

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![React Router](https://img.shields.io/badge/React%20Router-6-CA4245?logo=reactrouter&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-SCSS-CC6699?logo=sass&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-REST%20API-5A29E4?logo=axios&logoColor=white)

A web dashboard for **monitoring and controlling an IoT smart-home / security system** in real time. It shows live sensor readings (temperature, humidity, light intensity and motion), lets you switch devices (**fan**, **lights**, **buzzer alarm**) on and off remotely, and keeps a history of sensor logs and **motion-triggered video recordings**.

The front end is built with **React** and talks to a REST API backend that connects to the IoT hardware. It was developed as a university project at **London Metropolitan University**.

---

## ✨ Features

| | Feature | Description |
|---|---------|-------------|
| 🌡️ | **Climate monitoring** | Live temperature and humidity, with a remote **fan** toggle |
| 💡 | **Lighting control** | Live light-intensity (%) reading, with a remote **lights** toggle |
| 🚨 | **Motion and alarm** | Shows a *Safe* / *Danger!* state and lets you switch the **buzzer** alarm on or off |
| 🎥 | **Video log** | Table of motion-triggered recordings with a timestamp, buzzer state and a *Play* link |
| 📊 | **Sensor reports** | History of temperature, humidity, light intensity and buzzer events |
| 🔄 | **Auto-refresh** | Sensor data refreshes every 5 s and the video log every 4 s |
| 🔐 | **Login screen** | Simple login in front of the dashboard |

---

## 🏗️ Architecture

```
 ┌───────────────────────┐        HTTP (REST / JSON)        ┌──────────────────────┐        ┌────────────────────┐
 │  React Dashboard      │  ─── GET  /current-state ─────▶  │                      │        │  IoT device        │
 │  (this repository)    │  ─── GET  /log/state ─────────▶  │   Backend REST API   │ ◀────▶ │  sensors: temp,    │
 │                       │  ─── GET  /log/video ─────────▶  │                      │        │  humidity, light,  │
 │  Context API + Reducer│  ─── POST /switch ────────────▶  │                      │        │  motion, camera    │
 └───────────────────────┘                                  └──────────────────────┘        │  actuators: fan,   │
                                                                                            │  lights, buzzer    │
                                                                                            └────────────────────┘
```

State management uses React's **Context API + `useReducer`** (`src/context/`). One `EnergyState` provider exposes the data and the API actions to every component.

### API endpoints used

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `GET` | `/current-state` | Latest readings: `temperature`, `humidity`, `light_intensity`, `fan`, `lights`, `buzzer` |
| `GET` | `/log/state` | Historical sensor log (used on the Reports page) |
| `GET` | `/log/video` | Motion events with `video` URL, `buzzer` state and `created_at` |
| `POST` | `/switch` | Toggle a device, sent as `multipart/form-data` with `name` (`fan` / `light` / `buzzer`) and `value` (`0` / `1`) |

---

## 🖥️ Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | **Login** | Sign-in screen |
| `/Dashboard` | **Dashboard** | Live cards for temperature, lights and motion, with device toggles |
| `/VideoTable` | **Video Report** | Latest motion-triggered recordings |
| `/Reports` | **Reports** | Latest sensor log entries |

---

## 📁 Project Structure

```
src/
├── App.js                    # Routes and the global context provider
├── index.js                  # App entry point
├── Components/
│   ├── Login.js              # Login page
│   ├── FirstPage.js          # Main dashboard
│   ├── VideoTable.js         # Motion video log
│   ├── Reports.js            # Sensor history table
│   └── Items/
│       ├── Header.js         # Navigation bar and current date
│       ├── Temperature.js    # Temperature / humidity card and fan switch
│       ├── Lights.js         # Light intensity card and light switch
│       ├── Motion.js         # Motion status card and buzzer switch
│       └── Chart.js          # Chart component (work in progress)
├── context/
│   ├── Constant.js           # API base URL (SERVER_URL)
│   ├── EnergyContext.js      # React context
│   ├── EnergyState.js        # Provider with the API calls (axios)
│   ├── EnergyReducer.js      # Reducer
│   └── Types.js              # Action types
├── Scss/                     # Styles (Sass)
└── Images/                   # Icons and images
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 16+** and **npm**
- A running backend that provides the API endpoints listed above

### Installation

```bash
git clone https://github.com/SamSamaei73/IOT.git
cd IOT
npm install
```

### Configure the API

Set your backend URL in `src/context/Constant.js`:

```js
export const SERVER_URL = 'https://your-backend.example.com/api/app';
```

### Run in development

```bash
npm start
```

Then open http://localhost:3000.

### Build for production

```bash
npm run build
```

This creates an optimized build in the `build/` folder, ready to deploy on any static host.

---

## 🛠️ Tech Stack

- **React 18** (functional components and hooks)
- **React Router 6** for page routing
- **Context API + useReducer** for global state
- **Axios** for REST API calls
- **Sass / SCSS** for styling
- **Font Awesome** icons
- **Create React App** tooling

---

## 🛣️ Roadmap

- [ ] Real authentication backed by the API (replace the client-side login check)
- [ ] Interactive charts for sensor history
- [ ] Push / email notifications when motion is detected
- [ ] Responsive mobile layout
- [ ] Load the API URL from environment variables (`REACT_APP_SERVER_URL`)

---

## 👤 Author

**Alireza (Sam) Samaei Yekta**, [@SamSamaei73](https://github.com/SamSamaei73)

⭐ If you find this project useful, please consider giving it a star!
