import {useParams} from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/Util/Validators";
import Button from "../../shared/components/FormElements/Button";
import "./placeForm.css";
import {useForm} from "../../shared/hooks/Form-Hook";
import { useEffect } from "react";
import { useState } from "react";


const dummyPlaces =[ 
    {
        id: "p1" , 
        title : "empire state building" , 
        description : "the best building in the world" , 
        imageUrl : "https://media.timeout.com/images/101705309/image.jpg" , 
        address : "20 W 34th st, New York , NY 10001" , 
        location : {
            lat : 40.7484405 , 
            lng : -73.9878584
        } , 
        creator : "u1"
    } , 
    {
        id: "p2" , 
        title : "emp. state building" , 
        description : "the best building in the world" , 
        imageUrl : "https://media.timeout.com/images/101705309/image.jpg" , 
        address : "20 W 34th st, New York , NY 10001" , 
        location : {
            lat : 40.7484405 , 
            lng : -73.9878584
        } , 
        creator : "u2"
    } ,
]




const UpdatePlace = () => {
    const [isLoading , setIsLoading] = useState(true);
    const placeId = useParams().placeId
    const identifiedPlace = dummyPlaces.find(p => p.id === placeId);



    const [formState , inputHandler , setFormData] = useForm({
        title : {
            value : "" , 
            isValid : false
        } , 
        description : {
            value : "" , 
            isValid : false
        }
    } , false);

    useEffect(() => {
        if(identifiedPlace) {
            setFormData(
                {
                    title : {
                        value : identifiedPlace.title , 
                        isValid : true
                    } , 
                    description : {
                        value : identifiedPlace.description , 
                        isValid : true
                    }
                } , true
            )
        }
        setIsLoading(false);
    } , [setFormData , identifiedPlace])

    
    const placeUpdateSubmitHandler = (event) => {
        event.preventDefault();
        console.log(formState.inputs);
    }

    if(!identifiedPlace) {    
        return (
            <div className="center">
                <h2>Could not find a place</h2>
            </div>
        )
    };

    if(isLoading) {
        return (
            <div className="center">
                <h2>Loading...</h2>
            </div>
        )
    }
    return (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
            <Input 
                id="title" 
                element="input" 
                type="text" 
                label="Title" 
                validators={[VALIDATOR_REQUIRE()]}
                errorText="please enter a valid title"
                onInput={inputHandler}
                initialValue={formState.inputs.title.value}
                InitialValid={formState.inputs.title.isValid}
            />
            <Input 
                id="description" 
                element="input" 
                type="text" 
                label="Description" 
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="please enter a valid description"
                onInput={inputHandler}
                initialValue={formState.inputs.description.value}
                InitialValid={formState.inputs.description.isValid}
            />
            <Button type="submit" disabled={!formState.isValid}>
                UPDATE_PLACE
            </Button>
        </form>
    )
};
export default UpdatePlace;
