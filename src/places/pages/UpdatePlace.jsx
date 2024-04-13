import {useParams} from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/Util/Validators";
import Button from "../../shared/components/FormElements/Button";
import "./placeForm.css";


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
        title : "empire state building" , 
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
    const placeId = useParams().placeId
    const identifiedPlace = dummyPlaces.find(p => p.id === placeId);

    if(!identifiedPlace) {
        return (
            <div className="center">
                <h2>Could not find a place</h2>
            </div>
        )
    }
    return (
        <form className="place-form">
            <Input 
                id="title" 
                element="input" 
                type="text" 
                label="Title" 
                validators={[VALIDATOR_REQUIRE()]}
                errorText="please enter a valid title"
                onInput={() => {}}
                value={identifiedPlace.title}
                valid={true}
            />
            <Input 
                id="description" 
                element="input" 
                type="text" 
                label="Description" 
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="please enter a valid description"
                onInput={() => {}}
                value={identifiedPlace.description}
                valid={true}
            />
            <Button type="submit" disabled={true}>
                UPDATE_PLACE
            </Button>
        </form>
    )
};
export default UpdatePlace;