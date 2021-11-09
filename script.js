const inputBox = document.querySelector('.inputArea input');
const addBtn = document.querySelectorAll('.inputArea button');
const todoList = document.querySelector('.todoList');
const deleteAllBtn = document.querySelector('.footer button');

inputBox.onkeyup = () => {
    let enteredValue = inputBox.value; // get entered value from user
    // if entered value aren't spaces
    if (enteredValue.trim() != 0) {
        addBtn.classList.add('active'); // activate add button
    }
    else {
        addBtn.classList.remove('active') // deactivate add button
    }
}

showTask();

addBtn.forEach(e => {
    e.addEventListener('click', () => {
        let enteredValue = inputBox.value; // get entered values from user
        let getLocalStg = localStorage.getItem('New Todo') // get local storage
        // if no local data stored
        if (getLocalStg == null) {
            listArray = [];
        }
        else {
            listArray = JSON.parse(getLocalStg); // convert JSON string into JS object
        }
        listArray.push(enteredValue); // push values into listArray
        localStorage.setItem('New Todo', JSON.stringify(listArray)); // convert JS obj into JSON string
        showTask();
        addBtn.classList.remove('active'); // deactivate add button upon task addition
    });
});

function showTask() {
    let getLocalStg = localStorage.getItem('New Todo');
    if (getLocalStg == null) listArray = [];
    else listArray = JSON.parse(getLocalStg);
    const pendingTaskCount = document.querySelector('.pendingTasks');
    pendingTaskCount.textContent = listArray.length;
    if (listArray.length > 0) {
        deleteAllBtn.classList.add('active'); // activate delete button
    }
    else {
        deleteAllBtn.classList.remove('active'); // deactivate delete button
    }
    let newLiTag = '';
    listArray.forEach((e, i) => {
        newLiTag += `<li>${e}<span class="icon" onclick="deleteTask(${i})"><i class="fas fa-backspace"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag;
    inputBox.value = ''; // leave input field blank
}

function deleteTask(index) {
    let getLocalStg = localStorage.getItem('New Todo');
    listArray = JSON.parse(getLocalStg);
    listArray.splice(index, 1); // delete or remove li
    localStorage.setItem('New Todo', JSON.stringify(listArray));
    showTask();
}

deleteAllBtn.onclick = () => {
    listArray = [];
    localStorage.setItem('New Todo', JSON.stringify(listArray)); // set item in localStorage
    showTask();
}