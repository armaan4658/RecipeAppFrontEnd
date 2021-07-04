export function Form({intialValues,register,errors}){
    return(
        <>
        <div>
          <label htmlFor="recipe_name">
            <h1>Recipe Name</h1>
          </label>
          <input
            // defaultValue={intialValues.recipe_name}
            name="recipe_name"
            placeholder="Enter recipe name"
            {...register("recipe_name")}
          />
        </div>
        {/* <pre> {JSON.stringify({ ...errors })} </pre> */}

        {errors.recipe_name && (<p> {errors.recipe_name.message} </p>)}
        {/* validate function should return only true or false */}
        <div>
          <label htmlFor="recipe_pic">
            <h1>Recipe Pic</h1>
          </label>
          <input
            // defaultValue={intialValues.recipe_pic}
            name="recipe_pic"
            placeholder="Enter a link for recipe pic"
            {...register("recipe_pic")}
          />
        </div>
        {errors.recipe_pic && (<p> {errors.recipe_pic.message} </p>)}

        <div>
          <label htmlFor="ingredient">
            <h1>Ingredient</h1>
          </label>
          <input
            // defaultValue={intialValues.ingredient}
            name="ingredient"
            placeholder="Enter the ingredients"
            {...register("ingredient")}
          />
        </div>
        {errors.ingredient && (<p> {errors.ingredient.message} </p>)}
        <div>
          <label htmlFor="instruction">
            <h1>Instruction</h1>{" "}
          </label>
          <input
            // defaultValue={intialValues.instruction}
            name="instruction"
            placeholder="Enter instruction"
            type="text"
            {...register("instruction")}
          />
        </div>
        {errors.instruction && (<p> {errors.instruction.message} </p>)}
        </>
    )
}