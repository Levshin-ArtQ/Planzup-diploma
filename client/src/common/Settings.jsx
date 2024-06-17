import React from 'react';
import { Tabs } from 'antd';
import GeneralSettings from './GeneralSettings';
import NotificationSettings from './NotificationSettings';
import SecuritySettings from './SecuritySettings';

const { TabPane } = Tabs;

const Settings = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Настройки пользователя</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Основные настройки" key="1">
          <GeneralSettings />
        </TabPane>
        <TabPane tab="Уведомления" key="2">
          <NotificationSettings />
        </TabPane>
        <TabPane tab="Безопасность" key="3">
          <SecuritySettings />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Settings;