import React from 'react';
import { Carousel, Card } from 'antd';

const testimonials = [
  { name: 'Анна, мастер маникюра', review: 'PlanzUp упростил процесс записи клиентов. Теперь можно сосредоточиться на предоставлении лучших услуг!', img: 'https://via.placeholder.com/100' },
  { name: 'Ольга, владелица салона красоты', review: 'Клиенты довольны удобством записи через Telegram и PWA. Это действительно упрощает взаимодействие!', img: 'https://via.placeholder.com/100' },
  { name: 'Мария, управляющая сетью салонов', review: 'С PlanzUp удалось организовать работу нескольких салонов и оптимизировать расписание мастеров.', img: 'https://via.placeholder.com/100' },
];

const Testimonials = () => (
  <div className="testimonials" style={{ padding: '50px 0', textAlign: 'center' }}>
    <h2>Что говорят пользователи</h2>
    <Carousel autoplay style={{ marginTop: '16px' }}>
      {testimonials.map((testimonial, index) => (
        <Card key={index} style={{ margin: '0 auto', maxWidth: '600px' }}>
          <Card.Meta
            avatar={<img src={testimonial.img} alt={testimonial.name} />}
            title={testimonial.name}
            description={testimonial.review}
          />
        </Card>
      ))}
    </Carousel>
  </div>
);

export default Testimonials;
