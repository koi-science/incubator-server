import React from 'react';
import axios from 'axios';
import ReactHighcharts from 'react-highcharts';


export default class DevicePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            temperatureList: []
        }
    }

	componentWillMount() {
        axios.get(`/device/${this.props.params.incubatorId}`)
            .then((response) => {
                this.setState({temperatureList: response.data});
            })
            .catch((error) => {
                console.log(error);
            });
	}

	render() {
        let  currentTemperatureList = [];
        let  setTemperatureList = [];

        this.state.temperatureList.forEach((element) => {
            currentTemperatureList.push([element.timeStamp, element.currentTemperature]);
            setTemperatureList.push([element.timeStamp, element.setTemperature]);

        });

        ReactHighcharts.Highcharts.setOptions({
            global: {
                // timezoneOffset: +1,
                useUTC: false
            }
        });

        const config = {

            title: {
                text: `Incubator # ${this.props.params.deviceId}`
            },

            subtitle: {
                text: 'Temperature Chart'
            },

            yAxis: {
                title: {
                    text: 'Temperature in Celsius'
                },
                min: 0
            },

            xAxis: {
                tickInterval: 60 * 30 * 1000, // every 30 min
                labels: {
                    format: '{value:%b %e, %H:%M:%S}'
                },
            },

            tooltip: {
                headerFormat: '<b>{point.x:%e %b, %H:%M:%S}</b><br>',
                shared: true,
                crosshairs: true

            },

            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            plotOptions: {
                spline: {
                    marker: {
                        enabled: true
                    }
                }
            },

            series: [{
                name: 'Current temperature',
                data: currentTemperatureList
            }, {
                name: 'Set temperature',
                data: setTemperatureList
            }]

        };

        const temperatureList = this.state.temperatureList.map((temperatureEntry, id) =>
			<li key={id}>
				Current temperature: {temperatureEntry.currentTemperature}.
				Set temperature: {temperatureEntry.setTemperature}
			</li>
         );
		console.log("temperature", this.state.temperatureList);
		return (
			<div>
                <ReactHighcharts config={config}/>
            </div>
		);
	}
}