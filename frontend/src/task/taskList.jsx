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
                    <td><center><small>{beautyDate(item.createdAt)}</small></center></td>
                    <td><center><small>{beautyDate(item.doneAt)}</small></center></td>
                    <td className="action">
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
        <div className="panel panel-default">
            <div className="panel-heading">Task List</div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th><center>Created At</center></th>
                        <th><center>Done At</center></th>
                        <th><center>Action</center></th>
                    </tr>
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </table>
        </div>
    );
};