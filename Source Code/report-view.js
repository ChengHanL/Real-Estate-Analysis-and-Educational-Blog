import React from 'react'
import { Paper, makeStyles } from '@material-ui/core'
import ReportSum from './report-sum'


const useStyles = makeStyles(theme => ({
  pageContent:{
    margin: theme.spacing(5),
    padding: theme.spacing(3)
  }
}))

function ReportView() {
  const classes = useStyles();

  return (
    <div>
        <Paper className = {classes.pageContent} elevation={3}>
          <ReportSum></ReportSum>
        </Paper>
    </div>
  )
}

export default ReportView;
