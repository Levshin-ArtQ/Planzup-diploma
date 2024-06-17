import React, { useState, useMemo } from 'react';
import { Row, Col, Button, Select, Input } from 'antd';
import ClientCard from './ClientCard';

const { Option } = Select;

const initialClients = [
  {
    UID: '1',
    firstName: 'Иван',
    lastName: 'Иванов',
    description: 'Важный клиент',
    preferences: ['Массаж', 'Спа'],
    phone: '123456789',
    status: 'VIP',
    occupation: 'Бизнесмен',
    email: 'ivanov@example.com',
    loyaltyPoints: 120,
    favoriteMasters: ['Мастер 1'],
    favoriteServices: ['Массаж'],
  },
  {
    UID: '2',
    firstName: 'Анна',
    lastName: 'Смирнова',
    description: 'Постоянный клиент',
    preferences: ['Маникюр', 'Педикюр'],
    phone: '987654321',
    status: 'regular',
    occupation: 'Учитель',
    email: 'smirnova@example.com',
    loyaltyPoints: 80,
    favoriteMasters: ['Мастер 2'],
    favoriteServices: ['Маникюр'],
  },
  // добавьте больше клиентов для тестирования
];

const ClientCardsPage = () => {
  const [clients, setClients] = useState(initialClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const handleUpdateClient = (updatedClient) => {
    setClients(clients.map(client => client.UID === updatedClient.UID ? updatedClient : client));
  };

  const filteredClients = useMemo(() => {
    return clients
      .filter(client => 
        client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        client.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(client => 
        !filterStatus || client.status === filterStatus
      )
      .sort((a, b) => {
        if (!sortField) return 0;
        if (a[sortField] < b[sortField]) return -1;
        if (a[sortField] > b[sortField]) return 1;
        return 0;
      });
  }, [clients, searchTerm, sortField, filterStatus]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Клиентская база</h1>
      <div style={{ marginBottom: '20px' }}>
        <Input 
          placeholder="Поиск по имени или email" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          style={{ width: '200px', marginRight: '10px' }} 
        />
        <Select 
          placeholder="Сортировка" 
          value={sortField} 
          onChange={(value) => setSortField(value)} 
          style={{ width: '150px', marginRight: '10px' }}
        >
          <Option value="firstName">Имя</Option>
          <Option value="lastName">Фамилия</Option>
          <Option value="email">Email</Option>
          <Option value="loyaltyPoints">Баллы лояльности</Option>
        </Select>
        <Select 
          placeholder="Фильтр по статусу" 
          value={filterStatus} 
          onChange={(value) => setFilterStatus(value)} 
          style={{ width: '150px' }}
        >
          <Option value="">Все</Option>
          <Option value="VIP">VIP</Option>
          <Option value="regular">Regular</Option>
          <Option value="new">New</Option>
          <Option value="banned">Banned</Option>
          <Option value="deleted">Deleted</Option>
        </Select>
      </div>
      <Row gutter={[16, 16]}>
        {filteredClients.map(client => (
          <Col key={client.UID} xs={24} sm={12} md={8} lg={6}>
            <ClientCard client={client} onUpdate={handleUpdateClient} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ClientCardsPage;
