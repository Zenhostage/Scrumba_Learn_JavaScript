
import {initializeApp} from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js';
import {getDatabase, ref, push, onValue, remove} from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js';

const appSettings= {
    databaseURL: "https://realtime-database-bb435-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");




const inputEl = document.getElementById("input-field");
const addBtn = document.getElementById("add-button");
const shoppingListEl =document.getElementById("shopping-list");

addBtn.addEventListener("click", function(){
        let inputValue = inputEl.value;
        push(shoppingListInDB, inputValue);
        console.log(inputValue)     

        clearInputFieldEl(inputEl);

})


onValue(shoppingListInDB, function(snapshot){

    if(snapshot.exists()){
        let shoppingArray = Object.entries(snapshot.val());

        clearshoppingListEl();
    
        for (let i=0; i<shoppingArray.length;i++){
    
            let currentItem = shoppingArray[i];
            let currentItemID = currentItem[0];
            let currentItemValue = currentItem[1];         
    
    
            appendItemToShoppingListEl(currentItem);
        }
    }else {
        shoppingListEl.innerHTML = "No items added yet"
    }

    

} )

function clearInputFieldEl(inputEl){
    inputEl.value = ""
}

function clearshoppingListEl(){
    shoppingListEl.innerHTML = "";
}

function appendItemToShoppingListEl(item){

    let itemID = item[0];
    let itemValue = item[1];

    let newEl = document.createElement("li");

    newEl.addEventListener("click", function(){
        let exactLocationOfitemInDB = ref(database,`shoppingList/${itemID}`)
        remove(exactLocationOfitemInDB)

    })

    

 

    newEl.textContent = itemValue;

    shoppingListEl.append(newEl)

}

