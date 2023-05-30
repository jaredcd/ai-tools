import { createListenerMiddleware } from '@reduxjs/toolkit'
import { submitMessage, pushMessage } from './appSlice';

const API_URL = "https://api.openai.com/v1/chat/completions";

const listenerMiddleware = createListenerMiddleware();

const generate = async (messages, apiKey) => {

    try {
        // Fetch the response from the OpenAI API with the signal from AbortController
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: messages,
            }),
        });

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error("Error:", error);
        return undefined;        
    }
};

listenerMiddleware.startListening({
    actionCreator: submitMessage,
    effect: async (action, listenerApi) => {
        const state = listenerApi.getState();
        const { apiKey } = state.app;
        const { conversation, message } = action.payload;

        if (!(conversation in state.app.conversations)) return;
        const { messages } = state.app.conversations[conversation];
        const context = messages.concat(message);

        const task = listenerApi.fork(async (forkApi) => {
            const response = await generate(context, apiKey);
            if (!response) {
                //dispatch error message
                return;
            }

            const newMessage = {
                conversation,
                message: {
                    role: "assistant",
                    content: response
                }
            };
            console.log(newMessage);
            listenerApi.dispatch(pushMessage(newMessage));
        });
    },
});

export default listenerMiddleware;