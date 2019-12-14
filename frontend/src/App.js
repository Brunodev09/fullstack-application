import React, { Component } from 'react';
import './App.css';
import Header from "./components/Header/Header";

import { ToastContainer, toast } from "react-toastify";
import { Router, Switch, Route } from "react-router-dom";

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {

		}

	}

	componentWillReceiveProps(next) {

	}

	componentDidMount() {
	}

// history={this.props.history}
	render() {
		return (
			<Router >
				<div className="customHeader">
					<Header search={this.search} user={this.state.user} onClickNav={this.onClickNav} />
				</div>
				{/* <Loader /> */}
				<ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />

				{/* <Switch>
					<Route component={Submit} exact path="/" />
					<Route component={Admin} exact path="/admin" />
				</Switch> */}
			</Router>

		);
	}
}
export default App;
