import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import { useForm } from "../../shared/hooks/Form-Hook";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "../../shared/Util/Validators";
import "./Auth.css";

const Auth = () => {
    const [formState , inputHandler] = useForm({
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
    };

    return (
        <Card className="authentication">
            <h2>
                Login required
            </h2>
            <hr />
            <form onSubmit={authSubmitHandler}>
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
                    Login
                </Button>
            </form>
            </Card>
    )
};
export default Auth;