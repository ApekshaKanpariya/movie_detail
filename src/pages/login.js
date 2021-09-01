import { useReducer, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import classes from "./login.module.css";
import Context from '../store/context';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const emailReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
      return { value: action.val, isValid: action.val.includes('@') };
    }
    return { value: '', isValid: false };
};
  
const passwordReducer = (state, action) => {
    if (action.type === 'USER_PASS') {
      return { value: action.val, isValid: action.val.trim().length > 6 };
    }
    return { value: '', isValid: false };
};

const Login = () => {

    const ctx = useContext(Context);
    const history = useHistory();

    const [emailState, dispatchEmail] = useReducer(emailReducer, {
        value: '',
        isValid: null,
    });

    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
        value: '',
        isValid: null,
    });

    const emailChangeHandler = (event) => {
        dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
    };
    
    const passwordChangeHandler = (event) => {
        dispatchPassword({ type: 'USER_PASS', val: event.target.value });
    };

    const { isValid: emailIsValid } = emailState;
    const { isValid: passwordIsValid } = passwordState;

    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const SubmitForm = (event) => {
        event.preventDefault();

        if(!emailIsValid){
            toast.dark('Check Your Email', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }else if(!passwordIsValid){
            toast.dark('Check Your Password', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }else{
            const enteredEmail = emailState.value;
            const enteredPassword = passwordState.value;

            setIsLoading(true);
            let url;
            if (isLogin) {
            url =
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDj_bBhbrkHMTp9Co_bwEci3tgXHTIjtkY';
            } else {
            url =
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDj_bBhbrkHMTp9Co_bwEci3tgXHTIjtkY';
            }
            fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            })
            .then((res) => {
                setIsLoading(false);
                if (res.ok) {
                return res.json();
                } else {
                return res.json().then((data) => {
                    let errorMessage = 'Authentication failed!';
                    throw new Error(errorMessage);
                });
                }
            })
            .then((data) => {
                // console.log(data.idToken);
                ctx.login(data.idToken);
                history.replace('/movie');
            })
            .catch((err) => {
                alert(err.message);
            });
        }        
    };

    return (
        <body className="text-center">
        <Container>
            <Row>
                <Col></Col>
                <Col className={classes.main}>
                    <form className="form-signin mt-5" onSubmit={SubmitForm}>
                        <img className="mb-4" src="img/flyerd.png" alt="" width="80" height="80" />
                        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
                        <label for="inputEmail" className="sr-only mt-3">Email address</label>
                        <input type="email" id="inputEmail" value={emailState.value} onChange={emailChangeHandler} className="form-control mb-3" placeholder="Email address" autofocus />
                        <label for="inputPassword" className="sr-only">Password</label>
                        <input type="password" id="inputPassword" value={passwordState.value} onChange={passwordChangeHandler} className="form-control mb-3" placeholder="Password" />
                        {!isLoading && (
                        <button className={classes.bttn} type="submit">{isLogin ? 'Login' : 'Create Account'}</button>
                        )}
                        {isLoading && <p>Sending request...</p>}
                        <p className="mt-2 text-muted">
                            <button
                                type='button'
                                className={classes.toggle}
                                onClick={switchAuthModeHandler}
                            >
                                {isLogin ? 'Create new account' : 'Login with existing account'}
                            </button>
                        </p>
                    </form>
                    <ToastContainer />
                </Col>
                
                <Col></Col>
            </Row>
        </Container>
        </body>
    );

};

export default Login;