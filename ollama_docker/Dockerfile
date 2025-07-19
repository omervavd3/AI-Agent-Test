FROM ollama/ollama

RUN ollama serve & \
    sleep 5 && \
    ollama pull gemma:2b && \
    pkill ollama

CMD ["serve"]
