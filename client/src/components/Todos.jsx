import React, { Component } from 'react';
import axios from 'axios';

import TodoLine from './TodoLine';

class Todos extends Component {
	constructor(props) {
		super(props);
		this.state = { todos: [] };
	}

	componentDidMount() {
		axios
			.get('/todos')
			.then(response => {
				console.log(response.data.todos);
				const todos = response.data.todos;
				this.setState({ todos });
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	render() {
		const todos = this.state.todos;
		console.log(todos);
		return (
			<div>
				<h1>Todos</h1>
				<table>
					<thead>
						<tr>
							<th>Todo</th>
							<th>Completed</th>
						</tr>
					</thead>

					<tbody>
						<TodoLine todos={todos} />
					</tbody>
				</table>
			</div>
		);
	}
}

export default Todos;
