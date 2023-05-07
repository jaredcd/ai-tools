# Chat Assistant

This repository contains a simple chat assistant that communicates with OpenAI's models to provide you with human-like interactions. It also provides functionality to load, save, and manage the conversation context.

## Requirements

- Python 3.8 or above
- An OpenAI API key

## Installation

1. Clone the repo
2. Run `pip install -r requirements.txt` to install the required dependencies
3. Set up a .secret file containing your OpenAI API key

## Usage

Run the `chat.py` script to interact with the chat assistant. The script provides various commands to interact with the GPT-3 model and manage conversations:

- `/load <conversation_name>`: Load an existing conversation by its name
- `/save [conversation_name]`: Save the current conversation. If a conversation name is provided, it saves the conversation using the new name
- `/model <model_name>`: Select GPT-3 model to use, e.g., `gpt-3.5-turbo`
- `/info`: Print current conversation name and model
- `/list`: List existing saved conversations
- `/exit`: Exit the chat assistant

Finally, the `generate_readme.py` script demonstrates an example of using GPT-4 to automatically generate a README.md file for a repository, based on its content.

## License

This project is licensed under the [MIT License](LICENSE.md).