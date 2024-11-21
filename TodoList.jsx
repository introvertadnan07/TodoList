import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./TodoList.css";

export default function TodoList() {
    const [todos, setTodos] = useState([{ task: "sample-task", id: uuidv4(), isDone:false },

    ]);
    const [newTodo, setNewTodo] = useState("");

    const addNewTask = () => {
        if (newTodo.trim() === "") return;
        setTodos((prevTodos) => [...prevTodos, { task: newTodo, id: uuidv4(), isDone: false }]);
        setNewTodo("");
    };

    const updateTodoValue = (event) => setNewTodo(event.target.value);

    const deleteTodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    const markAllDone = () => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => ({
                ...todo,
                isDone: true,
            }))
        );
    };

    let markAsDone = (id) => {
        setTodos((prevTodos) => 
            prevTodos.map((todo) => {
                if (todo.id == id ) {
                    return{
                        ...todo,
                        isDone: true,
                    };
                } else {
                    return todo;
                    
                }
            })
          
        );
    };



    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <input
                placeholder="Add a task"
                value={newTodo}
                onChange={updateTodoValue}
                style={{ marginRight: "10px" }}
            />
            <button onClick={addNewTask}>Add Task</button>

            <hr />

            <h4>Tasks Todo ({todos.length})</h4>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id} style={{ marginBottom: "10px" }}>
                        <span style={todo.isDone ? { textDecorationLine: "line-through "} : {} }>
                           {todo.task} 
                           </span>
                        &nbsp;&nbsp;&nbsp;
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                        <button onClick={() => markAsDone(todo.id)}>Mark As Done</button>
                    </li>
                ))}
            </ul>

            <button onClick={markAllDone}>Mark All as Done</button>
        </div>
    );
}
