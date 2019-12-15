import React, { Component } from 'react';
import Table from "../Table/Table";
import { httpAdmin as http } from "../../utils/Http";
import { toast } from "react-toastify";


class Admin extends Component {

	constructor(props) {
		super(props);
		this.state = {
			// cols: ['Tracks', 'Artist', 'Duration'],
			rows: [],
			users: []
		}

	}

	componentWillReceiveProps(next) {

	}

	async componentDidMount() {
		try {
			let req = await http.get("/admin");
			if (req) {
				this.setState({rows: req.top5, users: req.userList});
			}
            else toast.error(req.statusText);
		} catch(e) {
			console.error(e);
			toast.error(e.message || e.statusText || e);
		}
	}


	render() {
		return (
			<div><Table rows2={this.state.users} rows={this.state.rows} arr={this.props.arr} /></div>
		);
	}
}
export default Admin;
