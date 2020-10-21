import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import WarningOutlinedIcon from '@material-ui/icons/WarningOutlined';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ColorlibStepIcon, { ColorlibConnector } from './ColorlibStepIcon';
import { withRouter } from "react-router";
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  paperRoot: {
    marginLeft: '1%',
    marginRight: '1%',
    padding: '24px',
    marginTop: '20px'
  },
  flex: {
      display: 'flex'
  },
  item: {
      display: 'flex',
      width: '50%',
      textAlign: 'left'
  },
  mainContent: {
      display: 'flex',
      width: '100%'
  },
  changeDelivery: {
      display: 'flex',
      flexWrap: 'wrap'
  },
  buttons: {
      display: 'flex',
      width: '100%'
  },
  button: {
    marginRight: '20px',
    width: '100%'
  },
  warning: {
      marginTop: '20px'
  },
  products: {
    display: 'flex',
  },
  warningIcon: {
    fill: '#FF9800'
  }
}));

function getSteps() {
  return ['Ordered', 'Shipped', 'Delivered'];
}

function CustomizedSteppers({ match }) {
  console.log(match.params.id)
  const classes = useStyles();
  const steps = getSteps();
  const [order, setOrders] = useState({});
    useEffect(()=>{
        fetch(`/api/v1/order/${match.params.id}`).then((res)=>{
            setOrders(res[0]);
            console.log(res);
        })
    }, []);
  const activeStep = {
      'ordered': 0,
      'shipped': 1,
      'delivered': 2
  }

  return (
    <div className={classes.root}>
      <Stepper alternativeLabel activeStep={activeStep[order.status]} connector={<ColorlibConnector />}>
        {steps.map((label, index) => (
          <Step key={label} style={{ display: 'flex', flexDirection: 'column'}}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>
            { index == 1 && order.items && !order.items[0].userAcceptedDelay && <CloseOutlinedIcon color="secondary"/> }
            {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      { order.items && <div className={classes.mainContent}>
      <Grid container spacing={0}>
      <Grid item xs={12} sm={8}>
        <Paper elevation={3} className={classes.paperRoot}>
          <div className={`${classes.flex}`}>
              <span className={`${classes.item}`}> <b> Items Ordered: </b> </span>
              <span className={`${classes.flex}`}> {order.items.length}  </span>
          </div>
          <p style={{ display: 'flex' }}>
              <span className={`${classes.item}`}> <b>Address: </b></span>
              <span className={`${classes.item}`}>
                {order.shipingAddress.street}, {order.shipingAddress.city}, &nbsp;
                {order.shipingAddress.state}, {order.shipingAddress.zip} 
              </span>
          </p>
        </Paper>
        <Paper elevation={3} className={classes.paperRoot}>
        { order.items[0].newEstimatedShipDateRange && <Grid container spacing={1}>
          <Grid item xs={12} sm={5}>
            <b>New estimated ship date: </b>
          </Grid>
          <Grid item xs={12} sm={5}>
            {new Date().toDateString(order.items[0].newEstimatedShipDateRange.fromDate)} - 
            {new Date().toDateString(order.items[0].newEstimatedShipDateRange.toDate)}
          </Grid>
        </Grid> }

        { !order.items[0].newEstimatedShipDateRange && <Grid container spacing={1}>
          <Grid item xs={12} sm={5}>
            <b>{order.shipments[0].carrier} </b>
          </Grid>
          <Grid item xs={12} sm={5}>
          {order.shipments[0].trackingNumber}
          </Grid>
        </Grid> }

        <Grid container spacing={1}>
          <Grid item xs={12} sm={5}>
            { order.items[0].newEstimatedShipDateRange ? 'Original estimated ship date:' : 'Estimated delivery date' }
          </Grid>
          <Grid item xs={12} sm={5}>
          {new Date().toDateString(order.items[0].estimatedShipDateRange.fromDate)} - 
            {new Date().toDateString(order.items[0].estimatedShipDateRange.toDate)}
          </Grid>
        </Grid>
       
        { order.items[0].newEstimatedShipDateRange && <p className={classes.changeDelivery}>
            <div className={classes.buttons}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={5}>
                <Button className={classes.button} variant="contained" color="primary">
                    Accept new ship date
                </Button>
                </Grid>
                <Grid item xs={12} sm={5}>
                <Button className={classes.button} variant="contained">
                    Cancel your order
                </Button>
                </Grid>
              </Grid>
        </div> 
            <div className={`${classes.buttons} ${classes.warning}`}>
            <WarningOutlinedIcon classes={{ root: classes.warningIcon }}/>
            <span style={{ textAlign: 'left', marginLeft: '20px' }}>Don't forget to let us know if you accept the new ship date. we'll cancel your order if we don't
            hear from you soon.</span>
            </div>
        </p>}
      </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
      <Paper elevation={3} className={classes.paperRoot}>
       {
         order.items && order.items.map((item)=>{
           return (<div className={classes.products}>
             <img style={{width: '100px', height: '100px', marginRight: '20px'}} src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone11-select-2019-family?wid=882&hei=1058&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1567022175704"/>
              <div >
                <p> <b>{item.name}</b> </p>
                <p> Quantity: {item.quantity} </p>
                <p> {item.telephoneNumber} </p>
              </div>
           </div>)
         })
       }
      </Paper>
      </Grid>
      </Grid>
      </div>}
      
    </div>
  );
}

export default withRouter(CustomizedSteppers);
