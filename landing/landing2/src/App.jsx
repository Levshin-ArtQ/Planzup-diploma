// import React from 'react';
import { Container, Text, Button, Grid, Card, Spacer } from '@nextui-org/react';
import './index.css';

function App() {
  return (
    <Container>
      {/* Первый экран */}
      <Grid.Container justify="center" alignItems="center" className="hero">
        <Grid xs={12} md={8}>
          <Text h1>PlanzUp — ваш цифровой ассистент в сфере красоты</Text>
          <Text h3>Автоматизируйте запись клиентов и выведите бизнес на новый уровень</Text>
          <Text>PlanzUp — инновационная платформа для онлайн-записи в салонах красоты. Упрощает процесс записи, повышает клиентскую лояльность и увеличивает доходы. PlanzUp — ключ к успешному и современному бизнесу.</Text>
          <Spacer y={1} />
          <Button auto shadow color="gradient">Зарегистрируйтесь бесплатно</Button>
        </Grid>
      </Grid.Container>

      <Spacer y={3} />

      {/* О продукте */}
      <Grid.Container gap={2} justify="center">
        <Grid xs={12} md={8}>
          <Text h2>PlanzUp — революция в управлении салоном</Text>
          <ul>
            <li>Запись на курсы и абонементы: Позволяет клиентам планировать посещения заранее, создавая удобные абонементы.</li>
            <li>Учет временных предпочтений: Запоминает предпочтения клиентов и предлагает удобные варианты записи.</li>
            <li>Интеграция с мессенджерами: Работает через Telegram и ВКонтакте, поддерживая контакт с клиентами в привычных для них каналах.</li>
            <li>Автоматическое расписание: Легко создавать и управлять расписанием мастеров, указывая только основные предпочтения и цели.</li>
          </ul>
        </Grid>
      </Grid.Container>

      <Spacer y={3} />

      {/* Преимущества */}
      <Grid.Container gap={2} justify="center">
        <Grid xs={12} md={8}>
          <Text h2>Оптимизация расписания и рост бизнеса</Text>
          <Grid.Container gap={2}>
            <Grid xs={12} sm={4}>
              <Card shadow={false}>
                <Card.Body>
                  <Text>Увеличение доходов: Оптимизирует загрузку мастеров, уменьшая простои и повышая прибыль.</Text>
                </Card.Body>
              </Card>
            </Grid>
            <Grid xs={12} sm={4}>
              <Card shadow={false}>
                <Card.Body>
                  <Text>Простота использования: Интуитивно понятный интерфейс и быстрая настройка позволяют мгновенно начать работу.</Text>
                </Card.Body>
              </Card>
            </Grid>
            <Grid xs={12} sm={4}>
              <Card shadow={false}>
                <Card.Body>
                  <Text>Доступность: Работает в браузере как обычный сайт, установите на главный экран смартфона или компьютера.</Text>
                </Card.Body>
              </Card>
            </Grid>
          </Grid.Container>
        </Grid>
      </Grid.Container>

      <Spacer y={3} />

      {/* Функции */}
      <Grid.Container gap={2} justify="center">
        <Grid xs={12} md={8}>
          <Text h2>Функции, которые впечатляют</Text>
          <Grid.Container gap={2}>
            <Grid xs={12} sm={6} md={3}>
              <Card shadow={false}>
                <Card.Body>
                  <Text>Автоматическая запись: Сокращает время на администрирование, позволяя сосредоточиться на клиентах.</Text>
                </Card.Body>
              </Card>
            </Grid>
            <Grid xs={12} sm={6} md={3}>
              <Card shadow={false}>
                <Card.Body>
                  <Text>Курсы и абонементы: Создание курсов услуг и продажа абонементов для удержания клиентов.</Text>
                </Card.Body>
              </Card>
            </Grid>
            <Grid xs={12} sm={6} md={3}>
              <Card shadow={false}>
                <Card.Body>
                  <Text>Учет предпочтений: Запоминает временные предпочтения клиентов, предлагая наиболее удобные варианты записи.</Text>
                </Card.Body>
              </Card>
            </Grid>
            <Grid xs={12} sm={6} md={3}>
              <Card shadow={false}>
                <Card.Body>
                  <Text>Мини-приложения: Работа через Telegram и ВКонтакте, общение с клиентами там, где они проводят время.</Text>
                </Card.Body>
              </Card>
            </Grid>
          </Grid.Container>
        </Grid>
      </Grid.Container>

      <Spacer y={3} />

      {/* Отзывы */}
      <Grid.Container gap={2} justify="center">
        <Grid xs={12} md={8}>
          <Text h2>Что говорят пользователи</Text>
          <Grid.Container gap={2}>
            <Grid xs={12} sm={4}>
              <Card shadow={false}>
                <Card.Body>
                  <Text>&quot;PlanzUp упростил процесс записи клиентов. Теперь можно сосредоточиться на предоставлении лучших услуг!&quot; — Анна, мастер маникюра.</Text>
                </Card.Body>
              </Card>
            </Grid>
            <Grid xs={12} sm={4}>
              <Card shadow={false}>
                <Card.Body>
                  <Text>&quot;Клиенты довольны удобством записи через Telegram и PWA. Это действительно упрощает взаимодействие!&quot; — Ольга, владелица салона красоты.</Text>
                </Card.Body>
              </Card>
            </Grid>
            <Grid xs={12} sm={4}>
              <Card shadow={false}>
                <Card.Body>
                  <Text>&quot;С PlanzUp удалось организовать работу нескольких салонов и оптимизировать расписание мастеров.&quot; — Мария, управляющая сетью салонов.</Text>
                </Card.Body>
              </Card>
            </Grid>
          </Grid.Container>
        </Grid>
      </Grid.Container>

      <Spacer y={3} />

      {/* Интеграции */}
      <Grid.Container gap={2} justify="center">
        <Grid xs={12} md={8}>
          <Text h2>Оставайтесь на связи с клиентами — Telegram, ВКонтакте и PWA</Text>
          <Text>PlanzUp интегрируется с популярными мессенджерами, такими как Telegram и ВКонтакте, поддерживая контакт с клиентами в удобных для них каналах. Работает как PWA (Progressive Web App), поэтому PlanzUp можно пользоваться в браузере как сайтом-приложением или установить PlanzUp на главный экран смартфона или компьютера.</Text>
        </Grid>
      </Grid.Container>

      <Spacer y={3} />

      {/* CTA */}
      <Grid.Container gap={2} justify="center">
        <Grid xs={12} md={8}>
          <Text h2>Присоединяйтесь к PlanzUp и преобразуйте бизнес</Text>
          <Text>Начните использовать PlanzUp сегодня и оцените все преимущества сервиса. Зарегистрируйтесь бесплатно и создайте удобный процесс записи для клиентов.</Text>
          <Spacer y={1} />
          <Button auto shadow color="gradient">Попробуйте PlanzUp бесплатно</Button>
        </Grid>
      </Grid.Container>

      <Spacer y={3} />

      {/* Поддержка и безопасность */}
      <Grid.Container gap={2} justify="center">
        <Grid xs={12} md={8}>
          <Text h2>Данные в надежных руках</Text>
          <Text>PlanzUp обеспечивает круглосуточную поддержку и высокую защиту данных. Специалисты всегда готовы помочь с любыми вопросами и обеспечить бесперебойную работу платформы.</Text>
        </Grid>
      </Grid.Container>

      <Spacer y={3} />
    </Container>
  );
}

export default App;
