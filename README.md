# Trip Planner App

A React app built with Vite that takes trip details as inputs and generates route instructions and daily log sheets as outputs. The app processes the following inputs:

- Current location
- Pickup location
- Dropoff location
- Current Cycle Used (Hrs)

The app will display:
- A map showing the route with information regarding stops and rests.
- Daily log sheets that are automatically filled out based on the trip information.

## Features

- **Route Mapping:** Displays a map showing the best route, stops, and rest information based on the given locations.
- **ELD Log Sheets:** Automatically fills out multiple daily log sheets as per the trip duration. The sheets include information like drive time, rest periods, and other required log data.
- **Free Map API:** Utilizes a free map API for rendering routes (e.g., OpenStreetMap or Mapbox).

## Setup Instructions

### Prerequisites

Before you can run the project, ensure that you have the following installed:
- [Node.js](https://nodejs.org/en/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 1. Clone the Repository

git clone https://github.com/yourusername/trip-planner-app.git
cd trip-planner-app

### 2. Install Dependencies
Make sure you're in the project directory and run:

npm install

### 3. Configure the API
Map API: Use any free map API OpenStreetMap For OpenStreetMap, 

### 4. Dependencies
React: A JavaScript library for building user interfaces.
Vite: A next-generation, fast build tool for modern web projects.
Leaflet : For rendering maps and routes (use leaflet for OpenStreetMap).
Axios: For making API requests to the map service.

### 5. Run the Development Server
Once dependencies are installed and configuration is set, you can start the development server:
npm run dev

This will start the app at http://localhost:5173.

Project Structure

src/
├── assets/          # Static files such as images
├── components/      # Reusable UI components
├── views/           # Page components
├── api/             # API calls
├── App.jsx          # Main App component
└── main.jsx         # Entry point for the app


### 6. Hosted version (vercel.app)
https://trip-logger-jet.vercel.app