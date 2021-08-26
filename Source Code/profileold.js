// import React, {useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,IconButton,Select,MenuItem,Typography, Grid, Button, Container} from '@material-ui/core/';
// import EditIcon from '@material-ui/icons/Edit';
// import DeleteIcon from '@material-ui/icons/Delete';
// import { withRouter } from 'react-router-dom';

// import { makeStyles } from '@material-ui/core/styles';
// import Drawer from '@material-ui/core/Drawer';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Toolbar from '@material-ui/core/Toolbar';
// import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
// import AppBar from '@material-ui/core/AppBar';



// const Post = props => (
//   <TableRow key={props.post._id} component={Link} to={"/forum/view/" + props.post._id}>
//     {/* <TableCell>{props.post.username}</TableCell> */}
//     <TableCell>{props.post.title}</TableCell>
//     <TableCell>{props.post.description.substring(0,50)}</TableCell>
//     {/* <TableCell>{props.post.no_of_comments}</TableCell>
//     <TableCell>{props.post.no_of_upvotes}</TableCell> */}
//     <TableCell>

      
//       <Link to={props.post.username !== localStorage.getItem('USERNAME')
//       ? "#" : '/forum/edit/'+props.post._id}>
//         <IconButton aria-label="Edit Post" disabled=
//         {props.post.username !== localStorage.getItem('USERNAME')
//         ? true : false}>
//           <EditIcon />
//         </IconButton>
//       </Link>
//     </TableCell>
//     <TableCell>
//       <Link onClick={() => { props.post.username !== localStorage.getItem('USERNAME')
//       ? console.log("NO") : props.deletePost(props.post._id)}}>
//         <IconButton aria-label="Delete Post" disabled=
//         {props.post.username !== localStorage.getItem('USERNAME')
//         ? true : false}>
//           <DeleteIcon />
//         </IconButton>
//       </Link>
//     </TableCell>
//   </TableRow>
// )

// const initialStates = {
//   token : localStorage.getItem('SESSIONTOKEN'),
//   userId: localStorage.getItem('USERID'),
//   userName: localStorage.getItem('USERNAME'),
//   estateFilter: "ALL",
//   postFilter: "ALL",
//   email: ""


// }

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`nav-tabpanel-${index}`}
//       aria-labelledby={`nav-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box p={3}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `nav-tab-${index}`,
//     'aria-controls': `nav-tabpanel-${index}`,
//   };
// }

// function LinkTab(props) {
//   return (
//     <Tab
//       component="a"
//       onClick={(event) => {
//         event.preventDefault();
//       }}
//       {...props}
//     />
//   );
// }

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

// function Profile(props) {
//   const [post, setPost] = useState(()=>[]);
//   const [state, setState] = useState(()=>initialStates);
//   const [isLoading, setLoading] = useState(()=>true);
//   const [user, setUsers] = useState(()=>initialStates);

//   useEffect( () => 
//   {
//     async function  fetchpost()
//     {

//       let response = await fetch('http://localhost:5000/post/postreport')
//       response = await response.json()
//       setPost(response)
//       setLoading(false)
//       console.log(response)
//      console.log(post)

//     }
//     fetchpost()

//     async function  fetchprofile()
//   {
 
//     axios.get('http://localhost:5000/users/verify?token=' + user.token)
//     .then((res) => {
//       axios.get('http://localhost:5000/users/get?userId=' +localStorage.getItem("USERID"))
//       .then(res => {
//         setUsers({...user,
//           email: res.data.user.email,
//         })
//         setLoading(false)

//       })
//       .catch((error) => console.log(error))
//     })
//     .catch((error) => console.log(error))
//   }
//   fetchprofile()

//   },[isLoading])

  

//   const handleDeletePost= (id) => {
//     console.log(id)
//     axios.delete('http://localhost:5000/post/' + id)
//     .then(res =>console.log(res.data));

//     //Remove the deleted post from the list in frontend since backend already deleted.
//     const newList = post.filter(item=> item._id !== id)
//     setPost(newList)
//     }

 
 
//   const handleInputChange = e => 
//   {
//         const name = e.target.name
//         setState ({
//         ...state,
//         [name]: e.target.value
//       })
//   }



// const postList = () => {
//     return post.map(currentpost => {
//       if(currentpost.username === state.userName) {
//         if(currentpost.report_id.hdb_estate === state.estateFilter) {
          
//           return <Post post={currentpost}
//           deletePost={handleDeletePost}
//        />
//         }
//         if(state.estateFilter === "ALL") {
//           //delete currentpost[no_of_comments]
//           // const removeItem = (currentpost, i) =>currentpost.slice(0, i-1).concat(currentpost.slice(i, currentpost.length))
//           // let filteredItems = removeItem(currentpost, 1)
//           // filteredItems = removeItem(filteredItems, 2)
//           return <Post post={currentpost}
//           deletePost={currentpost}
//            />
//         }
//       }
//     })
//   }



//   if(isLoading) {
//     return <div><Typography variant ="h6"> Loading </Typography></div>
//   }
 


//   return (

//     <div className={classes.root}>
    

//     <Container>

//     <Grid container spacing={2}>
//       <Grid item xs={6}>
//         <h2>{state.userName}</h2>
//         </Grid>
//     </Grid>

//     <TableContainer component={Paper}>
//     <Table aria-label="user">
//         <TableHead>
//           <TableRow>
//             <TableCell>User</TableCell>
 
            
//           </TableRow>
//           <TableRow>
//             <TableCell>{state.userName}</TableCell>

//           </TableRow>
//           <TableRow>
//             <TableCell>{user.email}</TableCell>

//           </TableRow>
//         </TableHead>
//         <TableBody>
//         {state.token ? <Button component={Link} to = {'/user/' + state.userId}> Edit Profile</Button> : ""}
//         </TableBody>
//       </Table>

//       <Table aria-label="all posts table">
//         <TableHead>
//           <TableRow>
//             <TableCell>User's Post</TableCell>
 
            
//           </TableRow>
//           <TableRow>
//             <TableCell>Title</TableCell>
//             <TableCell>Description</TableCell>
//             <TableCell>Edit</TableCell>
//             <TableCell>Delete</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {postList()}
//         </TableBody>
//       </Table>

//       <Table aria-label="all quiz table">
//   <TableHead>
//     <TableRow>
//       <TableCell>Quiz Score</TableCell>

      
//     </TableRow>
//     <TableRow>
//       <TableCell>Quiz Title</TableCell>
//       <TableCell>Score</TableCell>

//     </TableRow>
//   </TableHead>
//   <TableBody>
//     To be implemented
//   </TableBody>
// </Table>
//     </TableContainer>
//   </Container>




//     </div>
//   )
// }



// export default Profile


