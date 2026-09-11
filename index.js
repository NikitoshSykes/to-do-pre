const formElement = document.querySelector('.to-do__form');
const inputElement = document.querySelector('.to-do__input');
const listElement = document.querySelector('.to-do__list');
const template = document.querySelector('#to-do__item-template');

function createItem(itemText) {
  const clone = template.content.cloneNode(true);
  const itemElement = clone.querySelector('.to-do__item');
  const textElement = clone.querySelector('.to-do__item-text');
  const deleteButton = clone.querySelector('.to-do__item-button_type_delete');
  const duplicateButton = clone.querySelector('.to-do__item-button_type_duplicate');
  const editButton = clone.querySelector('.to-do__item-button_type_edit');

  textElement.textContent = itemText;

  deleteButton.addEventListener('click', () => {
    itemElement.remove();
    const items = getTasksFromDOM();
    saveTasks(items);
  });

  duplicateButton.addEventListener('click', () => {
    const newItem = createItem(textElement.textContent);
    listElement.prepend(newItem);
    const items = getTasksFromDOM();
    saveTasks(items);
  });

  editButton.addEventListener('click', () => {
    textElement.setAttribute('contenteditable', 'true');
    textElement.focus();
  });

  textElement.addEventListener('blur', () => {
    textElement.setAttribute('contenteditable', 'false');
    const items = getTasksFromDOM();
    saveTasks(items);
  });

  return itemElement;
}

function getTasksFromDOM() {
  const itemsNamesElements = document.querySelectorAll('.to-do__item-text');
  const tasks = [];

  itemsNamesElements.forEach((item) => {
    tasks.push(item.textContent);
  });

  return tasks;
}

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');

  if (savedTasks) {
    return JSON.parse(savedTasks);
  }

  return [
    'Сходить в магазин',
    'Почитать книгу',
    'Попрактиковаться в JavaScript',
    'Прогуляться',
    'Позвонить другу',
    'Убраться дома'
  ];
}

let items = loadTasks();

items.forEach((item) => {
  const taskElement = createItem(item);
  listElement.append(taskElement);
});

formElement.addEventListener('submit', (event) => {
  event.preventDefault();

  const taskText = inputElement.value.trim();
  if (!taskText) {
    return;
  }

  const newItem = createItem(taskText);
  listElement.prepend(newItem);

  inputElement.value = '';

  const items = getTasksFromDOM();
  saveTasks(items);
});
