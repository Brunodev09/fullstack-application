import React, { Component } from 'react';
import Header from "./components/Header/Header";
import Admin from "./components/Admin/Admin";
import Loader from "./components/Loader/Loader";
import Form from "./components/Form/Form";

import { createBrowserHistory } from 'history';

import { ToastContainer, toast } from "react-toastify";
import { Router, Switch, Route } from "react-router-dom";
import './App.css';

import JSONFile from "./spotify-top100-2018.json";

// @TODO - Implement virtualized table to be able to render up more than 200 users on the table.
// @TODO - Take pictures of the interfaces to attach on README.
// @TODO - Document the code and Jest it.
// @TODO - Dockerize frontend.
// @TODO - Make reference screen list.


let arr = JSONFile;
arr = arr.map(k => {
	if (k.name && k.id) {
		return {
			name: k.name.toString(), 
			id: k.id,
			artist: k.artists,
			genre: k.genre,
			duration: k.duration_ms,
			dance: k.danceability
		}
	}
});

arr.sort((a, b) => {
	if (a.name < b.name) return -1;
	if (a.name > b.name) return 1;
	return 0;
})

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
			<Router history={this.history} >
				<div className="customHeader">
					<Header history={this.history} search={this.search} onClickNav={this.onClickNav} />
				</div>
				<Loader loading={false} />
				<ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />

				<Switch>
					<Route render={() => <Form arr={arr} />} exact path="/" />
					<Route render={() => <Admin arr={arr} />} exact path="/admin" />
				</Switch>
			</Router>

		);
	}
}
export default App;
