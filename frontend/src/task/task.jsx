import React, {Component} from 'react';
import PageHeader from '../template/pageHeader';
import TaskForm from './taskForm';
import TaskList from './taskList';
import { connect } from 'react-redux';

class Task extends Component {
    render(){
        return (
            <div>
                <PageHeader name="Task" small="Manager" />
                
                <TaskForm />

                <div className="row">
                    <TaskList title="ToDo" cols={6} list={this.props.undone} showCreatedAt={true} />
                    <TaskList title="Done" cols={6} list={this.props.done} showDoneAt={true} />
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    undone: state.task.undone,
    done: state.task.done,
});

export default connect(mapStateToProps)(Task);