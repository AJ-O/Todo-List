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

  let [t1, funct2] = React.useState(false)

  //better way to render!
  
  if(t1){
    render(test(), formEle)
  }

  // componentDidUpdate(){
  //   test()
  // }

  function test() {
    console.log("test")
    return(
      <div className="displayForm">
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
      </div>
    )
  }

  function handleTodoCreate(todo: TodoIndividualItemInterface) {
    console.log("create called!")
    console.log(testTodos)
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

  function showForm(){
    funct2(true)
    console.log("called!")
  }

  return (
    <div>
      <button onClick={showForm}>Create List</button>
    </div>
  );
}

export default App;
const rootElement = document.getElementById('root')
const formEle = document.getElementById('formDisplay')
render(<App />, rootElement)