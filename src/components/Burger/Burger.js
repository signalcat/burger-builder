import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    const transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        // Transform string value into array 
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key = {igKey + i} type={igKey} />;
        });
    });

    let ingredientsArr = [];
    // Flatten the 2-d ingredients array to 1d
    Object.keys(props.ingredients).forEach(ingredient => {
        for (let i = 0; i < props.ingredients[ingredient]; i++) {
            ingredientsArr.push(ingredient);
        }
    });

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {ingredientsArr.length === 0? 'please add some ingredients!' : 
                ingredientsArr.map((ingredient, index)  => {
                    return <BurgerIngredient key={index} type={ingredient}/>;
                })
            }
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );  
};

export default burger;