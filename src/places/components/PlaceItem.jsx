import { useState } from "react";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import "./PlaceItem.css";
import Modal from "../../shared/components/UIElements/Modal";
import { useContext } from "react";
import AuthContext from "../../shared/Context/AuthContext";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const PlaceItem = (props) => {
    const {isLoading , error , sendRequest , clearError} = useHttpClient();
    const auth = useContext(AuthContext);
    const [showMap , setShowMap] = useState(true);
    const [showConfirmModal , setShowConfirmModal] = useState(false);

    const openMapHandler = () => setShowMap(true);
    const closeMapHandler = () => setShowMap(false);

    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
    };

    const cancelDeleteHandler = () => {
        setShowConfirmModal(false);
    };

    const confirmDeleteHandler = async () => {
        setShowConfirmModal(false);
        //console.log("deleted");
        try {
            await sendRequest(
                `http://localhost:5000/api/places/${props.id}` , 
                "DELETE"
            );
            props.onDelete(props.id);
        } catch (error) {
            
        }
        

    }

  return (
    <div>
        <ErrorModal error={error} onClear={clearError} />
        <Modal 
            show={showMap} 
            onCancel={openMapHandler} 
            header={props.address} 
            contentClass="place-item__modal-content" 
            footerClass="place-item__modal-actions"
            footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
        >
            <div className="map-container">
                <h2 className="font-bold text-2xl text-center">No Map Yet!!!</h2>
            </div>
        </Modal>
        <Modal 
            show={showConfirmModal}
            onCancel={cancelDeleteHandler}
            header="Are you sure?" 
            footerClass="place-item__modal-actions" 
            footer={
                <div>
                    <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
                    <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
                </div>
            }
        >
            <p>
                Do you want to proceed and delete this place?
            </p>
        </Modal>
        <li className="place-item">
            {isLoading && <LoadingSpinner asOverlay  />}
            <Card className="place-item__content">
                <div className="place-item__image">
                    <img 
                        src={props.image}
                        alt={props.title} 
                    />
                </div>
                <div className="place-item__info">
                    <h2>{props.title}</h2>
                    <h3>{props.address}</h3>
                    <p>{props.description}</p>
                </div>
                <div className="place-item__actions">
                    <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
                    {auth.isLoggedIn && (<Button to={`/places/${props.id}`}>EDIT</Button>)}
                    {auth.isLoggedIn && (<Button danger onClick={showDeleteWarningHandler}>DELETE</Button>)}
                </div>
            </Card>
        </li>
    </div>
  )
}

export default PlaceItem