import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import Button from './Button';
import './Portal.css';

export default function Portal({
  title, message, onClickButton, buttonContent,
}) {
  return (
    <div>
      <div className="backdrop" />
      <Card className="portal">
        <header className="header">
          <h2>{title}</h2>
        </header>
        <div className="messageContent">
          <p>{message}</p>
        </div>
        <footer className="footer">
          <Button onClick={onClickButton}>{buttonContent}</Button>
        </footer>
      </Card>
    </div>
  );
}

Portal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClickButton: PropTypes.func.isRequired,
  buttonContent: PropTypes.node.isRequired,
};
