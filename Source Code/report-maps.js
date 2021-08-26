import React, { useState, useEffect } from 'react'
import {GoogleMap, withScriptjs, withGoogleMap, Polygon, InfoWindow,Marker} from "react-google-maps"
import axios from  'axios';
import amen from "./amen.json"

function Map(props) {
  const[selectAmen, setSelectedAmen]= useState(null);

  let es = props.estate.replace(/[""]+/g, '');
  if(!(props.estate === "\"\"")) {

    console.log("MAPS")

    console.log(props)
    if(props.amen == true)
    {

    
    return <GoogleMap defaultZoom={11} defaultCenter= {{lat:1.352083, lng:103.819839}}>
  
    {amen[es].map((point) =>
        <Marker key={point.Name} position={{lat:point.LAT, lng:point.LONG}}
        onClick={() => setSelectedAmen(point)} />
    )}
    {selectAmen && (
        <InfoWindow position={{lat:selectAmen.LAT, lng:selectAmen.LONG}}
        onCloseClick={() => setSelectedAmen(null)}>
          <div>
            <h3>{selectAmen.Name}</h3>
          </div>
        </InfoWindow>
      )}
      <Polygon path={props.cord[0]} key={1}
      options=
      {{strokeColor:'#FF0000',
      strokeOpacity:0.8,
      strokeWeight:3,
      fillColor:'#000000',
      fillOpacity:0}}>
      </Polygon>
    </GoogleMap>
    }
    else{

      return <GoogleMap defaultZoom={11} defaultCenter= {{lat:1.352083, lng:103.819839}}>
  
        <Polygon path={props.cord[0]} key={1}
        options=
        {{strokeColor:'#FF0000',
        strokeOpacity:0.8,
        strokeWeight:3,
        fillColor:'#000000',
        fillOpacity:0}}>
        </Polygon>
      </GoogleMap>

    }
  }
}
//In order to correct load Google Maps JavaScript API v3, need to wrap it with withScriptjs HOC



function ReportMaps(props) {
  const [cord, setCord] = useState([]);
  const [estate, setEstate] = useState("")

  useEffect(() => {
    let obj = [];
  let i, latv,lngv

    setEstate(props.estate)
    if(!(props.estate === "\"\"")) {
      axios.get("http://localhost:5000/report/map/" + props.estate)
      .then(response => {
        for(i=0;i<response.data.length;i++) {
          lngv = (response.data[i][0])
          latv = (response.data[i][1])
          try {
            obj.push({
              lat: latv,
              lng: lngv
            })
          }
          catch(err) {
              console.log(err)
          }
        }
        setCord([obj])
      })
    }
  },[estate])

  const WrappedMap = withScriptjs(withGoogleMap(Map))
  return (
    <div style={{width: '100%', height: '40vh'}}>
       <WrappedMap
       googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBxfDioQjno8K0ntIxVjyq4s4x79PG6wSQ`}
       loadingElement= {<div style = {{height: "100%"}}/>}
       containerElement= {<div style = {{height: "100%"}}/>}
       mapElement= {<div style = {{height: "100%"}}/>}
       cord = {cord}
       estate = {props.estate}
       amen = {props.amen} />
    </div>
  )
}

export default ReportMaps;
