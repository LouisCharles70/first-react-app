import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faHeartBroken} from "@fortawesome/free-solid-svg-icons";

export default class Like extends Component {
	state = {}

	render(){
		return(<div>
         <FontAwesomeIcon
            className={"mr-2"} icon={this.props.liked ? faHeart : faHeartBroken}
            onClick={this.props.onClick}
         />
		</div>)
	}

}
