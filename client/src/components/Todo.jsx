import React, { Component } from 'react';
import axios from 'axios';

import Schedule from '@material-ui/icons/Schedule';
import Mood from '@material-ui/icons/Mood';
import SentimentVeryDissatisfied from '@material-ui/icons/SentimentVeryDissatisfied';
import Delete from '@material-ui/icons/Delete';
import SystemUpdate from '@material-ui/icons/SystemUpdate';

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
		const style = {
			buttons: { margin: '10px', textAlign: 'center' },
			i: { padding: '5px' }
		};

		return (
			<div className="row">
				<div className="col s12 m7">
					<div className="card">
						<h1 className="card-title">Todo</h1>
						<div className="card-content">
							<p>{todo.text}</p>
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
							<a
								className="waves-effect waves-light btn-small"
								style={style.buttons}
							>
								<i className="material-icons left" style={style.i}>
									<SystemUpdate />
								</i>
								Update
							</a>
							<a
								className="waves-effect waves-light btn-small"
								style={style.buttons}
								onClick={this.handleDelete}
							>
								<i className="material-icons left" style={style.i}>
									<Delete />
								</i>
								Delete
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Todo;
