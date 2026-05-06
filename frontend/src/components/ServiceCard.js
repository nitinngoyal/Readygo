import React from 'react';
import './ServiceCard.css';

const ServiceCard = ({ title, description, price, image }) => {
  return (
    <div className="service-card">
      <img src={image} alt={`${title}`} className="service-card__image" />
      <h2 className="service-card__title">{title}</h2>
      <p className="service-card__description">{description}</p>
      <p className="service-card__price">Starting at ₹{price}</p>
      <button className="service-card__button">Book Now</button>
    </div>
  );
};

export default ServiceCard;