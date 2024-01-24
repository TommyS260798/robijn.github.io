// Constant variables
const addChecklist = document.getElementById('addChecklist');
const showAddChecklist = document.getElementById('showAddChecklist');
const input = addChecklist.querySelector('input');
const ul = document.querySelector('ul');

addChecklist.style.display = "none";

// Function for showing inputs
function showChecklist() {
    showAddChecklist.style.display = "none";
    addChecklist.style.display = "";
    
}

// Event listener for clicking the checkmark icon
const checkmark = addChecklist.querySelector('a');
checkmark.addEventListener('click', addListItem);

// Function to add a new list item
function addListItem() {
    const text = input.value.trim();
    
    if (text !== "") {
        const li = document.createElement('li');
        li.textContent = text;
        ul.appendChild(li);
        
        input.value = "";
        
        saveListItems();
        
        addChecklist.style.display = "none";
        showAddChecklist.style.display = "";
    }
}

// Function to save list items to local storage
function saveListItems() {
    const listItems = Array.from(ul.getElementsByTagName('li')).map(li => li.textContent);
    localStorage.setItem('items', JSON.stringify(listItems));
}

// Function to load list items from local storage
function loadListItems() {
    const savedItems = localStorage.getItem('items');
    
    if (savedItems) {
        const items = JSON.parse(savedItems);
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            ul.appendChild(li);
        });
    }
}

// Load list items from local storage when the page loads
loadListItems();

// Function to toggle the id attribute when an <li> is clicked
function toggleIdAttribute(event) {
    const li = event.target;
    const currentId = li.getAttribute('id'); // Get the current id
    
    if (currentId === 'done') {
        li.removeAttribute('id');
    } else {
        li.setAttribute('id', 'done');
    }
}

// Attach a click event listener to each <li> element
const liElements = document.querySelectorAll('ul li');
for (const li of liElements) {
    li.addEventListener('click', toggleIdAttribute);
}


// Reset local storage function
function resetList() {
    
    if (confirm("Do you want to reset the list?")) {
        localStorage.clear();
        location.reload();
    }
   
}