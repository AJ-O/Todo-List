import React from 'react'
import TodoForm from './TodoForm'
import {individualListInterface, TodoFormInterface, TodoIndividualItemInterface} from './../interfaces'

const UserList = (props: individualListInterface) => {

    const [todos, setTodos] = React.useState<TodoIndividualItemInterface[]>([]); 
    const [todoLists, setTodoLists] = React.useState(props.lists);

    async function handleTodoCreate(todo: TodoIndividualItemInterface, listId? : String) {

        let options = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(todo)
        };

        const response = await fetch(`/addTodo/${props.useremail}/${listId}`, options)
        const json = await response.json();
        console.log(json);

        if(json.code !== 200) {
            console.log(json.err);
        } else {
            setTodoLists(json["data"]["TodoLists"]);
        }
    }

    async function handleTodoComplete(listId: string, todoId: string) {
        
        const options = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({listId: listId, todoId: todoId})
        }

        const response = await fetch(`/completeTodo/${props.useremail}`, options);
        const json = await response.json();
        console.log(json);

        if(json.code !== 200) {
            console.log(json.err);
        } else {
            setTodoLists(json["data"]["TodoLists"]);
        }
    }

    async function handleTodoDelete(listId?: String, todoId? : String) {
        let options = {
            method: "DELETE"
        }

        const response = await fetch(`/deleteTodoItem/${props.useremail}/${listId}/${todoId}`, options);
        const json = await response.json();
        console.log(json);

        if(json.code !== 200) {
            console.log(json.err);
        } else {
            setTodoLists(json["data"]["TodoLists"]);
        }
    }

    async function updateValueInDatabase(event: any, listId: string, todoId: string, type: string) {
        if(event.key === "Enter") {
            
            let data = {
                listId: listId,
                todoId: todoId,
                value: ""
            }

            let options = {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: ""
            }
            
            if(type === "task") {
                console.log(event.target.value, type);
                data["value"] = event.target.value;
                options["body"] = JSON.stringify(data);

                const response = await fetch(`/updateTask/${props.useremail}`, options);
                const json = await response.json();
                console.log(json);

                if(json.code !== 200) {
                   console.log(json.err);
                } else {
                    setTodoLists(json["data"]["TodoLists"]);
                }

            } else {
                console.log(event.target.value, type);
                data["value"] = event.target.value;
                options["body"] = JSON.stringify(data);
                const response = await fetch(`/updateTime/${props.useremail}`, options);
                const json = await response.json();
                console.log(json);

                if(json.code !== 200) {
                    console.log(json.err);
                } else {
                    setTodoLists(json["data"]["TodoLists"]);
                }
            }
        }
    }

    async function handleTitleSet(updatedTitle: string, listId?: string) {

        const data = {
            listId: listId,
            value: updatedTitle
        };
        console.log(data);

        const options = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        };

        console.log(options);
        const response = await fetch(`/updateTitle/${props.useremail}`, options);
        const json = await response.json();
        console.log(json);

        if(json.code !== 200) {
            console.log(json.err);
        } else {
            setTodoLists(json["data"]["TodoLists"]);
        }
    }

    async function deleteTodoList(listId: string) {

        const userConfirmation = window.confirm("Are you sure you want to delete the list?");

        if(userConfirmation) {
            const options = {
                method: "DELETE",
            }
    
            const response = await fetch(`/deleteTodoList/${props.useremail}/${listId}`, options);
            const json = await response.json();
            console.log(json);
    
            if(json.code !== 200) {
                console.log(json.err);
            } else {
                setTodoLists(json["data"]["TodoLists"]);
            }     
        }
    }

    return(
            <ul className="unordered-list-items">
                {todoLists.map((list: TodoFormInterface) => (
                    <li key={list.id} className="ind-list">
                        <button className="close-btn" onClick={() => deleteTodoList(list.id)}>Delete</button>
                        <TodoForm
                            id={list.id}
                            title={list.title}
                            todos={list.todos}
                            createTask={todos}
                            listType={"dbList"}
                            handleTodoCreate={handleTodoCreate}
                            handleTodoComplete={handleTodoComplete}
                            handleTodoDelete={handleTodoDelete}
                            handleTitleSet={handleTitleSet}
                            updateValueInDatabase={updateValueInDatabase}
                        />
                    </li>
                )
            )}
            </ul>
    )
}

export default UserList;