import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios.order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from "react-redux";
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                valid: true,
                validation: {},
                touched: false
            }
        },
        formIsValid: false,
    }

    submitOrderHandler = (event) => {
        event.preventDefault();
        
        // Copy the form value from state into a new object 
        const formData = {};
        for (let formElementId in this.state.orderForm) {
            formData[formElementId] = this.state.orderForm[formElementId].value;
        }
        // For firebase, the name is the node name + .json
        const order = {
            ingredients: this.props.ings,
            // In real app, calculate the price on the server side
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }
        
        this.props.onOrderBurger(order, this.props.token);
    }

    inputChangedHandler = (event, inputId) => {

        // Update each field in the form 
        const updatedFormElement = updateObject(this.state.orderForm[inputId], {
            // Update a specific value based on user input
            value: event.target.value,
            // Custom form validation check  
            valid: checkValidity(event.target.value, this.state.orderForm[inputId].validation),
            touched: true
        });
        
        // Update the entire form  
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputId]: updatedFormElement
        });
    
        // Check if every field is valid 
        let formIsValid = true;
        for (let inputId in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputId].valid && formIsValid;
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render () {
        // Create an array to hold form elements configs to loop through 
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id} 
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig} 
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}></Input>
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.submitOrderHandler}>ORDER</Button>
            </form>
        );

        if (this.props.loading) {
            form=<Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));