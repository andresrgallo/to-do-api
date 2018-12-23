import React, { Component } from 'react';
import { shallow, mount, render } from 'enzyme';
import ReactDOM from 'react-dom';
import Todo from '../Todo';

describe('Todo component', () => {
	const todo = {
		completed: false,
		completedAt: null,
		_id: '5c19e8d55ac0c37f364e7912',
		text: 'second test todo'
	};

	const wrapper = shallow(
		<Todo //required={true}
			match={{
				params: { id: '5c19e8d55ac0c37f364e7912' },
				isExact: true,
				path: '/todo-list/:id',
				url: '/todo-list/5c19e8d55ac0c37f364e7912'
			}}
		/>
	);
	wrapper.setState({ todo });
	it('Renders a  Todo title', () => {
		expect(wrapper.find('h1').text()).toBe('Todo');
	});
	it('Renders a p element with the description of the todo', () => {
		expect(wrapper.find('p').length).toBe(1);
	});
	it('Renders the todo description', () => {
		//console.log(wrapper.debug());
		expect(
			wrapper.containsMatchingElement(<p>second test todo</p>)
		).toBeTruthy();
	});
	it('Renders two buttons', () => {
		expect(wrapper.find('a').length).toBe(2);
	});
	it('Renders one delete and one update button', () => {
		const button = wrapper.find('a');
		expect(
			button
				.first()
				.text()
				.split('>')[1]
		).toBe('Update');
		expect(
			button
				.last()
				.text()
				.split('>')[1]
		).toBe('Delete');
	});
});
