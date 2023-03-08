const form = document.querySelector(".form");
let email = document.getElementById("email");

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let formData = {
        email: email.value,
    }

    console.log(formData);
    
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function(){
        console.log(xhr.responseText);
        if(xhr.responseText == 'success'){
            alert("email sent!");
            email.value = ''; 
        }else{
            alert("something went wrong");
        }
    }

    xhr.send(JSON.stringify(formData));

})