import React from "react";
import AmazonCognitoIdentity , {CognitoUserPool, ISignUpResult} from 'amazon-cognito-identity-js';
import {userPool} from "../aws/AWS";

export class SignUp extends React.Component {
    render() {
        let email:string = "";
        let password:string = "";
        return (
            <div>
                <h1>Sign Up</h1>
                <input placeholder="email" type="email" onChange={(event) => {
                    email = event.currentTarget.value
                }} ></input>
                <input placeholder="password" type="password" onChange={(event) => {
                    password = event.currentTarget.value
                }} ></input>
                <button onClick={(event) => {
                    console.log("Email = " + email + " , password = " + password);
                    userPool.signUp(email, password, [], [], (error, result) => {
                        if(error) {
                            console.error(error);
                            return;
                        }

                        console.log("Successfully signed up");
                        console.log(result);
                    })
                }} >Sign Up</button>
            </div>
        )
    }
}