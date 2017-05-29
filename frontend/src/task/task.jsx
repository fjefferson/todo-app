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
        this.descriptionChange = this.descriptionChange.bind(this);
    }

    newInstance(){
        return {
            description:"",
            list: []
        };
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
            .then(response => console.log(response));

        this.setState({...this.state, description: ""});
    }

    render(){
        return (
            <div>
                <PageHeader name="Task" small="Register" />
                <TaskForm handleAdd={this.handleAdd} descriptionChange={this.descriptionChange} description={this.state.description} />
                <TaskList />
            </div>
        );
    }
}