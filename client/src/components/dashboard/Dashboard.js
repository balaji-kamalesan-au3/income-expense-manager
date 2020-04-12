import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { getData,postIncome,postExpense } from "../../actions/dataActions";
import { Link } from "react-router-dom";

 


class Dashboard extends Component {

  constructor(props){
    super(props);
    this.state ={
      transactiontype : "income",
      transactionCategory : "",
      transactionAmount : 0,
      errors : {} 
    }
  }

  onSubmit = e => {
    e.preventDefault();
    console.log("Submitted")
  }
  
  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onChange = e => {
    this.setState({ transactiontype : e.target.value });
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  onAddIncome = (e) => {
    e.preventDefault();
    let income = {
      incomeSource : this.state.transactionCategory,
      incomeAmount : this.state.transactionAmount
    }
    if(income.incomeSource === "" || income.incomeAmount=== 0){
      alert("Please enter valid inputs");
    }
    else{
      this.props.postIncome(income);
      alert("Income added Successfully");
      this.setState({transactionCategory : "",transactionAmount:0})

    }
    
  }

  onAddExpense = (e) => {
    e.preventDefault();
    const expense = {
      expenseCategory : this.state.transactionCategory,
      expenseAmount : this.state.transactionAmount
    }
    if(expense.expenseCategory === "" || expense.expenseAmount === 0){
      alert("Please enter Valid Inputs");
    }
    else {
      this.props.postExpense(expense);
      alert("Expense added Successfully");
      this.setState({transactionCategory : "",transactionAmount:0})
    }

    
  }

  componentDidMount(){
   
    this.props.getData()
  }
render() {
    const { user } = this.props.auth;
    console.log(this.props);
return (
      <div style={{ height: "75vh" }} className="container ">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You are logged into {" "}
                <span style={{ fontFamily: "monospace" }}>Income-Expense Manager MERN</span> app 👏 
                <br />
                Click below to add Income or Expense
              </p>
            </h4>

            <Link to="/export" className="btn-flat waves-effect">
                <i className="material-icons right">arrow_forward</i> Click here for your Transaction
              </Link>


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

                <div className="input-field col s12">
                <input
                  onChange={this.handleChange}
                  value={this.state.transactionCategory}
                  id="transactionCategory"
                  type="text"
                />
                <label htmlFor="transactionCategory">Transaction Category</label>
              
                </div>
                <div className="input-field col s12">
                <input
                  onChange={this.handleChange}
                  value={this.state.transactionAmount}
                  id="transactionAmount"
                  type="text"
                />
                <label htmlFor="transactionAmount">Transaction Amount</label>
              
                </div>

                

            </form>
            {this.state.transactiontype === "income"?<button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onAddIncome}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Addincome
            </button>:
            <button
            style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem"
            }}
            onClick={this.onAddExpense}
            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
          >
            Addexpense
          </button>}
         
          </div>

          <div className="col s12 center-align">
          <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn-flat waves-effect"
            >
              Logout
            </button>
          </div>
      
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  data: state.data,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { logoutUser,getData,postIncome,postExpense }
)(Dashboard);