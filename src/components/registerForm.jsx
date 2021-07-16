import React from "react";
import Joi from 'joi-browser';
import Form from "./common/form";
import {register} from "../services/userService";
import {loginWithJwt} from "../services/authService";

export default class RegisterForm extends Form {
   state = {
      data: {username: '', password: '', name: ''},
      errors:{}
   }

   schema = {
      username: Joi.string()
         .email({ minDomainSegments: 2})
         .required()
         .label("Username"),
      password: Joi.string()
         .min(5)
         .required()
         .label("Password"),
      name: Joi.string()
         .min(4)
         .required()
   }

   doSubmit = async () => {
      try{
         const response = await register(this.state.data);
         loginWithJwt(response.headers(["x-auth-token"]));
         window.location = "/";
      }catch (ex) {
         if(ex.response && ex.response.status === 400){
            const errors = {...this.state.errors};
            errors.username = ex.response.data;
            this.setState({errors});
         }
      }

   }

   validateProperty = ({name, value}) => {
      const obj = {[name]: value};
      const schema = {[name]: this.schema[name]};

      const {error} = Joi.validate(obj, schema);

      return error ? error.details[0].message : null;
   }


   render() {
      return (<div className="container">
         <form onSubmit={this.handleSubmit}>
            {this.renderInput('username','Username','email')}
            {this.renderInput('password','Password','password')}
            {this.renderInput('name','Name')}

            {this.renderButton("Register")}
         </form>
      </div>)
   }
}
