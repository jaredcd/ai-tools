import { createListenerMiddleware } from '@reduxjs/toolkit'
import { submitMessage, startMessage, endStream, streamMessageChunk } from './appSlice';

const API_URL = "https://api.openai.com/v1/chat/completions";

const listenerMiddleware = createListenerMiddleware();

const generate = async (model, messages, apiKey, streamChunk) => {

    try {
        // Fetch the response from the OpenAI API with the signal from AbortController
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model,
                messages,
                stream: true,
            }),
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");

        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }
            // Massage and parse the chunk of data
            const chunk = decoder.decode(value);
            const lines = chunk.split("\n\n");
            const parsedLines = lines
                .map((line) => line.replace(/^data: /, "").trim()) // Remove the "data: " prefix
                .filter((line) => line !== "" && line !== "[DONE]") // Remove empty lines and "[DONE]"
                .map((line) => {
                    return JSON.parse(line);
                }); // Parse the JSON string

            for (const parsedLine of parsedLines) {
                const { choices } = parsedLine;
                const { delta } = choices[0];
                const { content } = delta;
                // Update the UI with the new content
                if (content) {
                    streamChunk(content);
                }
            }
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

listenerMiddleware.startListening({
    actionCreator: submitMessage,
    effect: async (action, listenerApi) => {
        const state = listenerApi.getState();
        const { apiKey, model } = state.app;
        const { conversation } = action.payload;

        if (!(conversation in state.app.conversations)) return;
        const { messages } = state.app.conversations[conversation];

        const task = listenerApi.fork(async (forkApi) => {
            const newMessage = {
                conversation,
                message: {
                    role: "assistant",
                    content: ""
                }
            };
            listenerApi.dispatch(startMessage(newMessage));

            const streamChunk = (chunk) => {
                listenerApi.dispatch(streamMessageChunk(chunk));
            };

            await generate(model, messages, apiKey, streamChunk);

            listenerApi.dispatch(endStream());
        });
    },
});

export default listenerMiddleware;