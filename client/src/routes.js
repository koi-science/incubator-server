import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import DeviceListPage from './components/DeviceListPage';
import DevicePage from './components/DevicePage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={DeviceListPage}/>
        <Route path="incubator/:incubatorId" component={DevicePage}/>
    </Route>
)

