

// var output = document.getElementById('row').innerText;

// document.getElementById('output').innerText = output;
// // console.log(output.innerText);


// var output = document.getElementById('row').innerHTML;

// document.getElementById("output").innerHTML = output;
// // console.log(output);


// var newdata = document.getElementById('row1').innerText;
// console.log(newdata);


// var allData = document.querySelectorAll('div');

// console.log(allData);




 var data = document.getElementsByClassName('row');

 console.log(data);

//  var data = document.getElementsByTagName('div');

//  console.log(data[2].innerHTML);


// var data = document.querySelector('div').innerText;

// console.log(data);

var data = document.querySelectorAll('.row');

data.forEach( (value, index) => {
    console.log(index);
    console.log(value.innerText);
});

console.log(data);

function dataswap(){
    var a = document.getElementById('row').innerText;
    var b = document.getElementById('row1').innerText;
    var c = a;

    document.getElementById('row').innerText = b;
    document.getElementById('row1').innerText = c;
}

function inputValue(){
    var a = document.getElementById('input').value;

    document.getElementById('output').innerText = a;
}