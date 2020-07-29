import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BrowserHistory } from 'react-router';
import Navbar from '../../components/Navbar';
import { loadResults } from '../../loadResults';
import Results from '../Results/index';
import './styles.css';

const Landing = () => {
  let history = useHistory();
  const [firstName, setFirstName] = useState('');
  const [destCity, setDestCity] = useState('');
  const [arriveDate, setArriveDate] = useState('');
  const [numberNights, setNumberNights] = useState('');
  const [questionNumber, setQuestionNumber] = useState(0);

  return (
    <>
      <Navbar navbarMaximized={true} />
      <div className='landing-wrapper'>
        <div className='landing-header-wrapper'>
          <div className='landing-small-header'>welcome to</div>
          <div className='landing-header'>my concierge</div>
        </div>
      </div>
    </>
  );
};

export default Landing;
