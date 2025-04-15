# Use Python 3.10-slim image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy application files into the container
COPY . /app

# Install dependencies
RUN pip install flask
RUN pip install gunicorn

# Expose the port your app runs on
EXPOSE 8080

# Run the app
CMD ["gunicorn", "-b", "0.0.0.0:$PORT", "server:app"]
