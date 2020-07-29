import React from 'react';
import './styles.css';

const OfferDisplay = (props) => {
  return (
    <a className='offer-wrapper' href={props.link} target='_blank'>
      <img className='offer-logo' src={props.logoUrl} />
    </a>
  );
};

export default OfferDisplay;
