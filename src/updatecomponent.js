import React  from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {Form} from './form';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
export default function FormDialog({open,setOpen,showRecipe,getData}) {
   const handleClose = () => {
       setOpen(false);
     };
     const validationSchema = Yup.object().shape({
      recipe_name: Yup.string(),
      recipe_pic: Yup.string().url("Not looks like a url"),
      ingredient:Yup.string(),
      instruction:Yup.string()
    });
   const intialValues = {
      recipe_name: showRecipe.recipe_name,
      recipe_pic: showRecipe.recipe_pic,
      ingredient: showRecipe.ingredient,
      instruction: showRecipe.instruction
    };
    const {
      register,
      handleSubmit,
      formState: { errors }
    } = useForm({ resolver: yupResolver(validationSchema) });
    const onSubmit = (data) => {
      console.log(data);
      fetch(`https://recipe-app-back-end-ak.herokuapp.com/recipes/${showRecipe._id}`, {
        method: "PATCH",
        headers: {
              'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
      }).then(() => getData());
      setOpen(false);
    };
  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        {/* <DialogTitle id="form-dialog-title">Subscribe</DialogTitle> */}
        <DialogContent className="updateForm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Form intialValues={intialValues} register={register} errors={errors}/>
          <Button onClick={onSubmit} color="primary">
           <input type="submit" />
          </Button>
        </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          
        </DialogActions>
      </Dialog>
    </div>
  );
}
