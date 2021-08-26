import React from 'react'
import ReportForm from './reportForm'
import { Paper, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  pageContent:{
    margin: theme.spacing(5),
    padding: theme.spacing(3)
  }
}))

function ReportPage() {
  const classes = useStyles();

  return (
    <div>
        <Paper className = {classes.pageContent} elevation={3}>
          <ReportForm></ReportForm>
        </Paper>
    </div>
  )
}

export default ReportPage;
