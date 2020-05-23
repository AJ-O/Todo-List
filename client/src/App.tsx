import React from 'react';
//import logo from './logo.svg';
import './App.css';
import './styles/style.css'
import {render} from 'react-dom'
import shortid from 'shortid'
import dotenv from 'dotenv'
import {GoogleLogout} from 'react-google-login'

import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList';
import UserLists from './components/UserLists'
import OAuth from './components/OAuth'

import {TodoIndividualItemInterface, TodoItemsInterface, individualListInterface, TodoFormInterface} from './interfaces'


dotenv.config()

const App = () => {

  const [testTodos, setTodos] = React.useState<TodoIndividualItemInterface[]>([]);
  const [title, setTitle] = React.useState("");
  //const [list, setLists] = React.useState<TodoIndividualItemInterface[]>([]);
  const [testList, setTestLists] = React.useState<TodoFormInterface[]>([]);
  const [user, setUser] = React.useState("")
  const clientId = process.env.REACT_APP_CLIENT_ID

//   React.useEffect(() =>  {

//     const options = {
//         method: "GET",
//         headers: {
//             "Content-type": "application/json"
//         }
//     };
    
//     const a = async () => {
//       const data = await fetch("/getLists", options);
//       const res = await data.json();
//       if(res.status === "success") {
//         //Display all the lists -- with title
//         console.log(res.data);
//         let tasks = []
//         let data = res.data;
//         //console.log(data[0].userid.TodoLists.list1);
//         let userLists = data[0].userid.TodoLists;
//         tasks = userLists.list1.todoItems;
//         console.log(tasks);
//         setTodos(tasks);
//       } else {
//         alert("Error fetching data!")
//       }
//     }
//     a();
// }, []) //2nd parameter because, whenever there is a change in the value of that array useffect will be called!

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

  async function userAuthorization(userEmail: string) {

    let obj = {
      useremail: userEmail
    };

    const postOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(obj)
    }

    const response = await fetch("/userdetails", postOptions);
    const json = await response.json()

    console.log(json);

    const getOptions = {
      method: "GET",
      headers: {
          "Content-type": "application/json"
      }
    }

    const data = await fetch(`/getLists/:${userEmail}`, getOptions);
    const res = await data.json();
    if(res.status === "success") {
      //Display all the lists -- with title
      console.log(res.data);
      let tasks = []
      let data = res.data;
      let userLists = data[0].userid.TodoLists;
      console.log(userLists);
      setTestLists(userLists);
    } else {
      alert("Error fetching data!")
    }
    setUser(json.useremail);
  }

  function logoutSuccess() {
    console.log("logged out");
  }

  async function addListToDatabase() {
    //Add the list to the database, alert the user and show the lists
    //Add title and id before adding to the database and the userid or email

    const dataObj = {
      todos: testTodos,
      title: title,
      id: shortid.generate(),
      email: user
    }

    const options = {
      method: "POST",
      headers: {
        "Content-type" : "application/json"
      },
      body: JSON.stringify(dataObj)
    };

    const response = await fetch("/createList", options);
    const json = await response.json();

    let ele = document.getElementById("displayForm");
    if(ele) {
      setTodos([]);
      ele.style.display = "none";
    }
  }

  let content = user != "" ? (
    <div>
      <button 
        className="compose-btn"
        onClick={showForm}>Create List</button>

      <GoogleLogout
        clientId={clientId ? clientId : ""}
        buttonText="Logout"
        onLogoutSuccess={logoutSuccess}
      />

      <div className="user-lists">
        <UserLists
          listNames={testList}
        />
      </div>
      
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
          <br></br>
          <button onClick={addListToDatabase}
          className="finalise-list-btn">Finalize List</button>
      </div>
    </div>
  ) : (
    <OAuth 
      authorised={userAuthorization}
      clientId={clientId}
    />
  )

  return (
    content
  );
}

export default App;
const rootElement = document.getElementById('root');
//const formEle = document.getElementById('formDisplay')
render(<App />, rootElement);