import React, { Fragment, useState, useRef, useEffect } from "react";
import { TodoList } from "./components/TodoList";
import { v4 as uuid } from 'uuid';
import './App.css'

const KEY = 'todoApp.todos'
const KEY_finished = 'todoApp.todoFinished'

export function App(){
    const [todos, setTodos] = useState([]);
    const [todosFinished, setTodoFinished] = useState([]);

    const todoTaskRef = useRef();
    const todoDescRef = useRef();

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(KEY))
        if (storedTodos)
            setTodos(storedTodos)
        const storedTodosFinished = JSON.parse(localStorage.getItem(KEY_finished))
        if (storedTodosFinished)
            setTodoFinished(storedTodosFinished)
    }, [])

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos))
    }, [todos])

    useEffect(() => {
        localStorage.setItem(KEY_finished, JSON.stringify(todosFinished))
    }, [todosFinished])

    const filterTodos = (newTodos) => {
        var _newTodos = newTodos.filter((t) => !t.completed)
        setTodos(_newTodos)

        var _newTodos_finished = newTodos.filter((t) => t.completed)
        setTodoFinished(_newTodos_finished)
    }

    const toggleTodo = (id) => {
        var newTodos = [...todos, ...todosFinished];
        var todo = newTodos.find((todo) => todo.id === id)
        todo.completed = !todo.completed

        filterTodos(newTodos)
    }

    const handleTodoAdd = () => {
        const task = todoTaskRef.current.value;
        if (task === '') return;

        const description = todoDescRef.current.value


        setTodos((prevTodos) => {
            return [...prevTodos, {id: uuid(), task, description, completed: false}]
        })

        todoTaskRef.current.value = null
        todoDescRef.current.value = null
    }

    const handleClearAll = () => {
        const newTodos = todos.filter((todo) => !todo.completed);
        const newTodosFinished = todosFinished.filter((todo) => !todo.completed);
        const _newTodos = [...newTodos, ...newTodosFinished]
        filterTodos(_newTodos)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleTodoAdd()
            todoTaskRef.current.focus()
        }
    }

    const handleCheckAll = () => {
        const newTodos = [...todos, ...todosFinished];
        newTodos.map((todo) => todo.completed = true)
        filterTodos(newTodos)
    }

    const nextInput = (e) => {
        if (e.key === 'Enter') {
            console.log('next')
            e.preventDefault();
            var form = document.querySelector('textarea').focus()
        }
    }

    return (
        <div className='todoListContainer'>
            <TodoList key='0' todos={todos} toggleTodo={toggleTodo}/>
            <div className='separator'></div>
            <TodoList key='1' todos={todosFinished} toggleTodo={toggleTodo}/>
            <div>
                <input ref={todoTaskRef} type="text" placeholder='Nueva Tarea' onKeyDown={nextInput}/>
            </div>
            <div>
                <textarea ref={todoDescRef} type="text" placeholder='Descripcion' onKeyDown={handleKeyDown}/>
            </div>
            <div className="buttonsContainer">
                <button onClick={handleTodoAdd}> add </button>
                <button onClick={handleClearAll}> delete </button>
                <button onClick={handleCheckAll}> marcar todos </button>
            </div>
            
            <div style={{marginTop: '15px'}}>Te quedan {todos.filter((todo) => !todo.completed).length} tareas por terminar</div>
        </div>
    )
}