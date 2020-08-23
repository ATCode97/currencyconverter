import axios from "axios";

const request = axios.create({
  baseURL: "https://currencyconverterbackend.herokuapp.com/api",
});

export const postNewExchange = (newExchange) => {
  return request.post(`/exchangehistory`, newExchange).then(({ data }) => {
    return data.transaction;
  });
};

export const getExchanges = (order) => {
  return request
    .get("/exchangehistory", { params: { order } })
    .then(({ data: { transaction } }) => {
      return transaction;
    });
};
