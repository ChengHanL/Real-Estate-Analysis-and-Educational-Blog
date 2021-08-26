import React from 'react';
import ReactPlayer from 'react-player'
import { Container, Grid } from '@material-ui/core';


function LearnPage(props){
    
    //function to go to lesson page
    const onSubmit = e =>
    {
        e.preventDefault();
        props.history.push('/learn/lessons')
    }

    //display learn page with an overview video
    return(
        <Container>
            <Grid container direction="column" alignItems="center" justify="center">
                <h1>Welcome to EZstate's Educational Blog</h1>
                <p>Please watch the introductory video below</p>
                <ReactPlayer 
                    url='https://www.youtube.com/watch?v=XtIdbW699E4&ab_channel=MoneySmart.sg%7CComparePersonalLoans%2CCreditCards%2CMortgageRates%26Insurance'
                    controls="true"
                />
                <button onClick={onSubmit}>Click here to start learning!</button>
            </Grid>
            
        </Container>
    )
}

export default LearnPage