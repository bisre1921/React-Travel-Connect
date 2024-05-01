import React, { useState } from "react";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import { useForm } from "../../shared/hooks/Form-Hook";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/Util/Validators";
import "./Auth.css";
import { useContext } from "react";
import AuthContext from "../../shared/Context/AuthContext";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ImageUpload from "../../shared/components/FormElements/ImgaeUpload";

const Auth = () => {
    const auth = useContext(AuthContext);
    const [isLoginMode , setIsLoginMode] = useState(true);
    const {isLoading , error , sendRequest , clearError} = useHttpClient();

    const [formState , inputHandler , setFormData] = useForm({
        email : {
            value : "" , 
            isValid : false
        } , 
        password : {
            value : "" , 
            isValid : false
        }
    } , false);

    const authSubmitHandler = async (event) => {
        event.preventDefault();
        if(isLoginMode) {
            try {
                const responseData = await sendRequest(
                    "http://localhost:5000/api/users/login" , 
                    "POST" ,  
                    JSON.stringify({
                        email : formState.inputs.email.value , 
                        password : formState.inputs.password.value
                    }) ,
                    {
                        "Content-Type" : "application/json"
                    } , 
                );   
                auth.login(responseData.user.id);  
            } catch (error) {
                
            }
                
            
        } else {
            try { 
                const responseData = await sendRequest(        
                    "http://localhost:5000/api/users/signup" , 
                    "POST" ,  
                    JSON.stringify({
                        name : formState.inputs.name.value , 
                        email : formState.inputs.email.value , 
                        password : formState.inputs.password.value
                    }) ,
                    {
                        "Content-Type" : "application/json"
                    }  
                );


                auth.login(responseData.user.id);
            } catch (error) {
            }
            
             
        }
        
       
    };

    const switchModeHandler = () => {
        if(!isLoginMode) {
            setFormData({
                ...formState.inputs , 
                name : undefined
            } , formState.inputs.email.isValid && formState.inputs.password.isValid)
        } else {
            setFormData({
                ...formState.inputs , 
                name : {
                    value : "" , 
                    isValid : false
                }
            } , false)
        }
        setIsLoginMode(prevState => !prevState);
    }
    
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <Card className="authentication">
                {isLoading && (
                    <LoadingSpinner asOverlay />
                )}
                <h2>
                    Login required
                </h2>
                <hr />
                <form onSubmit={authSubmitHandler}>
                    {!isLoginMode && (
                        <Input 
                            id="name" 
                            element="input" 
                            type="text" 
                            label="Your name" 
                            validators={[VALIDATOR_REQUIRE()]} 
                            errorText="please enter a name." 
                            onInput={inputHandler} 
                        />
                    )}
                    {!isLoginMode && <ImageUpload center id="image" />}
                    <Input 
                        id="email" 
                        element="input" 
                        type="email" 
                        label="E-Mail" 
                        validators={[VALIDATOR_EMAIL()]} 
                        errorText="please enter a valid email address" 
                        onInput={inputHandler} 
                    />
                    <Input 
                        id="password" 
                        element="input" 
                        type="password" 
                        label="Password" 
                        validators={[VALIDATOR_MINLENGTH(8)]} 
                        errorText="please enter a valid password , at least 8 characters" 
                        onInput={inputHandler} 
                    />
                    <Button type="submit" disabled={!formState.isValid}>
                        {isLoginMode ? "LOGIN" : "SIGN-UP"}
                    </Button>
                </form>
                <Button 
                    inverse
                    onClick={switchModeHandler}
                >
                Switch to {isLoginMode ? "SIGN-UP" : "LOGIN"}
                </Button>
                </Card>
            </React.Fragment>
    )
};
export default Auth;