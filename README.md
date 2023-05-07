# AI Chatbot & Repo README Generator

This repository contains two main applications: an AI Chatbot and a README Generator for repositories.

## AI Chatbot

The AI Chatbot is a simple command-line-based chatbot powered by OpenAI's GPT-3.5-turbo model. You can interact with the chatbot and save/load entire conversations.

### Setup

Make sure you have Python 3.6 or above installed. Then run:

```
pip install -r requirements.txt
```

Place your OpenAI API key in a `.secret` file in the root directory of the project.

### Running

Run the chatbot with:

```
python chat.py
```

You can type messages to interact with the chatbot. To use special commands, type a forward slash `/` followed by the command name:

- `/load <conversation_name>`: Load an existing conversation by its name
- `/save [conversation_name]`: Save the current conversation. If a conversation name is provided, it saves the conversation using the new name
- `/model <model_name>`: Select GPT-3 model to use, e.g., `gpt-3.5-turbo`
- `/info`: Print current conversation name and model
- `/list`: List existing saved conversations
- `/exit`: Exit the chatbot

## Repo README Generator

The Repo README Generator is a script that uses GPT-4 to generate a README file for a given repository. It takes the entire source code of the repository as input and creates a totally new README file.

### Setup

Make sure you have Python 3.6 or above installed. Then run:

```
pip install -r requirements.txt
```

Remember to place your OpenAI API key in a `.secret` file in the root directory of the project.

### Running

To run the README generator, use:

```
python generate_readme.py [directory]
```

Replace `[directory]` with the path to the repository. If no directory argument is given, it defaults to the current working directory.

The script will analyze the repository source code and write a generated `README.md` file to the repository's root directory.

## License

Copyright (c) 2023 Jared Dominguez

This software is released under the MIT License. For full details, see [LICENSE.md](LICENSE.md).