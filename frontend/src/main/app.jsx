import 'modules/bootstrap/dist/css/bootstrap.min.css';
import 'modules/font-awesome/css/font-awesome.min.css';
import '../template/custom.css';

window.jQuery = require('jquery');
import 'modules/bootstrap/dist/js/bootstrap.min.js';

import React from 'react';

import Menu from '../template/menu';
import Footer from '../template/footer';
import Routes from './routes';

export default props => (
    <div className="container">
        <Menu />
        <Routes />
        <Footer />
    </div>
);