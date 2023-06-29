import React from 'react'

//todo componenct which will render in main app
const TodoItems = (props) => {

  return (
    <div className='todo_display' id={props.id} >
      <div className="todo_title">{props.title}</div>
      <div className="todo_btn">
        {/* delete button which trigger delete listitem function */}
        <button className='todo_delete' onClick={() => props.deleteListItems(props.id)}>delete</button>
        {/* edit button which trigger openEdit function  */}
        <button className='todo_edit' onClick={() => props.openEdit(props.id)}>edit</button>
      </div>
    </div>
  )
}

export default TodoItems