import React from 'react';
import { Carousel } from 'antd';

const CarouselImages = ({ images }) => (
  <Carousel autoplay>
    {images.map((image, index) => (
      <div key={index}>
        <img src={image} alt={`carousel-${index}`} style={{ width: '100%' }} />
      </div>
    ))}
  </Carousel>
);

export default CarouselImages;