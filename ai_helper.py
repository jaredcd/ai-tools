import openai


def load_key():
    with open('.secret', mode='r') as file:
        openai.api_key = file.read().strip()
