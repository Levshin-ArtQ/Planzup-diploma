import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, TimePicker, Select, Switch, List, Card, message } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
// import 'antd/dist/antd.css';

const { RangePicker } = DatePicker;
const { Option } = Select;

const SchedulePlanner = () => {
  const [form] = Form.useForm();
  const [periods, setPeriods] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [currentSchedule, setCurrentSchedule] = useState(null);

  useEffect(() => {
    // Загружаем существующие расписания из базы данных
    // Это может быть вызов к API, который возвращает данные расписания
  }, []);

  const addPeriod = (values) => {
    const newPeriod = {
      ...values,
      start: values.period[0].toDate(),
      end: values.period[1].toDate(),
      available: values.type === 'available',
    };

    // Проверка на пересекающиеся периоды
    for (let period of periods) {
      if (
        (newPeriod.start >= period.start && newPeriod.start < period.end) ||
        (newPeriod.end > period.start && newPeriod.end <= period.end)
      ) {
        message.error('Периоды не должны пересекаться!');
        return;
      }
    }

    setPeriods([...periods, newPeriod]);
    form.resetFields();
  };

  const removePeriod = (index) => {
    setPeriods(periods.filter((_, i) => i !== index));
  };

  const addAppointment = (values) => {
    const newAppointment = {
      ...values,
      start: values.appointment[0].toDate(),
      end: values.appointment[1].toDate(),
    };

    // Проверка на наличие доступного периода
    const availablePeriod = periods.find(
      (period) =>
        newAppointment.start >= period.start &&
        newAppointment.end <= period.end &&
        period.available
    );

    if (!availablePeriod) {
      message.error('Нет доступного периода для этого времени!');
      return;
    }

    setAppointments([...appointments, newAppointment]);
    form.resetFields();
  };

  const removeAppointment = (index) => {
    setAppointments(appointments.filter((_, i) => i !== index));
  };

  const handleScheduleChange = (value) => {
    setCurrentSchedule(schedules.find((schedule) => schedule.UID === value));
  };

  return (
    <div>
      <h2>Планировщик расписания</h2>
      <Form form={form} layout="vertical" onFinish={addPeriod}>
        <Form.Item
          label="Тип периода"
          name="type"
          rules={[{ required: true, message: 'Пожалуйста, выберите тип периода!' }]}
        >
          <Select>
            <Option value="available">Доступен</Option>
            <Option value="busy">Занят</Option>
            <Option value="holiday">Выходной</Option>
            <Option value="forVIP">Для VIP</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Период"
          name="period"
          rules={[{ required: true, message: 'Пожалуйста, выберите период!' }]}
        >
          <RangePicker showTime format="YYYY-MM-DD HH:mm" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
            Добавить период
          </Button>
        </Form.Item>
      </Form>

      <List
        header={<div>Периоды</div>}
        bordered
        dataSource={periods}
        renderItem={(period, index) => (
          <List.Item
            actions={[<DeleteOutlined onClick={() => removePeriod(index)} />]}
          >
            <Card title={`${period.type.charAt(0).toUpperCase() + period.type.slice(1)}`}>
              <p>Начало: {moment(period.start).format('YYYY-MM-DD HH:mm')}</p>
              <p>Конец: {moment(period.end).format('YYYY-MM-DD HH:mm')}</p>
            </Card>
          </List.Item>
        )}
      />

      <Form form={form} layout="vertical" onFinish={addAppointment}>
        <Form.Item
          label="Услуга"
          name="service"
          rules={[{ required: true, message: 'Пожалуйста, выберите услугу!' }]}
        >
          <Select>
            {/* Заполните варианты услуг из базы данных */}
            <Option value="service1">Услуга 1</Option>
            <Option value="service2">Услуга 2</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Мастер"
          name="master"
          rules={[{ required: true, message: 'Пожалуйста, выберите мастера!' }]}
        >
          <Select>
            {/* Заполните варианты мастеров из базы данных */}
            <Option value="master1">Мастер 1</Option>
            <Option value="master2">Мастер 2</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Период записи"
          name="appointment"
          rules={[{ required: true, message: 'Пожалуйста, выберите период записи!' }]}
        >
          <RangePicker showTime format="YYYY-MM-DD HH:mm" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
            Добавить запись
          </Button>
        </Form.Item>
      </Form>

      <List
        header={<div>Записи на прием</div>}
        bordered
        dataSource={appointments}
        renderItem={(appointment, index) => (
          <List.Item
            actions={[<DeleteOutlined onClick={() => removeAppointment(index)} />]}
          >
            <Card title={`Запись к ${appointment.master}`}>
              <p>Услуга: {appointment.service}</p>
              <p>Начало: {moment(appointment.start).format('YYYY-MM-DD HH:mm')}</p>
              <p>Конец: {moment(appointment.end).format('YYYY-MM-DD HH:mm')}</p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default SchedulePlanner;
