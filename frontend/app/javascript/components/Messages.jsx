import { List } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectedConversationMessagesSelector } from '../redux/selectors';

const listStyle = {
  whiteSpace: "pre-line",
};

const Messages = () => {
  const messages = useSelector(selectedConversationMessagesSelector);

  return (
    <List
      itemLayout="horizontal"
      dataSource={messages}
      renderItem={(item, index) => (
        <List.Item style={listStyle}>
          <List.Item.Meta
            description={item.role}
          />
          {item.content}
        </List.Item>
      )}
    />
  );
}

export default Messages;