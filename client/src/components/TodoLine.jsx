import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';

class TodoLine extends Component {
	render() {
		const { todos } = this.props;
		console.log(todos);
		const list = this.props.todos.map((todo, index) => (
			<tr key={index}>
				<td>
					<Link to={`/todo-list/${todo._id}`}>{todo.text}</Link>
				</td>
				<td>{todo.completed ? <ThumbUp /> : <ThumbDown />}</td>
			</tr>
		));

		return <React.Fragment>{list}</React.Fragment>;
	}
}

export default TodoLine;
