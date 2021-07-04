import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    flexGrow: 1
  },
  media: {
    //width: 350,
    height: 250,
    paddingTop: "56.25%" // 16:9
  }
}));

function Recipe({ recipeArr }) {
  const history = useHistory();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {recipeArr.map((ele, curIndex) => (
          // newFunction(ele, classes, history)
          <DisplayRecipe ele={ele} classes={classes} history={history} />
        ))}
      </Grid>
    </div>
  );
}
function DisplayRecipe({ ele, classes, history }) {
  return (
    // <div className="recipe col-sm-3 col-md-3 col-lg-3 col-xl-3" key={ele.id}>
    <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={ele.id}>
      <Card
        className={classes.root}
        onClick={() => {
          history.push(`/recipe/${ele._id}/${ele.recipe_name}`);
        }}
      >
        <CardMedia
          className={classes.media}
          image={ele.recipe_pic}
          title={ele.recipe_name}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            <h4> {ele.recipe_name} </h4>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

function Filter({ search, recipeArr }) {
  const history = useHistory();
  const classes = useStyles();
  let filtered = recipeArr.filter((ele) =>
    ele.recipe_name.toUpperCase().includes(search.toUpperCase())
  );
  let length = filtered.length;
  return length === 0 ? (
    <h1 className="center">No results found</h1>
  ) : (
    <div className="container">
      {filtered.map((ele, curIndex) => (
        // newFunction(ele, classes, history)
        <DisplayRecipe ele={ele} classes={classes} history={history} />
      ))}
    </div>
  );
}

export { Recipe, Filter };
