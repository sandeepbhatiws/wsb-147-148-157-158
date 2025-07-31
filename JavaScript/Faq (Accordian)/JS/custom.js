
var questions = document.querySelectorAll('.question');

questions.forEach((v,i) => {
    v.addEventListener('click', (event) => {
        var button = event.target.children[0].innerText;

        if(button == '+'){
            event.target.children[0].innerText = '-';
        } else {
            event.target.children[0].innerText = '+';
        }

        event.target.nextElementSibling.classList.toggle('hidden');

        questions.forEach((value,index) => {
            if(event.target != value){
                console.log(value);
                value.children[0].innerText = '+';
                value.nextElementSibling.classList.add('hidden');
            }
        })
    })
    
})