import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider, Layout, theme } from 'antd';
import Chat from "./Chat";
import Sidebar from "./Sidebar";

const { Content, Sider } = Layout

export default function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <Layout>
        <Sider>
          <Sidebar />
        </Sider>
        <Content>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Chat />} />
            </Routes>
          </BrowserRouter>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}