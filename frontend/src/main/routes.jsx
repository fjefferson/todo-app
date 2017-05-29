import React from 'react';
import {HashRouter, Route, Redirect} from 'react-router-dom';

import Home from '../home/home';
import Task from '../task/task';
import About from '../about/about';

export default props => (
    <HashRouter>
        <div>
            <Route path="/home" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/task" component={Task} />
            <Redirect from="*" to="/home" />
        </div>
    </HashRouter>
);