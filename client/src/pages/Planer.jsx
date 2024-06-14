import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/ru';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button, Modal, Form, Input, Select, DatePicker, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './Planer.css'; // CSS файл для кастомизации стилей

moment.locale('ru');
const localizer = momentLocalizer(moment);
const { Option } = Select;

const Planer = ({ periods, appointments, onAddPeriod, onAddAppointment }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [form] = Form.useForm();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const allEvents = [
      ...periods.map(period => ({
        title: period.name,
        start: new Date(period.start),
        end: new Date(period.end),
        type: 'period',
        status: period.status,
      })),
      ...appointments.map(appointment => ({
        title: `Запись с ${appointment.client}`,
        start: new Date(appointment.start),
        end: new Date(appointment.end),
        type: 'appointment',
        status: appointment.status,
      }))
    ];
    setEvents(allEvents);
  }, [periods, appointments]);

  const handleSelectSlot = ({ start, end }) => {
    form.setFieldsValue({ start: moment(start), end: moment(end) });
    setIsModalVisible(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    form.setFieldsValue({
      type: event.type,
      name: event.title,
      start: moment(event.start),
      end: moment(event.end),
      status: event.status,
    });
    setIsModalVisible(true);
    setIsEditing(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      const newEvent = {
        ...values,
        start: values.start.toDate(),
        end: values.end.toDate(),
      };
      if (isEditing) {
        // Handle editing logic here
        setIsEditing(false);
      } else {
        if (values.type === 'period') {
          onAddPeriod(newEvent);
        } else {
          onAddAppointment(newEvent);
        }
      }
      setIsModalVisible(false);
      form.resetFields();
    }).catch(info => {
      console.log('Validate Failed:', info);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditing(false);
    form.resetFields();
  };

  const eventStyleGetter = (event) => {
    let backgroundColor = event.type === 'period' ? '#3174ad' : '#f56a00';
    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',
      },
    };
  };

  return (
    <div className="planer">
      <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
        Добавить запись
      </Button>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventStyleGetter}
        style={{ height: 500 }}
      />
      <Modal title="Добавить запись" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="type" label="Тип записи" rules={[{ required: true, message: 'Выберите тип записи' }]}>
            <Select>
              <Option value="period">Период</Option>
              <Option value="appointment">Запись</Option>
            </Select>
          </Form.Item>
          <Form.Item name="name" label="Название" rules={[{ required: true, message: 'Введите название' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="start" label="Начало" rules={[{ required: true, message: 'Выберите время начала' }]}>
            <DatePicker showTime />
          </Form.Item>
          <Form.Item name="end" label="Конец" rules={[{ required: true, message: 'Выберите время окончания' }]}>
            <DatePicker showTime />
          </Form.Item>
          <Form.Item name="status" label="Статус" rules={[{ required: true, message: 'Выберите статус' }]}>
            <Select>
              <Option value="busy">Занят</Option>
              <Option value="available">Свободен</Option>
              <Option value="holiday">Отпуск</Option>
              <Option value="forVIP">Для VIP</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Planer;
