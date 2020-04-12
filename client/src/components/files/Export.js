import React, {Component} from 'react';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { getData } from "../../actions/dataActions";
import Table from '../layout/table';
class Export extends Component {

    constructor(props){
        super(props)
        this.state= {
            transactiontype : "income",
            
        }
    }

    onChange = e => {
        
        this.setState({ transactiontype : e.target.value })
       
      };
    
    onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    };

        
    componentDidMount(){
        this.props.getData()
      }

     
 
    render() {
        console.log(this.state)
        return (

            <div className="container">
            <div className="row">
                <div className="col s12 center-align">

                <form onSubmit = {this.onSubmit}>
                <h5>Transaction Type </h5>
                <label>
                  <input className="with-gap"
                  name="group1" 
                  type="radio" 
                  checked={this.state.transactiontype === "income"}  
                  value ="income" onChange={this.onChange}/>
                  <span>Income</span>
                </label>

                <label>
                  <input 
                  className="with-gap" 
                  name="group1" 
                  type="radio" 
                  checked={this.state.transactiontype === "expense"} 
                  value="expense" 
                  onChange={this.onChange}/>
                  <span>Expense</span>
                </label>

            

            </form>

                <Table type = {this.state.transactiontype} />
                    
                </div>
            </div>

        </div>

        );
    }
}
 
Export.propTypes = {
   
    auth: PropTypes.object.isRequired,
    data : PropTypes.object.isRequired
  };


const mapStateToProps = state => ({
    auth: state.auth,
    data: state.data.data,
    errors: state.errors
  });
  export default connect(
    mapStateToProps,
    { logoutUser,getData }
  )(Export);