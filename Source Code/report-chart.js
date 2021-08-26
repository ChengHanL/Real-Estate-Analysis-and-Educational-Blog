import React, { Component } from "react";
import { Line } from "react-chartjs-2";


class Chart extends Component {

  constructor(props) {
    super(props);

    this.state = {
     region: 0,
  
    }
 }
  getCat(cat)
  {    
  let chartData =0;
      if(cat === "East Region")
      {
         chartData = [200000,210000,220000,260000,250000,270000]
      }
      else if(cat === "Central Region" ){
  
       chartData = [300000,310000,320000,360000,330000,350000]
      }
      else if(cat === "North Region")
      {
        chartData = [180000,190000,200000,220000,210000,220000]
      }
      else if(cat === "West Region")
      {
        chartData = [290000,300000,310000,370000,320000,340000]
      }
      else {
        chartData = [190000,200000,210000,240000,230000,250000]
      }
      return chartData
    }
    render=()=>{
      const data = {
        labels: ["2015", "2016", "2017", "2018", "2019", "2020"],
        datasets: [
          {
            label: "Average price",
            data: this.getCat(this.props.region),
            fill: true,
            lineTension: 0,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)"
          },
          
        ]
      };
        return (
            <div className="App">
              <Line data={data}   width={100}
  height={300}
  options={{ maintainAspectRatio: false }} />
            </div>
          );
    }
}
export default Chart;