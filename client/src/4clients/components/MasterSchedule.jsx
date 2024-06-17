import React from 'react';
import { List, Card, Row, Col, Typography } from 'antd';
import moment from 'moment';
import 'moment/locale/ru';
import './MasterSchedule.css';

const { Title } = Typography;

const groupByWeek = (schedule) => {
  const weeks = {};
  schedule
    // .filter(period => period.type === 'available')
    .forEach(period => {
      const week = moment(period.start).startOf('isoWeek').format('YYYY-MM-DD');
      if (!weeks[week]) {
        weeks[week] = [];
      }
      weeks[week].push(period);
    });
  return weeks;
};

const MasterSchedule = ({ schedule }) => {
  const weeks = groupByWeek(schedule);

  return (
    <div className="master-schedule">
      {Object.keys(weeks).map(week => (
        <div key={week} className="week-schedule">
          <Title level={4}>Неделя: {moment(week).format('DD MMMM YYYY')}</Title>
          <Row gutter={[16, 16]}>
            {weeks[week].map(period => (
              <Col xs={24} sm={12} md={8} lg={6} key={period.UID}>
                <Card
                  className={`schedule-card ${period.type === 'available' ? 'available' : 'busy'}`}
                  title={moment(period.start).format('dddd, HH:mm')}
                >
                  <p>Длительность: {period.durationMinutes} мин.</p>
                  <p>Тип: {period.type}</p>
                  {period.available && <button className="book-button">Записаться</button>}
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </div>
  );
};

export default MasterSchedule;
