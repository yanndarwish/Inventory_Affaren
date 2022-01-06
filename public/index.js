const input = document.querySelector('#input');
const search = document.querySelector('#search');
const erase = document.querySelector('#delete');
const add = document.querySelector('#add');
const output = document.querySelector('#output');
const name = document.querySelector('#name');
const price = document.querySelector('#price');
const stock = document.querySelector('#stock');

erase.addEventListener('click', function () {
    input.value = '';
})

search.addEventListener('click', function () {
    const value = input.value
    const data = {
        value
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch('/api', options).then(res => res.json()).then(data => {
        console.log(data)
        if (data.status === 'success') {
            output.innerHTML = `<h1 id="name">${data.name}</h1>
            <p id="price" class="info">Price : ${data.price}</p>
            <p id="stock" class="info">Stock : ${data.stock}</p>`
        } else {
            output.innerHTML = `<h1 id="name">Not Found</h1>
            <h2>Do you want to add to a New Item ?</h2>
            <button id="add-new" class="btn">Add</button>
            <button id="cancel-adding" class="btn">Cancel</button>
            `

            const addNew = document.querySelector('#add-new');
            const cancelAdding = document.querySelector('#cancel-adding');

            cancelAdding.addEventListener('click', function () {
                output.innerHTML = '';
                input.value = '';
            })
            addNew.addEventListener('click', function () {
                output.innerHTML = `<h1 id="name">Add New Item</h1>
                <input id="new-name" class="info" type="text" placeholder="Name">
                <input id="new-price" class="info" type="number" placeholder="Price">
                <input id="new-stock" class="info" type="number" placeholder="Stock">
                <input id="new-tva" class="info" type="number" placeholder="TVA">
                <button id="add-new-item" class="btn">Add</button>
                <button id="cancel-adding" class="btn">Cancel</button>
                `
                const addNewItem = document.querySelector('#add-new-item');
                const cancelNewAdding = document.querySelector('#cancel-adding');

                cancelNewAdding.addEventListener('click', function () {
                    output.innerHTML = '';
                    input.value = '';
                })

                addNewItem.addEventListener('click', function () {
                    const newName = document.querySelector('#new-name').value
                    const newPrice = document.querySelector('#new-price').value
                    const newStock = document.querySelector('#new-stock').value
                    const newTva = document.querySelector('#new-tva').value
                    const data = {
                        newName,
                        newPrice,
                        newTva,
                        newStock,
                        value //barcode of the new item
                    }

                    const options3 = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    }
                    fetch('/newItem', options3).then(res => res.json()).then(data => {
                        console.log(data)
                        if (data.status === 'success') {
                            output.innerHTML = `<h1 id="name">${data.name}</h1>
                            <p id="price" class="info">Price : ${data.price}</p>
                            <p id="stock" class="info">Stock : ${data.stock}</p>`
                        }
                    })
                })

            })
        }
    })
})

// ADDING MODAL 
const modalBtn = document.querySelector('.modal-btn')
const modalOverlay = document.querySelector('.modal-overlay')
const closeBtn = document.querySelector('.close-btn')

modalBtn.addEventListener('click', function () {
    modalOverlay.classList.add('open-modal')
})

closeBtn.addEventListener('click', function () {
    modalOverlay.classList.remove('open-modal')
})

// GETTING DATA FROM ADDING-MODAL
const addInput = document.querySelector('#add-input')
const addConfirm = document.querySelector('#add-confirm')

addConfirm.addEventListener('click', function () {
    const addValue = addInput.value
    const addData = {
        addValue
    }

    const options2 = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(addData)
    }
    fetch('/adding', options2).then(res => res.json()).then(addData => {
        console.log(addData)
    })
})