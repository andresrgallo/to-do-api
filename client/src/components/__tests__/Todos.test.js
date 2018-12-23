import React, { Component } from 'react';
import { shallow, mount, render } from 'enzyme';
import ReactDOM from 'react-dom';
import Todos from '../Todos';
import { create } from 'react-test-renderer';

describe('Todos component', () => {
	const wrapper = shallow(<Todos />);
	it('Renders without crashing the Todos component', () => {
		const div = document.createElement('div');
		ReactDOM.render(<Todos />, div);
	});
});
