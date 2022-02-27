import React, {
    useState,
    useRef,
    useEffect
} from 'react';
import TodoList from './components/TodoList'
import uuidv4 from 'uuid/v4';
import { Button, Alert, Modal, Card, Carousel, Table, Form,Row,Col,Toast } from 'react-bootstrap';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function Home() {
    const [todos, setTodos] = useState([]);
    const [show, setShow] = useState(false);
    const [showToast, setToastShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const todoNameRef = useRef()

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (storedTodos) setTodos(storedTodos)
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }, [todos])

    function toggleTodo(id) {
        const newTodos = [...todos]
        const todo = newTodos.find(todo => todo.id === id)
        todo.complete = !todo.complete
        setTodos(newTodos)
    }

    function handleAddTodo(e) {
        const name = todoNameRef.current.value
        if (name === '') return
        setTodos(prevTodos => {
            return [...prevTodos, {
                id: uuidv4(),
                name: name,
                complete: false
            }]
        })
        todoNameRef.current.value = null;
        
    }

    function handleClearTodos() {
        const newTodos = todos.filter(todo => !todo.complete)
        setTodos(newTodos);
        setToastShow(true);
    }

    return (
        <div className='container' >
            <TodoList todos={todos} toggleTodo={toggleTodo} />
            <div className='m-3'>{todos.filter(todo => !todo.complete).length} left to do</div>

            <Button variant="primary" onClick={handleShow}>
                Add new Todo
            </Button>
            <Button variant="danger" type="submit" onClick={handleClearTodos}>
                Clear Completed Todos
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new Todos</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        {/* <Form.Label>Email address</Form.Label> */}
                        <Form.Control ref={todoNameRef} type="text" placeholder="Enter Todo" />

                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={handleAddTodo}>
                        Add
                    </Button>

                </Modal.Footer>
            </Modal>

        <Toast onClose={() => setToastShow(false)} show={showToast} delay={3000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Todo</strong>
            <small>1 second ago</small>
          </Toast.Header>
          <Toast.Body>Completed Todos are cleared</Toast.Body>
        </Toast>


        </div>


    )

}



export default Home
