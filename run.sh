#!/bin/bash

if [ "$1" == "-local" ]; then
    echo "Running in local development mode..."

    # Navigate to backend directory and start FastAPI backend
    echo "Starting FastAPI backend..."
    cd backend || exit
    pip install -r requirements.txt
    uvicorn app:app --host 0.0.0.0 --port 8000 &
    BACKEND_PID=$!
    cd ..

    # Navigate to frontend directory and start frontend
    echo "Starting frontend..."
    cd frontend/websynth || exit
    npm run dev &
    FRONTEND_PID=$!
    cd ../..

    # Wait for processes to finish
    wait $BACKEND_PID
    wait $FRONTEND_PID
else
    echo "Running in Docker mode..."

    # Start Docker containers
    docker-compose up --build -d

    docker ps -a
fi
