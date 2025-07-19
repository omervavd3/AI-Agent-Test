FROM ollama/ollama

# Pull model during build
RUN ollama serve & \
    sleep 5 && \
    ollama pull mistral && \
    pkill ollama

# Start ollama server when container runs
CMD ["serve"]
