import React, {Component} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {ToastContainer} from "react-toastify";

import LoginForm from "./components/loginForm";
import Logout from "./components/logout";

import RegisterForm from "./components/registerForm";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";

import MovieForm from "./components/movieForm";
import NavBar from "./components/navBar";

import NotFound from "./components/notFound";
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {getCurrentUser} from "./services/authService";
import {ProtectedRoute} from "./components/common/protectedRoute";

export default class App extends Component {
	state = {};

	componentDidMount() {
		this.setState({user: getCurrentUser()});
	}

	render(){
		return(<main role="main" className="container-fluid">
			<NavBar user={this.state.user}/>
			<ToastContainer/>

			<div style={{marginTop: "100px"}}>
				<Switch>
					<Route path={"/login"} exact component={LoginForm}/>
					<Route path={"/logout"} component={Logout}/>
					<Route path={"/register"} exact component={RegisterForm}/>
					<Route path={"/movies"} exact render={props => <Movies
						{...props} user={this.state.user}
					/>}/>
					<ProtectedRoute path={"/movies/:movieId"} component={MovieForm}/>
					<Route path={"/customers"} component={Customers}/>
					<Route path={"/rentals"} component={Rentals}/>
					<Route path={"/not-found"} component={NotFound}/>

					<Redirect from={"/"} exact to={"/movies"}/>
					<Redirect to={"/not-found"}/>
				</Switch>
			</div>
		</main>)
	}

}
