import React,  { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios.order';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }

    // UI related state 
    state = {
        purchasing: false

    }

    componentDidMount () {
        this.props.onInitIngredients();
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
        if (this.props.isAuthenticated) {
            this.setState({purchasing: true});
        } else {
            this.props.history.push('/auth');
        }
        
    }

    purchaseCancelHander = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
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
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : 
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
                      ordered={this.purchaseHandler}
                      isAuth={this.props.isAuthenticated}/>
                </Aux>
            );

            orderSummary = <OrderSummary 
            ingredients={this.props.ings}
            purchaseCancelled={this.purchaseCancelHander}
            puchaseContinued={this.purchaseContinueHandler}
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
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
} 
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));