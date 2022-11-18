const form = document.getElementById('form'),
email = document.getElementById('email'),
password = document.getElementById('password'),
resultContainer = document.getElementById('result'),
fullname = document.getElementById('fullname');
score = document.getElementById('score');

form.onsubmit = (evt) => {
    evt.preventDefault();
    let raw = new URLSearchParams();
    raw.append('email', email.value);
    raw.append('pass', password.value);
    fetch('http://127.0.0.1:5000/check/',
    {
        method: 'POST',        
        body: raw
    }).then(res => {
        console.log(res);
        res.json().then(result => {
            if (result.error) {
                resultContainer.innerHTML = 'Không tồn tại sinh viên nào!'
            }
            else {
                fullname.textContent = result.fullname;
                score.textContent = result.score;
            }    
            console.log(result);
        })
    });
} 

fetch('http://127.0.0.1:3000/').then(res => console.log(res));