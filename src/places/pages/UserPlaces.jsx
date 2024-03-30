import PlaceList from "../components/PlaceList";
import {useParams} from "react-router-dom";

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
const UserPlaces = () => {
    const userId = useParams().userId;
    const loadedPlaces = dummyPlaces.filter(place => place.creator == userId)
    return (
        <PlaceList items={loadedPlaces} />
    );
};
export default UserPlaces; 