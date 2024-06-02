import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useContext, useState} from "react";
import axios from "axios";
import {UserContext} from "../store";
import {jwtDecode} from "jwt-decode";

const LoginFormComponent = () => {
    const [newUser, setNewUser] = useState(new Map());
    const [error, setError] = useState(false);
    const {user, setUser} = useContext(UserContext);
    const [errorMessage, setErrorMessage] = useState("");
    const onChange = e => {
        setNewUser(new Map(newUser).set(e.target.name, e.target.value));
    }

    const onSubmit = (e) => {
        if (e.target.checkValidity()) {
            e.preventDefault();
            axios.post('http://127.0.0.1:3000/users/login', {
                email: newUser.get("email"),
                password: newUser.get("password"),
            }).then((response) => {
                const token = response.data.token;
                const payload = jwtDecode(token);
                setUser({userId: payload.userId, token: token});
            }).catch((err) => {
                setErrorMessage(err.response.data)
                setError(true)
            });
        }

    }


    return (
        <>
            {!user.userId &&
                <Form className="credentials-form" onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" onChange={onChange} required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" onChange={onChange}
                                      required/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>}
            {user.userId && <div className="welcome-message">
                <p>
                    Welcome to the blog! start blogging!
                </p>
            </div>

            }
            {error && <p style={{color:"red", marginTop:"1%", marginLeft:"20%"}}>Unable to log you in: {errorMessage}</p>}
        </>
    )
}

export default LoginFormComponent;