import React, { useState, useEffect, useRef } from "react";
import { Layout, Input } from "antd";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { submitMessage } from "../redux/appSlice";
import { canSendMessageSelector, selectedConversationSelector, selectedConversationMessagesSelector } from "../redux/selectors";

const { Footer, Content } = Layout;
const { TextArea } = Input;

const contentStyle = {
    _height: "100%",
    overflow: "auto",
    paddingLeft: "16px"
};

const footerStyle = {
    textAlign: 'center',
};

const layoutStyle = {
    height: "100vh"
};

export default () => {
    const selectedConversation = useSelector(selectedConversationSelector);
    const canSendMessage = useSelector(canSendMessageSelector);
    const [promptText, setPromptText] = useState("");
    const dispatch = useDispatch();

    const messages = useSelector(selectedConversationMessagesSelector);
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    const sendMessage = () => {
        if (!canSendMessage) return;

        const payload = {
            conversation: selectedConversation,
            message: {
                role: "user",
                content: promptText,
            }
        };

        dispatch(submitMessage(payload));
        setPromptText("");
    };

    const onPressEnter = (e) => {
        if (!e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <Layout style={layoutStyle}>
            <Content style={contentStyle}>
                <Messages />
                <div ref={messagesEndRef} />
            </Content>
            <Footer style={footerStyle}>
                <TextArea
                    placeholder="Prompt"
                    allowClear
                    onPressEnter={onPressEnter}
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                />
            </Footer>
        </Layout>
    );
}
