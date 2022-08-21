import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../UI/Button';
import Card from '../UI/Card';
import './StartForm.css';

const StartForm = ({ onSubmitUsername }) => {
  const [userInput, setUserInput] = useState('');

  const onUserInputChangeHandler = (event) => {
    setUserInput(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    onSubmitUsername(userInput);
  };
  return (
    <Card className="startForm">
      <h1>Guess The Celebrity</h1>
      <h2>Introduction</h2>
      <p>
        Do you think you are an expert in recognizing celebrities? Here is a
        small challenge for you. Guess the people by clicking the right answer.
        Please input your name to start!
      </p>
      <form>
        <label htmlFor="Username">
          Enter Your Username
          <input id="Username" type="text" value={userInput} onChange={onUserInputChangeHandler} />
        </label>

        <Button type="submit" onClick={onSubmitHandler}>Start Quiz</Button>
      </form>
    </Card>
  );
};

StartForm.propTypes = {
  onSubmitUsername: PropTypes.func.isRequired,
};

export default StartForm;
