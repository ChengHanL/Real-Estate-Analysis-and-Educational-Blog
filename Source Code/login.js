import React, { useState, useEffect } from 'react';
import axios from  'axios';
import { TextField, Button, Grid, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles'
import { withSnackbar } from 'notistack';

const initialState = {
  username: "",
  password: "",
}
const useStyles = makeStyles((theme) => ({

  root:{
    /*to align the footer at the bottom of login*/
    marginTop: 100,
    marginBottom: 216
  },
 
  offset:theme.mixins.toolbar

}));


function Login(props) {

  const classes = useStyles();

  const [user, setUsers] = useState(()=>initialState);

  const handleInputChange = e => {

    const name = e.target.name
    setUsers ({
        ...user,
        [name]: e.target.value
      })
    }


  const onSignIn = e =>
  {

    e.preventDefault();
      console.log(e)
      console.log("Hello")
    //Send user data to backend.
     axios.post('http://localhost:5000/users/login', user)
    .then(res => {
      if(res.data.success === true) { //pass authentication
        localStorage.setItem('SESSIONTOKEN', res.data.token);
        localStorage.setItem('USERID', res.data.userId);
        console.log("userID")
        console.log(res.data.userId)
        localStorage.setItem('USERNAME', user.username)
        localStorage.setItem('PASSWORD', user.password)
        localStorage.setItem('ISADMIN', res.data.isAdmin)
        localStorage.setItem('PROFILEPICTURE', String(res.data.pictureURL))

        if(localStorage.getItem('REPORT') !== null) {
          let user_id = {user_id:  localStorage.getItem('USERID')}
          // axios.post('http://localhost:5000/report/save/public/'+localStorage.getItem('REPORTID'),user_id)
          // .then(res => {
          //   const report_id = res.data._id
          //   props.history.push('/forum/create/'+report_id)
          // })
          console.log("INSIDEEEEE")
          console.log(user.username)
          console.log(localStorage.getItem('USERNAME'))
          props.history.push('/report/sum')
        //  window.location.reload(false);

        }
        else
        {
          props.history.push('/')
          window.location.reload(false);
        }
     }
      else { // failed authentication
        localStorage.setItem('USERNAME', 'PUBLIC USER')
        console.log(localStorage.getItem('USERNAME'))
        props.enqueueSnackbar(res.data.message)
        }
    })
    .catch((error) => console.log(error))
  }

  return (

    <Container maxWidth='sm'className ={classes.root}>
      <Grid container
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '80vh' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
              label='Username' variant='outlined'
              name='username'
              required
              fullWidth
              value={user.username}
              onChange={handleInputChange}
              />
          </Grid>
          <Grid item xs={12}>
              <TextField
              label='Password' variant='outlined'
              name='password'
              type="password"
              required
              fullWidth
              value={user.password}
              onChange={handleInputChange}
              />
          </Grid>
          <Grid item xs={6}>
              <Link to= {'/forgot'}>Forgot password?</Link>
          </Grid>
          <Grid item xs={12}>
              <Button variant='contained' color='primary' type='submit' fullWidth onClick={onSignIn}>
                  Login
              </Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant='contained' color='primary' fullWidth
            component={Link} to ={'/user'}>
                Sign Up
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
    
  )
}
//export default Login
export default withSnackbar(Login)



