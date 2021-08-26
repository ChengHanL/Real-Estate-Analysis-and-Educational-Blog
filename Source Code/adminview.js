import React, { useState, useEffect } from 'react';
import axios from  'axios';
import {TextField,Button,Grid,Container,Typography, Tab, Tabs, Box} from '@material-ui/core/';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,IconButton,Select,MenuItem} from '@material-ui/core/';
import {PropTypes} from 'prop-types'
import 'react-tabs/style/react-tabs.css';
import { Link } from 'react-router-dom';
import { withSnackbar } from 'notistack';
import DeleteIcon from '@material-ui/icons/Delete';

const userState = {
    username: localStorage.getItem("USERNAME"),
    token: localStorage.getItem("SESSIONTOKEN"),
    userId: localStorage.getItem("USERID"),
    isAdmin: localStorage.getItem("ISADMIN")
  }

const Banlist = props => (
  <TableRow>
    <TableCell>{props.bans.user}</TableCell>
    <TableCell>{props.bans.reason}</TableCell>
    <TableCell>{props.bans.date.substring(0,10)}</TableCell>
    <TableCell>
      <Button onClick={()=>props.unban(props.bans.user, 'unban')}>Unban</Button>
    </TableCell>
  </TableRow>
)
const Reportlist = props => (
  <TableRow>
    <TableCell>{props.rep.reporter}</TableCell>
    <TableCell>{props.rep.reporteduser}</TableCell>
    <TableCell>{props.rep.reason}</TableCell>
    <TableCell>{props.rep.date.substring(0,10)}</TableCell>
    <TableCell>
    <Button onClick={()=>props.ban(props.rep.reporteduser, 'ban', props.rep.reason,props.rep._id)}>Ban</Button>
      <Link onClick={()=>props.deletereport(props.rep._id)}>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </Link>
    </TableCell>
  </TableRow>
)

