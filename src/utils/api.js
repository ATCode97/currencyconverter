import axios from "axios";

const request = axios.create({
  baseURL: "https://currencyconverterbackend.herokuapp.com/api",
});

export const postNewExchange = (newExchange) => {
  return request.post(`/exchangehistory`, newExchange).then(({ data }) => {
    return data.transaction;
  });
};

export const getExchanges = (topic, sort_by) => {
  return request.get("/exchangehistory").then(({ data: { transaction } }) => {
    return transaction;
  });
};

// { params: { sort_by } }
