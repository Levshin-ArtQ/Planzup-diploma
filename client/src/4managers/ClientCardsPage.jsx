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
  {
    UID: '3',
    firstName: 'Олег',
    lastName: 'Петров',
    description: 'Отдыхает в саду',
    preferences: ['Сауна', 'Педикюр'],
    phone: '555555555',
    status: 'banned',
    occupation: 'Директор',
    email: 'petrov@example.com',
    loyaltyPoints: 60,
    favoriteMasters: ['Мастер 3'],
    favoriteServices: ['Сауна'],
  },
  {
    UID: '4',
    firstName: 'Елена',
    lastName: 'Иванова',
    description: 'Не любит купаться',
    preferences: ['Массаж', 'Соляриум'],
    phone: '666666666',
    status: 'regular',
    occupation: 'Дизайнер',
    email: 'ivanova@example.com',
    loyaltyPoints: 40,
    favoriteMasters: ['Мастер 4'],
    favoriteServices: ['Массаж'],
  },
  {
    UID: '5',
    firstName: 'Дмитрий',
    lastName: 'Соколов',
    description: 'Любитель роскоши',
    preferences: ['Массаж', 'Спа'],
    phone: '777777777',
    status: 'VIP',
    occupation: 'Менеджер',
    email: 'sokolov@example.com',
    loyaltyPoints: 140,
    favoriteMasters: ['Мастер 5'],
    favoriteServices: ['Массаж'],
  },
  {
    UID: '6',
    firstName: 'Екатерина',
    lastName: 'Петрова',
    description: 'Не очень умная, но лояльная',
    preferences: ['Массаж', 'Спа'],
    phone: '888888888',
    status: 'regular',
    occupation: 'Классическая балерина',
    email: 'petrova@example.com',
    loyaltyPoints: 100,
    favoriteMasters: ['Мастер 6'],
    favoriteServices: ['Массаж'],
  },
  {
    UID: '7',
    firstName: 'Олег',
    lastName: 'Соколов',
    description: 'Любитель роскоши',
    preferences: ['Массаж', 'Спа'],
    phone: '999999999',
    status: 'VIP',
    occupation: 'Менеджер',
    email: 'sokolov@example.com',
    loyaltyPoints: 160,
    favoriteMasters: ['Мастер 7'],
    favoriteServices: ['Массаж'],
  },
  {
    UID: '8',
    firstName: 'Елена',
    lastName: 'Иванова',
    description: 'Не очень умная, но лояльная',
    preferences: ['Массаж', 'Спа'],
    phone: '000000000',
    status: 'regular',
    occupation: 'Классическая балерина',
    email: 'ivanova@example.com',
    loyaltyPoints: 110,
    favoriteMasters: ['Мастер 8'],
    favoriteServices: ['Массаж'],
  },
  {
    UID: '9',
    firstName: 'Дмитрий',
    lastName: 'Петров',
    description: 'Любитель роскоши',
    preferences: ['Массаж', 'Спа'],
    phone: '111111111',
    status: 'VIP',
    occupation: 'Менеджер',
    email: 'petrov@example.com',
    loyaltyPoints: 130,
    favoriteMasters: ['Мастер 9'],
    favoriteServices: ['Массаж'],
  },
  {
    UID: '10',
    firstName: 'Елена',
    lastName: 'Соколова',
    description: 'Не очень умная, но любит наслаждаться',
    preferences: ['Массаж', 'Спа'],
    phone: '222222222',
    status: 'VIP',
    occupation: 'Актриса',
    email: 'sokolova@example.com',
    loyaltyPoints: 150,
    favoriteMasters: ['Мастер 10'],
    favoriteServices: ['Массаж'],
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
