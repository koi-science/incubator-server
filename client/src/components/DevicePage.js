import React from 'react';
import axios from 'axios';


export default class DevicePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            temperatureList: []
        }
    }

	componentWillMount() {
        axios.get(`/device/${this.props.params.deviceId}`)
            .then((response) => {
                this.setState({temperatureList: response.data});
            })
            .catch((error) => {
                console.log(error);
            });
	}

	render() {

         const temperatureList = this.state.temperatureList.map((temperatureEntry, id) =>
			<li key={id}>
				Current temperature: {temperatureEntry.currentTemperature}.
				Set temperature: {temperatureEntry.setTemperature}
			</li>
         );
		console.log("temperature", this.state.temperatureList);
		return (
			<div>
                <h2>
                    Device  #{this.props.params.deviceId} Page
                </h2>
				<ul>
					{temperatureList}
				</ul>
            </div>
		);
	}
}