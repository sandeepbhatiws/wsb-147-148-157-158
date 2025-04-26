

function getData(){
    console.log('Welcome');
}

// document.getElementById('button').addEventListener('click',getData);


document.getElementById('button').addEventListener('click',(event)=> {
    // console.log('Hello');
    console.log(event.target);
});


document.getElementById('userInfo').addEventListener('submit',(event) => {
    event.preventDefault();

    console.log(event.target.name.value);
    console.log(event.target.email.value);

    event.target.name.value = '';


    // event.target.reset();
});


var allButtons = document.querySelectorAll('.button');

// allButtons.forEach(element => {
    
// });

allButtons.forEach((v) => {    
    v.addEventListener('click', (e) => {
        console.log(e.target);
    })
});







