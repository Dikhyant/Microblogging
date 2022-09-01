import React from "react";
import {withRouter} from "react-router-dom";
import { IuserInfo, Ipost, Iuser } from "../interfaces/Interfaces";
import { Post } from "./Post";
import { userInfos, users, posts } from "../localDB/userDB";
import { UserListItem } from "./UserListItem";
import imageIcon from "../images/icons/image_icon.svg";

import "../styles/index.css";
import { addPostAPIUrl, backendUrl, formDataKey, getPostsAPIUrl, getUserInfoAPIUrl, getUsersAPIUrl } from "../Networks";
import { UserInfo } from "os";

let postsInfo:Ipost[] = [];
let usersDb: Iuser[] = [];

let date: Date = new Date();
// let po: Ipost = {
//     creationTime: {
//         seconds: date.getSeconds(),
//         minutes: date.getMinutes(),
//         hours: date.getHours(),
//         day: date.getDate(),
//         month: date.getMonth(),
//         year: date.getFullYear(),
//     }
// }

type ProfileState = {
    jwt: string,
    userInfo: IuserInfo,
    isCurrentUser: boolean,
    hasNoPost: boolean,
}


class Profile extends React.Component<any, ProfileState> {
    post:Ipost = {
        uid: "",
        creationTime: {
            seconds: date.getSeconds(),
            minutes: date.getMinutes(),
            hours: date.getHours(),
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
        }
    }

    imageFile: any = null

    postTextareaStyle:React.CSSProperties = {

    }

    userInfo: IuserInfo = {
        uid: "",
        name: ""
    }

