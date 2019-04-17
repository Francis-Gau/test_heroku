const axios = require("axios");

//We start by creating the promise
const example_promise = (var_x) => {
    return new Promise((resolve, reject) => {
        axios.get('https://api.exchangeratesapi.io/latest?base=' + var_x)
        .then(function (response) {
            //response.data contains all the information returned from the api call
            //console.log(response.data)
            //console.log("For this example we want to return rates which can be found with")
            //console.log(response.data.rates)
            resolve(response.data.rates)
        })
        .catch(function (error) {
            reject(error);
        });
    });
};

//Here we call our promise
//It is commented out for calling purposes
/*
example_promise("USD").then((resolved) => {
    console.log("This line shows up if the promise returned something")
    console.log(resolved);
}).catch((error) => {
    console.log("This line means something went wrong")
    console.log(error);
});
*/

//Here we export our promise so we can call it from another file
module.exports = {
    example_promise
}
