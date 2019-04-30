import React,  { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../hoc/axios.order';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions.js';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }

    state = {
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        axios.get('https://burger-builder-f8d88.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                this.setState({error: true});
            });
    }

    // Check the total number of ingredients 
    updatePurchaseState (ingredients) {
        // Create an array of ingredients amount 
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            // turn array into single number 
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        // Make a copy of the ingredients object 
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const priceAdd = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAdd;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        // Make a copy of the ingredients object 
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const priceDeductoion = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeductoion;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHander = () => {
        this.setState({purchasing: false});
    }

    puchaseContinueHandler = () => {
        // alert('You continue!');
        // Pass ingredients via query parameters
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('totalPrice=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        
        // Check if ingredients are loaded
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : 
        <Spinner></Spinner>;

        // Render ingredient related components if we have fetched them from firebase 
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}></Burger>
                    <BuildControls
                      ingredientAdded={this.props.onIngredientAdded}
                      ingredientRomoved={this.props.onIngredientRemoved}
                      disabled={disabledInfo}
                      purchasable={this.state.purchasable}
                      price={this.state.totalPrice}
                      ordered={this.purchaseHandler}/>
                </Aux>
            );

            orderSummary = <OrderSummary 
            ingredients={this.props.ings}
            purchaseCancelled={this.purchaseCancelHander}
            puchaseContinued={this.puchaseContinueHandler}
            price={this.state.totalPrice}></OrderSummary>
        }

        if (this.state.loading) {
            orderSummary = <Spinner></Spinner>
        }

        return (
          <Aux>
              <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHander}>
                  {orderSummary}
              </Modal>
              {burger}
          </Aux>    
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    };
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));