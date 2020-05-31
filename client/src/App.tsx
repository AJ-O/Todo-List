import React from 'react';
//import logo from './logo.svg';
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

  const [todos, setTodos] = React.useState<TodoIndividualItemInterface[]>([]);
  const [title, setTitle] = React.useState("");
  const [lists, setLists] = React.useState<TodoFormInterface[]>([]);
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
    const newTodoState: TodoIndividualItemInterface[] = [...todos];
    newTodoState.push(todo);
    setTodos(newTodoState);
  }

  function handleTodoUpdate(event: React.ChangeEvent<HTMLInputElement>, id: string) {
    const newTodoState: TodoIndividualItemInterface[] = [...todos]
    newTodoState.find((todo: TodoIndividualItemInterface) => todo.id === id)!.task = event.target.value;
    setTodos(newTodoState)
  }

  function handleTodoDelete() {
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
  
      const data = await fetch(`/getLists/:${userEmail}`, getOptions);
      const res = await data.json();
      if(res.status === "success") {
        //Display all the lists -- with title
        console.log(res.data);
        let data = res.data;
        let userLists = data[0].TodoLists;
        console.log(userLists); //convert object to array
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

  async function addListToDatabase() {
    //Add the list to the database, alert the user and show the lists
    //Add title and id before adding to the database and the userid or email

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

    const response = await fetch("/createList", options);
    const json = await response.json();

    console.log(json);

    let ele = document.getElementById("displayForm");
    if(ele) {
      setTodos([]);
      ele.style.display = "none";
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

      <div className="user-lists">
        <UserLists
          useremail={user}
          listNames={lists}
          handleTodoCreate={handleTodoCreate}
          handleTodoComplete={handleTodoComplete}
          handleTodoDelete={handleTodoDelete}
          handleTodoUpdate={handleTodoUpdate}
          handleTitleSet={handleTitleSet}
        />
      </div>
      
      <div id="displayForm">
          <TodoForm
            title={title}
            id={shortid.generate()}
            todos={todos}
            createTask={todos}
            handleTodoCreate={handleTodoCreate}
            handleTodoComplete={handleTodoComplete}
            handleTodoDelete={handleTodoDelete}
            handleTodoUpdate={handleTodoUpdate}
            handleTitleSet={handleTitleSet}
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