import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    font-size: 20px;
    font-weight: 700;
`;

function LandingPage() {
    useEffect(() => {
        axios.get('/api/hello')
        .then(response => {console.log(response)})
    }, []);
    return (
        <Container>
            LandingPage
        </Container>
    )
};

export default LandingPage;