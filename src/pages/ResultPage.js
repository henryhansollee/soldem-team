import React, { useState, useEffect, useCallback } from 'react';

// ROUTER
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

// USE
import { useWindowSize } from 'react-use'

// CONFETTI
import Confetti from 'react-confetti'

// BOOTSTRAP
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';

// SCSS
import './ResultPage.scss';

import cardImg from '../assets/images/card.jpg';
import cardImgBack from '../assets/images/back.png';

import Flippy, { FrontSide, BackSide } from 'react-flippy';

import _ from "lodash";

const ResultPage = ({ match }) => {
  // HISTORY
  const history = useHistory();

  const { width, height } = useWindowSize()

  const [ standardNums, setStandardNums ] = useState('');
  const [ shuffledNums, setShuffledNums ] = useState('');
  
  const [ nums, setNums ] = useState('');
  const [ loading ] = useState(false);

  const initialSetting = useCallback(async () => {
    const standard = [];
    for (var i = 1; i <= match.params.teamNums; i++) {
      standard.push(i)
    }
    setStandardNums(standard);
  }, [match.params.teamNums])

  const memoryNums = useCallback(async () => {
    const temp = [];
    for (var i = 1; i <= match.params.teamNums; i++) {
      temp.push(i)
      setNums(temp);
    }
  }, [match.params.teamNums])
  
  useEffect(() => {
    initialSetting();
    memoryNums();
  }, [initialSetting, memoryNums]);



  const shuffling = () => {
    if (!shuffledNums) {
      const resultArray = _.shuffle(standardNums);
      setShuffledNums(resultArray)
    } else {
      history.push(`/result/${match.params.teamNums}`)
    }
  }

  const initShuffledNums = () => {
    setShuffledNums('')
    history.push(`/result/${match.params.teamNums}`)
  }

  if (loading) {
    return <h1>대기 중...</h1>;
  };
  if (!nums) {
    return (
      <div>
        <h1>하하</h1>
      </div>
    );
  };
  if (!shuffledNums) {
    return (
      <div className="section result-page">
        <div className="d-flex flex-column align-items-center">
          <h2 className="result-title">총 {match.params.teamNums}팀</h2>
          <div className="d-flex">
          {!shuffledNums &&
            <Button onClick={shuffling} className="result-button mr-1" variant="dark">섞어버려</Button>
          }
          <Link className="btn btn-light result-button" to="/">처음으로</Link>
          </div>

        </div>
      </div>
    );
  };

  return (
    <div className="section card-page">
      <div className="d-flex flex-column align-items-center">
        <h2 className="result-title">총 {match.params.teamNums}팀</h2>
        <div className="d-flex">
          {nums.map(num => 
            <div>
              <h3 className="ml-4 mr-5 result-standard">순서 {num}</h3>
            </div>
          )}
        </div>
        <div className="d-flex">
          {shuffledNums.map(snum => 
            <div>
              <div className="m-2">
              <Flippy
                flipOnHover={false}
                flipOnClick={true} 
                flipDirection="horizontal" 
                style={{ width: '100px', height: '150px' }}
              >
              <FrontSide
                className="m-0 p-0"
              >
                <img className="card-img m-0 p-0" src={cardImg} alt="card"/>
              </FrontSide>
              <BackSide
                className="result-order text-center"
                style={{ backgroundColor: '#FFFFF2'}}>
                  <img className="back-img mb-3" src={cardImgBack} alt="back" />
                {snum} 팀
              </BackSide>
            </Flippy>
              </div>
            </div>
          )}
        </div>
        <div className="d-flex">
          {shuffledNums &&
            <div className="mt-3">
              <Button onClick={initShuffledNums} className="result-button mr-1" variant="dark">다시하기</Button>
              <Confetti
                width={width}
                height={height}
              />
            </div>
          }
          <Link className="btn btn-light result-button mt-3" to="/">처음으로</Link>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;