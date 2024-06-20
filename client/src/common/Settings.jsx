import React from 'react';
import { Tabs } from 'antd';
import GeneralSettings from './GeneralSettings';
import NotificationSettings from './NotificationSettings';
import SecuritySettings from './SecuritySettings';
import useApi from '../hooks/useApi';

const { TabPane } = Tabs;

const Settings = () => {
  const { data, error, loading, fetchData, context } = useApi();

  React.useEffect(() => {
    fetchData('/api/client/settings');
  }, []);

  return (
    loading ? <p>Подгружаем настройки...</p> :
    <div style={{ padding: '20px' }}>
      {context}
      <h1>Настройки пользователя</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Основные настройки" key="1">
          <GeneralSettings settings={data} />
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