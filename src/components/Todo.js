import React from 'react';
import { Form,Alert } from 'react-bootstrap';

export default function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id)
  }
  
  return (
         <Form>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Alert  variant={todo.complete?'success':'danger'}>
                        <Form.Check type="checkbox" checked={todo.complete} onChange={handleTodoClick} label= {todo.name} />
                        </Alert>
               
            </Form.Group>
        </Form>
  )
}