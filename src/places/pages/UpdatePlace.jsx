import {useParams , useNavigate} from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/Util/Validators";
import Button from "../../shared/components/FormElements/Button";
import "./placeForm.css";
import {useForm} from "../../shared/hooks/Form-Hook";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import AuthContext from "../../shared/Context/AuthContext";






const UpdatePlace = () => {
    const auth = useContext(AuthContext);
    const {isLoading , error , sendRequest , clearError} = useHttpClient();
    const [loadedPlace , setLoadedPlaces] = useState();
    const placeId = useParams().placeId
    const navigate = useNavigate();

    const [formState, inputHandler, setFormData] = useForm(
        {
          title: {
            value: '',
            isValid: false
          },
          description: {
            value: '',
            isValid: false
          }
        },
        false
      );

    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/places/${placeId}`);
                setLoadedPlaces(responseData.place);
                setFormData(
                    {
                        title : {
                            value : responseData.title , 
                            isValid : true
                        } , 
                        description : {
                            value : responseData.description , 
                            isValid : true
                        }
                    } , true 
                )
            } catch (error) {
                
            }
        };

        fetchPlace();

    } , [sendRequest , placeId , setFormData])



    
    const placeUpdateSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            await sendRequest(
                `http://localhost:5000/api/places/${placeId}` ,
                "PATCH" , 
                JSON.stringify({
                   title : formState.inputs.title.value , 
                   description: formState.inputs.description.value
                }) , 
                {
                   "Content-Type" : "application/json"
                }
             );
             navigate("/" + auth.userId + "/places");
        } catch (error) {
            
        }
        
    };

    if(isLoading) {
        return (
            <div className="center">
                <LoadingSpinner />
            </div>
        )
    }

    if(!loadedPlace && !error) {    
        return (
            <div className="center">
                <h2>Could not find a place</h2>
            </div>
        )
    };

   
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {!isLoading && loadedPlace && (
                <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
                    <Input 
                        id="title" 
                        element="input" 
                        type="text" 
                        label="Title" 
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="please enter a valid title"
                        onInput={inputHandler}
                        initialValue={loadedPlace.title}
                        InitialValid={true}
                    />
                    <Input 
                        id="description" 
                        element="input" 
                        type="text" 
                        label="Description" 
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText="please enter a valid description"
                        onInput={inputHandler}
                        initialValue={loadedPlace.description}
                        InitialValid={true}
                    />
                    <Button type="submit" disabled={!formState.isValid}>
                        UPDATE_PLACE
                    </Button>
                </form>
            )} 
        </React.Fragment>
    )
};
export default UpdatePlace;
