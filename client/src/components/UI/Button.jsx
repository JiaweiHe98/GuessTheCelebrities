import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

export default function Button({ type, onClick, children }) {
  return (
    <button
      className="button"
      type={type === 'submit' ? 'submit' : 'button'}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.oneOf(['submit', 'button']),
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  type: 'button',
  onClick: PropTypes.any,
};
