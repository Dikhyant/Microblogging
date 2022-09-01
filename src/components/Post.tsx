import React ,{ ReactNode } from "react";
import { Ipost, IpostProps } from "../interfaces/Interfaces";

export class Post extends React.Component<IpostProps> {
    render(): ReactNode {
        const postImage:JSX.Element = this.props.imageUrl == null ? (<span></span>) : (<img src = {`${this.props.imageUrl}`} />)
        return (
            <div className={"post"}>
                <div className={"head"}>
                    <div style={{width: "60px", height: "60px", backgroundColor: "grey", borderRadius: "50%"}} ></div>
                    <div className={"text-container"}>
                        <div className={"name"}>{this.props.name}</div>
                        <div className={"time-stamp"} >09 August 2019</div>
                    </div>
                </div>

                <div className={"body"}>
                    {this.props.text}
                </div>

                <div>
                    {postImage}
                </div>
            </div>
        );
    }
}