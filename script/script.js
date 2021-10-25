const addTodoBtn = document.querySelector('.add-todo-btn');
const checkAllBtn = document.querySelector('.check-all-btn');
const deleteAllBtn = document.querySelector('.delete-all-btn');
const showInfoBtn = document.querySelector('.show-info-btn');
const todosList = document.querySelector('.todos-list');
const modalShadow = document.querySelector('.modal-shadow');
const createTodoPopup = document.querySelector('.create-todo-popup');
const todoInput = document.querySelector('#todo-input');
const createTodoBtn = document.querySelector('.create-todo-btn');
const closeTodoPopupBtn = document.querySelector('.close-todo-popup-btn');
const editTodoPopup = document.querySelector('.edit-todo-popup');
const editTodoInput = document.querySelector('#edit-input');
const editTodoBtn = document.querySelector('.edit-todo-btn');
const closeEditPopupBtn = document.querySelector('.close-edit-popup-btn');
const infoPopup = document.querySelector('.info-popup');
const closeInfoBtn = document.querySelector('.close-modal-btn');
let currentlyEditedTask;

const showPopup = (popup) => {
	modalShadow.classList.add('visible');
	popup.classList.add('visible');
};
const hidePopup = (popup) => {
	modalShadow.classList.remove('visible');
	popup.classList.remove('visible');

	if (popup.querySelector('input')) {
		popup.querySelector('input').value = '';
	}
};

const createListItem = () => {
	if (todoInput.value) {
		let newItem = document.createElement('li');
		newItem.classList.add('todo-item');
		let newItemContent = todoInput.value;
		newItem.innerHTML = `<p>${newItemContent}</p>
<div class="todo-tools-panel">
    <button class="check-btn">
        <i class="fas fa-check"></i>
    </button>
    <button class="edit-btn">
        <i class="far fa-edit"></i>
    </button>
    <button class="delete-btn"><i class="fas fa-times"></i></button>
</div>`;

		todosList.appendChild(newItem);
		hidePopup(createTodoPopup);
		todoInput.value = '';
	}
};

const checkClick = (e) => {
	let li = e.target.parentElement.parentElement;

	if (e.target.classList.contains('check-btn')) {
		markTaskAsCompleted(li);
	} else if (
		e.target.classList.contains('edit-btn') &&
		!e.target.classList.contains('checked')
	) {
		showEditionPopup(li);
	} else if (e.target.classList.contains('delete-btn')) {
		li.remove();
	}
};

const markTaskAsCompleted = (li) => {
	let taskTextContent = li.querySelector('p');
	let checkBtn = li.querySelector('.check-btn');
	let editBtn = li.querySelector('.edit-btn');

	[taskTextContent, checkBtn, editBtn].forEach((el) =>
		el.classList.toggle('checked')
	);
};

const showEditionPopup = (li) => {
	currentlyEditedTask = li.querySelector('p');
	showPopup(editTodoPopup);
	editTodoInput.value = currentlyEditedTask.innerText;
};

const editTask = () => {
	currentlyEditedTask.innerText = editTodoInput.value;
	hidePopup(editTodoPopup);
};

const markAllTasksAsCompleted = () => {

	let allTodos = todosList.querySelectorAll('li');
	
	const checkIfCompleted = (li) => {
		return li.querySelector('p').classList.contains('checked');
	};

	if (Array.from(allTodos).every(checkIfCompleted)) {
		allTodos.forEach((li) => markTaskAsCompleted(li));
	} else {
		allTodos.forEach((li) => {
			if (!checkIfCompleted(li)) {
				markTaskAsCompleted(li);
			}
		});
	}
};

const deleteAllTasks = () => {
	todosList.innerText = '';
};

addTodoBtn.addEventListener('click', function () {
	showPopup(createTodoPopup);
});
closeTodoPopupBtn.addEventListener('click', function () {
	hidePopup(createTodoPopup);
});
showInfoBtn.addEventListener('click', function () {
	showPopup(infoPopup);
});
closeInfoBtn.addEventListener('click', function () {
	hidePopup(infoPopup);
});
closeEditPopupBtn.addEventListener('click', function () {
	hidePopup(editTodoPopup);
});

createTodoBtn.addEventListener('click', createListItem);

todosList.addEventListener('click', checkClick);
editTodoBtn.addEventListener('click', editTask);
deleteAllBtn.addEventListener('click', deleteAllTasks);
checkAllBtn.addEventListener('click', markAllTasksAsCompleted);
