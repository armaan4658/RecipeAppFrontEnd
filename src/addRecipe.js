import React from "react";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {Form} from './form';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export function AddRecipe({ getData }) {
  const [open, setOpen] = React.useState(false);
  const validationSchema = Yup.object().shape({
    recipe_name: Yup.string()
      .required("Your recipe name is required"),
    recipe_pic: Yup.string()
      .required("Show us your recipe's delicious pic")
      .url("Not looks like a url"),
    ingredient:Yup.string()
	.required("Ingredients are a must to cook delicious food"),
    instruction:Yup.string()
	.required("Without instruction how are you planning to cook the food ?")
  });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(validationSchema) });
  const onSubmit = (data) => {
    console.log(data);
    fetch("https://recipe-app-back-end-ak.herokuapp.com/recipes", {
      method: "POST",
      headers: {
            'Content-Type': 'application/json'
        },
      body: JSON.stringify(data)
    }).then((res) => getData());
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const intialValues = {
    recipe_name: "",
    recipe_pic: "",
    ingredient: "",
    instruction: ""
  };
  return (
    <div className="AddingRecipe">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Form intialValues={intialValues} register={register} errors={errors}/>
        <input type="submit" />
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title"></DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Recipe added successfully
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Okay
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
}
