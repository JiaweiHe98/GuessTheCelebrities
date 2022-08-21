import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../UI/Button';
import Card from '../UI/Card';
import Portal from '../UI/Portal';
import './Task.css';

const Task = ({
  currentUsername, currentBestScore, taskList, onUpdateScore, onQuit,
}) => {
  const [taskNumber, setTaskNumber] = useState(0);
  // the answer number that is correct. NOT ACCURACY!
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [selections, setSelections] = useState([]);
  const [popUp, setPopup] = useState(false);
  const [portalContent, setPortalContent] = useState('');

  // shuffle the options
  useEffect(() => {
    const options = [
      taskList[taskNumber].ans,
      taskList[taskNumber].wrongAns1,
      taskList[taskNumber].wrongAns2,
      taskList[taskNumber].wrongAns3,
    ];

    for (let i = options.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = options[i];
      options[i] = options[j];
      options[j] = temp;
    }
    setSelections(options);
  }, [taskNumber, taskList]);

  const onClickHandler = (event) => {
    if (event.target.innerHTML === taskList[taskNumber].ans) {
      setCorrectAnswer(() => correctAnswer + 1);
      setPopup(true);
      setPortalContent('Great! Your answer is correct!');
      // need to tell the app to update the score
      onUpdateScore(correctAnswer + 1);
    } else {
      setPopup(true);
      setPortalContent('Oops.. You did not get the correct answer!');
    }
  };

  const onNextTaskHandler = () => {
    setPopup(false);
    if (taskNumber < 9) {
      setTaskNumber((quizNumber) => quizNumber + 1);
    } else {
      onQuit();
    }
  };

  return (
    <>
      {popUp && (
        <Portal
          title="Message"
          message={portalContent}
          onClickButton={onNextTaskHandler}
          buttonContent="Next Question"
        />
      )}
      <Card className="task">
        <div>
          <h2>
            <span>
              {' '}
              Question
              {' '}
              {taskNumber + 1}
              {' '}
              / 10,
              {' '}
            </span>
            <span>
              {' '}
              Player:
              {' '}
              {currentUsername}
              , Score:
              {' '}
              {correctAnswer}
              , Best Score:
              {' '}
              {currentBestScore}
            </span>
          </h2>
          <div className="taskContent">
            <img
              src={`${taskList[taskNumber].id}.jpg`}
              alt={`Celebrity With id ${taskList[taskNumber].id}`}
            />
          </div>
          <div className="taskSelections">
            {selections.map((selection) => (
              <Button key={selection} onClick={onClickHandler}>
                {selection}
              </Button>
            ))}
          </div>
        </div>
      </Card>
    </>
  );
};

const taskShape = {
  ans: PropTypes.string,
  id: PropTypes.number,
  wrongAns1: PropTypes.string,
  wrongAns2: PropTypes.string,
  wrongAns3: PropTypes.string,
};

Task.propTypes = {
  currentUsername: PropTypes.string.isRequired,
  currentBestScore: PropTypes.number.isRequired,
  taskList: PropTypes.arrayOf(PropTypes.shape(taskShape)).isRequired,
  onUpdateScore: PropTypes.func.isRequired,
  onQuit: PropTypes.func.isRequired,
};

export default Task;
