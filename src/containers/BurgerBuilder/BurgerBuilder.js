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



class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }

    // UI related state 
    state = {
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
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHander = () => {
        this.setState({purchasing: false});
    }

    puchaseContinueHandler = () => {
        this.props.history.push('/checkout');
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
                      purchasable={this.updatePurchaseState(this.props.ings)}
                      price={this.props.price}
                      ordered={this.purchaseHandler}/>
                </Aux>
            );

            orderSummary = <OrderSummary 
            ingredients={this.props.ings}
            purchaseCancelled={this.purchaseCancelHander}
            puchaseContinued={this.puchaseContinueHandler}
            price={this.props.price}></OrderSummary>
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
        ings: state.ingredients,
        price: state.totalPrice
    };
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));