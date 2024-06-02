import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState} from "react";
import axios from "axios";

function RegisterForm() {
    const [newUser, setNewUser] = useState(new Map());
    const [error, setError] = useState(false);
    const onChange = e => {
        setNewUser(new Map(newUser).set(e.target.name, e.target.value));
    }

    const onSubmit = (e) => {
        if (e.currentTarget.checkValidity()) {
            e.preventDefault();
            axios.post('http://127.0.0.1:3000/users/register', {
                firstName: newUser.get("firstName"),
                lastName: newUser.get("lastName"),
                email: newUser.get("email"),
                password: newUser.get("password"),
            }).then(() => {
                alert("Signed up! try logging in");
                window.location.reload();
            }).catch(() => setError(true));
        }
    }

    return (
        <>
            <Form className="credentials-form" onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First name" name="firstName" onChange={onChange} required/>
                    <Form.Control.Feedback type="invalid">
                        First name is requiered
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Last name" name="lastName" onChange={onChange} required/>
                    <Form.Control.Feedback type="invalid">
                        First name is requiered
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="example@example.com" name="email" onChange={onChange}
                                  required/>
                    <Form.Control.Feedback type="invalid">
                        First name is requiered
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" onChange={onChange} required/>
                    <Form.Control.Feedback type="invalid">
                        First name is requiered
                    </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            {error && <p color="red">Registration failed</p>}
        </>

    );
}

export default RegisterForm;