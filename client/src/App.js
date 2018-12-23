import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import asyncComponent from './components/AsyncComponent.jsx';
import NotFound from './components/NotFound.jsx';

const Home = asyncComponent(() => {
	return import('./components/Home').then(module => module.default);
});
const Todos = asyncComponent(() => {
	return import('./components/Todos').then(module => module.default);
});
const Todo = asyncComponent(() => {
	return import('./components/Todo').then(module => module.default);
});
const TodoInput = asyncComponent(() => {
	return import('./components/TodoInput').then(module => module.default);
});
const NavBar = asyncComponent(() => {
	return import('./components/NavBar').then(module => module.default);
});

class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<NavBar />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/todo-list" component={Todos} />
						<Route exact path="/todo-list/add" component={TodoInput} />
						<Route exact path="/todo-list/:id" component={Todo} />
						<Route path="*" component={NotFound} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
