# AI Chat Assistant

This is a simple command-line AI chat assistant built using the OpenAI API. It allows you to interact with the AI, save/load conversations, and switch between different models.

## Installation

Before you start, make sure you have Python 3.7+ installed.

1. Clone this repository.
2. Install the required packages:

```
pip install -r requirements.txt
```

3. Create a `.secret` file in the project directory and add your OpenAI API key.

## Usage

Run the script with:

```
python3 chat.py
```

### Commands

- `/exit`: Quit the chat assistant.
- `/model MODEL_NAME`: Change the AI model (e.g., `/model gpt-3.5-turbo`).
- `/load CONVERSATION_NAME`: Load a conversation from the `conversations` directory (e.g., `/load test`).
- `/save`: Save the current conversation using its current name.
- `/save CONVERSATION_NAME`: Save the current conversation with a new name (e.g., `/save test`).
- `/info`: Display the current conversation name and AI model.
- `/list`: List all saved conversations in the `conversations` directory.

## License

This project is released under the [MIT License](LICENSE.md).