import React, { Component } from "react";
import { Button } from "react-bootstrap";
import * as api from "../utils/api";

class Exchangehistory extends Component {
  state = { exchanges: [], isLoading: true, filter: false };

  componentDidMount() {
    this.fetchExchanges();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.exchanges !== this.state.exchanges &&
      this.state.filter === false
    ) {
      this.fetchExchanges();
    }
  }

  fetchExchanges = (order) => {
    api.getExchanges(order).then((exchanges) => {
      this.setState({ exchanges, isLoading: false, filter: true });
    });
  };

  render() {
    const { isLoading, exchanges } = this.state;

    if (isLoading) return <h1>Loading</h1>;
    return (
      <div>
        <Button onClick={() => this.fetchExchanges("asc")}>
          get oldest exchanges
        </Button>
        <Button onClick={() => this.fetchExchanges()}>
          get newest exchanges
        </Button>
        {exchanges.map(
          ({ GBP, amount, exchanged_at, transaction_id, foreign_currency }) => {
            return (
              <section key={transaction_id} className="transactions">
                <div>
                  you exchanged GBP {GBP} to {amount} in {foreign_currency} at{" "}
                  {exchanged_at}
                </div>
              </section>
            );
          }
        )}
      </div>
    );
  }
}

export default Exchangehistory;
