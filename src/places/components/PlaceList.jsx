import "../../shared/components/UIElements/Card";
import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import "./PlaceList.css";

const PlaceList = (props) => {
    if(props.items.length === 0) {
        return (
            <div className="place-list center">
                <Card className="bg-white py-10 px-6">
                    <h2 className="font-bold text-2xl">No Item Found. Create One?</h2>
                    <button>Share Place</button>
                </Card>
            </div>
        );
    } else {
        return (
            <div>
                <ul className="place-list">
                    {props.items.map(place => 
                        <PlaceItem 
                            key={place.id} 
                            id={place.id} 
                            image={place.imageUrl} 
                            title={place.title}
                            description={place.description}
                            address={place.address}
                            creatorId={place.creator}
                            coordinates={place.location}
                        />)}
                </ul>
            </div>
        )
    }

  
}

export default PlaceList