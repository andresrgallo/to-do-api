import React, { Component } from 'react';
import { shallow, mount, render } from 'enzyme';
import ReactDOM from 'react-dom';
import NavBar from '../NavBar';
import { create } from 'react-test-renderer';

describe('NavBar component', () => {
	const wrapper = shallow(<NavBar />);
	it('Renders without crashing the NavBar component', () => {
		const reactFragment = document.createElement('React.Fragment');
		ReactDOM.render(<NavBar />, reactFragment);
	});
	it('Renders a logo element', () => {
		//console.log(wrapper.debug());
		expect(wrapper.contains('Logo')).toBe(true);
	});
	it('Renders 10 anchor tags, including the burger menu', () => {
		expect(wrapper.find('a').length).toBe(10);
	});
});
