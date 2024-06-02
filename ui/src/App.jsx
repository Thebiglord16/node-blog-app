import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import PostWallComponent from "./components/WallPostComponent.tsx";
import RegisterForm from "./components/RegisterForm";
import LoginFormComponent from "./components/LoginFormComponent";
import {useState} from "react";
import {UserContext} from "./store";
import CreatePostComponent from "./components/CreatePostComponent";

function App() {
    const [user, setUser] = useState({userId: undefined, token: undefined});
    const [isLogin, setLogin] = useState(false);
    const [register, setRegister] = useState(false);
    const [home, setHome] = useState(true);
    const [createPost, setCreatePost] = useState(false);
    const onNavClick = (st) => {
        setLogin(false);
        setRegister(false);
        setHome(false);
        setCreatePost(false);
        st(true);
    }
    const onLogOut = () => {
        setUser({userId: undefined, token: undefined, setUser: setUser});
    }
    return (
        <UserContext.Provider value={{user, setUser}}>
            <Navbar expand="lg" className="bg-body-tertiary page-header">
                <Container>
                    <Navbar.Brand href="#home" onClick={() => onNavClick(setHome)}>Welcome to the blog! </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        {!user.userId &&
                            <Nav className="me-auto">
                                <Nav.Link onClick={() => onNavClick(setLogin)}>Login</Nav.Link>
                                <Nav.Link onClick={() => onNavClick(setRegister)}>Register</Nav.Link>
                            </Nav>}
                        {user.userId &&
                            <Nav className="me-auto">
                                <Nav.Link onClick={() => onNavClick(setCreatePost)}>Make a Post</Nav.Link>
                                <Nav.Link onClick={() => onLogOut()}>Log out</Nav.Link>
                            </Nav>}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {home && <PostWallComponent/>}
            {isLogin && <LoginFormComponent/>}
            {register && <RegisterForm/>}
            {createPost && <CreatePostComponent/>}
        </UserContext.Provider>
    );
}

export default App
