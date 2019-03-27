import React, { Component } from 'react';
import classes from './Order.module.css';

const order = (props) => (
    <div className={classes.Order}>
        <p>Ingredients: Salad (1)</p>
        <p>Orice: <strong>USD 5.45</strong></p>
    </div>
);

export default order;