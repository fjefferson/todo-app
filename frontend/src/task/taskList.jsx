import React from 'react';
import IconButton from '../component/iconButton';
import dateformat from 'dateformat';

export default props => {
    
    const beautyDate = (date) => {
        return date ? dateformat(date, 'dd/mm/yyyy hh:MM:ss') : null;
    }
    
    const renderRows = () => {
        let list = props.list || [];

        return list.map(item => (
                <tr key={item._id} className={item.done ? 'done active' : ''}>
                    <td>{item.description}</td>
                    <td className={!props.handleDoneToggle && !props.handleRemove ? 'hide' : 'action'}>
                        <center>
                            <IconButton style={item.done ? 'warning' : 'success'} icon={item.done ? 'undo' : 'check'} onClick={() => { props.handleDoneToggle(item)}} />
                            <IconButton style="danger" icon="trash" onClick={() => { props.handleRemove(item)}} />
                        </center>
                    </td>
                </tr>
            )
        );
    }

    return (
        <div className="col-md-6">
            <div className="panel panel-default">
                <div className="panel-heading">{props.title || 'List'}</div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th className={!props.handleDoneToggle && !props.handleRemove ? 'hide' : ''}><center>Action</center></th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderRows()}
                    </tbody>
                </table>
            </div>
        </div>
    );
};