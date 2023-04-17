import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://salla-9b202-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const sallaItem = ref(database, "items")
// const cartItemsInDb = ref(database, "items")

let inpField = document.getElementById('input-field');
const addBtn = document.getElementById('add-button');
const shoppingList = document.getElementById('shopping-list')

addBtn.addEventListener('click', function() {
    let inpValue = inpField.value
    
    
    push(sallaItem, inpValue)
    
    clear()
    // append(inpValue)
    
})

onValue(sallaItem, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArr = Object.entries(snapshot.val())

        clearShoppingList() 
    
        for (let i = 0; i < itemsArr.length; i++) {
            let currentItem = itemsArr[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            append(currentItem)
    
            // console.log(itemsArr[i])
        }
    } else {
        shoppingList.innerHTML = "No items here... yet"
    }
    

})

function clear() {
    inpField.value = ""
}

function clearShoppingList() {
    shoppingList.innerHTML = ""
}

function append(item) {
    let itemID = item[0]
    let itemValue = item[1]
    // shoppingList.innerHTML += `<li>${item}</li>`
    let newEl = document.createElement('li')
    newEl.textContent = itemValue

    newEl.addEventListener('click', function() {
        let exactLocationOfItemInDB = ref(database, `items/${itemID}`)

        remove(exactLocationOfItemInDB)
    })

    shoppingList.append(newEl)
}

// =========================== Challenge ======================== 
// let scrimbaUsersEmails = {
//     "00": "wadareaf@gmail.com",
//     "01": "ameera@gmail.com",
//     "02": "ayat@gmail.com"
// }
// console.log(Object.values(scrimbaUsersEmails))
// console.log(Object.keys(scrimbaUsersEmails))
// console.log(Object.entries(scrimbaUsersEmails))