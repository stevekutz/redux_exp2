import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addTask, toggleTask} from '../actions/actionsTasks';
import './tasks.css';

// 1) 
class Tasks extends Component {
    state = {
        newTask: ''
    }

    changeHandler = ev => {
        this.setState({
            //[ev.target.name] : ev.target.value
             newTask: ev.target.value
        })
    }

    addNewTask_h = ev => {

        if(this.state.newTask !== ''){
            ev.preventDefault();
            this.props.addTask(this.state.newTask);

            this.setState({
                newTask: ''
            })
        }
    }

    toggleTask_h = id => {
        this.props.toggleTask(id);
    }

    // 3) 
    render() {

        console.log('Tasks props >> ', this.props);

        return(
            <div>    

                <div className = 'taskListContainer'>
                     <h5> Tasks </h5>   
                    {this.props.tasks.map((taskItem, index) => (
            
                            <h6 
                                className= 'tasksItems'
                                onClick = { () => this.toggleTask_h(taskItem.id)} key = {taskItem.id}
                            >
                                {taskItem.description}
                                {taskItem.completed &&     <i className="fas fa-atom" />}
                            </h6>
                        ))}
                     
                    <form>
                        <input 
                            type = 'text'
                            value = {this.state.newTask}
                            onChange = {this.changeHandler}
                            placeholder = 'add something'
                        />
                    </form> 
                    <button onClick = {this.addNewTask_h}>Add Task</button>          
                </div>
            </div>            
        );
              
    }

}





// 2) NEXT !!!!
const mapStateToProps = state => {
    return {
        //tasks: state.taskReducer.tasks   // WATCH this wiring to state
         tasks: state.tasks.tasks

    }
}

export default connect(
    mapStateToProps,
    {addTask, toggleTask}

)(Tasks);