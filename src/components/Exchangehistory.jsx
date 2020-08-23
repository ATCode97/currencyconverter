import React, { Component } from "react";
import { Button } from "react-bootstrap";
import * as api from "../utils/api";

class Exchangehistory extends Component {
  state = { exchanges: [] };

  componentDidMount() {
    this.fetchExchanges();
  }

  fetchExchanges = (sort_by) => {
    api.getExchanges(sort_by).then((exchanges) => {
      console.log(exchanges);
      this.setState({ exchanges });
    });
  };

  render() {
    return (
      <div>
        <Button onClick={() => this.fetchExchanges()}>see history</Button>
      </div>
    );
  }
}

export default Exchangehistory;
