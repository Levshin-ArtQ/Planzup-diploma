# Инструкция по навигации по документу

Данная инструкция поможет вам перемещаться по документу, содержащему информацию о проекте.

можно подсветить директорию прожав клавишу command и нажава на соответствующий путь в круглых скобочках мышью

### Директории

- [client](client) - директория клиентского приложения на React
- [server](server) - директория серверного приложения на Node.js
- [docker-compose.yml](docker-compose.yml) - файл конфигурации для запуска приложения в Docker
- [nginx.conf](nginx.conf) - конфигурационный файл для Nginx
- [README.md](README.md) - текущий документ


### client

- [client/public](client/public) - директория, в которой размещаются статические файлы, которые не нужно компилировать (например, изображения, шрифты и т.д.).
  - [client/public/manifest.json](client/public/manifest.json) - файл манифеста, который позволяет устанавливать приложение на экран домой.

- [client/src](client/src) - директория с исходным кодом клиентского приложения
  - [client/src/App.jsx](client/src/App.jsx) - главный компонент приложения
  - [client/src/components](client/src/components) - директория с компонентами
    - [client/src/components/BentoboxMenu](client/src/components/BentoboxMenu) - директория с компонентом меню
      - [client/src/components/BentoboxMenu/BentoboxMenu.jsx](client/src/components/BentoboxMenu/BentoboxMenu.jsx) - компонент меню
    - [client/src/components/Form](client/src/components/Form) - директория с компонентом формы
      - [client/src/components/Form/Form.jsx](client/src/components/Form/Form.jsx) - компонент формы
    - [client/src/components/Header](client/src/components/Header) - директория с компонентом заголовка
      - [client/src/components/Header/Header.jsx](client/src/components/Header/Header.jsx) - компонент заголовка
    - [client/src/components/ProgressBar](client/src/components/ProgressBar) - директория с компонентом прогресс-бара
      - [client/src/components/ProgressBar/ProgressBar.jsx](client/src/components/ProgressBar/ProgressBar.jsx) - компонент прогресс-бара
    - и т.д.
  - [client/src/4clients](client/src/4clients) - директория с компонентами для разных типов клиентов
    - [client/src/4clients/ClientHome.jsx](client/src/4clients/ClientHome.jsx) - компонент главной страницы для клиента
    - [client/src/4clients/components](client/src/4clients/components) - директория с компонентами для клиентов
      - [client/src/4clients/components/MasterCards.jsx](client/src/4clients/components/MasterCards.jsx) - компонент с карточками мастера
      - [client/src/4clients/components/MasterSchedule.jsx](client/src/4clients/components/MasterSchedule.jsx) - компонент расписания мастера
      - и т.д.
  - [client/src/devutils](client/src/devutils) - директория с инструментами для разработчика
    - [client/src/devutils/PrettyJson.jsx](client/src/devutils/PrettyJson.jsx) - компонент для красивого вывода JSON
  - [client/src/hooks](client/src/hooks) - директория с хуками
    - [client/src/hooks/useTelegram.jsx](client/src/hooks/useTelegram.jsx) - хук для работы с Telegram
  - [client/src/serviceWorker.js](client/src/serviceWorker.js) - файл для регистрации service worker
  - [client/src/setupProxy.js](client/src/setupProxy.js) - файл для настройки прокси
  - [client/src/App.css](client/src/App.css) - файл стилей главного приложения
  - [client/src/index.jsx](client/src/index.jsx) - главный файл приложения
  - [client/src/reportWebVitals.js](client/src/reportWebVitals.js) - файл для отчета о производительности


### Директория server

Эта директория содержит серверную часть приложения.

- [server/index.js](server/index.js) - главный файл серверной части. Здесь настраивается сервер, подключаются необходимые модули.
- [server/services](server/middleware) - директория с сервисами. Сервисы - это модули, которые предоставляют определенные функциональности. Например, сервис для работы с базой данных, сервис для работы с Telegram и т.д.
- [server/server.js](server/server.js) - файл, который запускает сервер. Он подключает Express, настраивает маршруты и запускает сервер.
- [server/models](server/models) - директория с моделями. Модели - это объекты, которые описывают структуру данных в базе данных.
  - [server/models/index.js](server/models/index.js) - основной файл директории в нем описывается подключение к базе данных через Sequelize& а также для удобства собираются и экспортируются все модели в одной переменной db
  - [server/models/associations.js](server/models/associations.js) - модель для работы с пользователями. Она содержит методы для создания пользователя, аутентификации и получения информации о пользователе.
- [server/routes](server/routes) - директория с маршрутами. Маршруты - это методы для обработки запросов.
- [server/routes](server/routes) - директория с маршрутами. Маршруты - это методы для обработки запросов.
- [server/middleware](server/middleware) - директория со вспомогательными функциями. Здесь описывается методы выполняемые перед
- [server/config](server/config) - директория с конфигурациями. Конфигурации - это настройки для работы приложения.



### notifications-worker

Директория `notifications-worker` содержит рабочий процесс для отправки уведомлений.

- [notifications-worker/index.js](notifications-worker/index.js) - основной файл директории в нем импортируются и настраиваются все необходимые библиотеки и функции. для отправки уведомлений по почте.
- [notifications-worker/models](notifications-worker/jobs) - директория с моделями необходимых объектов. Здесь приводятся тлько нужные объекты для отправки уведомлений
