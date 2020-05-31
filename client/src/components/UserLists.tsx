import React from 'react'
import TodoForm from './TodoForm'
import {individualListInterface, TodoFormInterface, TodoIndividualItemInterface, TodoItemsInterface} from './../interfaces'

const UserList = (props: individualListInterface) => {

    let [todos, setTodos] = React.useState<TodoIndividualItemInterface[]>([]); 

//create another handletodocreate with values of todos
    async function handleTodoCreate(todo: TodoIndividualItemInterface, subtasks? : any, id? : String) {
        //add to the list using post then get only that list again...

        let options = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(todo)
        };

        const response = await fetch(`/addTodo/${props.useremail}/${id}`, options)
        const json = await response.json();

        if(json.code !== 200) {
            console.error(json.message);
        } else {
            const response = await fetch(`/getLists/${props.useremail}`)
            const json = await response.json();
            console.log(json);
            setTodos(json["data"][0]["TodoLists"]) //update state, either, reload or use state...
        }

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
                {props.listNames.map((list: TodoFormInterface, index: number) => (
                    <li key={list.id} className="ind-list">
                        <TodoForm
                            id={list.id}
                            title={list.title}
                            todos={list.todos} //need to give state variable, state variable need to initalised with list.todos
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