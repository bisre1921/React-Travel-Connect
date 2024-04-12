import React from 'react';
import "./NewPlace.css";
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/Util/Validators';
import { useCallback } from 'react';
import { useReducer } from 'react';
import Button from '../../shared/components/FormElements/Button';

const formReducer = (state , action) => {
  switch(action.type) {
    case "INPUT_CHANGE" :
      let formIsValid = true;
      for(const inputId in state.inputs) {
        if(inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid
        }
      }
      return {
        ...state , 
        inputs : {
          ...state.inputs , 
          [action.inputId] : {value : action.value , isValid : action.isValid}
        } , 
        isValid : formIsValid
      }
      return {}
    default : 
      return state;   
  }
}
const NewPlace = () => {
    const [formState , dispatch] = useReducer(formReducer , {
      inputs: {
        title : {
          value : "" , 
          isValid : false
        } , 
        description : {
          value : "" , 
          isValid : false
        }
      } , 
      isValid : false
    });
    const inputHandler = useCallback((id , value , isValid) => {
      dispatch({
        type : "INPUT_CHANGE" , 
        value : value , 
        isValid : isValid , 
        inputId : id
      })
    });

    const descriptionInputHandler = useCallback((id , value , isValid) => {

    });
  return (
    <form className="place-form">
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
      <Button type="submit" disabled={!formState.isValid}>
        Add PLACE
      </Button>
    </form>
  )
};

export default NewPlace;