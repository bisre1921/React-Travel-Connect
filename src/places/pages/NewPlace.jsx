import React from 'react';
import "./placeForm.css";
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/Util/Validators';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from "../../shared/hooks/Form-Hook";



const NewPlace = () => {
    const [formState , inputHandler] = useForm({
      title : {
        value : "" , 
        isValid : false
      } , 
      description : {
        value : "" , 
        isValid : false
      } ,
      address : {
        value : "" ,
        isValid : false
      }
    } , false)
    

    // const descriptionInputHandler = useCallback((id , value , isValid) => {

    // });


    const placeSubmitHandler = (event) => {
      event.preventDefault();
      console.log(formState.inputs)
    }
  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input 
        element="input" 
        type="text" 
        id="title"
        label="Title" 
        validators={[VALIDATOR_REQUIRE()]} 
        errorText="please enter a valid title"
        onInput={inputHandler}
      />
      <Input 
        element="textarea" 
        id="description"
        label="Description" 
        validators={[VALIDATOR_MINLENGTH(5)]} 
        errorText="please enter a valid description"
        onInput={inputHandler}
      />
      <Input 
        element="text" 
        id="address"
        label="Address" 
        validators={[VALIDATOR_REQUIRE()]} 
        errorText="please enter a valid Address"
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Add PLACE
      </Button>
    </form>
  )
};

export default NewPlace;