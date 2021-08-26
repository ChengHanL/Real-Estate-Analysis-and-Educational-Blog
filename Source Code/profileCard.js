import React, {useState} from 'react';
import './profileCard.css';
import {TextField,Button,Grid,Container,Typography, Avatar} from '@material-ui/core/';
import EditProfile from "./editProfile"
import { Link } from 'react-router-dom';

function ProfileCard({name,job,token,userId, userurl}){



    return(
        <Container>
        <div className = 'profileCard'>
            
            <Grid item sm={6}>
            <div className= 'upper-container'>
            <Grid item sm={3} container direction="column" alignItems="center" justify="center">
                <div className= 'image-container'>
                    <Avatar src={userurl} style={{width: "20vh", height: "20vh"}} />
                </div>
                </Grid>
            </div>
            </Grid>
            <Grid item sm={3}>
            <div className= 'lower-container'>
                <h3>{name}</h3>
                <h4>{job}</h4>
                <button>{token ? <Button component={Link} to = {'/user/' + userId}> Edit Profile</Button> : ""}</button>
            </div>
            </Grid>
        </div>
        </Container>
    )
}

export default ProfileCard