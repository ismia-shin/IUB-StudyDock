let first_name = document.getElementById("first_name").textContent;
let last_name = document.getElementById("last_name").textContent;
let address= document.getElementById("address").textContent;

document.getElementById("first_name_btn").onclick = function(){
    first_name = window.prompt("First Name:")
    document.getElementById("first_name").textContent = first_name;
    document.getElementById("name").textContent = `${first_name} ${last_name}`;
}

document.getElementById("last_name_btn").onclick = function(){
    last_name = window.prompt("Last Name:")
    document.getElementById("last_name").textContent = last_name;
    document.getElementById("name").textContent = `${first_name} ${last_name}`;
}

document.getElementById("address_btn").onclick = function(){
    address = window.prompt("Adress:")
    document.getElementById("address").textContent = address;
}