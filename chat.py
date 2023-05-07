from collections import namedtuple
import os
import json
import ai_helper
import openai


State = namedtuple("State", ["name", "messages", "model"])


def get_default_context():
    return [{"role": "system", "content": "You are a helpful assistant."},]


def read_convo(name: str):
    if name == "default":
        return get_default_context()

    try:
        with open(f'conversations/{name}.json', 'r') as f:
            data = json.load(f)
        print(f'Loading {name} conversation')
        for message in data:
            print(f'{message["role"]}: {message["content"]}')
    except Exception:
        print(f'Failed to load {name}, reverting to backup context')
        data = get_default_context()

    return data


def write_convo(name: str, data: list):
    try:
        os.makedirs("conversations")
    except FileExistsError:
        pass

    with open(f'conversations/{name}.json', 'w') as f:
        json.dump(data, f)


def process_command(command: str, state: State):
    name, messages, model = state

    match command.split():
        case ['/model', model_name]:
            model = model_name
        case ['/load', conversation_name]:
            messages = read_convo(conversation_name)
            name = conversation_name
        case ["/save", conversation_name]:
            write_convo(conversation_name, messages)
            name = conversation_name
        case ["/save"]:
            write_convo(name, messages)
        case ["/info"]:
            print(f'Conversation: {name}, Model: {model}')
        case ["/list"]:
            files = [os.path.splitext(filename)[0]
                     for filename in os.listdir("conversations")]
            print(files)
        case _:
            print("Unknown command")

    return State(name, messages, model)


def main():
    ai_helper.load_key()
    state = State("default", get_default_context(), "gpt-3.5-turbo")

    while True:
        prompt = input("user: ")
        if prompt == "":
            continue

        if prompt == "/exit":
            break

        if prompt[0] == "/":
            state = process_command(prompt, state)
            continue

        messages = state.messages
        messages.append({"role": "user", "content": prompt})

        completion = openai.ChatCompletion.create(
            model=state.model,
            messages=messages
        )

        response = completion.choices[0].message.content
        print(f'assistant: {response}')
        messages.append({"role": "assistant", "content": response})
        state = State(state.name, messages, state.model)


if __name__ == "__main__":
    main()
