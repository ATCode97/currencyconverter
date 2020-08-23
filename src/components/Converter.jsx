import React, { Component } from "react";
import { Button } from "react-bootstrap";
import * as api from "../utils/api";
import "./converter.css";
import Exchangehistory from "./Exchangehistory";

class Converter extends Component {
  state = {
    currencies: ["GBP", "USD", "AUD", "EUR"],
    base: "GBP",
    amountToConvert: "",
    convertTo: "",
    result: "",
    date: "",
  };

  handleSelect = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleInput = (event) => {
    this.setState({
      amountToConvert: [event.target.value],
    });
  };

  handleClick = () => {
    const newExchange = {
      GBP: this.state.amountToConvert[0],
      foreign_currency: this.state.convertTo,
      amount: this.state.result,
    };
    console.log(newExchange);
    api.postNewExchange(newExchange);

    this.calculate();
  };

  calculate = () => {
    const amount = this.state.amountToConvert;
    if (amount === isNaN) {
      return;
    } else {
      fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const date = data.date;
          const result = (data.rates[this.state.convertTo] * amount).toFixed(2);
          this.setState({
            result,
            date,
          });
        });
    }
  };

  //valid in state and set to true if correct

  render() {
    const {
      currencies,
      base,
      amountToConvert,
      convertTo,
      result,
      date,
    } = this.state;
    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="row">
              <div className="col-lg-10 ">
                <form className="form-inline mb-4">
                  <input
                    value={amountToConvert}
                    onChange={this.handleInput}
                    className="form-control form-control-lg mx-3"
                    type="number"
                    min="1"
                    max="999,999"
                  />
                  <select
                    name="convertTo"
                    value={convertTo}
                    className="form-control form-control-lg"
                  >
                    <option>{base}</option>
                  </select>
                </form>

                <form className="form-inline mb-4">
                  <input
                    value={result}
                    disabled={true}
                    className="form-control form-control-lg mx-3"
                    type="number"
                  />
                  <select
                    name="convertTo"
                    value={convertTo}
                    onChange={this.handleSelect}
                    className="form-control form-control-lg"
                  >
                    {currencies.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </form>
              </div>

              <div className="col-lg-2 align-self-center">
                <Button onClick={this.handleClick} className="exchange">
                  Exchange
                </Button>
                <Button onSubmit={this.handleClick2}>Save</Button>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <Exchangehistory
          amount={amountToConvert}
          foreignCurrency={convertTo}
          result={result}
          date={date}
          base={base}
        />
      </div>
    );
  }
}

export default Converter;

// .then(() => {
//   api.postNewExchange({
//     GBP: this.state.amountToConvert,
//     foreign_currency: this.state.convertTo,
//     amount: this.state.result,
//   });
// });
