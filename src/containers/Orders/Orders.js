import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../hoc/axios.order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    state = {
        orders: [],
        loading: false
    }

    componentDidMount = () => {
        axios.get('./orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        // Use ... to copy the original data and add a key field 
                        ...res.data[key],
                        id: key
                    });
                    this.setState({orders: fetchedOrders, loading: false});
                }
            })
            .catch(err => {
                this.setState({loading: false});
            })
    }

    render () {
        return (
            <div>
                <Order></Order>
                <Order></Order>
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);