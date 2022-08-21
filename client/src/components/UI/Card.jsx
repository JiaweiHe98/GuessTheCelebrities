import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

export default function Card({ className, children }) { return (<div className={`card ${className}`}>{children}</div>); }

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Card.defaultProps = {
  className: PropTypes.any,
};