    constructor(prop: any) {
        super(prop);
        this.state = {
            jwt: "",
            isCurrentUser: true , userInfo: {uid: "", name: "", posts: undefined},
            hasNoPost: true
        };
        fetch(backendUrl + getUsersAPIUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },       
        }).then(response => (response.json()))
        .then(data => {
            usersDb = [];
            for(let item of data) {
                usersDb.push({
                    uid: item.uid as string,
                    name: item.name as string,
                    dpUrl: item.dpUrl as string
                })
            }
        })
    }

    addPost(p: Ipost, imageFile: any = null){
        console.log("addPost");
        console.log(p);
        console.log(imageFile);

        const formData: FormData = new FormData();
        formData.append(formDataKey.IMAGE, imageFile);
        formData.append(formDataKey.PAYLOAD, JSON.stringify({
            jwt: this.state.jwt,
            uid: this.state.userInfo.uid,
            text: p.text,
            creationTime: p.creationTime,
            imageUrl: p.imageUrl
        }));

        fetch(backendUrl + addPostAPIUrl, {
            method: "POST",
            body: formData
        }).then(response => (response.json()))
        .then(data => {
            let post: Ipost = {
                uid: data.uid,
                creationTime: data.creationTime,
                text: data.text,
                imageUrl: data.imageUrl
            }
            this.setState({
                ...this.state, userInfo: {
                    ...this.state.userInfo, posts: [post, ...this.state.userInfo.posts as Ipost[]]
                }
            })
        }).catch(error => {
            console.error(error);
        }).catch(error => {
            console.error(error);
        })
    }

    handleChangeInUrl(){
        let { uid } = this.props.match.params;

        const jwt: string = document.cookie.split("; ").find(item => item.startsWith("jwt"))?.split("=")[1] as string;
        var currentUserUid: string = "";
        if(jwt !== undefined) {
            currentUserUid = (JSON.parse(window.atob(jwt.split('.')[1]))).sub;
        }

        if(this.state.userInfo.uid !== uid) {
            // TODO
            /*
                FETCH DATA FROM LOCAL STORAGE OF CLIENT DEVICE IF AVAILABLE
            */

            const allCookies: string = document.cookie;
            const usersString: string = allCookies.split("; ").find(item => item.startsWith("users"))?.split("=")[1] as string;
            console.log(usersString);

            if(usersString === undefined) {
                fetch(backendUrl + getUserInfoAPIUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        uid: uid
                    })
                }).then(response => (response.json()))
                .then(data => {
                    this.setState({
                        ...this.state,
                        jwt: jwt,
                        isCurrentUser: (currentUserUid === uid),
                        userInfo: {
                            ...this.state.userInfo,
                            uid: data.uid,
                            name: data.name,
                            dpUrl: data.dpUrl,
                            bio: data.bio,
                            posts: undefined
                            }
                    })
                }).catch(error => {
                    console.error(error);
                }).catch(error => {
                    console.error(error);
                })

                return;
            }

            const users: Iuser[] = JSON.parse(usersString) as Iuser[];
            console.log(users);

            const user: Iuser = users.find(u => u.uid === uid) as Iuser;

            if(user === undefined) {
                fetch(backendUrl + getUserInfoAPIUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        uid: uid
                    })
                }).then(response => (response.json()))
                .then(data => {
                    this.setState({
                        ...this.state,
                        jwt: jwt,
                        isCurrentUser: (currentUserUid === uid),
                        userInfo: {
                            ...this.state.userInfo,
                            uid: data.uid,
                            name: data.name,
                            dpUrl: data.dpUrl,
                            bio: data.bio,
                            posts: undefined
                            }
                    })
                }).catch(error => {
                    console.error(error);
                }).catch(error => {
                    console.error(error);
                })

                return;
            }

            this.setState({
                ...this.state,
                jwt: jwt,
                isCurrentUser: (currentUserUid === uid),
                userInfo: {
                    ...this.state.userInfo,
                    uid: user.uid,
                    name: user.name,
                    dpUrl: user.dpUrl,
                    bio: user.bio,
                    posts: undefined
                    }
            })

            return;
        }

        if(this.state.userInfo.posts !== undefined) return;
    
        // TODO
        /*
            STORE THE FETCHED DATA IN CLIENT DEVICE FOR TEMPORARY PERIOD
        */
        fetch(backendUrl + getPostsAPIUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid: this.state.userInfo.uid
            })
        }).then( response => {
            return response.json();
        } ).then(data => {
            let posts: Ipost[] = [];
            for(let item of data) {
                posts.push({
                    uid: item.uid,
                    creationTime: item.creationTime,
                    imageUrl: item.imageUrl,
                    text: item.text
                })
            }

            this.setState({
                ...this.state,
                userInfo: {
                    ...this.state.userInfo,
                    posts: posts,
                },
                hasNoPost: false
            })
            console.log(posts);
        })
    }

    render() {
        this.handleChangeInUrl();
        let renderPosts:JSX.Element[] = [];

        if(this.state.userInfo.posts !== null && this.state.userInfo.posts !== undefined) {
            renderPosts = this.state.userInfo.posts?.map((p:Ipost) => (
                <Post uid={p.uid} name={this.state.userInfo.name} creationTime={p.creationTime} text={p.text} imageUrl={p.imageUrl} />
            ));
        }

        const addPostSection = this.state.isCurrentUser ? (
            <div className={"add-post"} >
                <div className={"textarea-section"}>
                    <div style={{width: "60px", height: "60px", borderRadius: "50%", backgroundColor: "grey", flex: "1"}} ></div>
                    <textarea placeholder="Wanna say something?" style={{marginLeft: "2vw", flex: "11"}} onChange={(event)=>{
                        event.currentTarget.style.height = "4vh";
                        this.post.text = event.currentTarget.value as string;
                        event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`;
                    }}></textarea>
                </div>
                <div style={{display: "flex", flexDirection: "row", marginTop: "3vh"}} >
                    <div style={{flex: "1"}} >
                        <input type={"file"} onChange={(event)=>{
                        this.imageFile = (event.currentTarget.files as FileList )[0];
                        console.log((event.currentTarget.files as FileList )[0]);
                    }} ></input>
                    </div>

                    <div style={{flex: "9"}} ></div>

                    <div style={{flex: "2"}} className={"btn"} onMouseDown={(event)=>{
                        event.currentTarget.style.backgroundColor = "#0081B8";
                    }} onMouseUp={(event)=>{
                        event.currentTarget.style.backgroundColor = "#1EBBFF";
                    }} onClick={event=>{
                        console.log("post btn on-click");
                        if(this.post.text === undefined || (this.post.text as string).replace(/\s/g, '').length == 0) {
                            return;
                        }
                        this.addPost.bind(this)(this.post, this.imageFile);
                    }} >Post</div>
                </div>

                
            </div>
        ) : (<span></span>);

        const userList = usersDb.map( (user:Iuser)=>{
            return (
                <UserListItem uid={user.uid} name={user.name} />
            )
        } )


        return (
            <div>
                <header className={"header dark-shade"}>
                    <div className={"image profile-image"} style={{flex: "1"}} ></div>
                    <div className={"mega-text bold white-font"} style={{marginLeft: "2rem", flex: "7"}} >{this.state.userInfo.name}</div>
                    <div style={{flex: "2"}} ></div>
                    <div className={"nav-drawer-btn"} style={{flex: "2"}} >Nav Drawer Btn</div>
                </header>
                
                <div className={"content-container"}>
                    <div style={{flex: "2"}} ></div>
                    <div className={"content"} style={{flex: "8"}} >
                        {addPostSection}
                        {renderPosts}
                    </div>
                    <div style={{flex: "2"}} ></div>
                </div>
                
                <h3>User List</h3>
                <div>
                    {userList}
                </div>
            </div>
        );
    }
}

export default withRouter(Profile);