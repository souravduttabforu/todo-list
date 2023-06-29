//
import { useEffect, useState } from "react";

//import components
import TodoItems from "./components/TodoItems";

//import css
import "./style/app.css"
import "./style/todoitem.css"


const API = "https://jsonplaceholder.typicode.com"

function App() {
  //important states
  const [listItems, setListItems] = useState([])
  const [input, setInput] = useState('')
  const [editOngoing, setEditOngoing] = useState(false)
  const [editId, setEditId] = useState();
  //useEffect to fetch data on first mounting and after every setListItems use
  useEffect(() => {
    //fetching data from API
    const fetchData = async () => {
      try {
        const response = await fetch(`${API}/todos?userId=1`)
        const data = await response.json()
        setListItems(data)

      } catch (error) {
        console.log(error)
      }
    }
    fetchData();

  }, [setListItems])
  //taking input from input box
  const setInputValue = (event) => {
    setInput(event.target.value)
  }
  //after click on adding button it will send a PUT request to API
  //adn add the item to the listItem
  const createNewItems = (event) => {
    event.preventDefault();

    const fetchNewItems = async () => {
      const lastItem = listItems[listItems.length - 1]
      const id = lastItem.id + 1;

      fetch(`${API}/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          userId: 1,
          id: `${id}`,
          title: `${input}`,
          completed: false
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => {
          const newList = [...listItems];
          newList.unshift(json)
          setListItems(newList)
        });
    }
    fetchNewItems();
    setInput('')
  }
  //after click on the save button it will send a PATCH request
  //and edit the item on listItems
  const editItem = (event) => {
    event.preventDefault()
    if (editOngoing) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${editId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          title: input,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          let objIndex = listItems.findIndex((obj => obj.id == editId));
          listItems[objIndex].title = input
          setEditOngoing(false)
          setInput('')
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
  //click on the edit button will change th einput field to edit field
  const openEdit = (id) => {
    let itemData = listItems?.find(item => item?.id === id)
    setInput(itemData.title)
    setEditOngoing(true)
    setEditId(id)
  }
  //take the ID from listItems and send a DELETE request to API
  //delete the the item from listItems 
  const deleteListItems = (id) => {
    const fetchDelete = async () => {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
      });
    }
    const newList = [...listItems]
    let i;
    newList.forEach((item, index) => {
      if (item.id == id) {
        newList.splice(index, 1)
      }
    })
    setListItems(newList)
    fetchDelete()
  }

  return <div className="app">
    <div className="todo">
      {/* inputfield to take input from user */}
      <form className="input">
        <input type="text" className="i_container" value={input} onChange={setInputValue} id='inputText' />
        {!editOngoing ? <button className="i_btn" onClick={createNewItems}>Add</button> : <button className="i_btn" onClick={editItem}>Save</button>}
      </form>
      {/* itrate through listrItems and create the list of todos */}
      <div className="display">
        {
          listItems.map((item, i) =>
            <TodoItems
              key={i}
              id={item.id}
              title={item.title}
              status={item.completed}
              deleteListItems={deleteListItems}
              openEdit={openEdit} />
          )
        }
      </div>
    </div>
  </div>;
}

export default App;
