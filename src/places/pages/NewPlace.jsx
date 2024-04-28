import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import "./placeForm.css";
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/Util/Validators';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from "../../shared/hooks/Form-Hook";
import { useHttpClient } from '../../shared/hooks/http-hook';
import AuthContext from '../../shared/Context/AuthContext';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const {isLoading , error , sendRequest , clearError} = useHttpClient();

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

    const navigate = useNavigate();

    const placeSubmitHandler = async (event) => {
      event.preventDefault();
      try {
          await sendRequest(
            "http://localhost:5000/api/places" , 
            "POST" , 
            JSON.stringify({
              title : formState.inputs.title.value , 
              description : formState.inputs.description.value , 
              address : formState.inputs.address.value , 
              creator : auth.userId
            }),
            { 'Content-Type': 'application/json' }
          );
          navigate("/");

      } catch (error) {
        
      }
      
    }


  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
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
    </React.Fragment>
  )
};

export default NewPlace;