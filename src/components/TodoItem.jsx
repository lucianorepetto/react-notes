import React from 'react'

export function TodoItem({todo, toggleTodo}) {
  const {id, task,description,completed} = todo;

  const handleTodoClick = () => {
      toggleTodo(id)
  }
  return (
    <li>
      <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
        <input type='checkbox' checked={completed} onChange={handleTodoClick}/>
        <h4>{task}</h4>
      </div>
        <div style={{color: '#6e6e6e',fontSize: '12px', margin: '10px'}}>{description}</div>
    </li>
  )
}
