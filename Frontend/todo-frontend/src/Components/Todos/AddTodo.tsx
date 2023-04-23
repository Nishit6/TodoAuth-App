import React, { Fragment, useState } from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap'
import axios from 'axios'
import './AddTodo.css'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addTodoActions } from '../../store/Store'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/Store'
import Todo from '../../models/todo'


const AddTodo: React.FC<{ userData: Todo[] }> = (props) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const taskState = useSelector((state: RootState) => state.addState.task)
    const descriptionState = useSelector((state: RootState) => state.addState.description)
    const [statusState, setStatusState] = useState<string>('')
    const createdBy = props.userData.map((item) => { return item.email })





    // Input Handlers
    const inputTaskHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const taskValue = event.target.value
        dispatch(addTodoActions.addTask(taskValue))
    }

    const inputDescriptionHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const descValue = event.target.value
        dispatch(addTodoActions.addDescription(descValue))

    }

    const selectInputHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {


        if (event.target.value === 'pending') {
            setStatusState("pending")
        }
        if (event.target.value === 'complete') {
            setStatusState("complete")

        }
    }

    // function for sending request to add Todo

    async function addTasksToDb(task: string, desc: string, status: string, createdBy: string) {

        await axios.post('/addTodo', { task: task, description: desc, status: status, createdBy: createdBy })
            .then((response) => {
                console.log(" Add Todo Response ", response)
                toast.success("Todo added successfully!")
                navigate('/todos', { replace: true })


            })
            .catch((error) => {

                toast.error(error)
            })
    }

    // form submit Handler

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault()
        console.log(statusState, taskState, descriptionState)


        if (taskState.length === 0 || descriptionState.length === 0) {
            return
        } else {
            addTasksToDb(taskState, descriptionState, statusState, createdBy[0])
        }

    }

    return (
        <Fragment>

            <h1 className='todo-heading'>Add Todo</h1>
            <div className='add-todo-form'>

                <Form onSubmit={submitHandler}>
                    <div className='form-grp'>
                        <Form.Group className="mb-3 " controlId="formBasicEmail">
                            <Form.Label>Task</Form.Label>
                            <Form.Control onChange={inputTaskHandler} required={true} type="text" placeholder="Enter Task" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Task Description</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>Write here</InputGroup.Text>
                                <Form.Control as="textarea" onChange={inputDescriptionHandler} required={true} aria-label="With textarea" />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Set Status</Form.Label>
                            <Form.Select onChange={selectInputHandler} aria-label="Default select example">
                                <option value="select">Select</option>
                                <option value="pending">Pending</option>
                                <option value="complete">Completed</option>

                            </Form.Select>
                        </Form.Group>
                    </div>
                    <Button variant="success" className='addTodo-btn' type="submit">
                        Add
                    </Button>
                    <Link to="/"><Button variant="danger" className='addTodo-btn' type="submit">
                        Cancel
                    </Button></Link>

                </Form>
            </div>
        </Fragment>
    )
}

export default AddTodo