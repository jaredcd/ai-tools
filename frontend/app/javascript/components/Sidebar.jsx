import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAPIKey, createConversation, selectConversation, deleteConversation } from '../redux/appSlice';
import {
    PlusOutlined,
    SettingOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import { Button, Modal, Menu, Layout, Input, Divider, Space } from 'antd';
import { apiKeySelector, conversationNameListSelector, selectedConversationSelector } from '../redux/selectors';

const { Header, Footer, Content } = Layout;

const layoutStyle = {
    height: "100vh",
};

const headerStyle = {
    padding: "0px 8px 8px 8px",
    backgroundColor: "inherit"
};

const footerStyle = {
    padding: 8,
    marginBottom: 16,
    backgroundColor: "inherit",
};

const buttonStyle = {
    width: "100%"
};

const deleteConvoStyle = {
    padding: 0,
}

const MenuLabel = ({ label, conversation }) => {
    const dispatch = useDispatch();
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        dispatch(deleteConversation(conversation));
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Space>
            <Button type="text" onClick={showModal} style={deleteConvoStyle}>
                <DeleteOutlined />
            </Button>
            {label}
            <Modal
                title="Delete Conversation?"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                Deleting "{conversation}". Press OK to confirm.
            </Modal>
        </Space>
    );
};

const Sidebar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const persistedKey = useSelector(apiKeySelector);
    const [keyText, setKeyText] = useState(persistedKey);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const conversationNames = useSelector(conversationNameListSelector);
    const [conversationNameText, setConversationNameText] = useState("");

    const selectedConversation = useSelector(selectedConversationSelector);
    const selectedMenuKeys = selectedConversation ? [selectedConversation] : [];

    const dispatch = useDispatch();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        dispatch(setAPIKey(keyText));
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const showCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const handleCreateOk = () => {
        dispatch(createConversation(conversationNameText));
        setIsCreateModalOpen(false);
    };

    const handleCreateCancel = () => {
        setIsCreateModalOpen(false);
    };

    const selectConversationMenuItem = e => {
        const { key } = e;
        dispatch(selectConversation(key));
    }

    const getMenuItems = () => {
        return conversationNames.map(name => {
            return { key: name, label: <MenuLabel label={name} conversation={name} /> };
        });
    }

    return (
        <>
            <Layout style={layoutStyle}>
                <Header style={headerStyle}>
                    <Button style={buttonStyle} onClick={showCreateModal}>
                        <PlusOutlined />
                        New Conversation
                    </Button>
                </Header>
                <Divider />
                <Content>
                    <Menu mode="inline" items={getMenuItems()} selectedKeys={selectedMenuKeys} onSelect={selectConversationMenuItem} />
                </Content>
                <Divider />
                <Footer style={footerStyle}>
                    <Button style={buttonStyle} onClick={showModal}>
                        <SettingOutlined />
                        Settings
                    </Button>
                </Footer>
            </Layout>
            <Modal
                title="Settings"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                OpenAI API Key
                <Input.Password
                    placeholder='Paste key here...'
                    onChange={(e) => setKeyText(e.target.value)}
                    value={keyText || ''}
                    onPressEnter={handleOk}
                />
            </Modal>
            <Modal
                title="Create Conversation"
                open={isCreateModalOpen}
                onOk={handleCreateOk}
                onCancel={handleCreateCancel}
            >
                <Input
                    placeholder='Conversation Name'
                    onChange={(e) => setConversationNameText(e.target.value)}
                    value={conversationNameText || ''}
                    onPressEnter={handleCreateOk}
                />
            </Modal>
        </>
    );
};

export default Sidebar;