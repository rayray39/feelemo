# Feelemo
Feelemo is a simple, open space where anyone can freely express their thoughts and emotions without needing to create an account.
This lightweight journal platform is built for users who just want to write and connect. Whether it's jotting down how you're feeling, sharing a reflection, or reading what others have posted, this app makes it easy.

# Key Features
- Users can create journal entries instantly — no sign-up or login required.
- See what others are writing and leave supportive or thoughtful comments on their entries.
- Add your favorite journal entries to your personal favourites list for easy access later.
- Show appreciation by liking comments you resonate with.

# Installation
Want to run this project on your local machine? Follow the steps below to get everything up and running.

## Clone the repo
1. `git clone https://github.com/rayray39/feelemo.git`
2. `cd your-folder-name`

## Install dependencies
1. run `npm install`

## Run
1. start the backend by running `node src/server.cjs`
2. open a new terminal and start the frontend by running `npm run dev`  

The app should now be running on:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

The database is stored in `./data/database.db` and should be created automatically.

# Notes
The project was built using react and typescript, using vite as the built tool. On the backend, RESTful APIs are written in expressJS and sqlite3 for database.  The project was meant as way to learn new things.