const rightsUser = {
  user :"",
  rights:"admin_grant",
  reason:""
}
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-force-tabpanel-${index}`}
        aria-labelledby={`scrollable-force-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Container >
            {children}
          </Container>
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
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
function AdminView(props) {
    const [bans, setBanlist] = useState(()=>[]);
    const [reported, setReportedList] = useState(()=>[]);
    const [user, setUsers] = useState(()=>userState);
    const [isLoading, setLoading] = useState(()=>true);
    const [loadtab, setValue] = useState(0);
    const [userRights, setRights] = useState(()=>rightsUser);
   

  useEffect(() => {
    async function  fetchdata()
    {
      if(userState.isAdmin === 'false'){
        props.history.push('/forum')
        props.enqueueSnackbar("You are not allowed to view the page!")
      }
      axios.get('http://localhost:5000/admin/getbans/' +localStorage.getItem("USERNAME"))
      .then(res=> {setBanlist(res.data)})
      .catch((error) => console.log(error))

      axios.get('http://localhost:5000/admin/getreported')
      .then(res2=> {setReportedList(res2.data)})
      .catch((error) => console.log(error))


      setLoading(false)
    }
    fetchdata()  
  
  },[isLoading])

  
    const handleChange = (event, newValue) =>{
      setValue(newValue)
    }
  
    const handleInputChange = e => {
  
      const name = e.target.name
      setUsers ({
          ...user,
          [name]: e.target.value
        })
      }
      
      const onChangeStatus = e =>{
        const name = e.target.name
        setRights({
            ...userRights,
            [name]: e.target.value
        })
      }

      async function update(){
        let response = await fetch('http://localhost:5000/admin/getbans/' +localStorage.getItem("USERNAME"))
        response = await response.json()
        setBanlist(response)
        console.log(response)
        console.log(bans)
        let response2 = await fetch('http://localhost:5000/admin/getreported')
        response2 = await response2.json()
        setReportedList(response2)
      }

      const unban = (user, rights) =>{
          userRights.user = user;
          userRights.rights = rights;
          moderate();
      }

      const ban = (user, rights, reason, id) =>{
        userRights.user = user;
        userRights.rights = rights;
        userRights.reason = reason;
        moderate();
        handledeletereport(id);
      }

      const onSubmitTwo = e =>{
        e.preventDefault();
        moderate();
        
      }
      // calls the backend function for changing of status of user and updates the ban list
      const moderate = () =>{
        const adminEditedUser = {
          editname: userRights.user,
          value: userRights.rights,
          admin: userState.username,
          reason: userRights.reason
        }
    
        console.log(adminEditedUser.editname)
        console.log(adminEditedUser.value)
    
        axios.post('http://localhost:5000/users/moderate', adminEditedUser)
        .then(res => {
          if(res.data.success === true) {
            updatebanlist();
            userRights.user ="";
            userRights.reason="";
            userRights.rights = "admin_grant";
            
          }
          props.enqueueSnackbar(res.data.message)
        })
        .catch(function (error) {
          console.log(error);
        })        
      }
      
      const updatebanlist = () => {
        const adminEditedUser = {
          editname: userRights.user,
          value: userRights.rights,
          admin: userState.username,
          reason: userRights.reason
        }
        if(userRights.rights === 'ban'){
          axios.post('http://localhost:5000/admin/addban', adminEditedUser)
          .then(res=>{
            console.log(res.data.message)
            props.history.push('/admin');
            update();
          })
          .catch(function (error){
            props.enqueueSnackbar(error);
          })
        }
        if(userRights.rights === 'unban'){
          axios.post('http://localhost:5000/admin/deleteban', adminEditedUser)
          .then(res=>{
            if(res.data.success === true){
              console.log(res.data.message)
              props.history.push('/admin');
              update(); 
            }
          })
          .catch(function (error){
            props.enqueueSnackbar(error);
          })
        }
      }

      const handledeletereport = (id) =>{
        const data ={
          reportid: id
        }
        axios.post('http://localhost:5000/admin/deletereport', data)
        .then(res=>{
          if(res.data.success === true){
            props.enqueueSnackbar(res.data.message) 
          }
          })
          .catch(function (error){
            props.enqueueSnackbar(error);
          })
          props.history.push('/admin')
          update();

      }



      const banList = () => {
        return bans.map(ban =>{
          return <Banlist bans={ban} unban={unban}/>
        })
      }
      const reportedList = () => {
        return reported.map(rep =>{
          return <Reportlist rep={rep} deletereport={handledeletereport} ban={ban}/>
        })
      }
      if(isLoading) {
        return <div><Typography variant ="h6" data-testid={"Loading"}> Loading </Typography></div>
      }
      return (
        <Container>
          <Tabs onChange={handleChange} value={loadtab}>
              <Tab value={0} label="Edit User Rights" {...a11yProps(0)} 
                  data-testid={"EditUserRightTab"}/>
              <Tab value={1} label="Ban List" {...a11yProps(1)}
                  data-testid={"BanlistTab"}/>
              <Tab value={2} label="Report List" {...a11yProps(2)}
                  data-testid={"ReportlistTab"}/>
          </Tabs>
          <TabPanel value={loadtab} index={0}>
            <br/>
        <form onSubmit={onSubmitTwo}>
          
          <Grid container spacing={3}
            direction="column"
            style={{ minHeight: '50vh' }}>
            <Grid item xs={12}>
              <label 
                  data-testid={"actionLabel"} >Action to take: </label>
              <select id="options" onChange={onChangeStatus} name='rights' value={userRights.rights}>
                <option value="admin_grant">Grant Admin Previleges</option>
                <option value="admin_remove">Remove Admin Previleges</option>
                <option value="ban">Ban User</option>
                <option value="unban">Unban User</option>
              </select>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label='Name of User' variant='outlined'
                fullWidth
                name='user'
                value={userRights.user}
                onChange={onChangeStatus}
                data-testid={"nameTextField"}
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
                label='Reason' variant='outlined'
                fullWidth
                name='reason'
                value={userRights.reason}
                onChange={onChangeStatus}
                data-testid={"reasonTextField"}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant='contained' color='primary' type='submit' fullWidth
                data-testid={"applyBtn"}>
                Apply Changes
              </Button>
 
            </Grid>

          </Grid>
        </form>
          </TabPanel>
          <TabPanel value={loadtab} index={1}
                data-testid={"tab2"}>
          <br/>
          <TableContainer component={Paper}>
            <Table aria-label="banlist">
              <TableHead>
                <TableRow>
                  <TableCell data-testid={"userCell"}>User</TableCell>
                  <TableCell data-testid={"reason1Cell"}>Reason</TableCell>
                  <TableCell data-testid={"date1Cell"}>Date</TableCell>
                  <TableCell data-testid={"actionCell"}>Action</TableCell>
                </TableRow>
              </TableHead>
                <TableBody>
                  {banList()}
                </TableBody>
            </Table>
            </TableContainer>
            <br/>
          </TabPanel>
          <TabPanel value={loadtab} index={2}
                data-testid={"tab3"}>
          <br/>
          <TableContainer component={Paper}>
            <Table aria-label="reportlist">
              <TableHead>
                <TableRow>
                  <TableCell data-testid={"rbuserCell"}>Reported by</TableCell>
                  <TableCell data-testid={"ruuserCell"}>Reported User</TableCell>
                  <TableCell data-testid={"reason2Cell"}>Reason</TableCell>
                  <TableCell data-testid={"date2Cell"}>Date</TableCell>
                  <TableCell data-testid={"actionsCell"}>Actions</TableCell>
                </TableRow>
              </TableHead>
                <TableBody>
                  {reportedList()}
                </TableBody>
            </Table>
            </TableContainer>
            <br/>
          </TabPanel>
        </Container>
      )
  }
export default withSnackbar(AdminView)