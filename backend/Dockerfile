# python base image
FROM python:3.11.0

# Workdir for output
WORKDIR /app

# Copy requirements.txt to workdir
COPY requirements.txt .

# Copy data_creation.py to workdir
COPY vector-db/data_creation.py .

# Copy application files
COPY . .

# Run entrypoint.sh script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

# Run API on container port 8000
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]

# # Install requirements
# RUN pip install --no-cache-dir --upgrade -r requirements.txt

# # Create container for iris
# CMD docker run -d --name iris-comm -p 1972:1972 -p 52773:52773 -e IRIS_PASSWORD=demo -e IRIS_USERNAME=demo intersystemsdc/iris-community:latest

# # Install iris
# RUN pip install ./vector-db/intersystems_irispython-5.0.1-8026-cp38.cp39.cp310.cp311.cp312-cp38.cp39.cp310.cp311.cp312-macosx_10_9_universal2.whl

# # Copy data_creation.py to workdir
# COPY vector-db/data_creation.py .

# # Run data_creation.py
# CMD python data_creation.py

# # Copy application files
# COPY . .

# # Run API on container port 8000
# CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]