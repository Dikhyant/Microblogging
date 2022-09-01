import React from "react";
import AmazonCognitoIdentity , {AuthenticationDetails, CognitoUser, CognitoUserPool} from 'amazon-cognito-identity-js';
import { userPool } from "../aws/AWS";

import FacebookLogo from "../images/logos/facebook_logo.svg";
import FLogo from "../images/logos/facebook_f_logo.svg";
import AppleLogo from "../images/logos/apple_logo.svg";
import AppleWhiteLogo from "../images/logos/apple_white_logo.svg";
import GoogleLogo from "../images/logos/google_logo.svg";
import { backendUrl, signInUser } from "../Networks";
import { Ijwt, Iuser } from "../interfaces/Interfaces";
import { useHistory, withRouter } from "react-router-dom";

// const arkImg = require("../images/arkham_knight.jpg");
//import arkImg from "../images/arkham_knight.jpg";

let email:string = "";
let password:string = "";

declare var gapi: any;
declare var google: any;
declare var AWS: any;

/*
style={{ 
    marginTop: "3vh",
    paddingTop: "1vh", paddingBottom: "1vh" ,
    backgroundColor: "#1EBBFF", textAlign: "center",
    color: "white", fontWeight: "bold"
    }}
*/

type props = {
    history: any
}

class SignIn extends React.Component<props, any> {

    componentDidMount(){
        if(typeof google !== "undefined") {
            console.log(google);
            this.loadGoogleSignIn();
            return;
        }

        const googleCDNScript = document.getElementById("gsi");
        console.log(googleCDNScript);
        if(googleCDNScript && googleCDNScript.onload) {
            googleCDNScript.onload = (event) => {
                this.loadGoogleSignIn.bind(this)();
            }
        }
    }

    loadGoogleSignIn() {
        google.accounts.id.initialize({
            client_id: "276715839652-8e4hb62sp6uoen3vv9a1ssimb0kqltj8.apps.googleusercontent.com",
            callback: this.handleCredentialResponse.bind(this)
          });
        google.accounts.id.renderButton(
        document.getElementById("google-sign-in-btn"),
        { theme: "outline", size: "large", width: "220px" }  // customization attributes
        );
        google.accounts.id.prompt();
    }

    handleCredentialResponse(response: any) {
        const encodedPayload: any = response.credential;
        console.log("JWT - ");
        console.log(encodedPayload);
        const payLoad: any = JSON.parse(window.atob(encodedPayload.split('.')[1]));
        console.log("pay load - ");
        console.log(payLoad);

        document.cookie = `jwt = ${encodedPayload}`;

        fetch(backendUrl + signInUser, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                jwt: encodedPayload
            } as Ijwt)
        }).then( (response: any) => response.json() )
        .then(data => {
            console.log("Response from server");
            console.log(data);
            const user: Iuser = {
                uid: data.uid,
                name: data.name,
                dpUrl: data.dpUrl,
                bio: data.bio
            }

            const usersString: string = document.cookie.split("; ").find(item => item.startsWith("users"))?.split("=")[1] as string;
            if(usersString === undefined) {
                document.cookie = "users = "+JSON.stringify([user]);
                this.props.history.push(`/${data.uid}`);
                return;
            }

            const users:Iuser[] = JSON.parse(usersString);
            let u: number;
            for(u = 0; u < users.length; u++) {
                if(users[u].uid === data.uid) {
                    users[u] = {
                        uid: data.uid,
                        name: data.name,
                        dpUrl: data.dpUrl,
                        bio: data.bio
                    }
                }
            }

            if(u < users.length) {
                users.push({
                    uid: data.uid,
                    name: data.name,
                    dpUrl: data.dpUrl,
                    bio: data.bio
                })
            }

            document.cookie = "users = "+JSON.stringify([user]);
            this.props.history.push(`/${data.uid}`);
        }).catch(error => {
            console.error(error);
        }).catch(error => {
            console.log(error);
        })

        /* AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: "us-east-1_xwqLJUdgl",
            Logins: {
               'accounts.google.com': response.credential
            }
         });
    
         // Obtain AWS credentials
         AWS.config.credentials.get(function(){
            // Access AWS resources here.
            console.log("AWS logged in");
         }); */
    }

    render() {
        //const imageFile: fs.ReadStream = fs.createReadStream("../images/arkham knight.jpg") as fs.ReadStream;

        return (
            <div className={"sign-in-page"}>

                <div className={"site-title"}>Micro B</div>

                <div className={"sign-in-container"} >
                    <div style={{height: "5vh", marginTop: "10vh"}} ><input className={"text-input"} placeholder="Email" ></input></div>
                    <div style={{height: "5vh", marginTop: "2vh"}} ><input className={"text-input"} placeholder="Password" ></input></div>
                    <div style={{marginTop: "2vh", color: "#828282", fontSize: "10px"}} >Forgot password ?</div>
                    <div style={{ 
                        marginTop: "3vh",
                        paddingTop: "1vh", paddingBottom: "1vh" ,
                        backgroundColor: "#1EBBFF", textAlign: "center",
                        color: "white", fontWeight: "bold"
                        }}  >Log in</div>

                    <div style={{display: "flex", alignItems: "center", marginTop: "5vh"}} >
                        <div className={"line"} ></div>
                        <div style={{textAlign: "center", fontSize: "7px"}} >Or</div>
                        <div className={"line"} ></div>
                    </div>

                    <div id="google-sign-in-btn" style={{marginTop: "3vh"}} ></div>

                    <div style={{display: "flex", marginTop: "3vh"}} >
                        <div style={{flex:1 , backgroundColor: "#1877F2", height: "5vh", display: "flex", alignItems: "center"}} >
                            <div style={{textAlign: "center", width: "100%"}} ><img src={FLogo} style={{width: "1.5vw", aspectRatio: "1/1"}} /></div>
                        </div>

                        <div style={{flex: 0.25}} ></div>
                        
                        <div style={{flex:1 , backgroundColor: "#000", height: "5vh", display: "flex", alignItems: "center"}} >
                            <div style={{textAlign: "center", width: "100%"}} ><img src={AppleWhiteLogo} style={{width: "1.5vw", aspectRatio: "1/1"}} /></div>
                        </div>

                        {/* <div><img className={"logo"} src={FacebookLogo} alt="f" /></div>
                        <div style={{textAlign: "center"}} ><img className={"logo"} src={AppleLogo} alt="f" /></div>
                        <div style={{textAlign: "right"}} ><img className={"logo"} src={GoogleLogo} alt="f" /></div> */}
                    </div>

                    <div style={{
                        textAlign: "center", fontSize: "10px", color: "#828282",
                        marginTop: "3vh", marginBottom: "1vh"}} >Don’t have an account?</div>
                </div>

                {/* <h1>Sign In</h1>
                <input placeholder="email" type="email" onChange={(event) => {
                    email = event.currentTarget.value
                }} ></input>
                <input placeholder="password" type="password" onChange={(event) => {
                    password = event.currentTarget.value
                }} ></input>
                <button onClick={(event) => {
                    console.log("Email = " + email + " , password = " + password);
                    const authDetails: AuthenticationDetails = new AuthenticationDetails({
                        Username: email,
                        Password: password,
                    })

                    const cognitoUser = new CognitoUser({
                        Username: email,
                        Pool: userPool,
                    })

                    cognitoUser.authenticateUser(authDetails, {
                        onSuccess: function(session){
                            console.log("Succesfully signed in");
                            console.log(session);
                        },
                        onFailure: function(error){
                            console.error(error);
                        }
                    })
                }} >Sign in</button> */}
            </div>
        )
    }
}

export default SignIn;