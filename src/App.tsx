import React from 'react';
//import logo from './logo.svg';
import './App.css';
import './styles/style.css'
import {render} from 'react-dom'
import shortid from 'shortid'

import TodoForm from './components/TodoForm'
import {TodoIndividualItemInterface} from './interfaces'

function App() {

  const [testTodos, setTestTodos] = React.useState<TodoIndividualItemInterface[]>([])

  function handleTodoCreate(todo: TodoIndividualItemInterface) {
    console.log("create called!")
    console.log(todo)
    const newTodoState: TodoIndividualItemInterface[] = [...testTodos]
    newTodoState.push(todo)
    setTestTodos(newTodoState)
  }

  function handleTodoUpdate() {

  }

  function handleTodoDelete() {

  }

  function handleTodoComplete() {

  }

  function showForm(){
    console.log("called!")
    return(
      <div className="displayForm">
          <TodoForm
              title={"test"}
              id={shortid.generate()}
              subtasks={testTodos!}
              createTask={testTodos!}
              handleTodoCreate={handleTodoCreate}
              handleTodoComplete={handleTodoComplete}
              handleTodoDelete={handleTodoDelete}
              handleTodoUpdate={handleTodoUpdate}
          />
      </div>
    )
  }

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <button onClick={() => {render(showForm(), formEle)}}>Create List</button>
  );
}

export default App;
const rootElement = document.getElementById('root')
const formEle = document.getElementById('formDisplay')
render(<App />, rootElement)
