import React, { Fragment } from "react"
import { Card, Button } from "react-bootstrap"
import Todo from "../../models/todo"
import './ViewTodos.css'
import { AiOutlineDelete } from 'react-icons/ai'
import axios from 'axios'
import { FiEdit } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"

let todoTimeDiff: string = ''

const ViewTodos: React.FC<{ todoItem: Todo[] }> = (props) => {

    const navigate = useNavigate()


    // For getting current vs todo created time difference 
    let todo_date = props.todoItem.map((item) => { return item.created_date })
    let created_todo_date = todo_date.join()
    const date1 = new Date(created_todo_date);
    const date2 = new Date();

    const msBetweenDates = date2.getTime() - date1.getTime();

    function convertMsToTime(milliseconds: number) {
        let seconds = Math.floor(milliseconds / 1000);
        let minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 60);

        seconds = seconds % 60;
        minutes = minutes % 60;

        if (seconds <= 60) {
            todoTimeDiff = ` ${seconds} seconds ago`
        }
        if (minutes > 60) {
            todoTimeDiff = `${hours} hours ago`
        } else if (hours > 24) {
            todoTimeDiff = ` ${days} days ago`
        }
        else {
            todoTimeDiff = ` ${minutes} minutes ago`
        }


    }

    convertMsToTime(msBetweenDates)


    // Sending request for deleting a todo

    async function deleteTodo(id: number) {
        await axios.delete(`/deleteTodo/${id}`)
            .then((response) => {
                console.log("Response ", response)
                navigate('/todos', { replace: true })
                toast.success("Todo deleted Successfully!")

            })
            .catch((error) => {
                console.log(error)
                toast.error(error)
            })
    }

    // Handlers 

    const deleteHandler = (id: any) => {

        deleteTodo(id)

    }

    const editTodoHandler = (id: any) => {
        const item = props.todoItem.filter((item => item.Id.toString() == id))
        console.log(item)

    }


    return (
        <Fragment>
            <h1 className="todo-heading">Todo Details</h1>
            {props.todoItem.map((item) => (
                <div className="viewTodo-container">
                    <Card className="text-center todo-card">
                        <div className="todo-titleContainer">
                            <Card.Header className="todo-task">{item.task}
                                <div className="todo-actions">
                                    <Button className='buttons me-2' onClick={() => deleteHandler(item.Id)} variant="danger"><AiOutlineDelete /></Button>
                                    <Link to={`/viewTodo/${item.Id}/edit`}><Button onClick={() => editTodoHandler(item.Id)} className='buttons me-2' variant="warning" ><FiEdit /></Button></Link>
                                </div>
                            </Card.Header>


                        </div>
                        <Card.Body>

                            <Card.Text className="todo-desc">
                                {item.description}
                            </Card.Text>


                        </Card.Body>
                        <Card.Footer className="text-muted todo-footer"> <Link to="/"><Button variant="info"> Return </Button></Link>{todoTimeDiff}</Card.Footer>
                    </Card>
                </div>
            ))}

        </Fragment>
    )
}

export default ViewTodos