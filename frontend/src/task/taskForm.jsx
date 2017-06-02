import React from 'react';
import IconButton from '../component/iconButton';

export default props => {

    const handleKey = (e) => {
        if(e.key == 'Enter'){
            e.shiftKey ? props.handleSearch() : props.handleAdd();
        }else if(e.key == 'Escape'){
            props.handleClear();
        }
    }

    return (
        <div className="form-group">
            <label htmlFor="description">Description:</label>
            <div className="input-group">
                <input type="text" id="description" name="description" placeholder="Task Description..." className="form-control" value={props.description} onKeyUp={handleKey} onChange={props.descriptionChange} />
                <span className="input-group-btn">
                    <IconButton style="primary" icon="plus" title="Add (Enter)" onClick={props.handleAdd} />
                    <IconButton style="info" icon="search" title="Search (Shift+Enter)" onClick={props.handleSearch} />
                    <IconButton style="default" icon="eraser" title="Clear (Esc)" onClick={props.handleClear} />
                </span>
            </div>
        </div>
    );
};