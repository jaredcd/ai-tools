import React, { useState } from "react";
import { Layout, Input } from "antd";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { submitMessage } from "../redux/appSlice";
import { apiKeySelector, selectedConversationSelector } from "../redux/selectors";

const { Footer, Content } = Layout;
const { TextArea } = Input;

const contentStyle = {
    _textAlign: 'center',
    height: "100%",
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
    const [promptText, setPromptText] = useState("");
    const dispatch = useDispatch();

    const sendMessage = () => {
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
