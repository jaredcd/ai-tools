from git import Repo
import sys
import os
import ai_helper
import openai


def get_repo_src(directory: str):
    # Formats the contents of the given repo into a single string

    repo = Repo(directory)
    filenames = repo.git.ls_tree("--full-tree", "--name-only", "-r", "HEAD")
    filenames = filenames.split("\n")
    lfs_files = repo.git.lfs("ls-files", "-all", "--name-only")
    lfs_files = lfs_files.split("\n")

    src_data = ""
    for filename in filenames:
        if filename in lfs_files or filename == "README.md":
            continue

        try:
            with open(f'{directory}/{filename}', mode='r') as file:
                contents = file.read()
                src_data += f'---\n{filename}:\n---\n{contents}\n\n'
                print(f"Added {len(contents)} chars from {directory}/{filename}")
        except:
            pass

    return src_data


def get_repo_dir():
    # Returns path given in cli args or default to the current working dir

    if len(sys.argv) > 1:
        return sys.argv[1]
    else:
        return os.getcwd()


def main():
    ai_helper.load_key()
    repo_path = get_repo_dir()
    src = get_repo_src(repo_path)
    prompt = "Generate README.md for this repository."
    messages = [
        {"role": "system", "content": src},
        {"role": "user", "content": prompt},
    ]

    completion = openai.ChatCompletion.create(
        model="gpt-4",
        messages=messages
    )

    filename = f'{repo_path}/README.md'
    with open(filename, mode='w') as file:
        file.write(completion.choices[0].message.content)

    print(f'Wrote to {filename}')


if __name__ == "__main__":
    main()
