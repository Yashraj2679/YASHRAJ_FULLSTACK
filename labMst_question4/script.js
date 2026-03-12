const addBtn = document.getElementById("addBtn");
const removeBtn = document.getElementById("removeBtn");
const input = document.getElementById("itemInput");
const list = document.getElementById("itemList");

addBtn.addEventListener("click", function(){

    let value = input.value;

    if(value === ""){
        alert("Please enter an item");        return;
    }

    let li = document.createElement("li");

    li.textContent = value;

    list.appendChild(li);

    input.value = "";

});


removeBtn.addEventListener("click", function(){

    if(list.lastElementChild){
        list.removeChild(list.lastElementChild);
    }else{
        alert("No items to remove");
    }

});