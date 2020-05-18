import React from 'react';
//import logo from './logo.svg';
import './App.css';
import './styles/style.css'
import {render} from 'react-dom'
import shortid from 'shortid'

import TodoForm from './components/TodoForm'
import {TodoIndividualItemInterface, TodoItemsInterface} from './interfaces'
import TodoList from './components/TodoList';

const App = () => {

  const [testTodos, setTodos] = React.useState<TodoIndividualItemInterface[]>([]);
  const [title, setTitle] = React.useState("");
  const [list, setLists] = React.useState<TodoIndividualItemInterface[]>([]);

  React.useEffect( () =>  {
    const options = {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    }
    fetch("/getLists", options).then(
      response => response.json()
    ).then((json) => {
      console.log(json);
    })
}, [])

  function showForm(){
    let ele = document.getElementById("displayForm");
    if(ele) {
      ele.style.display = "block";
    }
    console.log("called!");
  }

  function handleTodoCreate(todo: TodoIndividualItemInterface) {
    console.log("create called!");
    const newTodoState: TodoIndividualItemInterface[] = [...testTodos];
    newTodoState.push(todo);
    setTodos(newTodoState);
  }

  function handleTodoUpdate() {
    
  }

  function handleTodoDelete() {

  }

  function handleTodoComplete() {

  }

  async function addListToDatabase() {
    //Add the list to the database, alert the user and show the lists
    const options = {
      method: "POST",
      headers: {
        "Content-type" : "application/json"
      },
      body: JSON.stringify(testTodos)
    };

    const response = await fetch("/createList", options);
    const json = await response.json();

    let ele = document.getElementById("displayForm");
    if(ele) {
      setTodos([]);
      ele.style.display = "none";
    }
  }

  return (
    <div>
      {/* <TodoList
        todos={list}
        handleTodoComplete={handleTodoComplete}
        handleTodoDelete={handleTodoDelete}
        handleTodoUpdate={handleTodoUpdate}
      /> */}

      <button 
        className="compose-btn"
        onClick={showForm}>Create List</button>
      <div id="displayForm">
          <TodoForm
              title={title}
              id={shortid.generate()}
              subtasks={testTodos}
              createTask={testTodos}
              handleTodoCreate={handleTodoCreate}
              handleTodoComplete={handleTodoComplete}
              handleTodoDelete={handleTodoDelete}
              handleTodoUpdate={handleTodoUpdate}
          />
          <button onClick={addListToDatabase}>Finalize List</button>
      </div>
    </div>
    
  );
}

export default App;
const rootElement = document.getElementById('root');
//const formEle = document.getElementById('formDisplay')
render(<App />, rootElement);