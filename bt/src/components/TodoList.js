import React, { useContext } from 'react'; 
import { TodoContext } from '../context/TodoContext'; 
import TodoItem from './TodoItem'; 
const TodoList = () => { 
const { todos, removeTodo } = useContext(TodoContext); 
return ( 
<ul> 
{todos.map((todo) => ( 
<TodoItem key={todo.id} todo={todo} removeTodo={removeTodo} /> 
))} 
</ul> 
); 
}; 
export default TodoList;