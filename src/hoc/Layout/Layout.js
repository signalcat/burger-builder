import React , { Component } from 'react';
import Aux from '../Aux/Aux';
import styles from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer : false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            // Due to the ascynchronous nature of state, this is 
            // the good way to change the state based on old state 
            return { showSideDrawer : !prevState.showSideDrawer};
        });
    }

    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}></Toolbar>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}></SideDrawer>
                <main className={styles.Content}> 
                    {this.props.children} 
                </main>
            </Aux>
        )
    }
}

export default Layout;