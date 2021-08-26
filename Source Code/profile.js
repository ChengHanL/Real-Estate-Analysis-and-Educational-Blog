import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { Link , useHistory} from 'react-router-dom';
import {Container,Typography, Tab, Tabs, Box, Grid} from '@material-ui/core/';
import {Table,TableBody,TableCell,TableHead,TableRow,IconButton} from '@material-ui/core/';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { makeStyles } from '@material-ui/core/styles';
import {PropTypes} from 'prop-types'
import 'react-tabs/style/react-tabs.css';
import ProfileCard from './profileCard'


// onClick={props.viewPost(props.post)}

const Post = props => (
  <Grid container maxWidth='sm'
  alignItems='left'>
  <TableRow key={props.post._id} >
    <TableCell  onClick={props.viewPost(props.post)}>   
    {props.post.title}      
    </TableCell>
    <TableCell>

      
      <Link to={props.post.post_user_name !== localStorage.getItem('USERNAME')
      ? "#" : '/forum/edit/'+props.post._id}>
        <IconButton aria-label="Edit Post" disabled=
        {props.post.post_user_name !== localStorage.getItem('USERNAME')
        ? true : false}>
          <EditIcon />
        </IconButton>
      </Link>
    </TableCell>
    <TableCell>
      <Link onClick={() => { props.post.post_user_name !== localStorage.getItem('USERNAME')
      ? console.log("NO") : props.deletePost(props.post._id)}}>
        <IconButton aria-label="Delete Post" disabled=
        {props.post.post_user_name !== localStorage.getItem('USERNAME')
        ? true : false}>
          <DeleteIcon />
        </IconButton>
      </Link>
    </TableCell>
  </TableRow>
  </Grid>
)

const Report = props => (
  <Grid container maxWidth='sm'
  alignItems='left'>
  <TableRow key={props.report._id}>
    <TableCell onClick={props.viewReport(props.report._id)}>Report on {props.report.hdb_estate} generated on  {new Date(props.report.createdAt).toLocaleDateString("en-GB", {month:"long", day: "numeric", year:"numeric"})}</TableCell>

  </TableRow>
  </Grid>
)

const Quiz = props => (
  <Grid container maxWidth='sm'
  alignItems='left'>
  <TableRow key={props.quiz.user_id}>
    <TableCell>Lesson: {props.quiz.lesson}</TableCell>
    <TableCell>
    {props.quiz.score}/{props.quiz.maxScore}
    
    </TableCell>
  </TableRow>
  </Grid>
)



const initialStates = {
  token : localStorage.getItem('SESSIONTOKEN'),
  userId: localStorage.getItem('USERID'),
  userName: localStorage.getItem('USERNAME'),
  estateFilter: "ALL",
  postFilter: "ALL",
  email: "",
  userurl:"",


}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function Profile(props) {
  const [post, setPost] = useState(()=>[]);
  const [state, setState] = useState(()=>initialStates);
  const [isLoading, setLoading] = useState(()=>true);
  const [user, setUsers] = useState(()=>initialStates);

  const [loadtab, setValue] = useState(0);

  const [name, setName] = useState('Your Name')
  const [job, setJob] = useState('Your Job')
  const [about, setAbout] = useState('blah')

  const [quiz, setQuiz] = useState(()=>[]);
  const [report, setReport] = useState(()=>[]);
  const history = useHistory();

  useEffect( () => 
  {
    async function  fetchpost()
    {

      console.log("USER")
      console.log(user)
      let response = await fetch('http://localhost:5000/post/userpost/'+ user.userId)
      response = await response.json()
      setPost(response.post)
      // setLoading(false)
      console.log(response)
    //  console.log(post)

    }
    fetchpost()

    async function  fetchprofile()
  {
 
    axios.get('http://localhost:5000/users/verify?token=' + user.token)
    .then((res) => {
      axios.get('http://localhost:5000/users/get?userId=' +localStorage.getItem("USERID"))
      .then(res => {
        setUsers({...user,
          email: res.data.user.email,
          userurl: res.data.user.pictureUrl,
        })
        setLoading(false)
      })
      .catch((error) => console.log(error))
    })
    .catch((error) => console.log(error))
  }
  fetchprofile()
  async function fetchreport()
  {
    let response3 = await fetch('http://localhost:5000/report/byuser/' +localStorage.getItem('USERID'))
    response3 = await response3.json()
    setReport(response3)
    setLoading(false)

  }
  fetchreport()
    async function fetchquiz()
    {
      let response2 = await fetch('http://localhost:5000/result/getResults/' +localStorage.getItem('USERID'))
      response2 = await response2.json()
      setQuiz(response2)
      setLoading(false)
      console.log(response2)
     console.log(quiz)
    }
    fetchquiz()
  },[isLoading])

 
 

  const handleDeletePost= (id) => {
    console.log(id)
    axios.delete('http://localhost:5000/post/' + id)
    .then(res =>console.log(res.data));

    //Remove the deleted post from the list in frontend since backend already deleted.
    const newList = post.filter(item=> item._id !== id)
    setPost(newList)
    }

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
 
 
  const handleInputChange = e => 
  {
        const name = e.target.name
        setState ({
        ...state,
        [name]: e.target.value
      })
  }


  const viewPost = (currentpost) =>  () => 
  {
    console.log("InisdePost")
    console.log(currentpost._id)
    history.push({
      pathname: '/forum/view/',
      state: {postType : currentpost.post_category,
          postId :currentpost._id,
        }
        })
  }
  



const viewReport = (report_id) =>  () => 
{
  console.log("Inisde Report ID")
  console.log(report_id)
  history.push({
    pathname: '/report/display/',
    state: {report_id : report_id
      }
      })
}

const postList = () => {
    return post.map(currentpost => {
      console.log("Inside")
      console.log(currentpost)
      if(currentpost.post_user_name === state.userName) {
       
        
          return <Post post={currentpost} viewPost={viewPost}
          deletePost={handleDeletePost}
           />
        
      }
    })
  }


  const quizList = () => {
    return quiz.map(currentquiz => {
          return <Quiz quiz={currentquiz}/>
          
      
    })
  }

  const reportList = () => {
    return report.map(currentreport => {
      return <Report report={currentreport} viewReport = {viewReport}/>
    })
  }


  if(isLoading) {
    return <div><Typography variant ="h6"> Loading </Typography></div>
  }
 


  return (
    
    <Container>
    


     
      <Grid container justify='flex-start' direction="column">
      <ProfileCard name={localStorage.getItem('USERNAME')} job={user.email} token={state.token} userId={state.userId} userurl={user.userurl}/>
 

    
      <Tabs onChange={handleChange} value={loadtab}>
        <Tab value={0} label="Posts" {...a11yProps(0)}/>
        <Tab value={1} label="Reports" {...a11yProps(1)}/>
        <Tab value={2} label="Quiz Score" {...a11yProps(2)}/>
      </Tabs>
      </Grid>
        <TabPanel value={loadtab} index={0}>
          <Table aria-label="all posts table">
          <TableBody>
            {postList()}
          </TableBody>
        </Table>
        </TabPanel>
        <TabPanel value={loadtab} index={1}>
          <Table aria-label="all reports table">
          <TableBody>
            {reportList()}
          </TableBody>
        </Table>
        </TabPanel>

        <TabPanel value={loadtab} index={2}>
          <Table aria-label="all quiz table">
          <TableBody>
            {quizList()}
          </TableBody>
        </Table>
        </TabPanel>
       
    </Container>
    
  )
}



export default Profile


