// Get HTML Elements
const taskList = document.querySelector('.task-list');
const addTaskBtn = document.querySelector('#add-btn');

// Create and Render Tasks
const renderTask = doc => {

    let li = document.createElement('li');
    let name = document.createElement('span');
    let deleteBtn = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    
    if(doc.data().isCompleted) {
        li.classList.add('complete');    
    }

    name.textContent = doc.data().name;
    deleteBtn.textContent = 'x';

    li.appendChild(name);
    li.appendChild(deleteBtn)
    taskList.appendChild(li);

    // deleting data
    deleteBtn.addEventListener('click', e => {
        let idToDelete = e.target.parentElement.getAttribute('data-id');

        db.collection('tasks').doc(idToDelete).delete();
    })

    // marking as complete
    li.addEventListener('dblclick', e => {

        e.stopPropagation();
        let idToUpdate = e.target.getAttribute('data-id');
        const newState = !doc.data().isCompleted;

        db.collection('tasks').doc(idToUpdate).update(
            {
                isCompleted: newState,
            }
        )

    })

    name.addEventListener('dblclick', e => {
        e.stopPropagation();
        let idToUpdate = e.target.parentElement.getAttribute('data-id');
        const newState = !doc.data().isCompleted;

        db.collection('tasks').doc(idToUpdate).update(
            {
                isCompleted: newState,
            }
        )
    })

}

// add a new task
addTaskBtn.addEventListener('click', () => {

    const taskNameInput = document.querySelector('#txt-name');

    const newTaskName = taskNameInput.value;
    const currTime = new Date();

    // const easy = document.querySelector('#easy').checked;
    // const medium = document.querySelector('#medium').checked;
    // const hard = document.querySelector('#hard').checked;

    // let state = null;
    // if(easy) state = 'easy';
    // else if(medium) state = 'medium';
    // else if(hard) state = 'hard';

    if(newTaskName) {
        db.collection('tasks').add({
            name: newTaskName,
            isCompleted: false,
            createdAt: currTime,
            // difficulty: state,
        });
    } else {
        alert('No task name inputted.')
    }

    taskNameInput.value = '';
 
})

// realtime listener
db.collection('tasks').orderBy('createdAt', 'desc').onSnapshot('value', snapshot => {

    taskList.innerHTML = ''
    snapshot.docs.forEach(doc => {
        renderTask(doc);
    })

})
