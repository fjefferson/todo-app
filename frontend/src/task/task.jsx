import React, {Component} from 'react';
import Axios from 'axios';

import PageHeader from '../template/pageHeader';
import Modal from '../template/modal';
import TaskForm from './taskForm';
import TaskList from './taskList';

const URL = 'http://localhost:3003/api/task';

export default class Task extends Component {
    constructor(props){
        super(props);
        this.state = this.newInstance();

        this.handleSearch = this.handleSearch.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleDoneToggle = this.handleDoneToggle.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleRemoveConfirm = this.handleRemoveConfirm.bind(this);
        this.descriptionChange = this.descriptionChange.bind(this);

        this.refreshLists();
    }

    newInstance(){
        return {
            description: "",
            list: [],
            doneList: [],
            temp: null
        };
    }

    refreshLists(description = ''){
        let search = description ? `&description__regex=/${description}/gi` : '';
        let uri = `${URL}?sort=-createdAt${search}`;

        Axios.get(`${uri}&done=false`)
            .then(response => this.setState({...this.state, description, list: response.data, temp: null}));
        Axios.get(`${uri}&done=true`)
            .then(response => this.setState({...this.state, description, doneList: response.data, temp: null}));
    }

    descriptionChange(event){
        this.setState({...this.state, description: event.target.value});
    }

    handleSearch(event){
        this.refreshLists(this.state.description);
    }

    handleClear(){
        this.refreshLists();
    }

    handleAdd(){
        let description = this.state.description;

        if(description.length < 3){
            this.showInfo("The Description field must have 3 or more character!");
            return;
        }

        Axios.post(URL, {description})
            .then(response => this.refreshLists(''));
    }

    handleDoneToggle(item){
        Axios.put(`${URL}/${item._id}`, {
                ...item, 
                done: !item.done, 
                doneAt: item.done ? null : new Date()
            })
            .then(response => this.refreshLists(this.state.description));
    }

    handleRemove(item){
        this.setState({...this.state, temp: item});
        jQuery('#removeConfirm').modal('show');
    }

    handleRemoveConfirm(){
        Axios.delete(`${URL}/${this.state.temp._id}`)
            .then(response => this.refreshLists(this.state.description));
    }

    showInfo(text){
        jQuery('#info .modal-body').text(text);
        jQuery('#info').modal('show');
    }

    render(){
        return (
            <div>
                <Modal id="removeConfirm" title="Remove Confirmation" confirmation description="Are you sure that you want to remove this task?" handleConfirm={this.handleRemoveConfirm} />
                <Modal id="info" title="Information" />

                <PageHeader name="Task" small="Manager" />
                <TaskForm handleSearch={this.handleSearch} handleClear={this.handleClear} handleAdd={this.handleAdd} descriptionChange={this.descriptionChange} description={this.state.description} />
                
                <div className="row">
                    <TaskList title="ToDo" list={this.state.list} handleDoneToggle={this.handleDoneToggle} handleRemove={this.handleRemove} />
                    <TaskList title="Done" cols="6" list={this.state.doneList} handleDoneToggle={this.handleDoneToggle} handleRemove={this.handleRemove} />
                </div>
            </div>
        );
    }
}