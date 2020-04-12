import React from 'react'
import { connect } from "react-redux";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const Table = (props) => {
    let data = undefined;
   if(props.data !== null){
    if(props.type === "income") data= props.data.income;
    else data= props.data.expense;
   }
   
    console.log(data)
   
    if(data === undefined || data.length === 0){
        return (
            <div style={{ height: "75vh" }} className="container valign-wrapper ">
                <div className="row">
                    <div className="col s12 center-align">

                        <h4>No transaction found please make one !!!</h4>

                    </div>
                </div>

            </div>
        )
    }

    else {

    return(
        <div>

        <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-table-xls-button"
        table="table-to-xls"
        filename="tablexls"
        sheet="tablexls"
        buttonText="Download as XLS"/>
        <table id="table-to-xls" className="striped">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th> Amount</th>
                </tr>
            </thead>
            <tbody>
        
            {data!==undefined? (props.type === "expense"?data.map(transaction => (
                <tr key={transaction.date}>
                    <td>{transaction.date}</td>
                    <td>{transaction.expenseCategory}</td>
                    <td>{transaction.expenseAmount}</td>
                </tr>
            )):
            data.map(transaction => (
                <tr key={transaction.date}>
                    <td>{transaction.date}</td>
                    <td>{transaction.incomeSource}</td>
                    <td>{transaction.incomeAmount}</td>
                </tr>
            ))
            ) : <tr><td>No transaction found</td></tr>}

            </tbody>
            

        </table>


        </div>
       
      
    )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    data: state.data.data,
    errors: state.errors
  });
  export default connect(
    mapStateToProps,
    
  )(Table);


