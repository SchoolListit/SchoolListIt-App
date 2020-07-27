import React from 'react';
import { Container, Typography } from '@material-ui/core';
import Logo from './logo-09.png';


export default function SIcon() {
    return (
        <Container style={{marginTop: '50px', textAlign: 'center'}}>
            <img src={Logo} />
        </Container>
    )
}
