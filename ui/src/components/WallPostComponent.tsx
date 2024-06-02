import Card from 'react-bootstrap/Card';
import {FormEvent, useContext, useEffect, useState} from "react";
import {Col} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {UserContext} from "../store";
import axios from "axios";

function PostWallComponent() {
    const [posts, setPosts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [openedPost, setOpenedPost] = useState();
    const [postUser, setPostUser] = useState({});
    const {user, setUser} = useContext(UserContext);
    const [editing, setEditing] = useState(false);
    const [comments, setComments] = useState([]);
    const [newPost, setNewPost] = useState(new Map());

    const openPost = (post) => {
        fetch('http://127.0.0.1:3000/users/' + post.userId)
            .then(res => res.json())
            .then(data => setPostUser(data))
            .catch(error => console.log(error));
        setOpenedPost(post);
        fetch('http://127.0.0.1:3000/comments/' + post.id)
            .then(res => res.json())
            .then(data => setComments(data))
        setIsOpen(true);
    }
    const closePost = () => {
        setIsOpen(false);
    }
    const cancelEdit = () =>{
        console.log(isOpen);
        setEditing(false);
    }
    const editPost = () => {
        setEditing(true);
    };
    useEffect(()=>{
        fetch('http://127.0.0.1:3000/posts')
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(error => console.log(error))
    },[]);

    const onPostEditChange = (e) => setNewPost(new Map(newPost).set(e.target.name, e.target.value));

    const onPostSubmit = (e) => {
        e.preventDefault();
        let config = {
            headers: {
                Authorization: user.token
            }
        }
        axios.put('http://127.0.0.1:3000/posts/' + openedPost.id, {title: newPost.get("title"), content: newPost.get("content")}, config)
            .then((response)=>{
                fetch('http://127.0.0.1:3000/posts')
                    .then(res => res.json())
                    .then(data => setPosts(data))
                    .catch(error => console.log(error));
                fetch('http://127.0.0.1:3000/posts/' + openedPost.id)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        setOpenedPost(data)})
                    .catch(error => console.log(error));
            }).catch(error => console.log(error));
            setEditing(false);
    }
    return(
        <>
            <div className="post-wall container-fluid">
                { !isOpen && !editing &&
                    (<div className="row">
                    {!posts && <p>no blog posts yet</p>}
                    {posts.map((post, index) =>
                        <Col key={index} className="d-flex post">
                            <Card className="post-content" style={{width: '28rem'}}>
                                <Card.Body>
                                    <Card.Title>{post.title}</Card.Title>
                                    <Card.Text>
                                        {post.content.substring(0, 650)}
                                    </Card.Text>
                                </Card.Body>
                                <Button onClick={()=>openPost(post) } variant="outline-dark">View full post</Button>
                            </Card>
                        </Col>)
                    }
                </div>)
                }
            </div>
            <div>
                {isOpen && !editing && (
                    <div className="full-post">
                        <h1>{openedPost.title}</h1>
                        <p>{openedPost.content}</p>
                        <br/>
                        <p>Posted by: {postUser.name + " " + postUser.lastName}</p>
                        {user.userId && user.userId === openedPost.userId && <Button className="post-button"  variant="outline-dark" onClick={editPost}>Edit</Button>}
                        <Button className="post-button"  variant="outline-dark" onClick={closePost}>Back</Button>
                    </div>
                )
                }
            </div>{ isOpen && !editing &&
            <>
            {comments.map((comment, index) =>
                <div key={index} className="comment-wall">
                    <hr/>
                    <h6>{"commented by:" + comment.userId}</h6>
                    <p>
                        {comment.content}
                    </p>
                </div>
            )}</>}
            <div className="edit-container">
                {editing && (
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name="title" onChange={onPostEditChange} defaultValue={openedPost.title} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="textArea" name="content" onChange={onPostEditChange} rows={8} placeholder={openedPost.content} />
                        </Form.Group>
                        <Button className="post-button" variant="outline-dark" type="submit" onClick={onPostSubmit}>
                            Save changes
                        </Button>
                        <Button className="post-button" variant="outline-dark" onClick={cancelEdit}>
                            Back
                        </Button>
                    </Form>
                )}
            </div>
        </>


    );
}

export default PostWallComponent;
