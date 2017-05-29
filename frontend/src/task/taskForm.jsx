import React from 'react';
import IconButton from '../component/iconButton';

export default props => (
    <form action="#">
        <div className="form-group">
            <label htmlFor="description">Description:</label>
            <div className="input-group">
                <input type="text" id="description" name="description" placeholder="Task Description..." className="form-control" value={props.description} onChange={props.descriptionChange} />
                <span className="input-group-btn">
                    <IconButton style="success" icon="plus" onClick={props.handleAdd} />
                </span>
            </div>
        </div>
    </form>
);