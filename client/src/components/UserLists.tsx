import React from 'react'
import TodoForm from './TodoForm'
import {individualListInterface, TodoFormInterface, TodoIndividualItemInterface} from './../interfaces'
//Change type of props
//Create an interface which accepts a list of TodoLists
    //onclick function - to display the userlist, default display none

    //issue -- set todos state for every individual list
const UserList = (props: individualListInterface) => {

    let [todos, setTodos] = React.useState<TodoIndividualItemInterface[]>([]);
    
//create another handletodocreate with values of todos
    function handleTodoCreate(todo: TodoIndividualItemInterface, subtasks? : any) {
        const newTodoState: TodoIndividualItemInterface[] = [...subtasks];
        newTodoState.push(todo);
        console.log(newTodoState);
        setTodos(newTodoState);
    }

    function handleTodoComplete() {

    }

    function handleTodoDelete() {

    }

    function handleTodoUpdate() {

    }

    function handleTitleSet() {

    }

    return(
            <ul className="unordered-list-items">
                {props.listNames.map((list: TodoFormInterface) => (
                    <li key={list.id} className="ind-list">
                        <TodoForm
                            id={list.id}
                            title={list.title}
                            todos={list.todos}
                            createTask={todos}
                            handleTodoCreate={handleTodoCreate}
                            handleTodoComplete={props.handleTodoComplete}
                            handleTodoDelete={props.handleTodoDelete}
                            handleTodoUpdate={props.handleTodoUpdate}
                            handleTitleSet={props.handleTitleSet}
                        />
                    </li>
                )
            )}
            </ul>
    )
}

export default UserList;