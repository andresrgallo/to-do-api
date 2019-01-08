import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Schedule from '@material-ui/icons/Schedule';
import Mood from '@material-ui/icons/Mood';
import SentimentVeryDissatisfied from '@material-ui/icons/SentimentVeryDissatisfied';
import Delete from '@material-ui/icons/Delete';
import SystemUpdate from '@material-ui/icons/SystemUpdate';

const H1 = styled.h1`
	text-align: center
	padding: 20px
`;

const P = styled.p`
	text-transform: capitalize;
`;

const MaterialIcon = styled.i`
	padding: 5px;
`;
const Button = styled.a`
	margin: 10px
	textAlign: center
`;

class Todo extends Component {
	constructor(props) {
		super(props);
		this.state = { todo: [] };
	}

	handleDelete = () => {
		console.log(this.state);
		axios
			.delete(`/todos/${this.state.todo._id}`)
			.then(todo => console.log(todo))
			.catch(e => console.log(e));
		this.props.history.push('/todo-list');
	};

	componentDidMount() {
		const { id } = this.props.match.params;
		axios.get(`/todos/${id}`).then(res => {
			const { todo } = res.data;
			this.setState({ todo });
		});
	}

	render() {
		const { todo } = this.state;

		return (
			<div className="row">
				<div className="col s12 m7">
					<div className="card">
						<H1 className="card-title">Todo</H1>
						<div className="card-content">
							<P>{todo.text}</P>
						</div>
						<div className="card-action">
							<span>
								Completed?{' '}
								{todo.completed ? <Mood /> : <SentimentVeryDissatisfied />}
							</span>
						</div>
						<div className="card-action">
							<span>
								Scheduled...{' '}
								{todo.completedAt ? todo.completedAt : <Schedule />}
							</span>
							<Button className="waves-effect waves-light btn-small">
								<MaterialIcon className="material-icons left">
									<SystemUpdate />
								</MaterialIcon>
								Update
							</Button>
							<Button
								className="waves-effect waves-light btn-small"
								onClick={this.handleDelete}
							>
								<MaterialIcon className="material-icons left">
									<Delete />
								</MaterialIcon>
								Delete
							</Button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Todo;
