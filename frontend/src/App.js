import React, { Component } from 'react';
import Header from "./components/Header/Header";
import Admin from "./components/Admin/Admin";
import Submit from "./components/Submit/Submit";
import Loader from "./components/Loader/Loader";
import Form from "./components/Form/Form";

import { createBrowserHistory } from 'history';

import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {

		}

	}

	history = createBrowserHistory();

	componentWillReceiveProps(next) {

	}

	componentDidMount() {
	}


	render() {
		return (
			<BrowserRouter >
				<div className="customHeader">
					<Header history={this.history} search={this.search} onClickNav={this.onClickNav} />
				</div>
				<Loader loading={false} />	
				<ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />

				<Switch>
					<Route component={Form} exact path="/" />
					<Route component={Admin} exact path="/admin" />
				</Switch>
			</BrowserRouter>

		);
	}
}
export default App;
