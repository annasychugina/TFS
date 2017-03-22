var listElement = document.querySelector('.list');
var itemElementList = listElement.children;
var templateElement = document.getElementById('todoTemplate');
var templateContainer = 'content' in templateElement ? templateElement.content : templateElement;

var inputElement = document.querySelector('.add-task__input');

var todoList = [
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

var taskModule = function() {

	var _init = function() {
		_eventListeners();
	};

	var _eventListeners = function() {
		listElement.addEventListener('click', _onListClick);
		inputElement.addEventListener('keydown', _onInputKeydown);
	};

	var _onListClick = function(event) {
		var target = event.target;
		var element;

		if (_isStatusBtn(target)) {
			element = target.parentNode;
			_changeTodoStatus(element);
		}

		if (_isDeleteBtn(target)) {
			element = target.parentNode;
			_deleteTodo(element);
		}
	};

	var _isStatusBtn = function(target) {
		return target.classList.contains('task__status');
	};

	var _isDeleteBtn = function(target) {
		return target.classList.contains('task__delete-button');
	};

	var _changeTodoStatus = function(element) {
		var isTodo = element.classList.contains('task_todo');
		_setTodoStatusClassName(element, !isTodo);
	};

	var _deleteTodo = function(element) {
		listElement.removeChild(element);
	};

	var _setTodoStatusClassName = function(todo, flag) {
		todo.classList.toggle('task_todo', flag);
		todo.classList.toggle('task_done', !flag);
	};


	var _insertTodoElement = function(elem) {
		if (listElement.children) {
			listElement.insertBefore(elem, listElement.firstElementChild);
		} else {
			listElement.appendChild(elem);
		}
	};

	var _onInputKeydown = function(event) {
		if (event.keyCode !== 13) {
			return;
		}

		var ENTER_KEYCODE = 13;
		if (event.keyCode !== ENTER_KEYCODE) {
			return;
		}

		var todoName = inputElement.value.trim();

		if (todoName.length === 0 || _checkIfTodoAlreadyExists(todoName)) {
			return;
		}

		var todo = _createNewTodo(todoName);
		_insertTodoElement(_addTodoFromTemplate(todo));
		inputElement.value = '';
	};

	var _checkIfTodoAlreadyExists = function(todoName) {
		var todoElements = listElement.querySelectorAll('.task__name');
		var namesList = Array.prototype.map.call(todoElements, function (element) {
			return element.textContent;
		});
		return namesList.indexOf(todoName) > -1;
	}

	var _createNewTodo = function(name) {
		return {
			name: name,
			status: 'todo'
		}
	};

	var _addTodoFromTemplate = function(todo) {
		var newElement = templateContainer.querySelector('.task').cloneNode(true);
		newElement.querySelector('.task__name').textContent = todo.name;
		_setTodoStatusClassName(newElement, todo.status === 'todo');

		return newElement;
	};

	todoList
		.map(_addTodoFromTemplate)
		.forEach(_insertTodoElement);
	
	return {
		init: _init
	};

}();

listElement && inputElement && taskModule.init({
	todoList: [
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
	]
});