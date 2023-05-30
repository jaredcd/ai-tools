export const apiKeySelector = (state) => {
    return state.app.apiKey;
};

export const conversationNameListSelector = (state) => {
    if (!state.app.conversations) return [];
    return Object.keys(state.app.conversations);
};

export const selectedConversationSelector = (state) => {
    if (!(state.app.selectedConversation in state.app.conversations)) {
        return "";
    }

    return state.app.selectedConversation;
};

export const selectedConversationMessagesSelector = (state) => {
    const selectedConversationName = state.app.selectedConversation;
    if (!(selectedConversationName in state.app.conversations)) {
        return [];
    }

    const conversation = state.app.conversations[selectedConversationName];
    return conversation.messages;
};

export const canSendMessageSelector = (state) => {
    const { streamingIndex } = state.app;
    if (!streamingIndex) return true;
    return streamingIndex == -1;
};