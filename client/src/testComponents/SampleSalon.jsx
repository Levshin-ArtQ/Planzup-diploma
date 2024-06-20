
import React from 'react';
import PropTypes from 'prop-types';
import useApi from '../hooks/useApi';
import PrettyJson from '../devutils/PrettyJson';
import { json } from 'react-router-dom';




const SampleSalon = () => {
  const schedule = {
    name: "расписание",
    description: "описание расписания",
    type: "master",
    periods: [
      {
        name: "Утренний слот 1",
        type: "available",
        start: "2024-06-25T08:00:00",
        durationMinutes: 60,
        end: "2024-06-25T09:00:00",
      },
      {
        name: "Утренний слот 2",
        type: "available",
        start: "2024-06-25T09:00:00",
        durationMinutes: 60,
        end: "2024-06-25T10:00:00",
      },
      {
        name: "Утренний слот 3",
        type: "busy",
        start: "2024-06-25T10:00:00",
        durationMinutes: 60,
        end: "2024-06-25T11:00:00",
      },
      {
        name: "Полуденный слот 1",
        type: "busy",
        start: "2024-06-25T11:00:00",
        durationMinutes: 60,
        end: "2024-06-25T12:00:00",
      },
      {
        name: "Полуденный слот 2",
        type: "available",
        start: "2024-06-25T12:00:00",
        durationMinutes: 60,
        end: "2024-06-25T13:00:00",
      },
      {
        name: "Полуденный слот 3",
        type: "busy",
        start: "2024-06-25T13:00:00",
        durationMinutes: 60,
        end: "2024-06-25T14:00:00",
      },
      {
        name: "Вечерний слот 1",
        type: "available",
        start: "2024-06-25T14:00:00",
        durationMinutes: 60,
        end: "2024-06-25T15:00:00",
      },
      {
        name: "Вечерний слот 2",
        type: "busy",
        start: "2024-06-25T15:00:00",
        durationMinutes: 60,
        end: "2024-06-25T16:00:00",
      },
      {
        name: "Вечерний слот 3",
        type: "available",
        start: "2024-06-25T16:00:00",
        durationMinutes: 60,
        end: "2024-06-25T17:00:00",
      },
      {
        name: "Вечерний слот 4",
        type: "busy",
        start: "2024-06-25T17:00:00",
        durationMinutes: 60,
        end: "2024-06-25T18:00:00",
      },
    ],
  };
  
  const createSettings =  (name) => {
    return {
      "name": name,
      "password": "password",
      "username": name,
      "email": name + "@example.com",
      "usertype": "master",
      "shardingSchedule": false,
      "push_token": "abcdef1234567890",
      "prefers_telegram": true,
      "prefers_email": true,
      "prefers_push": false,
    }
  }
  
  const masters = [
    { firstName: "Иван", username: "loginMaster0", lastName: "Иванов", rating: 4.5, services: ["Стрижка"] },
    {
      firstName: "Алексей",
      lastName: "Алексеев",
      username: "loginMaster1",
      rating: 4.5,
      services: ["Стрижка"],
      schedule: schedule,
      setting: createSettings("Алексей")
    },
    { firstName: "Петр", lastName: "Петров", rating: 4.7, services: ["Маникюр"] },
    {
      firstName: "Сидор",
      lastName: "Сидоров",
      username: "loginMaster2",
      rating: 4.2,
      services: ["Массаж"],
      schedule: schedule,
      setting: createSettings("Сидор")
    },
    {
      firstName: "Антон",
      lastName: "Антонов",
      username: "loginMaster3",
      rating: 4.8,
      services: ["Педикюр"],
      schedule: schedule,
      setting: createSettings("Антон")
    },
    {
      firstName: "Василий",
      lastName: "Васильев",
      username: "loginMaster4",
      rating: 4.9,
      services: ["Маникюр"],
      schedule: schedule,
      setting: createSettings("Василий")
    },
  
  ];
  
  const services = [
    {
      name: "Маникюр",
      description: "Маникюр с вниманием к каждому пальчику",
      catgory: "Маникюр",
      subcatgory: "Маникюр",
      price: 1000,
      duration: 60,
      masters: [masters[2]],
    },
    {
      name: "Педикур",
      description: "с заботой о каждом пальчике",
      catgory: "Педикюр",
      subcatgory: "Педикюр",
      price: 1050,
      duration: 60,
      masters: [masters[4]],
    },
    {
      name: "Массаж",
      description: "Массаж на который хочется вернтуться",
      catgory: "Массаж",
      subcatgory: "Массаж",
      price: 1000,
      duration: 60,
      masters: [masters[2], masters[3]],
    },
    {
      name: "Стрижка",
      catgory: "Стрижка",
      subcatgory: "Барбер",
      description:
        "Учтем ваш предыдущий опыт, подскажем какую стрижку вам выбрать в этот разы",
      price: 1000,
      duration: 60,
      masters: [masters[0], masters[1]],
    },
  ];
  
  const testSalon = {
    main_image: "https://example.com/images/salon1/main.jpg",
    images: [
      "https://via.placeholder.com/800x400",
      "https://via.placeholder.com/800x400",
      "https://via.placeholder.com/800x400",
    ],
    name: "Красота и Уют",
    slogan: "Ваше совершентсво — наша забота",
    description:
      "Салон красоты, предлагающий широкий спектр услуг для ухода за кожей, волосами и ногтями. Высококвалифицированные мастера и уютная атмосфера.",
    address: "г. Челябинск, ул. Тестовая, д. 15",
    latitude: 55.7558,
    longitude: 37.6176,
    phone: "+7 (495) 123-45-67",
    email: "artqptr@gmail.com",
    services: services,
    masters: masters,
    // "website": "https://beautycomfort.ru",
    // "telegram": "@beauty_comfort",
    // "vk": "https://vk.com/beauty_comfort",
    master_count: 3,
    client_count: 1500,
  };
  
  const testSalon2 = {
    main_image: "https://via.placeholder.com/800x400",
    images: [
      "https://via.placeholder.com/800x400",
      "https://via.placeholder.com/800x400",
      "https://via.placeholder.com/800x400",
    ],
    name: "Модный образ",
    slogan: "Создаем стиль вместе с вами",
    description:
      "Современный салон красоты с акцентом на модные тенденции. Профессиональные стилисты помогут вам создать уникальный и стильный образ.",
    address: "г. Челябинск, Примерный проспект, д. 50",
    latitude: 59.9343,
    longitude: 30.3351,
    phone: "+7 (812) 987-65-43",
    email: "levshin.a74@mail.ru",
    // "website": "https://fashionlook.spb.ru",
    // "telegram": "@fashion_look",
    // "vk": "https://vk.com/fashion_look",
    master_count: 3,
    services: services,
    masters: masters,
    client_count: 2000,
  };
  
  const testSalon3 = {
    main_image: "https://via.placeholder.com/800x400",
    images: [
      "https://via.placeholder.com/800x400",
      "https://via.placeholder.com/800x400",
      "https://via.placeholder.com/800x400",
    ],
    name: "Элеганс",
    slogan: "Элегантность в каждом штрихе",
    description:
      "Превосходный салон с элегантным интерьером и профессиональными мастерами. Мы предлагаем высококачественные услуги по уходу за волосами и кожей.",
    address: "г. Челябинск, ул. Нет, д. 22",
    latitude: 55.0084,
    longitude: 82.9357,
    phone: "+7 (383) 123-45-67",
    email: "planzup.team@gmail.com",
    masters: masters,
    services: services,
    // "website": "https://elegance.ru",
    // "telegram": "@elegance_salon",
    // "vk": "https://vk.com/elegance_salon",
    master_count: 3,
    client_count: 1200,
  };
  
  
  const createClientbase = (owner_name, number) => {
    return {
      owner_name: owner_name,
      phone: `+7${number}`,
      email: `${owner_name}@test.com`,
      password: "12345",
      clientcards: [
        {
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
          firstName: 'Екатерина',
          lastName: 'Петрова',
          description: 'Не очень усидчивая, но лояльная',
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
          firstName: 'Елена',
          lastName: 'Иванова',
          description: 'Знает как ей нужно, не переубеждать',
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
          firstName: 'Елена',
          lastName: 'Соколова',
          description: 'Любит обсуждать русских классиков',
          preferences: ['Массаж', 'Спа'],
          phone: '222222222',
          status: 'VIP',
          occupation: 'Актриса',
          email: 'sokolova@example.com',
          loyaltyPoints: 150,
          favoriteMasters: ['Мастер 10'],
          favoriteServices: ['Массаж'],
        },
      ],
  
    }
  }
  const { data, loading, error, fetchData, contextHolder } = useApi();
  const handleClick = () => {
    fetchData('/api/test/salon',  {data: testSalon, method: 'POST'},);
    fetchData('/api/test/salon',  {data: testSalon3, method: 'POST'},);
    fetchData('/api/test/salon',  {data: testSalon2, method: 'POST'},);
  }
  return (
    <div>
      {contextHolder}
      <button onClick={handleClick}>Click</button>
      <div>
        {loading && <div>loading</div>}
        {error && <div>{JSON.stringify(error)}</div>}
        {data && <div>{JSON.stringify(data, 4)}</div>}
      </div>
      
    </div>
  );
};

export default SampleSalon;



