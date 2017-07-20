import React from 'react';
import { Link } from 'react-router';
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
            .then((response) => {
            	console.log(response.data);
                this.setState({deviceList: response.data});
            })
            .catch((error) => {
                console.log(error);
            });
    }

	render() {

		const incubatorList = this.state.deviceList.map((element, id) =>
			<li key={id}>
				<Link to="/device">Incubator id #{ element }</Link>
			</li>
		);

		return (
			<div>
				<h1>Incubator  list Page</h1>
				<ul>
					{incubatorList}
				</ul>
				{this.props.children}
			</div>
		);
	}
}