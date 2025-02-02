#!/bin/bash

echo "Starting WebSynth backend..."

pip install --no-cache-dir --upgrade -r requirements.txt

docker run -d --name iris-comm -p 1972:1972 -p 52773:52773 -e IRIS_PASSWORD=demo -e IRIS_USERNAME=demo intersystemsdc/iris-community:latest

pip install ./vector-db/intersystems_irispython-5.0.1-8026-cp38.cp39.cp310.cp311.cp312-cp38.cp39.cp310.cp311.cp312-macosx_10_9_universal2.whl

python data_creation.py

# Copy application files
COPY . .