import {useContext, useState} from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {UserContext} from "../store";

function CreatePostComponent() {
    const [post, setPost] = useState(new Map());
    const {user} = useContext(UserContext);
    const [error, setError] = useState(false);
    const [done, setDone] = useState(false);
    const onChange = e => {
        setPost(new Map(post).set(e.target.name, e.target.value));
    }

    const onSubmit = (e) => {
        if (e.currentTarget.checkValidity()) {
            e.preventDefault();
            const config = {
                headers: {
                    Authorization: user.token
                }
            }
            axios.post('http://127.0.0.1:3000/posts', {
                userId: user.userId,
                title: post.get("title"),
                content: post.get("content"),
            }, config).then(() => {
                alert("post created");
            }).catch(() => setError(true));
            setDone(true);
        }
    }

    return (
        <>
            {!done &&
                <>
                    <Form className="credentials-form" onSubmit={onSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Title" name="title" onChange={onChange} required/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="TextArea" rows={8} placeholder="Content" name="content"
                                          onChange={onChange}
                                          required/>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Create Post
                        </Button>
                    </Form>
                    {error && <p color="red">Registration failed</p>}
                </>
            }
            {done &&
                <div className="welcome-message">
                    <p>your post was created check it on the wall!</p>
                </div>
            }
        </>
    );
}

export default CreatePostComponent;