import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { getData,postIncome,postExpense } from "../../actions/dataActions";

import Table from "../layout/Table";
class Dashboard extends Component {
  
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  onAddIncome = (e) => {
    e.preventDefault();
    let income = {
      incomeSource : "Salary",
      incomeAmount : "400000"
    }
    
    this.props.postIncome(income);
  }

  onAddExpense = (e) => {
    e.preventDefault();
    const expense = {
      expenseCategory : "Movie",
      expenseAmount : "50000"
    }

    this.props.postExpense(expense);
  }

  componentDidMount(){
   
    this.props.getData()
  }
render() {
    const { user } = this.props.auth;
    console.log(this.props);
return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You are logged into a full-stack{" "}
                <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
              </p>
            </h4>
            <Table data={this.props.data.data}/>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onAddIncome}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Add income
            </button>
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
              Add expense
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
  data: state.data
});
export default connect(
  mapStateToProps,
  { logoutUser,getData,postIncome,postExpense }
)(Dashboard);