import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 340,
    maxHeight: 430,
    padding: 10,
  },
  paper: {    
  },
  relative: {
    position: "relative",
  },

  actions: {
    position: "absolute",
    right: "10px",
    bottom: "10px",
    paddig: "5px",
  },
});

class CardItem extends Component {

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid container justify="center">
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="200"
                  image={this.props.row.fileURL}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h6">
                  {this.props.row.postTitle}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="subtitle2"
                    component="p"
                    className={classes.paper}
                  >
                    <b>대여료</b> : {this.props.row.pricePerDay}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="subtitle2"
                    component="p"
                    className={classes.paper}
                  >
                    <b>보증금</b> : {this.props.row.guarantee} ETH
                  </Typography>
                  <Divider />
                </CardContent>
              </CardActionArea>
              <CardActions className={classes.relative}>
                <IconButton
                  size="small"
                  color="primary"
                  className={classes.actions}
                >
                  <ArrowForwardIosIcon style={{ fontSize: 15 }} />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(CardItem);
