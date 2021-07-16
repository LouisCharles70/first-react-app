import React, {Component} from "react";
import {Link} from "react-router-dom";

class NavBar extends Component {
   state = {}

   render() {
      const {user} = this.props;

      return (<nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
         <a className="navbar-brand" href="#">Vidly</a>

         <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
               <li className="nav-item nav-link" style={{marginRight: "20px"}}>
                  <Link to={"/movies"}>Movies</Link>
               </li>
               <li className="nav-item nav-link" style={{marginRight: "20px"}}>
                  <Link to={"/customers"}>Customers</Link>
               </li>
               <li className="nav-item nav-link" style={{marginRight: "20px"}}>
                  <Link to={"/rentals"}>Rentals</Link>
               </li>

               {!user && <React.Fragment>
                  <li className="nav-item nav-link">
                     <Link to={"/register"}>Register</Link>
                  </li>

                  <li className="nav-item nav-link">
                     <Link to={"/login"}>Login</Link>
                  </li>
               </React.Fragment>}

               {user && <React.Fragment>
                  <li className="nav-item nav-link">
                     <Link to={"/logout"}>Logout</Link>
                  </li>

                  <li className="nav-item nav-link text-white" style={{position: "absolute", right: "20px"}}>
                     {user ? user.name : ""}
                  </li>
               </React.Fragment>}
            </ul>
         </div>
      </nav>)
   }
}

export default NavBar;
