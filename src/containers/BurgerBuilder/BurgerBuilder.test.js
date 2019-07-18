import React from 'react';
import { BurgerBuilder } from './BurgerBuilder';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

// Connect with enzyme
configure({ adapter: new Adapter()});

describe('<BurgerBuilder />', () => {
    let wrapper;

    beforeEach(() => {
        // Create an empty function when shallow rendering
        // to use setProps below 
        wrapper = shallow(<BurgerBuilder onInitIngredients = {() => {}} />);
    });

    it('should render <BuildControls /> when receiving ingredients', () => {
        wrapper.setProps({ings: {salad: 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});

