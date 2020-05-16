import React from 'react';
//import logo from './logo.svg';
import './App.css';
import './styles/style.css'
import {render} from 'react-dom'
import shortid from 'shortid'

import TodoForm from './components/TodoForm'
import {TodoIndividualItemInterface} from './interfaces'

const App = () => {

  const [testTodos, setTodos] = React.useState<TodoIndividualItemInterface[]>([])
  //better way to render!

  // if(t1){
  //   render(test(), formEle)
  // }

  function showForm(){
    let ele = document.getElementById("displayForm")
    if(ele) {
      ele.style.display = "block"
    }
    console.log("called!")
  }

  // function test() {
  //   console.log("test")
  //   return(
  //     <div className="displayForm">
  //         <TodoForm
  //             title={"test"}
  //             id={shortid.generate()}
  //             subtasks={testTodos}
  //             createTask={testTodos}
  //             handleTodoCreate={handleTodoCreate}
  //             handleTodoComplete={handleTodoComplete}
  //             handleTodoDelete={handleTodoDelete}
  //             handleTodoUpdate={handleTodoUpdate}
  //         />
  //         <button onClick={() => {
  //             if(!t1) {
  //               funct2(true)
  //             } else {
  //               funct2(false)
  //             }
  //           }}>Finalise List</button>
  //     </div>
  //   )
  // }

  function handleTodoCreate(todo: TodoIndividualItemInterface) {
    console.log("create called!")
    const newTodoState: TodoIndividualItemInterface[] = [...testTodos]
    newTodoState.push(todo)
    setTodos(newTodoState)
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
    }

    const response = await fetch("/test", options);
    const json = await response.json()

    console.log(json);

    let ele = document.getElementById("displayForm")
    if(ele) {
      setTodos([])
      ele.style.display = "none"
    }
  }

  return (
    <div>
      <button onClick={showForm}>Create List</button>
      <div id="displayForm">
          <TodoForm
              title={"test"}
              id={shortid.generate()}
              subtasks={testTodos}
              createTask={testTodos}
              handleTodoCreate={handleTodoCreate}
              handleTodoComplete={handleTodoComplete}
              handleTodoDelete={handleTodoDelete}
              handleTodoUpdate={handleTodoUpdate}
          />
          <button onClick={addListToDatabase}>Finalise List</button>
      </div>
    </div>
    
  );
}

export default App;
const rootElement = document.getElementById('root')
//const formEle = document.getElementById('formDisplay')
render(<App />, rootElement)