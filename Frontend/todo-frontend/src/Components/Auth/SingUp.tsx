import React, { Fragment, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import '../Todos/AddTodo.css'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'



const SingUp: React.FC<{}> = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const username = useSelector((state: RootState) => state.auth.username)
    // const password = useSelector((state: RootState) => state.auth.password)
    // const confirmPassword = useSelector((state: RootState) => state.auth.confirmPassword)
    // const email = useSelector((state: RootState) => state.auth.email)

    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')




    // Input Handlers
    const inputUsernameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const usernameValue = event.target.value
        setUsername(usernameValue)
        //dispatch(authActions.addUsername(usernameValue))
    }

    const inputEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const emailValue = event.target.value
        setEmail(emailValue)
        // dispatch(authActions.addUsername(emailValue))

    }

    const inputPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const passwordValue = event.target.value
        setPassword(passwordValue)
        // dispatch(authActions.addUsername(passwordValue))

    }

    const inputConfirmPassHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const confirmPassValue = event.target.value
        setConfirmPassword(confirmPassValue)
        // dispatch(authActions.addUsername(confirmPassValue))
    }



    // function for sending request to add Todo

    async function registerUser(username: string, email: string, password: string, confirmPassword: string) {

        await axios.post('/register', { username: username, email: email, password: password, confirmPassword: confirmPassword })
            .then((response) => {
                console.log(" Register User Response ", response)
                if (response.status !== 200) {
                    toast.error("Something went wrong!")
                    return
                }

                if (response.data.code === "ER_DUP_ENTRY") {
                    toast.error("Email already registered!")
                    return
                }

                if (response.data === "Passwords not match!") {
                    toast.error("Passwords not match!")
                    return
                }

                toast.success("User registered successfully!")
                navigate('/login', { replace: true })


            })
            .catch((error) => {

                toast.error(error)
            })
    }

    // form submit Handler

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault()
        console.log(username, password, email, confirmPassword)


        if (username.length === 0 || email.length === 0 || password.length === 0 || confirmPassword.length === 0) {
            return
        } else if (password.length < 6 && confirmPassword.length < 6) {
            toast.error("Password too short!")
            return
        }
        else {
            registerUser(username, email, password, confirmPassword)
        }

    }

    return (
        <Fragment>

            <h1 className='todo-heading'>SingUp</h1>
            <div className='add-todo-form'>

                <Form onSubmit={submitHandler}>
                    <div className='form-grp'>

                        <Form>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control required={true} onChange={inputUsernameHandler} type="text" placeholder="Enter username" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control required={true} onChange={inputEmailHandler} type="email" placeholder="Enter email" />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control required={true} onChange={inputPasswordHandler} type="password" placeholder="Password" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control required={true} onChange={inputConfirmPassHandler} type="password" placeholder="Confirm Password" />
                            </Form.Group>

                        </Form>
                    </div>
                    <Button variant="success" className='addTodo-btn' type="submit">
                        SingUp
                    </Button>
                    <Link to="/login"><p>already have an account?</p></Link>

                </Form>
            </div>
        </Fragment>
    )
}

export default SingUp