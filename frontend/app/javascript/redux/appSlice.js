import { createSlice } from '@reduxjs/toolkit';

const createEmptyConversation = () => {
    return {
        messages: [],
    };
};

export const INITIAL_STATE = {
    apiKey: "",
    model: "gpt-3.5-turbo",
    conversations: {},
    selectedConversation: "",
    streamingConversation: "",
    streamingIndex: -1,
};

export const appSlice = createSlice({
    name: 'app',
    initialState: INITIAL_STATE,
    reducers: {
        setAPIKey(state, action) {
            state.apiKey = action.payload;
        },
        setAPIModel(state, action) {
            state.model = action.payload;
        },
        createConversation(state, action) {
            state.conversations[action.payload] = createEmptyConversation();
            state.selectedConversation = action.payload;
        },
        deleteConversation(state, action) {
            const conversation = action.payload;

            if (state.selectedConversation == conversation) {
                state.selectedConversation = "";
            }

            delete state.conversations[conversation];
        },
        selectConversation(state, action) {
            state.selectedConversation = action.payload;
        },
        submitMessage(state, action) {
            const { conversation, message } = action.payload;
            state.conversations[conversation].messages.push(message);
        },
        startMessage(state, action) {
            const { conversation, message } = action.payload;
            state.streamingConversation = conversation;
            state.streamingIndex = state.conversations[conversation].messages.length;
            state.conversations[conversation].messages.push(message);
        },
        streamMessageChunk(state, action) {
            const chunk = action.payload;
            let message = state.conversations[state.streamingConversation].messages[state.streamingIndex];
            message.content += chunk;
            state.conversations[state.streamingConversation].messages[state.streamingIndex] = message;
        },
        endStream(state) {
            state.streamingIndex = -1;
            state.streamingConversation = "";
        }
    },
});


export const { setAPIKey, setAPIModel, createConversation, deleteConversation, selectConversation, submitMessage, startMessage, streamMessageChunk, endStream } = appSlice.actions;

export default appSlice.reducer;