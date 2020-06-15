//------FRONTEND CHANGES-------
//Work on material ui time picker

import React from 'react';
import './App.css';
import './styles/style.css'
import {render} from 'react-dom'
import shortid from 'shortid'
import dotenv from 'dotenv'
import {GoogleLogout} from 'react-google-login'

import TodoForm from './components/TodoForm'
import UserLists from './components/UserLists'
import OAuth from './components/OAuth'

import {TodoIndividualItemInterface, TodoFormInterface} from './interfaces'
dotenv.config()

const App = () => {

  const clientId = process.env.REACT_APP_CLIENT_ID

  const [title, setTitle] = React.useState("");
  const [user, setUser] = React.useState("")

  const [todos, setTodos] = React.useState<TodoIndividualItemInterface[]>([]);
  const [lists, setLists] = React.useState<TodoFormInterface[]>([]);

  function showForm(){
    let ele = document.getElementById("displayForm");
    if(ele) {
      ele.style.opacity = "1";
      let lists = document.getElementById("user-lists");
      if(lists){
        lists.style.filter = "blur(10px)";
        ele.style.zIndex = "1";
      }
    }
  }

  function handleTodoCreate(todo: TodoIndividualItemInterface) {
    console.log("create called!");
    const newTodoState: TodoIndividualItemInterface[] = [...todos];
    newTodoState.push(todo);
    setTodos(newTodoState);
  }

  function handleTodoDelete(listId: string, todoId: string) {
    const newTodoState: TodoIndividualItemInterface[] = todos.filter((todo: TodoIndividualItemInterface) => todo.id !== todoId)
    setTodos(newTodoState);
  }

  function handleTodoComplete() {
    
  }

  function handleTitleSet(newTitle: string) {
    console.log(newTitle);
    setTitle(newTitle);
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

    if (json.userExists) {

      const getOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
      }
  
      const data = await fetch(`/getLists/${userEmail}`, getOptions);
      const res = await data.json();
      if(res.status === "success") {
        let data = res.data;
        let userLists = data["TodoLists"];
        console.log(userLists);
        setLists(userLists);
      } else {
        alert("Error fetching data!")
      }
      setUser(userEmail);
    } else {
      setUser(userEmail);
    }
  }

  function logoutSuccess() {
    setUser("");
  }

  function closeForm() {
    setTodos([]);
    setTitle("");
    let formEle = document.getElementById("displayForm");
    if(formEle){
      formEle.style.opacity = "0";
    }

    let lists = document.getElementById("user-lists");
    if(lists){
      lists.style.filter = "none";
    }
  }

  async function addListToDatabase() {
    
    if(title === ""){
      alert("Title is empty, kindly enter title");
    } else if (todos.length === 0) {
      alert("Kindly add a task before creating a list");
    } else {

      const dataObj = {
        todos: todos,
        title: title,
        id: shortid.generate()
      }
  
      const options = {
        method: "POST",
        headers: {
          "Content-type" : "application/json"
        },
        body: JSON.stringify(dataObj)
      };
  
      const response = await fetch(`/createList/${user}`, options);
      const json = await response.json();
  
      if(json.code === 200) {
        let ele = document.getElementById("displayForm");
        if(ele) {
          setTodos([]);
          ele.style.opacity = "0";
          alert("List created!");
          window.location.reload();
        }
      } else {
        alert("Error occured!");
      }
      let lists = document.getElementById("user-lists");
      if(lists){
        lists.style.filter = "blur(10px)";
      }
    }
  }

  let content = user !== "" ? (
    <div>
      <button 
        className="compose-btn"
        onClick={showForm}>

        Create List

      </button>

      <div className="logout-btn">
        <GoogleLogout
          clientId={clientId ? clientId : ""}
          buttonText="Logout"
          onLogoutSuccess={logoutSuccess}
        />
      </div>

      <div id="user-lists">
        <UserLists
          useremail={user}
          lists={lists}
          handleTitleSet={handleTitleSet}
        />
      </div>
      
      <div id="create-form">
        <div id="displayForm">
            <button className="close-btn" onClick={closeForm}>X</button>
            <TodoForm
              title={title}
              id={shortid.generate()}
              todos={todos}
              createTask={todos}
              listType={"newList"}
              handleTodoCreate={handleTodoCreate}
              handleTodoComplete={handleTodoComplete}
              handleTodoDelete={handleTodoDelete}
              handleTitleSet={handleTitleSet}
            />
            <br></br>
            <button onClick={addListToDatabase}
            className="finalise-list-btn">Finalize List</button>
        </div>
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