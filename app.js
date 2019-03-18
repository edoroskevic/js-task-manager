/*
	author edoroskevic
	date 20/06/2018
	description a basic 'to-do' app using materializecss and plain javascript
	license MIT
*/

let tasks = [];

class Task{
	constructor(task, date, time){
		this.description = task;
		this.date = date;
		this.time = time;
	}
}

class Manager{
	constructor(){
		this.task = document.getElementById('task');
		this.date = document.getElementById('task-date');
		this.time = document.getElementById('task-time');
		this.table = document.getElementById('task-list');
	}

	push(){
		const task = this.task.value;
		const date = this.date.value;
		const time = this.time.value;
	
		if(task.length >= 3 && date.length >= 8 && time.length >= 8){
			tasks.push(new Task(task, date, time));
		}
	}
	
	load(){
		let isLoaded = false;
		const storage = localStorage.getItem('tasks');
		
		if(storage !== null){
			tasks = JSON.parse(storage);
			isLoaded = true;
		}
		
		return isLoaded;
	}
	
	save(){
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}
	
	wipe(){
		localStorage.clear();
	}

	display(){
		let row;
		let entry;

		tasks.forEach( task => {
			row = document.createElement('tr');
			entry = `<td>${task.description}</td>
					 <td>${task.date}</td>
				     <td>${task.time}</td>
					 <td><a href='#'><i class='material-icons'>close</i></a></td>
					`;
			
			row.className = 'task';
			row.innerHTML = entry;

			this.table.appendChild(row);
		});
	}

	remove(event){
		const source = event.target;
		const link = source.parentElement;
		const entry = link.parentElement;
		const row = entry.parentElement;

		const classes = row.classList;
	
		if(classes.contains('task')){
			row.remove();
		}
	}

	erase(event){
		const source = event.target;
		const link = source.parentElement;
		const entry = link.parentElement;
		const row = entry.parentElement;

		const description = row.firstElementChild;
		const date = description.nextElementSibling;
		const time = date.nextElementSibling;

		tasks = tasks.filter( task => {
			return task.description !== description.textContent;
		});
	}

	clear(){
		let elements = document.querySelectorAll('#task-list > .task');
		
		if(elements.length > 0){
			for(let index = 0; index < elements.length; ++index){
				elements[index].remove();
			}
		}
	}
}

const manager = new Manager();

document.querySelector('#task-list').addEventListener('click', function(event){
	manager.remove(event);	
	manager.erase(event);
	manager.save();
	manager.clear();
	manager.display();

	event.preventDefault();
});

document.querySelector('#submit').addEventListener('click', function(event){
	manager.push();
	manager.save();
	manager.clear();
	manager.display();

	event.preventDefault();
});

document.querySelector('#clear').addEventListener('click', function(event){
	manager.clear();
	manager.wipe();

	event.preventDefault();
});

document.addEventListener('DOMContentLoaded', function(){
	const loaded = manager.load();

	if(loaded){
		manager.clear();
		manager.display();
	}

	elTaskDate = document.getElementById('task-date');
	elTaskTime = document.getElementById('task-time');
	
	M.Datepicker.init(elTaskDate);
	M.Timepicker.init(elTaskTime);
});
