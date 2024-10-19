## AI Chatbot

The AI Chatbot is a simple command-line-based chatbot powered by OpenAI's GPT-4 model. You can interact with the chatbot and save/load entire conversations.

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
- `/model <model_name>`: Select model to use, e.g., `gpt-4o`
- `/info`: Print current conversation name and model
- `/list`: List existing saved conversations
- `/exit`: Exit the chatbot