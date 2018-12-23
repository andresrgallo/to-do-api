import React, { Component } from 'react';

const asyncComponent = getComponent => {
	class AsyncComponent extends Component {
		state = { Component: null };

		componentWillMount() {
			if (!this.state.Component) {
				getComponent().then(Component => {
					this.setState({ Component });
				});
			}
		}
		render() {
			const { Component } = this.state;
			if (Component) {
				return <Component {...this.props} />;
			}
			return null;
		}
	}
	return AsyncComponent;
};

export default asyncComponent;
