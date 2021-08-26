import React, { useState, useEffect } from 'react';
import axios from  'axios';
import {TextField,Button,Grid,Container,Typography} from '@material-ui/core/';
import { Link } from 'react-router-dom';
import { withSnackbar } from 'notistack';


const userState = {
  username: localStorage.getItem("USERNAME"),
  password: "",
  firstname: "",
  lastname: "",
  email: "",
  token: localStorage.getItem("SESSIONTOKEN"),
  userId: localStorage.getItem("USERID")
}

const userPassword ={
  passwordn: "",
  passwordn2: ""
}


function ChangePassword(props) {

  const [user, setUsers] = useState(()=>userState);
  const [userpass, setPassword] = useState(()=>userPassword);
  const [isLoading, setLoading] = useState(()=>true);



useEffect(() => {
  async function  fetchprofile()
  {
 
    axios.get('http://localhost:5000/users/verify?token=' + user.token)
    .then((res) => {
      axios.get('http://localhost:5000/users/get?userId=' +localStorage.getItem("USERID"))
      .then(res => {
        setUsers({...user,
          firstname: res.data.user.firstname,
          lastname: res.data.user.lastname,
          email: res.data.user.email,
          username: res.data.user.username
        })
        setLoading(false)

      })
      .catch((error) => console.log(error))
    })
    .catch((error) => console.log(error))
  }
  fetchprofile()  

},[isLoading])





  const handleInputChange = e => {

    const name = e.target.name
    setUsers ({
        ...user,
        [name]: e.target.value
      })
      setPassword ({
        ...userpass,
        [name]: e.target.value
    })
    }

   
   
   const onSubmit = e => {
        e.preventDefault();
        console.log(user.password)
        console.log(localStorage.getItem("PASSWORD"))
        if(user.password !== localStorage.getItem("PASSWORD")){
            props.enqueueSnackbar("Current Password does not match!!")
        }
        else if(userpass.passwordn !== userpass.passwordn2){
            props.enqueueSnackbar("New Password and Confirm New Password must be the same!!")
        }
        else{
          console.log(user.password)
          console.log(userpass.passwordn)
          user.password= userpass.passwordn
          console.log(user.password)
          //Send user data to backend.
          axios.post('http://localhost:5000/users/update/' + props.match.params.id ,user)
          .then(res => {
            if(res.data.success === true) {
               localStorage.setItem("PASSWORD", user.password)
               props.history.push('/user/profile/:id')
            }
             props.enqueueSnackbar(res.data.message)
          })
          .catch(function (error) {
            console.log(error);
          })

        }

    }
  
    if(isLoading) {
        return <div><Typography variant ="h6" data-testid="Loading"> Loading </Typography></div>
      }
    return (
      <Container maxWidth='sm'>
        <Grid container
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '80vh' }}>
          <form onSubmit={onSubmit}>

          <Grid container spacing={2}>
              <Grid item xs={12}>
                  <TextField
                  type="password"
                  label='Current Password' variant='outlined'
                  name='password'
                  fullWidth
                  required
                  minLength="8"
                  value={user.password}
                  onChange={handleInputChange}
                  data-testid={"passwordTextField"}
                  />
              </Grid>
              <Grid item xs={12}>
                  <TextField
                  type="password"
                  label='New Password' variant='outlined'
                  name='passwordn'
                  fullWidth
                  required
                  minLength="8"
                  value={userpass.passwordn}
                  onChange={handleInputChange}
                  data-testid={"passwordnTextField"}
                  />
              </Grid>
              <Grid item xs={12}>
                  <TextField
                  type="password"
                  label='Confirm New Password' variant='outlined'
                  name='passwordn2'
                  required
                  fullWidth
                  minLength="8"
                  value={userpass.passwordn2}
                  onChange={handleInputChange}
                  data-testid={"passwordn2TextField"}
                  />
              </Grid>
              <Grid item xs={6}>
                  <Button variant='contained' color='primary' type='submit' fullWidth
                  data-testid={"saveBtn"}>
                      Save
                  </Button>
              </Grid>
          </Grid>
        </form>
        </Grid>
      </Container>
    )
}

export default withSnackbar(ChangePassword)

