import React from "react";
import { useParams } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Collapse from "@material-ui/core/Collapse";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import FormDialog from './updatecomponent';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export function RecipePage({ recipeArr, getData }) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  

  const classes = useStyles();
  const history = useHistory();
  let { id } = useParams();
  // const [showRecipe,setShowRecipe] = useState({})
  let showRecipe = recipeArr.filter((ele) => ele._id === id);
  // const getRecipe = () => {
  //   fetch(`https://recipe-app-back-end-ak.herokuapp.com/recipes/${id}`,{method:'GET'})
  //   .then(res=>res.json())
  //   .then(res=>setShowRecipe(res))
  // }
  // useEffect(getRecipe,[id]);

  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <>
    <div>
      <Card className="card">
        <CardHeader />
        <CardActionArea>
          <img
            src={showRecipe[0].recipe_pic}
            height="250px"
            width="300px"
            alt="Food"
            style={{borderRadius:'10px'}}
          ></img>
          <CardMedia
            image={showRecipe[0].recipe_pic}
            title={showRecipe[0].recipe_name}
          />
          <CardContent>
            <Typography variant="body2" color="textPrimary" component="p">
              <h4>Title: {showRecipe[0].recipe_name}</h4>
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardActions disableSpacing>
          <IconButton
            aria-label="delete"
          >
            <DeleteIcon
              onClick={() => {
                fetch(
                  `https://recipe-app-back-end-ak.herokuapp.com/recipes/${id}`,
                  { method: "DELETE",
                    header:{
                      "User-Agent":"http://localhost:3000"
                    }
                }
                )
                  .then((res) => console.log(res))
                  .then((res) => getData());

                history.push("/");
              }}
            />
            <EditIcon onClick={handleClickOpen}/>
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Ingredient:</Typography>
            <Typography paragraph>{showRecipe[0].ingredient}</Typography>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>{showRecipe[0].instruction}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
    <FormDialog 
    open={open} 
    setOpen={setOpen} 
    showRecipe={showRecipe}
    getData={getData}/>
    </>
  );
}
