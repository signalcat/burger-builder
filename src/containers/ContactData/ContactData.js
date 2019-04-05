import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../hoc/axios.order';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            }
        },
        loading: false
    }

    submitOrderHandler = (event) => {
        event.preventDefault();
        console.log(this.props);
        this.setState({loading: true});
        
        // For firebase, the name is the node name + .json
        const order = {
            ingredients: this.props.ingredients,
            // In real app, calculate the price on the server side
            totalPrice: this.props.totalPrice,
            customer: {
                name: 'Rbc',
                address: {
                    stree: 'Teststreet 1',
                    zipcode: '11111',
                    country: 'Ger'
                },
                email: 'test@test.mail'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
            });
        console.log(this.props);
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
        console.log(formElementsArray);

        let form = (
            <form>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id} 
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig} 
                        value={formElement.config.value}></Input>
                ))}
                <Button btnType="Success" clicked={this.submitOrderHandler}>ORDER</Button>
            </form>
        );

        if (this.state.loading) {
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

export default ContactData;