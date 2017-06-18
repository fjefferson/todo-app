import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import IconButton from '../component/iconButton';
import Modal from '../component/modal';
import dateformat from 'dateformat';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { remove, doneToggle } from './actions'

class TaskList extends Component {
    constructor(props){
        super(props);

        this.temp = null;

        this.beautyDate = this.beautyDate.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleRemoveConfirm = this.handleRemoveConfirm.bind(this);
    }

    beautyDate(date){
        return date ? dateformat(date, 'dd/mm/yyyy HH:MM:ss') : null;
    }
    
    handleRemove(entity){
        let modal = ReactDOM.findDOMNode(this.refs.removeConfirmation);
        this.temp = entity;
        jQuery(modal).modal('show');
    }

    handleRemoveConfirm(){
        this.props.remove(this.temp);
        this.temp = null;
    }

    renderRows() {
        let list = this.props.list || [];

        return list.map(item => (
                <tr key={item._id} className={item.done ? 'done active' : ''}>
                    <td>{item.description}</td>
                    {this.props.showCreatedAt ?
                        <td>{this.beautyDate(item.createdAt)}</td>
                    : '' }
                    {this.props.showDoneAt ?
                        <td>{this.beautyDate(item.doneAt)}</td>
                    : '' }
                    <td className={this.props.hideActions ? 'hide' : 'action'}>
                        <center>
                            <IconButton style={item.done ? 'warning' : 'success'} icon={item.done ? 'undo' : 'check'} onClick={() => { this.props.doneToggle(item)}} />
                            <IconButton style="danger" icon="trash" onClick={() => { this.handleRemove(item)}} />
                        </center>
                    </td>
                </tr>
            )
        );
    }

    render(){
        return (
            <div className={`col-md-${this.props.cols ? this.props.cols : 12}`}>
                <Modal ref="removeConfirmation" title="Remove Confirmation" confirmation description="Are you sure that you want to remove this task?" handleConfirm={this.handleRemoveConfirm} />
                <div className="panel panel-default">
                    <div className="panel-heading">{this.props.title || 'List'}</div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                {this.props.showCreatedAt ?
                                    <th>Created At</th>
                                : '' }
                                {this.props.showDoneAt ?
                                    <th>Done At</th>
                                : '' }
                                <th className={this.props.hideActions ? 'hide' : ''}>
                                    <center>Action</center>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderRows()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };
}


const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => bindActionCreators({
    remove, doneToggle
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);