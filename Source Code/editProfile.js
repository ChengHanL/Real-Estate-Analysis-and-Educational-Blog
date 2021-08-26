import React, { useState, useEffect } from 'react';
import axios from  'axios';
import {TextField,Button,Grid,Container,Typography, Avatar} from '@material-ui/core/';
import { Link } from 'react-router-dom';
import { withSnackbar } from 'notistack';


const userState = {
  username: localStorage.getItem("USERNAME"),
  password: "",
  firstname: "",
  lastname: "",
  email: "",
  token: localStorage.getItem("SESSIONTOKEN"),
  userId: localStorage.getItem("USERID"),
  url : ""
}



function EditProfile(props) {

  const [user, setUsers] = useState(()=>userState);
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
          username: res.data.user.username,
          url : res.data.user.pictureUrl
        })
        console.log(res.data.user.pictureUrl)
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
    }
   
    
   const onSubmit = e => {
      e.preventDefault(); 
      user.url = String(user.url)
      console.log(user.url)
      console.log(user.username)
        //Send user data to backend.
      axios.post('http://localhost:5000/users/update/' + props.match.params.id ,user)
      .then(res => {
        if(res.data.success === true) {
           localStorage.setItem("PROFILEPICTURE", String(user.url))
           localStorage.setItem('USERNAME', String(user.username) )
           props.history.push('/user/profile/:id')
        }
        else{
          props.enqueueSnackbar(res.data.message)
        }
         
      })
      .catch(function (error) {
        console.log(error);
      })
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
              <Grid container direction="column" alignItems="center" justify="center">
                <Avatar src={user.url}
                style={{ width: "25vh", height: "25vh"}}/>
              </Grid>
              <Grid item xs={6}>
                  <TextField
                  label='First Name' variant='outlined'
                  name='firstname'
                  fullWidth
                  value={user.firstname}
                  onChange={handleInputChange}
                  data-testid={"FirstnameTextField"}
                  />
              </Grid>
              <Grid item xs={6}>
                  <TextField
                  label='Last Name' variant='outlined'
                  name='lastname'
                  fullWidth
                  value={user.lastname}
                  onChange={handleInputChange}
                  data-testid={"LastnameTextField"}
                  />
              </Grid>
              <Grid item xs={12}>
                  <TextField
                  label='Username' variant='outlined'
                  name='username'
                  fullWidth
                  minLength="3"
                  value={user.username}
                  onChange={handleInputChange}
                  data-testid={"UsernameTextField"}
                  disabled={true}
                  />
              </Grid>
              <Grid item xs={12}>
                  <TextField
                  label='Email' variant='outlined'
                  name='email'
                  fullWidth
                  value={user.email}
                  onChange={handleInputChange}
                  data-testid={"EmailTextField"}
                  />
              </Grid>
              <Grid item xs={12}>
                  <TextField
                  label='Profile Picture Url' variant='outlined'
                  name='url'
                  fullWidth
                  value={user.url}
                  onChange={handleInputChange}
                  data-testid={"URLTextField"}
                  />
              </Grid>
              <Grid item xs={6}>
                  <Button variant='contained' color='primary' type='submit' fullWidth data-testid={"SaveBtn"}>
                      Save
                  </Button>
              </Grid>
              <Grid item xs={6}>
                  <Button variant='contained' color='primary' 
                    component={Link} to ={'/changepassword/' + user.userId} data-testid={"EditPwBtn"} fullWidth>
                      Change Password
                  </Button>
              </Grid>
          </Grid>
        </form>
        </Grid>
      </Container>
    )
}
//export default EditProfile
export default withSnackbar(EditProfile)

