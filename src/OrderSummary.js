import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import ColorlibStepIcon, { ColorlibConnector } from './ColorlibStepIcon';
import { withRouter } from "react-router";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        margin: '24px',
        padding: '24px',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
        height: 150
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    summary: {
        padding: '0 32px'
    }
}));

function getSteps() {
    return ['Ordered', 'Shipped', 'Delivered'];
}

function MediaControlCard({ history }) {
    const [orders, setOrders] = useState([]);
    useEffect(()=>{
        const customerId = 1;
        fetch(`/api/v1/customer/${customerId}/order`).then((res)=>{
            setOrders(res);
            console.log(res);
        })
    }, []);
    const classes = useStyles();
    const theme = useTheme();
    const steps = getSteps();
    const activeStep = {
        'ordered': 0,
        'shipped': 1,
        'delivered': 2
    }
    return (
        <div>
            {
                orders.map((item) => {
                    return (<Card className={classes.root} onClick={() => history.push(`/orderDetails/${item.orderId}`)}>
                        <CardMedia
                            className={classes.cover}
                            image="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone11-select-2019-family?wid=882&hei=1058&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1567022175704"
                            title="Live from space album cover"
                        />
                        <div className={classes.details}>
                            <CardContent className={classes.content}>
                                <Stepper alternativeLabel activeStep={activeStep[item.status]} connector={<ColorlibConnector />}>
                                    {steps.map((label) => (
                                        <Step key={label}>
                                            <StepLabel StepIconComponent={ColorlibStepIcon}></StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                                <div className={classes.summary}>
                                    {
                                        item.items.map((subItem)=>{
                                            return (<div>
                                                <div>Arrived: August 20, 2020 </div>
                                                <div> <b>{subItem.name}</b> </div>
                                                <div> Yellow </div>
                                                <div> 64GB </div>
                                                <div> Qty: 1</div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </CardContent>
                        </div>
                    </Card>)
                })}
    </div>
    );
}

export default withRouter(MediaControlCard)