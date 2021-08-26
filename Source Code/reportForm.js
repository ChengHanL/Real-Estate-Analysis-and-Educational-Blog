import { Grid, makeStyles, TextField, InputLabel, Select, MenuItem,  FormLabel, FormGroup,FormControlLabel, Checkbox, Button, FormControl } from '@material-ui/core';
import React, {useState} from 'react'
import {useHistory } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

const useStyles = makeStyles(theme => ({
  root: {
    //Select the class that enclosed the everything within the form.
    '& .MuiGrid-root': {
      width: '100%',
      margin: theme.spacing(1)},
      
     title:{
       display: 'flex',
       justifyContent: 'center'
     }
   },

   gridContainer: {
    display:'flex',
    justifyContent: 'center'
   },


   formControl: {
    margin: theme.spacing(1),
    width: '100%'
  },
}))

const formvalues = {
  report_type: "",
  hdb_type: "",
  hdb_category: "",
  Number_toilet: "",
  region: "",
  hdb_estate: "",
  floor_area: 0,
  house_facing: "",
  ammenties: {shop: false, mrt: false, school:false,food:false},
  expected_date: new Date(),
  date_generated: new Date(),
  amenSel : false
}



function ReportForm (props) {

  const [values, setValues] = useState(formvalues);
  const classes = useStyles();
  const history = useHistory();

  const handleInputChange = e => {

    const name = e.target.name
    setValues ({
        ...values,
        [name]: e.target.value
      })
    }

    const handlecheckBox = e => {
      const name = e.target.name
      console.log(name);
      console.log(e.target.checked);
    setValues((prevstate) => {
          return ({
            ...prevstate,
            amenSel : true,
            ammenties : {...prevstate.ammenties, [name]: e.target.checked}
        })
      })
    }

   const onSubmit = e =>
    {
        e.preventDefault();

        console.log(values)

        async function  generateReport()
    {
        let response = await fetch('http://localhost:5000/report/generate',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),})
  
        response = await response.json()
        
        history.push({
                pathname: '/report/sum',
                state: {formValues : values,
                    reportValues : response,
                  }
                  })
      }
      
      var text = ""
      let ansArray = [values.report_type, values.hdb_type, values.hdb_category, values.Number_toilet, values.floor_area, values.region,values.hdb_estate, values.expected_date]
      for(let i=0; i<=ansArray.length; i++){
          if(ansArray[i]==""){
              if(i == 0)
                text = text + "Report Type" + '\n'
              else if(i == 1)
                text = text + "HDB Type" + " & "
              else if(i == 2)
                text = text + "HDB Category" + " & "
              else if(i == 3)
                text = text + "Amount of Toilet" + " & "
              else if(i == 4)
                text = text + "Floor Area" + " & "
              else if(i == 5)
                text = text + "Region" + " & "
              else 
                text = text + "HDB Estate"

          }
      }
      console.log(text)
      text = text.substring(0,(text.length - 3))
      if (text != ""){
          confirmAlert({
              title: "Warning",
              message: "Please fill in the required option: " + text + "!",
              buttons: [
                  {label: 'Ok'}
              ]
          })
      }
      else
      {
        generateReport()
      }
      }
  

    return (
      <form className={classes.root}>
        <div >
          <h1  style={{textAlign: "center"}}>Generate Report</h1>
        </div>
        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} md = {6}>
            <FormControl className={classes.formControl}>
            <InputLabel id="select-category-label" required={true} style={{marginBottom: "5px"}}>For</InputLabel>
            <Select
              labelId="select-category-label"
              id="Category" //Set
              value={values.report_type}
              onChange={handleInputChange}
              fullWidth
              name="report_type"
              label="select-category-label"
              >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={`Buy`}>Buy</MenuItem>
              <MenuItem value={`Sell`}>Sell</MenuItem>
            </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md = {6}>
          <FormControl className={classes.formControl}>
            <InputLabel id="select-occupy-label" required={true} style={{marginBottom: "5px"}}>HDB Type</InputLabel>
            <Select
              labelId="select-occupy-label"
              id="Type-of-occupy" //Set
              value={values.hdb_type}
              onChange={handleInputChange}
              fullWidth
              name="hdb_type"
              label="select-category-label"
              >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={`BTO`}>BTO</MenuItem>
              <MenuItem value={`Resale`}>Resale</MenuItem>
            </Select>
            </FormControl>
          </Grid>

        <Grid item xs={12} md = {6}>
        <FormControl className={classes.formControl}>
          <InputLabel id="select-hdb-label" required={true} style={{marginBottom: "5px"}}>HDB Category</InputLabel>
          <Select
            labelId="select-hdb-label"
            id="Type-of-hdb" //Set
            value={values.hdb_category}
            onChange={handleInputChange}
            fullWidth
            name="hdb_category"
            label="select-hdb-label"
            >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={`OneRoom`}>1-Room </MenuItem>
            <MenuItem value={`TwoRoom`}>2-Room </MenuItem>
            <MenuItem value={`ThreeRoom`}>3-Room</MenuItem>
            <MenuItem value={`FourRoom`}>4-Room</MenuItem>
            <MenuItem value={`FiveRoom`}>5-Room</MenuItem>
            <MenuItem value={`Executive`}>Executive Flat</MenuItem>
          </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md = {6}>
        <FormControl className={classes.formControl}>
          <InputLabel id="select-washroom_label" required={true} style={{marginBottom: "5px"}}>Number of Toilet</InputLabel>
          <Select
            labelId="select-washroom_label"
            id="Number_of_washroom" //Set
            value={values.Number_toilet}
            onChange={handleInputChange}
            fullWidth
            name="Number_toilet"
            label="select-washroom_label" 
            >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={`One Toilet`}>1 </MenuItem>
            <MenuItem value={`Two Toilet`}>2</MenuItem>
            <MenuItem value={`Three Toilet`}>3</MenuItem>
            <MenuItem value={`Four Toilet`}>4</MenuItem>
            <MenuItem value={`Five Toilet`}>5</MenuItem>
          </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md = {6}>
        <FormControl className={classes.formControl}>
          <InputLabel id="select-facing_label" style={{marginBottom: "5px"}}>Direction the house is facing</InputLabel>
          <Select
            labelId="select-facing_label"
            id="house_facing" //Set
            value={values.house_facing}
            onChange={handleInputChange}
            fullWidth
            name="house_facing"
            label="select-facing_label" 
            >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={`North`}>North </MenuItem>
            <MenuItem value={`South`}>South</MenuItem>
            <MenuItem value={`East`}>East</MenuItem>
            <MenuItem value={`West`}>West</MenuItem>
            <MenuItem value={`NorthWest`}>North-West</MenuItem>
            <MenuItem value={`NorthEast`}>North-East</MenuItem>
            <MenuItem value={`SouthWest`}>South-West</MenuItem>
            <MenuItem value={`SouthEast`}>South-East </MenuItem>
          </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md = {6}>
        <FormControl className={classes.formControl}>
          <TextField  
              label="Approx Floor Area" 
              fullWidth
              required
              name="floor_area"
              type= 'number'
              InputLabelProps={{shrink:true}}
              value={values.floor_area} 
              onChange={handleInputChange} />
        </FormControl>
        </Grid>

        <Grid item xs={12} md = {6}>
        <FormControl className={classes.formControl}>
          <InputLabel id="select-region-label" required={true} style={{marginBottom: "5px"}}>Region</InputLabel>
          <Select
            labelId="select-region-label"
            id="region" //Set
            value={values.region}
            onChange={handleInputChange}
            fullWidth
            name="region"
            label="select-region-label"
            >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={`Central Region`}>Central Region</MenuItem>
            <MenuItem value={`East Region`}>East Region</MenuItem>
            <MenuItem value={`North Region`}>North Region</MenuItem>
            <MenuItem value={`North-East Region`}>North-East Region</MenuItem>
            <MenuItem value={`West Region`}>West Region</MenuItem>
          </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md = {6}>
        <FormControl className={classes.formControl}>
          <InputLabel id="select-estate-label" required={true} style={{marginBottom: "5px", maxHeight: 10}}>HDB Estate</InputLabel>
          <Select
            labelId="select-estate-label"
            id="hdb_estate" //Set
            value={values.hdb_estate}
            onChange={handleInputChange}
            fullWidth
            name="hdb_estate"
            label="select-estate-label"
            >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={`ANG_MO_KIO`}>Ang Mo Kio</MenuItem>
            <MenuItem value={`BUKIT_TIMAH`}>Bukit Timah</MenuItem>
            <MenuItem value={`BUKIT_PANJANG`}>Bukit Panjang</MenuItem>
            <MenuItem value={`BUKIT_MERAH`}>Bukit Merah</MenuItem>
            <MenuItem value={`BEDOK`}>Bedok</MenuItem>
            <MenuItem value={`BISHAN`}>Bishan</MenuItem>
            <MenuItem value={`CHOA_CHU_KANG`}>Choa Chu Kang</MenuItem>
            <MenuItem value={`GEYLANG`}>Geylang</MenuItem>
            <MenuItem value={`HOUGANG`}>Hougang</MenuItem>
            <MenuItem value={`JURONG_EAST`}>Jurong East</MenuItem>
            <MenuItem value={`JURONG_WEST`}>Jurong West</MenuItem>
            <MenuItem value={`KALLANG`}>Kallang</MenuItem>
            <MenuItem value={`MARINE_PARADE`}>Marine Parade</MenuItem>
            <MenuItem value={`PASIR_RIS`}>Pasir Ris</MenuItem>
            <MenuItem value={`PUNGGOL`}>Punggol</MenuItem>
            <MenuItem value={`QUEENSTOWN`}>Queenstown</MenuItem>
            <MenuItem value={`SEMBAWANG`}>Sembawang</MenuItem>
            <MenuItem value={`SENGKANG`}>Sengkang</MenuItem>
            <MenuItem value={`SERANGOON`}>Serangoon</MenuItem>
            <MenuItem value={`TAMPINES`}>Tampines</MenuItem>
            <MenuItem value={`TOA_PAYOH`}>Toa Payoh</MenuItem>
            <MenuItem value={`WOODLANDS`}>Woodlands</MenuItem>
            <MenuItem value={`YISHUN`}>Yishun</MenuItem>
          </Select>
          </FormControl>
        </Grid>


        <Grid item xs={12} md = {6}>
        <FormControl className={classes.formControl}>
          <TextField
              label="Expected Date" 
              fullWidth
              required
              name="expected_date"
              type= 'date'
              InputLabelProps={{shrink:true}}
              value={values.expected_date}
              onChange={handleInputChange} />
        </FormControl>
        </Grid>

        <Grid item xs={12} md = {6}>
          <FormLabel component = "legend">Pick Desired Amenities</FormLabel>
          <FormGroup>
            <FormControlLabel
             style={{ pointerEvents: "none" }}
              control={<Checkbox checked={values.ammenties.shop} style={{ pointerEvents: "auto" }} onChange={handlecheckBox} name="shop" color="primary" />}
              label="Near Shopping Centre" />

            <FormControlLabel
              style={{ pointerEvents: "none" }}
              control={<Checkbox checked={values.ammenties.mrt}  style={{ pointerEvents: "auto" }} onChange={handlecheckBox} name="mrt"  color="primary" />}
              label="Near Mrt" />
            <FormControlLabel
               style={{ pointerEvents: "none" }}
              control={<Checkbox checked={values.ammenties.school} style={{ pointerEvents: "auto" }} onChange={handlecheckBox} name="school"  color="primary" />}
              label="Near School" />

            <FormControlLabel
             style={{ pointerEvents: "none" }}
              control={<Checkbox checked={values.ammenties.food}  style={{ pointerEvents: "auto" }} onChange={handlecheckBox} name="food"   color="primary"/>}
              label="Great Food" />
          </FormGroup>
        </Grid>

        <Grid item xs={12} md = {6}>
          <Button variant="contained" color="primary" type="submit" fullWidth onClick={onSubmit} >
            Generate Report
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default ReportForm

