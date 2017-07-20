import React from 'react';
import axios  from 'axios';


export default class DeviceListPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			deviceList: []
		}
	}


    componentWillMount() {
        axios.get('/devices')
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

	render() {

		return (
			<div><h1>Device List Page</h1></div>
		);
	}
}