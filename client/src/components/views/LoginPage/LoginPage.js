import React, { useState } from "react";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import { loginUser } from "../../../_actions/user_action";


const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    font-size: 20px;
    font-weight: 700;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

function LoginPage(props) {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.target.value);
    };

    const onPasswordHandler = (event) => {
        setPassword(event.target.value);
    };

    const onSubmitHandler = (event) => {
        //e.preventDefault() 는 value가 바껴도 re-rendering을 방지해줌
        event.preventDefault();
        let body = {
            email,
            password
        }
        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess) {
                    props.history.push('/');
                } else {
                    alert(response.payload.message);
                }
            })
    }

    return (
        <Container>
            <Form onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={password} onChange={onPasswordHandler} />
                <button type="submit">
                    LOGIN
                </button>
            </Form>
        </Container>
    )
};

export default LoginPage;