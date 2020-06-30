function get_todos() {
  var todos = new Array();
  var todos_str = localStorage.getItem('todo');
  if (todos_str !== null) {
    todos = JSON.parse(todos_str);
  }
  return todos;
}

function add() {
  var task = document.getElementById('task').value;

  var todos = get_todos();
  todos.push(task);
  localStorage.setItem('todo', JSON.stringify(todos));

  show();

  return false;
}

function remove() {
  var id = this.getAttribute('id');
  var todos = get_todos();
  todos.splice(id, 1);
  localStorage.setItem('todo', JSON.stringify(todos));

  show();

  return false;
}

function show() {
  var todos = get_todos();

  var html = '<ul>';
  for (var i = 0; i < todos.length; i++) {
    html +=
      '<li>' +
      todos[i] +
      '<button class="remove" id="' +
      i +
      '">x</button></li>';
  }
  html += '</ul>';

  document.getElementById('todos').innerHTML = html;

  var buttons = document.getElementsByClassName('remove');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', remove);
  }
}

document.getElementById('add').addEventListener('click', add);
show();
let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
  console.log('beforeinstallprompt begin');
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = 'block';

  addBtn.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
  });
});

window.addEventListener('appinstalled', (event) => {
  console.log('👍', 'appinstalled', event);
});
