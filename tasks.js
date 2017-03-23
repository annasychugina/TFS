const listElement = document.querySelector('.list');
const templateElement = document.getElementById('todoTemplate');
const templateContainer = 'content' in templateElement ? templateElement.content : templateElement;
const inputElement = document.querySelector('.add-task__input');
const filterBlock = document.querySelector('.filters');
let filterValue = document.querySelector('.filters__item_selected');


let todoList = [
	{
		name: 'Позвонить в сервис',
		status: 'todo'
	},
	{
		name: 'Купить хлеб',
		status: 'done'
	},
	{
		name: 'Захватить мир',
		status: 'todo'
	},
	{
		name: 'Добавить тудушку в список',
		status: 'todo'
	}
];


const taskModule = function() {
	const _init = function() {
		_eventListeners();
		_renderList(todoList);
		_getStatistics();
	};

	const _eventListeners = function() {
		listElement.addEventListener('click', _onListClick);
		inputElement.addEventListener('keydown', _onInputKeydown);
		filterBlock.addEventListener('click', _onFilterClick);
	};

	const _onListClick = function(event) {
		const target = event.target;

		if (_isStatusBtn(target)) {
			const element = target.parentNode;
			_changeTodoStatus(element);
		}

		if (_isDeleteBtn(target)) {
			const element = target.parentNode;
			_deleteTodo(element);
		}
		_getStatistics();
	};


	const _onFilterClick = function(event) {
		const target = event.target;
		const filterType = target.getAttribute('data-filter');

		if (_isItemActive(target)) {


			_changeFilterClass(target);

			const taskList = _filterBy(filterType);
			listElement.innerHTML = '';
			_renderList(taskList);
		}
	};
	
	const _isItemActive = function(target) {
		return target.classList.contains('filters__item');
	};


	const _filterBy = function(status) {
		let value;
		switch (status) {
			case 'todo':
				value = 'todo';
				break;
			case 'done':
				value = 'done';
				break;
			case 'all':
				return todoList;
		}

		return todoList.filter(function(todo) {
			return todo.status === value;
		})
	};


	const _changeFilterClass = function(target) {
		Array.prototype.map.call(filterValue, element => element.classList.remove('filters__item_selected'));

		filterValue = target;
		target.classList.add('filters__item_selected');
	};

	const _addTodoFromTemplate = function(todo) {
		const newElement = templateContainer.querySelector('.task').cloneNode(true);
		newElement.querySelector('.task__name').textContent = todo.name;
		_setTodoStatusClassName(newElement, todo.status === 'todo');

		return newElement;
	};

	const _setTodoStatusClassName = function(todo, flag) {
		todo.classList.toggle('task_todo', flag);
		todo.classList.toggle('task_done', !flag);
	};

	const _isStatusBtn = function(target) {
		return target.classList.contains('task__status');
	};

	const _isDeleteBtn = function(target) {
		return target.classList.contains('task__delete-button');
	};

	const _changeTodoStatus = function(element) {
		const isTodo = element.classList.contains('task_todo');
		const name = element.querySelector('.task__name').textContent;
		const index = _getTodoIndex(name);

		todoList[index].status = (todoList[index].status) === 'done' ? 'todo' : 'done';
		_updateList();
		_setTodoStatusClassName(element, !isTodo);
	};

	let _getTodoIndex= function(name) {

		for (let i = 0; i < todoList.length; i++) {
			if (todoList[i].name === name) return i;
		}
		return {};
	};

	let _updateList = function() {
		const filter = filterValue.getAttribute('data-filter');
		const newList = _filterBy(filter);

		_renderList(newList);
	};

	let _renderList = function(list) {
		listElement.innerHTML = '';
		list.map(_addTodoFromTemplate).forEach(_insertTodoElement);
	};

	let _deleteTodo = function(element) {
		todoList = todoList.filter((x)=>x.name!==element.querySelector('.task__name').textContent);
		listElement.removeChild(element);
	};

	let _onInputKeydown = function(event) {
		if (event.keyCode !== 13) {
			return;
		}

		const ENTER_KEYCODE = 13;
		if (event.keyCode !== ENTER_KEYCODE) {
			return;
		}

		const todoName = inputElement.value.trim();

		if (todoName.length === 0 || _checkIfTodoAlreadyExists(todoName)) {
			return;
		}

		const todo = _createNewTodo(todoName);
		todoList.push(todo);
		_insertTodoElement(_addTodoFromTemplate(todo));
		inputElement.value = '';
		_getStatistics();
		_updateList();
	};


	let _checkIfTodoAlreadyExists = function(todoName) {
		const todoElements = listElement.querySelectorAll('.task__name');
		const namesList = Array.prototype.map.call(todoElements, function(element) {
			return element.textContent;
		});
		return namesList.indexOf(todoName) > -1;
	};

	let _createNewTodo = function(name) {
		return {
			name: name,
			status: 'todo'
		}
	};

	let _insertTodoElement = function(elem) {
		if (listElement.children) {
			listElement.insertBefore(elem, listElement.firstElementChild);
		} else {
			listElement.appendChild(elem);
		}
	};

	let _getStatistics = function() {
		const st = document.querySelector('.statistic');
		const stAll = st.querySelector('.statistic__total');
		const stDone = st.querySelector('.statistic__done');
		const stLeft = st.querySelector('.statistic__left');
		const countAll = todoList.length;

		const done = todoList.filter(function(todo) {
			return todo.status === 'done';
		});

		const countDone = done.length;
		stAll.textContent = countAll;
		stDone.textContent = countDone;
		stLeft.textContent = countAll - countDone;
	};

	return {
		init: _init
	};

}();

listElement && inputElement && filterBlock && taskModule.init();