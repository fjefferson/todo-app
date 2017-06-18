import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import IconButton from '../component/iconButton';
import Modal from '../component/modal';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { searchUndone, searchDone, changeEntity, add } from './actions';


class TaskForm extends Component {
    constructor(props){
        super(props);

        this.refreshLists = this.refreshLists.bind(this);
        this.handleKey = this.handleKey.bind(this);
        this.descriptionChange = this.descriptionChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    refreshLists(description = ''){
        this.props.changeEntity({...this.props.entity, description});
        this.props.searchUndone();
        this.props.searchDone();
    }

    componentWillMount(){
        this.refreshLists();
    }

    handleKey(event){
        if(event.key == 'Enter'){
            event.shiftKey ? this.handleSearch() : this.handleAdd();
        }else if(event.key == 'Escape'){
            this.handleClear();
        }
    }

    descriptionChange(event){
        this.props.changeEntity({...this.props.entity, description: event.target.value});
    }

    handleSearch(event){
        this.refreshLists(this.props.entity.description);
    }

    handleClear(){
        this.refreshLists();
    }

    handleAdd(){
        let description = this.props.entity.description;
        
        if(description.length < 3){
            this.showInfo("The Description field must have 3 or more character!");
            return;
        }
        this.props.add({ description });
    }

    showInfo(text){
        let modal = ReactDOM.findDOMNode(this.refs.info);
        jQuery(modal).modal('show')
            .find('.modal-body').text(text);
    }

    render(){
        return (
            <div className="form-group">
                <Modal ref="info" title="Information" />
                <label htmlFor="description">Description:</label>
                <div className="input-group">
                    <input type="text" id="description" name="description" 
                        placeholder="Task Description..." className="form-control"
                        value={this.props.entity.description}
                        onKeyUp={this.handleKey} 
                        onChange={this.descriptionChange} />
                    <span className="input-group-btn">
                        <IconButton style="primary" icon="plus" title="Add (Enter)" 
                            onClick={this.handleAdd} />
                        <IconButton style="info" icon="search" title="Search (Shift+Enter)" 
                            onClick={this.handleSearch} />
                        <IconButton style="default" icon="eraser" title="Clear (Esc)" 
                            onClick={this.handleClear} />
                    </span>
                </div>
            </div>
        );
    }
};


const mapStateToProps = state => ({
    entity: state.task.entity
});

const mapDispatchToProps = dispatch => bindActionCreators({
    changeEntity, searchUndone, searchDone, add
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);