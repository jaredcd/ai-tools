import { createSlice } from '@reduxjs/toolkit';

const createEmptyConversation = () => {
    return {
        messages: [],
    };
};

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    apiKey: "",
    conversations: {},
    selectedConversation: "",
  },
  reducers: {
    setAPIKey(state, action) {
        state.apiKey = action.payload;
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
    pushMessage(state, action) {
        const { conversation, message } = action.payload;
        state.conversations[conversation].messages.push(message); 
    }
  },
});


export const { setAPIKey, createConversation, deleteConversation, selectConversation, submitMessage, pushMessage } = appSlice.actions;

export default appSlice.reducer;