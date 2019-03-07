import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>{igKey}: {props.ingredients[igKey]
                }</li>)});
     return (
        <Aux>
            <h3>Your Order</h3>
            <p>A burger with the ingredients: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total Price: {props.price.toFixed(2)}</p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.puchaseContinued}>CONTINUE</Button>
        </Aux>
     );
};

export default orderSummary;