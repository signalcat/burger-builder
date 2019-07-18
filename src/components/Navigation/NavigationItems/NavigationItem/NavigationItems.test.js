import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from '../NavigationItems'
import NavigationItem from './NavigationItem'

// Connect with enzyme
configure({ adapter: new Adapter()});

// Enzyme helps render only individual component 
// not the entire react app
describe('<NavigationItem />', () => {
    it('should render two <NavigationItem /> elements if not authenticated', () => {
        const wrapper = shallow(<NavigationItems />);
        // Look into wrapper, expect to find the element twice 
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
});