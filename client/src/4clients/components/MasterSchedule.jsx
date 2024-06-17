import React, { useState } from 'react';
import { List, Button, Card, Modal } from 'antd';
import moment from 'moment';
import './MasterSchedule.css';

const MasterSchedule = ({ schedule }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleBookClick = (slot) => {
    setSelectedSlot(slot);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    // Логика записи на прием
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <List
        dataSource={schedule}
        renderItem={slot => (
          <List.Item>
            <Card
              className={`schedule-slot ${slot.type}`}
              title={`С ${moment(slot.start).format('HH:mm')} до ${moment(slot.end).format('HH:mm')}`}
            >
              <p>Тип: {slot.type}</p>
              {slot.type === 'available' && (
                <Button type="primary" onClick={() => handleBookClick(slot)}>Записаться</Button>
              )}
            </Card>
          </List.Item>
        )}
      />

      <Modal
        title="Запись на прием"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <p>Вы хотите записаться на {moment(selectedSlot?.start).format('HH:mm')} - {moment(selectedSlot?.end).format('HH:mm')}</p>
      </Modal>
    </div>
  );
};

export default MasterSchedule;
