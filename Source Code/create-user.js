import React, { useState, useEffect } from 'react';
import axios from  'axios';
import { TextField, Button, Grid, Container } from '@material-ui/core';
import { withSnackbar } from 'notistack';




const userValues =
{
      username: "",
      password: "",
      repassword:"",
      firstname: "",
      lastname: "",
      email: "",

}

function CreateUser(props) {

  const [user, setUsers] = useState(()=>userValues);


  const handleInputChange = e => {

    const name = e.target.name
    setUsers ({
        ...user,
        [name]: e.target.value
      })
    }

   const onSubmit = e => {
      e.preventDefault();
  
      //Send user data to backend.
      axios.post('http://localhost:5000/users/add',user)
      .then(res => {
        if(res.data.success === true) {
          props.history.push('/login')
        }
        props.enqueueSnackbar(res.data.message)
        //else { //Add post if exists
        //  props.enqueueSnackbar('User Created! Please sign in!')
        //}
      })
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
                label='Username' variant='outlined'
                name="username"
                minlength="3"
                required
                fullWidth
                value={user.username}
                onChange={handleInputChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                label='Password' variant='outlined'
                name="password"
                type="password"
                minlength="8"
                required
                fullWidth
                value={user.password}
                onChange={handleInputChange}
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                label='Re-type Password' variant='outlined'
                type="password"
                name="repassword"
                minlength="8"
                required
                fullWidth
                value={user.repassword}
                onChange={handleInputChange}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                label='First Name' variant='outlined'
                name="firstname"
                required
                fullWidth
                value={user.firstname}
                onChange={handleInputChange}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                label='Last Name' variant='outlined'
                name="lastname"
                required
                fullWidth
                value={user.lastname}
                onChange={handleInputChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                label='Email' variant='outlined'
                name="email"
                fullWidth
                value={user.email}
                onChange={handleInputChange}
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant='contained' color='primary' type='submit' fullWidth>
                    Create Account
                </Button>
            </Grid>
          </Grid>
        </form>
        </Grid>
      </Container>
    )
}

export default withSnackbar(CreateUser)

// class CreateUser extends Component
// {
//   constructor(props) {
//     super(props)

//     //Bind the event handlers
//     this.onChangeUsername = this.onChangeUsername.bind(this)
//     this.onChangePassword = this.onChangePassword.bind(this)
//     this.onChangeRePassword = this.onChangeRePassword.bind(this)
//     this.onChangeFirstname = this.onChangeFirstname.bind(this)
//     this.onChangeLastname = this.onChangeLastname.bind(this)
//     this.onChangeEmail = this.onChangeEmail.bind(this)
//     this.onSubmit = this.onSubmit.bind(this)

//     //Create the same fields as the MongoDB Schema
//     this.state = {
//       username: "",
//       password: "",
//       repassword:"",
//       firstname: "",
//       lastname: "",
//       email: "",
//     }
//   }

//   componentDidMount()
//   {
//     if(localStorage.getItem("SESSIONTOKEN") !== null)
//     {

//       this.props.history.push('/')

//     }


//   }
//   onChangeUsername(e) {
//     this.setState({username: e.target.value})
//   }

//   onChangePassword(e) {
//     this.setState({password: e.target.value})
//   }

//   onChangeFirstname(e) {
//     this.setState({firstname: e.target.value})
//   }

//   onChangeLastname(e) {
//     this.setState({lastname: e.target.value})
//   }

//   onChangeEmail(e) {
//     this.setState({email: e.target.value})
//   }
//   onChangeRePassword(e) {
//     this.setState({repassword: e.target.value})
//   }


//   onSubmit(e) {
//     e.preventDefault();

//     const user = {
//       username: this.state.username,
//       password: this.state.password,
//       repassword: this.state.repassword,
//       firstname: this.state.firstname,
//       lastname: this.state.lastname,
//       email: this.state.email
//     }
//     //Send user data to backend.
//     axios.post('http://localhost:5000/users/add',user)
//     .then(res => {
//       if(res.data.success !== true) {
//         this.props.enqueueSnackbar(res.data.message)
//       }
//       else { //Add post if exists
//         this.props.enqueueSnackbar('User Created! Please sign in!')
//         this.props.history.push('/login')
//       }
//     })
//   }

//   render() {

//     return (
//       <Container maxWidth='sm'>
//         <h3>Create New User</h3>
//         <form onSubmit={this.onSubmit}>
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//                 <TextField
//                 label='Username' variant='outlined'
//                 minlength="3"
//                 required
//                 fullWidth
//                 value={this.state.username}
//                 onChange={this.onChangeUsername}
//                 />
//             </Grid>
//             <Grid item xs={12}>
//                 <TextField
//                 label='Password' variant='outlined'
//                 type="password"
//                 minlength="8"
//                 required
//                 fullWidth
//                 value={this.state.password}
//                 onChange={this.onChangePassword}
//                 />
//             </Grid>

//             <Grid item xs={12}>
//                 <TextField
//                 label='Re-type Password' variant='outlined'
//                 type="password"
//                 minlength="8"
//                 required
//                 fullWidth
//                 value={this.state.repassword}
//                 onChange={this.onChangeRePassword}
//                 />
//             </Grid>
//             <Grid item xs={6}>
//                 <TextField
//                 label='First Name' variant='outlined'
//                 required
//                 fullWidth
//                 value={this.state.firstname}
//                 onChange={this.onChangeFirstname}
//                 />
//             </Grid>
//             <Grid item xs={6}>
//                 <TextField
//                 label='Last Name' variant='outlined'
//                 required
//                 fullWidth
//                 value={this.state.lastname}
//                 onChange={this.onChangeLastname}
//                 />
//             </Grid>
//             <Grid item xs={12}>
//                 <TextField
//                 label='Email' variant='outlined'
//                 fullWidth
//                 value={this.state.email}
//                 onChange={this.onChangeEmail}
//                 />
//             </Grid>
//             <Grid item xs={12}>
//                 <Button variant='contained' color='primary' type='submit' fullWidth>
//                     Create User
//                 </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Container>
//     )
//   }
// }

// export default withSnackbar(CreateUser)
