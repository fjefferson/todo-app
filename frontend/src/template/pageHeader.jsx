import React from 'react';
import Menu from './menu';

export default props => (
    <header className="page-header">
        <h2>{props.name} <small>{props.small}</small></h2>
    </header>
);