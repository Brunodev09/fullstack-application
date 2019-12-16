import React, { Component } from 'react';
import Header from "./components/Header/Header";
import Admin from "./components/Admin/Admin";
import Loader from "./components/Loader/Loader";
import Form from "./components/Form/Form";
import Reference from "./components/Reference/Reference";

import { createBrowserHistory } from 'history';

import { ToastContainer, toast } from "react-toastify";
import { Router, Switch, Route } from "react-router-dom";
import './App.css';

import JSONFile from "./spotify-top100-2018.json";
import SongParser from "./utils/SongParser";

const arr = (new SongParser(JSONFile)).parsed;

/**
 * Entry point of the frontend application and responsible for instantiating all React components, 
 * including Router and history. Also where I read, parse and sort the JSON file to distribute to the responsible components.
 * 
 * In structure, I tried to use Class-Based-Components for Components that I felt the need of easy-consistency of class context
 * or the reference of the "window". Style-based rendering from MaterialUI were not converted to CBC, instead they remained as
 * Functional-Components since their logic was very simples and could be easily solved with React Hooks.
 */
class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: false
		}

	}

	history = createBrowserHistory();

	componentDidMount() {
	}

	setLoading = (bool) => {
		this.setState({"loading": bool});
	} 

	render() {
		return (
			<Router history={this.history} >
				<div className="customHeader">
					<Header history={this.history} search={this.search} onClickNav={this.onClickNav} />
				</div>
				<Loader loading={this.state.loading} />
				<ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
				<Switch>
					<Route render={() => <Form setLoading={this.setLoading} arr={arr} />} exact path="/" />
					<Route render={() => <Admin setLoading={this.setLoading} arr={arr} />} exact path="/admin" />
					<Route render={() => <Reference arr={arr} />} exact path="/references" />
				</Switch>
			</Router>

		);
	}
}
export default App;
