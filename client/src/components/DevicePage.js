import React from 'react';
import axios from 'axios';
import ReactHighcharts from 'react-highcharts';
import ReactHighstock from 'react-highcharts/ReactHighstock';
import highchartsExporting from 'highcharts-exporting';

export default class DevicePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            temperatureList: []
        }
    }

	componentWillMount() {
         highchartsExporting(ReactHighcharts.Highcharts);
         //ReactHighstock(ReactHighcharts.Highcharts);
        // console.log(this.state.temperatureList);

        axios.get(`/device/${this.props.params.incubatorId}/dayData`)
            .then((response) => {
                this.setState({temperatureList: response.data});
            })
            .catch((error) => {
                console.log(error);
            });
	}

	render() {
        console.log(this.state.temperatureList);
        let  currentTemperatureList = [];
        let  setTemperatureList = [];

        this.state.temperatureList.forEach((element) => {
            currentTemperatureList.push([element.timeStamp, element.currentTemperature]);
            setTemperatureList.push([element.timeStamp, element.setTemperature]);

        });

        ReactHighstock.Highcharts.setOptions({
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
            }],

            scrollbar: {
                enabled: false
            },

            rangeSelector: {
                selected: 1,
                allButtonsEnabled: true,
                buttons: [{
                    type: 'hour',
                    count: 1,
                    text: '1h'
                }, {
                    type: 'hour',
                    count: 2,
                    text: '2h'
                }, {
                    type: 'day',
                    count: 1,
                    text: '1d'
                }, {
                    type: 'week',
                    count: 1,
                    text: '1w'
                },  {
                    type: 'year',
                    count: 1,
                    text: '1y'
                }, {
                    type: 'all',
                    text: 'All'
                }]
            },
            navigator: {
                enabled: false
            },
            exporting: {

            }
        };


		return (
			<div>
                <ReactHighstock isPureConfig config={config}/>
            </div>
		);
	}
}