import {CognitoUserPool} from 'amazon-cognito-identity-js';


export const userPool = new CognitoUserPool({
    UserPoolId: "us-east-1_xwqLJUdgl",
    ClientId: "2sa3c6pp1fpklblbdd7o7d89bb",
})