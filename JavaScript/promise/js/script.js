
// new Promise((accept, reject) => {
//     var getData = fetch('https://dummyjson.com/products/categories');
//     accept(getData);
//     // reject(getData);
// })
// .then((response) => {
//     new Promise((complete, incomplete) => {
//         complete(response.json());
//     })
//     .then((data) => {
//         console.log(data);
//         console.log('Promise complete');
//     })
//     .catch((error) => {
//         console.log('Promise Incomplete');
//     });    
// })
// .catch((error) => {
//     console.log('Promise Incomplete');
// })


var getData = (async() => {
    var data = await fetch('https://dummyjson.com/products');
    var data = await data.json();
    console.log(data.products);
})

getData();