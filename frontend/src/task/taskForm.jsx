import React from 'react';
import IconButton from '../component/iconButton';

export default props => (
    <form action="#">
        <div className="form-group">
            <label htmlFor="description">Description:</label>
            <div className="input-group">
                <input type="description" className="form-control" id="description" />
                <span className="input-group-btn">
                    <IconButton style="success" icon="plus" onClick={props.handleAdd} />
                </span>
            </div>
        </div>
    </form>
);