import React, { useState, useEffect } from 'react'
import axios from  'axios';
import {Grid,Typography,  FormGroup,FormControlLabel, Checkbox, Button,Paper,GridList,GridListTile,makeStyles,Divider ,Chip} from '@material-ui/core';
import ReportMaps from "./report-maps"
import { useHistory } from 'react-router-dom';



import ReportChart from "./report-chart"

const useStyles = makeStyles(theme => ({
  pageContent:{
    margin: "auto",

    borderColor: "#000",
    borderRadius: 5,
    borderWidth:1.5,
    padding: theme.spacing(10),
    width:1200,
    justifyContent: 'center',

  },
 
  typography:{
  
    marginTop:20
  },
  map:{
    marginTop:40,
    
  },
  buttons:{
    display:'flex',
    maxWidth:'100%',
    justifyContent: 'space-evenly',
    marginTop:30,
  },
 
  buttonClass:{
    minWidth:'300px'

  }
 

}))

function ReportDisplay(props) {
  const classes = useStyles({});
  const [report, setReport] = useState({});
  const [values, setValues] = useState({});
  const [isLoading, setLoading] = useState(true);
  const history = useHistory();

  let saveStatus = false;
  let report_id = "";
  const userValues = {

    token : localStorage.getItem('SESSIONTOKEN'),
    userId: localStorage.getItem('USERID'),
    userName: localStorage.getItem('USERNAME'),
  }

  useEffect(() => {


    async function  fetchreport() 
    {
        console.log("Fetvchpodt")
     console.log(props.location.state.report_id)
        let response = await axios.get('http://localhost:5000/report/' + props.location.state.report_id)
        console.log(response)
        console.log("Above is")
        setReport(response.data)
      setLoading(false)

    }
    fetchreport()

  },[])

  
  const onGoBack = (e) => {
    history.push('/report/create')
  }



  const onpublish = (e) => {
    e.preventDefault();

    if(localStorage.getItem("SESSIONTOKEN") === null) {
      localStorage.setItem('REPORTID', report._id)
      history.push('/login')
    }
    else {
    
        history.push({
          pathname: '/forum/create',
          state: {postType : "Report",
              report_id : report._id,
            }
            })
       

      
    }
  }


  if(isLoading) {
    return <div><Typography variant ="h6"> Loading </Typography></div>
  }
  
 
  return (
    <div >
      <div >
        <h1  style={{textAlign: "center"}}>Report Analysis </h1>
      </div>
      <div className={classes.div} >
      <Paper className={classes.pageContent} variant="outlined">
        
   
        <GridList cellHeight={215}   cols={4}>
          <GridListTile >
              <Grid item  xs={12}>

              <Typography  className={classes.typography} variant ="h6">Report Type:</Typography>
                
                <Typography  className={classes.typography}variant ="h6">{report.report_type}</Typography>
              </Grid>
              <Divider />
          </GridListTile>
        
          <GridListTile>
              <Grid item xs={10}>
                <Typography className={classes.typography}  variant ="h6"> HDB Type:</Typography>
                <Typography className={classes.typography}  variant ="h6">{report.hdb_type} </Typography>
              </Grid>
              <Divider />
          </GridListTile>
          <GridListTile>
            <Grid item xs={12}>
              <Typography className={classes.typography}  variant ="h6"> HDB Category:</Typography>
              <Typography className={classes.typography}  variant ="h6"> {report.hdb_category}</Typography>
            </Grid>
            <Divider />
          </GridListTile>
          <GridListTile>
            <Grid item xs={12}>
              <Typography className={classes.typography}  variant ="h6"> Number of Toilet:</Typography>
              <Typography className={classes.typography}  variant ="h6"> {report.toliets}</Typography>
            </Grid>
            <Divider />
          </GridListTile>
          <GridListTile>
            <Grid item xs={12}>
              <Typography className={classes.typography}  variant ="h6"> Region :</Typography>
              <Typography className={classes.typography}  variant ="h6">{report.region}</Typography>
            </Grid>
            <Divider />
          </GridListTile>
          <GridListTile>
            <Grid item xs={12}>
              <Typography className={classes.typography}  variant ="h6"> HDB Estate:</Typography>
              <Typography className={classes.typography}  variant ="h6"> {report.hdb_estate}</Typography>
            </Grid>
            <Divider />
          </GridListTile>
          <GridListTile>
            <Grid item xs={12}>
              <Typography className={classes.typography}  variant ="h6"> Approx Floor Area</Typography>
              <Typography className={classes.typography}  variant ="h6"> {report.floor_area}</Typography>
            </Grid>
            <Divider />
          </GridListTile>
          <GridListTile>
            <Grid item xs={12}>
              <Typography className={classes.typography}  variant ="h6"> Direction the house is facing:</Typography>
              <Typography className={classes.typography}  variant ="h6"> {report.hdb_direction}</Typography>
            </Grid>
            <Divider />
          </GridListTile>
          <GridListTile>
            <Grid item xs={12}>
              <Typography className={classes.typography}  variant ="h6"> Desired Amenities:</Typography>
              <FormGroup >
                <FormControlLabel control={<Checkbox checked={report.ammenties.shop}  name="shop" color="primary" />}
                label="Near Shopping Centre" />
                <FormControlLabel
                control={<Checkbox checked={report.ammenties.mrt} name="mrt"  color="primary" />}
                label="Near Mrt" />
                <FormControlLabel
                control={<Checkbox checked={report.ammenties.school}  name="school"  color="primary" />}
                label="Near School" />
                <FormControlLabel
                control={<Checkbox checked={report.ammenties.food}name="food"   color="primary"/>}
                label="Great Food" />
              </FormGroup>
            </Grid>
          </GridListTile>
          <GridListTile>
            <Grid item xs={12}>
              <Typography className={classes.typography} variant ="h6"> Expected Date:</Typography>
              <Typography className={classes.typography}  variant ="h6">{new Date(report.expected_date,).toLocaleDateString("en-GB")}</Typography>
            </Grid>
            <Divider />
          </GridListTile>
          <GridListTile>
            <Grid item xs={12}>
              <Typography className={classes.typography} variant ="h6">Estimated Price: </Typography>
              <Typography className={classes.typography} variant ="h6">${report.estimated_price} </Typography>
            </Grid>
            <Divider />
          </GridListTile>
          <GridListTile>
            <Grid item xs={12}>
              <Typography className={classes.typography} variant ="h6"> Estimated Annual Tax:</Typography>
              <Typography className={classes.typography} variant ="h6">${report.estimated_tax} </Typography>
            </Grid>
            <Divider />
          </GridListTile>
        </GridList>
    <br></br>
        <Grid item xs={12}>
              <Typography variant ="h6"> Method of Calculation: {report.calculation_method} </Typography>
            </Grid>

        <Grid item xs={12} className={classes.ReportChart} >
              <ReportChart region={report.region}>

              </ReportChart>
        </Grid>

            <Grid item xs={12} className={classes.map} >
              <ReportMaps estate = {JSON.stringify(report.hdb_estate)} amen = {report.amenSel}></ReportMaps>
            </Grid>
         

            <Grid item xs={6} className={classes.buttons} spacing ={20}>
              <Button className={classes.buttonClass} variant="contained" color="primary" type="submit"  onClick={onGoBack}>
                Generate another Report
              </Button>
             
              <Button className={classes.buttonClass} variant="contained" color="primary" type="submit"  onClick={onpublish}>
                Publish Report
              </Button>
            </Grid>
            
            
         
         
        
      </Paper>
      </div>
    </div>
  )
}

export default ReportDisplay
