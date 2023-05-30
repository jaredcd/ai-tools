import { Avatar, List } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectedConversationMessagesSelector } from '../redux/selectors';

const Messages = () => {
  const messages = useSelector(selectedConversationMessagesSelector);

  return (
    <List
      itemLayout="horizontal"
      dataSource={messages}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            title={item.role}
            description={item.content}
          />
        </List.Item>
      )}
    />
  );
}

export default Messages;