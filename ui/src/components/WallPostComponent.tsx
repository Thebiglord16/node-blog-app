import Card from 'react-bootstrap/Card';
import {useContext, useEffect, useState} from "react";
import {Col} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {UserContext} from "../store";
import axios from "axios";

function PostWallComponent() {
    const [posts, setPosts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [openedPost, setOpenedPost] = useState();
    const {user} = useContext(UserContext);
    const [editing, setEditing] = useState(false);
    const [comments, setComments] = useState([]);
    const [newPost, setNewPost] = useState(new Map());
    const [commenting, setCommenting] = useState(false);
    const [newComment, setNewComment] = useState();
    const openPost = (post) => {
        fetch('http://127.0.0.1:3000/posts/' + post.id)
            .then(res => res.json())
            .then(data => setOpenedPost(data));

        fetch('http://127.0.0.1:3000/comments/' + post.id)
            .then(res => res.json())
            .then(data => setComments(data));
        setIsOpen(true);
    };
    const closePost = () => {
        setIsOpen(false);
        setCommenting(false);
    };
    const cancelEdit = () => {
        console.log(isOpen);
        setEditing(false);
    };
    const editPost = () => {
        setEditing(true);
    };
    const commentPost = () => {
        setCommenting(true);
    };
    useEffect(() => {
        fetch('http://127.0.0.1:3000/posts')
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(error => console.log(error))
    }, []);

    const onPostEditChange = (e) => setNewPost(new Map(newPost).set(e.target.name, e.target.value));
    const onCommentChange = (e) => setNewComment(e.target.value);
    const onPostSubmit = (e) => {
        if (e.target.checkValidity()) {
            e.preventDefault();
            let config = {
                headers: {
                    Authorization: user.token
                }
            }
            axios.put('http://127.0.0.1:3000/posts/' + openedPost.id, {
                title: newPost.get("title"),
                content: newPost.get("content")
            }, config)
                .then((response) => {
                    fetch('http://127.0.0.1:3000/posts')
                        .then(res => res.json())
                        .then(data => setPosts(data))
                        .catch(error => console.log(error));
                    fetch('http://127.0.0.1:3000/posts/' + openedPost.id)
                        .then(res => res.json())
                        .then(data => setOpenedPost(data))
                        .catch(error => console.log(error));
                }).catch(error => console.log(error));
            setEditing(false);
        }
    }
    const onCommentSubmit = (e) => {
        if (e.target.checkValidity()) {
            e.preventDefault();
            let config = {
                headers: {
                    Authorization: user.token
                }
            }
            axios.post('http://127.0.0.1:3000/comments', {
                userId: user.userId,
                postId: openedPost.id,
                content: newComment
            }, config).then(response => {
                fetch('http://127.0.0.1:3000/comments/' + openedPost.id)
                    .then(res => res.json())
                    .then(data => setComments(data));
            });
            setCommenting(false);
        }
    }
    const cancelComment = () => {
        setCommenting(false);
    }
    const deletePost = () =>{
        let config = {
            headers: {
                Authorization: user.token
            }
        }
        axios.delete('http://127.0.0.1:3000/posts/' + openedPost.id, config).then(()=> {
            fetch('http://127.0.0.1:3000/posts')
                .then(res => res.json())
                .then(data => setPosts(data))
                .catch(error => console.log(error));
            closePost();
        });
    }
    return (
        <>
            <div className="post-wall container-fluid">
                {!isOpen && !editing &&
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
                                    <Button onClick={() => openPost(post)} variant="outline-dark">View full
                                        post</Button>
                                </Card>
                            </Col>)
                        }
                    </div>)
                }
            </div>
            <div>
                {isOpen && !editing && (
                    <div className="full-post">
                        <h1>{openedPost?.title}</h1>
                        <p>{openedPost?.content}</p>
                        <br/>
                        <p>Posted by: {openedPost?.User.firstName + " " + openedPost?.User.lastName}</p>
                        {user.userId && user.userId === openedPost?.userId &&
                            <Button className="post-button" variant="outline-dark" onClick={editPost}>Edit</Button>}
                        {user.userId &&
                            <Button className="post-button" variant="outline-dark" onClick={commentPost}>Add a
                                comment</Button>}
                        {user.userId && user.userId === openedPost?.userId &&
                            <Button className="post-button" variant="danger" onClick={deletePost}>Delete post</Button>
                        }
                        <Button className="post-button" variant="outline-dark" onClick={closePost}>Back</Button>
                    </div>
                )
                }
            </div>
            <div className="edit-container">
                {commenting && (
                    <Form onSubmit={onCommentSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="textArea" name="content" onChange={onCommentChange} rows={8}
                                          placeholder="Comment something!" required/>
                        </Form.Group>
                        <Button className="post-button" variant="outline-dark" type="submit">
                            Save changes
                        </Button>
                        <Button className="post-button" variant="outline-dark" onClick={cancelComment}>
                            Back
                        </Button>
                    </Form>
                )}
            </div>
            {isOpen && !editing &&
                <>
                    {comments.map((comment, index) =>
                        <div key={index} className="comment-wall">
                            <hr/>
                            <h6>{"commented by: " + comment.User.firstName + " " + comment.User.lastName}</h6>
                            <p>
                                {comment.content}
                            </p>
                        </div>
                    )}</>}
            <div className="edit-container" onSubmit={onPostSubmit}>
                {editing && (
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name="title" onChange={onPostEditChange}
                                          defaultValue={openedPost.title} required/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="textArea" name="content" onChange={onPostEditChange} rows={8}
                                          placeholder={openedPost.content} required/>
                        </Form.Group>
                        <Button className="post-button" variant="outline-dark" type="submit">
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
