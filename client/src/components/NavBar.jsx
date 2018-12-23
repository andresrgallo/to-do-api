import React, { Component } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';

class Navbar extends Component {
	componentDidMount() {
		var elems = document.querySelectorAll('.sidenav');
		var instances = M.Sidenav.init(elems);
	}

	render() {
		return (
			<React.Fragment>
				<nav>
					<div className="nav-wrapper">
						<a href="/" className="brand-logo">
							Logo
						</a>
						<a href="#" data-target="mobile-demo" className="sidenav-trigger">
							<i className="material-icons">menu</i>
						</a>
						<ul className="right hide-on-med-and-down">
							<li>
								<a href="/todo-list">Todos</a>
							</li>
							<li>
								<a href="/todo-list/add">Add a Todo</a>
							</li>
							<li>
								<a href="collapsible.html">Javascript</a>
							</li>
							<li>
								<a href="mobile.html">Mobile</a>
							</li>
						</ul>
					</div>
				</nav>

				<ul className="sidenav" id="mobile-demo">
					<li>
						<a href="sass.html">Sass</a>
					</li>
					<li>
						<a href="badges.html">Components</a>
					</li>
					<li>
						<a href="collapsible.html">Javascript</a>
					</li>
					<li>
						<a href="mobile.html">Mobile</a>
					</li>
				</ul>
			</React.Fragment>
		);
	}
}

export default Navbar;
