import React, { Component } from "react";

class Exchangehistory extends Component {
  state = {
    data: {
      amount: {},
      currency: {},
      result: {},
      date: {},
    },
  };

  render() {
    const { amount, foreignCurrency, result, date } = this.props;
    return (
      <div>
        <h1>
          convert {amount} to {result} in {foreignCurrency} on {date}
        </h1>
      </div>
    );
  }
}

export default Exchangehistory;
