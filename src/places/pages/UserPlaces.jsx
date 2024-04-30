import React, { useEffect } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import PlaceList from "../components/PlaceList";
import {useParams} from "react-router-dom";
import { useState } from "react";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

// const dummyPlaces =[ 
//     {
//         id: "p1" , 
//         title : "empire state building" , 
//         description : "the best building in the world" , 
//         imageUrl : "https://media.timeout.com/images/101705309/image.jpg" , 
//         address : "20 W 34th st, New York , NY 10001" , 
//         location : {
//             lat : 40.7484405 , 
//             lng : -73.9878584
//         } , 
//         creator : "u1"
//     } , 
//     {
//         id: "p2" , 
//         title : "emp. state building" , 
//         description : "the best building in the world" , 
//         imageUrl : "https://media.timeout.com/images/101705309/image.jpg" , 
//         address : "20 W 34th st, New York , NY 10001" , 
//         location : {
//             lat : 40.7484405 , 
//             lng : -73.9878584
//         } , 
//         creator : "u2"
//     } ,
//     ]

const UserPlaces = () => {
    const [loadedPlaces , setLoadedPlaces] = useState();
    const {isLoading , error , sendRequest , clearError} = useHttpClient();

    const userId = useParams().userId;

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
                setLoadedPlaces(responseData.places);
            } catch (error) {
                
            }
            
        };
        fetchPlaces();

    } , [sendRequest , userId]);

    const placeDeleteHandler = (deletedPlaceId) => {
        setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId));
    }

    //const loadedPlaces = dummyPlaces.filter(place => place.creator == userId)
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler} />} 
        </React.Fragment>
        
    );
};
export default UserPlaces; 
