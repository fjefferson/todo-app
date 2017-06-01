import React, {Component} from 'react';
import Axios from 'axios';

import PageHeader from '../template/pageHeader';
import TaskForm from './taskForm';
import TaskList from './taskList';

const URL = 'http://localhost:3003/api/task';

export default class Task extends Component {
    constructor(props){
        super(props);
        this.state = this.newInstance();

        this.handleAdd = this.handleAdd.bind(this);
        this.handleDoneToggle = this.handleDoneToggle.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.descriptionChange = this.descriptionChange.bind(this);

        this.refreshList();
    }

    newInstance(){
        return {
            description:"",
            list: []
        };
    }

    refreshList(){
        Axios.get(`${URL}?sort=-createdAt`)
            .then(response => this.setState({...this.state, description: "", list: response.data}));
    }

    descriptionChange(event){
        this.setState({...this.state, description: event.target.value});
    }
    
    handleAdd(){
        let description = this.state.description;

        if(description.length < 3){
            console.log("The Description field must have 3 or more character!");
            return;
        }

        Axios.post(URL, {description})
            .then(response => this.refreshList());
    }

    handleDoneToggle(item){
        Axios.put(`${URL}/${item._id}`, {
                ...item, 
                done: !item.done, 
                doneAt: item.done ? null : new Date()
            })
            .then(response => this.refreshList());
    }

    handleRemove(item){
        Axios.delete(`${URL}/${item._id}`)
            .then(response => this.refreshList());
    }

    render(){
        return (
            <div>
                <PageHeader name="Task" small="Manager" />
                <TaskForm handleAdd={this.handleAdd} descriptionChange={this.descriptionChange} description={this.state.description} />
                <TaskList list={this.state.list} handleDoneToggle={this.handleDoneToggle} handleRemove={this.handleRemove} />
            </div>
        );
    }
}