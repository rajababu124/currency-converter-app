import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineCurrencyRupee } from "react-icons/md";


const CurrencyConverter = () => {
  const [amount, setAmount] = useState("");
  const [exchangeRates, setExchangeRates] = useState({});
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState('');

  const getExchangeRates = async (baseCurrency) => {
    const apiKey = "eef801f5e6baa77ae9ab95ff";
    try {
      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`
      );
      console.log(response.data);
      return response.data.conversion_rates;
    } catch (err) {
      console.log("finding error is :" + err);
    }
  };

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const rates = await getExchangeRates(fromCurrency);
        setExchangeRates(rates);
        
      } catch (error) {
        console.log("error coming is : " + error);
      }
    };

    fetchExchangeRates();
  }, [fromCurrency]);

  useEffect(() => {
    if (exchangeRates[toCurrency]) {
      const result = amount * exchangeRates[toCurrency];
      setConvertedAmount(result.toFixed(2));
    }
  }, [amount, toCurrency, exchangeRates]);

  return (
    <>
      <div className="container shadow-xl bg-white rounded hover:shadow  duration-200 p-5">
        <div className="text-2xl mb-4 flex justify-center items-center">
          <h2>Currency Converte</h2>
          
          <h2 className="text-green-500">
            <MdOutlineCurrencyRupee />
          </h2>
        </div>
        <hr className="bg-red-900"/>
        <div className="p-5">
          <div className="currency flex justify-space-between ">
            <div className="from-currency flex items-center ">
              <label htmlFor="from-currency" className="">
                {" "}
                From Currency
              </label>
              <br />
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="focus:outline-none px-3 py-2  border-gray-500"
                name="from_currency"
                id=""
              >
                {Object.keys(exchangeRates).map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
            <div className="from-currency flex items-center ml-7">
              <label htmlFor="from-currency" className="">
                {" "}
                To Currency
              </label>
              <br />
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="focus:outline-none  px-3 py-2  border-gray-500"
                name="from_currency"
                id=""
              >
                {Object.keys(exchangeRates).map((currencyy) => (
                  <option key={currencyy} value={currencyy}>
                    {currencyy}
                  </option>
                ))}
              </select>

             
            </div>
          </div>
          <div className="content mt-3">
            <div className=" flex  items-center  ">
              <input
                type="number"
                className="focus:outline-none px-3 py-2 border"
                placeholder="Enter Amount.."
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <h2> - </h2>
              <h2>
                {" "}
                <input
                  readOnly
                  type="number"
                  className="focus:outline-none px-3 py-2 border"
                  placeholder="Converted amount.."
                  value={convertedAmount}
                />
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrencyConverter;











