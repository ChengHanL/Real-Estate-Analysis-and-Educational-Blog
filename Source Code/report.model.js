const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reportSchema = new Schema({

  report_type:{
    type:String,
    required: true,
  },
  hdb_type: {
    type:String
  },
  hdb_category: {
    type:String, required: true
  },
  region:{
    type:String, required: true
  },
  hdb_estate: {
    type:String, required: true
  },
  ammenties: {
    type:Array, required: true
  },
  floor_area:{
    type: Number
  },
  hdb_direction:{
    type:String
  },
  toliets:{
    type:String
  },
  expected_date :{
    type: Date, required: true
  },
  estimated_price: {
    type: Number
  },
  estimated_tax: {
    type:Number
  },
  calculation_method: {
    type:String, required: true
  },
  user_id:{type: Schema.Types.ObjectId, ref:'user', default:null,required:true},
  },
  {
  timestamps: true,
  minimize: false
});

const Report = mongoose.model('report', reportSchema);

module.exports = Report;
