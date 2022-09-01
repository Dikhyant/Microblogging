import React from "react";
import { Link } from "react-router-dom";
import { Iuser } from "../interfaces/Interfaces";

export class UserListItem extends React.Component<Iuser> {
    render() {
        return (
            <Link to={`/${this.props.uid}`}>
            <div key={this.props.uid}>
                <span>{this.props.name}</span>
            </div>
            </Link>
        )
    }
}