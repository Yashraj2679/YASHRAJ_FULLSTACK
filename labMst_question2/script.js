const fetchData = new Promise((resolve, reject) => {

    setTimeout(() => {
        resolve("Data fetched successfully");
    }, 2000);

});

fetchData
.then(function(message){
    console.log(message);
})
.catch(function(error){
    console.log("Error:", error);
});