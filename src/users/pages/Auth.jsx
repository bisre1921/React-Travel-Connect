import { useState } from "react";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import { useForm } from "../../shared/hooks/Form-Hook";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/Util/Validators";
import "./Auth.css";
import { useContext } from "react";
import AuthContext from "../../shared/Context/AuthContext";

const Auth = () => {
    const auth = useContext(AuthContext);
    const [isLoginMode , setIsLoginMode] = useState(true);

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

    const authSubmitHandler = (event) => {
        event.preventDefault();
        console.log(formState.inputs);
        auth.login();
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
        <Card className="authentication">
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
    )
};
export default Auth;