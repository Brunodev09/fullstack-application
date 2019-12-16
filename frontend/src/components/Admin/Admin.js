import React, { Component } from 'react';
import Table from "../Table/Table";
import VirtualTable from "../VirtualTable/VirtualTable";
import { httpAdmin as http } from "../../utils/Http";
import Sleep from "../../utils/Sleep";
import { toast } from "react-toastify";

/**
 * This component is responsible for consuming the Admin service and displaying it to the use in custom Tables.  
 */
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
		this.props.setLoading(true);
		await Sleep.run(2000);
		this.props.setLoading(false);
		let req;
		try {
			req = await http.get("/admin");
			if (req) {
				this.setState({rows: req.top5, users: req.userList});
			}
            else toast.error(req.statusText);
		} catch(e) {
			if (e && e.statusText && e.statusText === "Conflict") return toast.warning("No users to display.");
			toast.error(e.message || e.statusText || e);
		}
	}


	render() {
		return (
			<div>
				<Table rows={this.state.rows} arr={this.props.arr} />
				<VirtualTable rows={this.state.users} />
			</div>
		);
	}
}
export default Admin;
