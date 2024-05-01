import { useRef } from "react";
import "./ImageUpload.css";

const ImageUpload = (props) => {
    const filePickerRef = useRef();

    const pickedHandler = (event) => {
        console.log(event.target);
    }

    const pickImageHandler = () => {
        filePickerRef.current.click();
    }
    return (
        <div className="form-control">
            <input 
                type="file" 
                ref={filePickerRef}
                id={props.id}
                style={{display: "none"}}
                accept=".jpg , .png , .jpeg"
                onChange={pickedHandler}
            />
            <div className={`image-upload ${props.center && "center"}`}>
                <div className="image-upload__preview">
                    <img src="" alt="preview" />
                </div>
                <button 
                    type="button" 
                    onClick={pickImageHandler}
                >
                    PICK IMAGE
                </button>
            </div>
        </div>
    )
};

export default ImageUpload;