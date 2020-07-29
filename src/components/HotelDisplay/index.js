import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import './styles.css';
import OfferDisplay from '../OfferDisplay';
import { useWindowDimensions } from '../../useWindowDimensions';

const HotelDisplay = (props) => {
  const [showInfo, setShowInfo] = useState('none');
  const [minimized, setMinimized] = useState(false);
  const offers = props.offers;
  const { height, width } = useWindowDimensions();

  const HotelWrapper = styled.div`
    background-image: url(${props.originalPhoto});
    background-size: cover;
    width: 100%;
    height: ${minimized ? (width < 414 ? '160px' : '100px') : '600px'};
    background-attachment: fixed;
    position: relative;
  `;

  const HotelHeadingWrapper = styled.div`
    background-color: rgba(0, 0, 0, 0.7);
    padding: 5px 20px;
  `;

  const HotelMainHeading = styled.h1`
    color: white;
    font-size: 45px;
    font-family: 'Lobster', cursive;
    font-weight: 100;
    letter-spacing: 2px;
  `;

  const HotelSecHeading = styled.h2`
    color: rgb(132, 193, 204);
    font-size: 23px;
    font-weight: bold;
  `;

  const HotelInfoWrapper = styled.div`
    display: ${showInfo};
    position: absolute;
    right: 10px;
    width: 45%; */}
    margin-top: 15px;
    background: rgba(0, 0, 0, 0.5);
    animation: fadeIn ease 1s;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    -webkit-animation: fadeIn ease 0.45s;
    -moz-animation: fadeIn ease 0.45s;
    -o-animation: fadeIn ease 0.45s;
    -ms-animation: fadeIn ease 0.45s;
    @media only screen and (max-width: 768px) {
      text-align: center;
    }
    @media only screen and (max-width: 414px) {
      width: 60%;
    }
  `;

  const MinimizeButton = styled.div`
    position: absolute;
    right: 10px;
    top: 10px;
    padding: 1px 10px;
    background: white;
    color: rgba(35, 65, 75, 0.7);
    border-radius: 5px;
    font-weight: bold;
    font-size: 18px;
    cursor: pointer;
    transition-duration: 0.3s;
    &:hover {
      color: white;
      background: transparent;
    }
  `;

  return (
    <HotelWrapper
      onClick={(e) => setShowInfo(showInfo === 'none' ? 'block' : 'none')}
    >
      <HotelHeadingWrapper>
        <HotelMainHeading>{props.name.toLowerCase()}</HotelMainHeading>
        <HotelSecHeading>{props.locationString.toLowerCase()}</HotelSecHeading>
        <MinimizeButton
          onClick={() => (minimized ? setMinimized(false) : setMinimized(true))}
        >
          -
        </MinimizeButton>
      </HotelHeadingWrapper>
      <HotelInfoWrapper>
        <div className='hotel-info-header'>information</div>
        <div className='hotel-info-body'>
          <div className='hotel-price-display'>{props.price} per night</div>
          <div className='hotel-offers-wrapper'>
            {(width > 768
              ? offers
              : width > 414
              ? offers.slice(0, 6)
              : offers.slice(0, 3)
            ).map((offer) => (
              <OfferDisplay
                logoUrl={offer.logo}
                link={offer.link}
                key={Math.random()}
              />
            ))}
          </div>
        </div>
      </HotelInfoWrapper>
    </HotelWrapper>
  );
};

export default HotelDisplay;
