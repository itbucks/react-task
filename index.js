import React from "react";
import ReactDOM from "react-dom";
import './style.css';



class App extends React.Component {
    constructor(props){
       super(props);

       this.state = {
           fields: {},
           errors: {}
       }
    }

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Name
        if(!fields["name"]){
           formIsValid = false;
           errors["name"] = "Cannot be empty";
        }

        if(typeof fields["name"] !== "undefined"){
           if(!fields["name"].match(/^[a-zA-Z]+$/)){
              formIsValid = false;
              errors["name"] = "Only letters";
           }        
        }

        //Email
        if(!fields["email"]){
           formIsValid = false;
           errors["email"] = "Cannot be empty";
        }

        if(typeof fields["email"] !== "undefined"){
           let lastAtPos = fields["email"].lastIndexOf('@');
           let lastDotPos = fields["email"].lastIndexOf('.');

           if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
              formIsValid = false;
              errors["email"] = "Email is not valid";
            }
       }  

       this.setState({errors: errors});
       return formIsValid;
   }

   contactSubmit(e){
        e.preventDefault();

        if(this.handleValidation()){
           alert("Form submitted");
        }else{
           alert("Form has errors.")
        }

    }

    handleChange(field, e){         
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
    }

    render(){
        return (
            <div>           
               <form name="contactform" className="contactform" onSubmit= {this.contactSubmit.bind(this)}>
                    <div className="col-md-6">
                      <fieldset>
                      <legend>Form Subscription</legend>
                        <div> Subscribe</div>
                           <i class="fa fa-user" aria-hidden="true"></i>
                           <input required ref="name" type="text" size="30" placeholder="Your name" onChange={this.handleChange.bind(this, "name")} value={this.state.fields["name"]}/>
                           <span style={{color: "red"}}>{this.state.errors["name"]}</span>
                          <br/>
                          <i class="fa fa-envelope" aria-hidden="true"></i>
                         <input required refs="email" type="text" size="30" placeholder="Email" onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]}/>
                         <span style={{color: "red"}}>{this.state.errors["email"]}</span>
                         <br/>
                        <button class="button">Submit</button>
                     </fieldset>
                  </div>
              </form>
            </div>
      )
    }
}


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
