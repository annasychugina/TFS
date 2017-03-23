const listElement = document.querySelector('.list');
const templateElement = document.getElementById('todoTemplate');
const templateContainer = 'content' in templateElement ? templateElement.content : templateElement;
const inputElement = document.querySelector('.add-task__input');
const filterBlock = document.querySelector('.filters');
let filterValue = document.querySelector('.filters__item_selected');

const ENTER_KEYCODE = 13;

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
			const taskList = _filterBy(filterType);

			_changeFilterClass(target);
			listElement.textContent = '';
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
			default:
				return todoList;
		}

		return todoList.filter(todo => todo.status === value);
	};

	const _changeFilterClass = function(target) {
		Array.prototype.map.call(filterValue, item => item.classList.remove('filters__item_selected'));

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

		todoList.forEach(todo => {
			if (todo.name === name) {
				todo.status = (todo.status) === 'done' ? 'todo' : 'done';
			}
		});

		_updateList();
		_setTodoStatusClassName(element, !isTodo);
	};


	const _updateList = function() {
		const filter = filterValue.getAttribute('data-filter');
		const newList = _filterBy(filter);

		_renderList(newList);
	};

	const _renderList = function(list) {
		listElement.innerHTML = '';
		list.map(_addTodoFromTemplate).forEach(_insertTodoElement);
	};

	const _deleteTodo = function(element) {
		todoList = todoList.filter(function(item) {
			const elem = element.querySelector('.task__name');

			if (elem.textContent !== item.name) {
				return item;
			}
		});

		listElement.removeChild(element);
	};

	const _onInputKeydown = function(event) {
		if (event.keyCode !== 13) {
			return;
		}

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


	const _checkIfTodoAlreadyExists = function(todoName) {
		const todoElements = listElement.querySelectorAll('.task__name');
		const namesList = Array.prototype.map.call(todoElements, function(element) {
			return element.textContent;
		});
		return namesList.indexOf(todoName) > -1;
	};

	const _createNewTodo = function(name) {
		return {
			name: name,
			status: 'todo'
		}
	};

	const _getStatistics = function() {
		const st = document.querySelector('.statistic');
		const statistics = {
			all: st.querySelector('.statistic__total'),
			done: st.querySelector('.statistic__done'),
			todo: st.querySelector('.statistic__left'),
		};

		const done = todoList.filter(todo => todo.status === 'done');
		const countAll = todoList.length;
		const countDone = done.length;

		statistics.all.textContent = countAll;
		statistics.done.textContent = countDone;
		statistics.todo.textContent = countAll - countDone;
	};

	const _insertTodoElement = function(elem) {
		if (listElement.children) {
			listElement.insertBefore(elem, listElement.firstElementChild);
		} else {
			listElement.appendChild(elem);
		}
	};

	return {
		init: _init
	};

}();

listElement && inputElement && filterBlock && taskModule.init();