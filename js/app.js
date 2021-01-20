// Global Variables
const goodHabits = document.querySelectorAll('.good-habit');
const goodHabitsArr = Array.from(goodHabits);
const dailyGoodHabit = document.querySelector('.daily-good-habit');
const badHabits = document.querySelectorAll('.bad-habit');
const badHabitsArr = Array.from(badHabits);
const dailyBadHabit = document.querySelector('.daily-bad-habit');
const displayTime = document.querySelector('.time');
const displayDate = document.querySelector('.date');
const checkGood = document.querySelector('#check1');
const checkBad = document.querySelector('#check2');
const scoreDisplay = document.querySelector('.score');
const streakDisplay = document.querySelector('.streak');

let startDate;
let initiated;
let randGoodHabit;
let myGoodHabit;
let randBadHabit;
let myBadHabit;
let checkGoodChecked = false;
let checkBadChecked = false;
let score;
let streak;
let remGood;
let remBad;
let getLength;

// Get Initiated Status
initiated = JSON.parse(localStorage.getItem('initiated'));

// Get Start Date
startDate = JSON.parse(localStorage.getItem('startDate'));

// Get Today's Date
const d = new Date();
const todayDay = d.getDate();
const todayMonth = d.getMonth() + 1;
const todayYear = d.getFullYear();
const todayDate = todayDay + '/' + todayMonth + '/' + todayYear;
console.log(todayDate);

// Display Date & Time
function displayClock() {
	clockD = new Date();
	clockMin = clockD.getMinutes();

	getLength = clockMin.toString().length;

	clockHour = clockD.getHours();
	clockDay = clockD.getDate();
	clockMonth = clockD.getMonth();
	clockYear = clockD.getFullYear();

	if (getLength === 1) {
		console.log('one');
		clockHourMin = clockHour + ':0' + clockMin;
	} else {
		console.log('two');
		clockHourMin = clockHour + ':' + clockMin;
	}

	clockDate = clockDay + ' - ' + clockMonth + ' - ' + clockYear;

	displayTime.innerHTML = `${clockHourMin}`;
	displayDate.innerHTML = `${clockDate}`;
}

displayClock();
setInterval(displayClock, 10000);

// Initiate The App
document.querySelector('#button-good-habit').addEventListener('click', () => {
	if (
		document.querySelector('.daily-good-habit').innerHTML === '' &&
		document.querySelectorAll('.bad-habit').length != 0 &&
		initiated != true
	) {
		// Set start date
		date = new Date();
		startDay = date.getDate();
		startMonth = date.getMonth() + 1;
		startYear = date.getFullYear();
		startDate = startDay + '/' + startMonth + '/' + startYear;
		localStorage.setItem('startDate', JSON.stringify(startDate));

		initiated = true;
		localStorage.setItem('initiated', JSON.stringify(true));
	}
});

document.querySelector('#button-bad-habit').addEventListener('click', () => {
	if (
		document.querySelector('.daily-bad-habit').innerHTML === '' &&
		document.querySelectorAll('.good-habit').length != 0 &&
		initiated != true
	) {
		// Set start date
		date = new Date();
		startDay = date.getDate();
		startMonth = date.getMonth() + 1;
		startYear = date.getFullYear();
		startDate = startDay + '/' + startMonth + '/' + startYear;
		localStorage.setItem('startDate', JSON.stringify(startDate));

		initiated = true;
		localStorage.setItem('initiated', JSON.stringify(true));
	}
});

// Display Daily Habits
if (startDate === todayDate) {
	myGoodHabit = localStorage.getItem('myGoodHabit');
	dailyGoodHabit.innerHTML = `${myGoodHabit}`;
	myBadHabit = localStorage.getItem('myBadHabit');
	dailyBadHabit.innerHTML = `${myBadHabit}`;
} else {
	console.log('Go to callback');
}

// Checkboxes
checkGoodChecked = JSON.parse(localStorage.getItem('checkGoodChecked'));
checkBadChecked = JSON.parse(localStorage.getItem('checkBadChecked'));

if (checkGoodChecked === true) {
	checkGood.checked = true;
}

if (checkBadChecked === true) {
	checkBad.checked = true;
}

checkGood.addEventListener('click', () => {
	if (checkGood.checked === true) {
		checkGoodChecked = true;
		localStorage.setItem('checkGoodChecked', JSON.stringify(true));
	} else {
		checkGoodChecked = false;
		localStorage.setItem('checkGoodChecked', JSON.stringify(false));
	}
});

checkBad.addEventListener('click', () => {
	if (checkBad.checked === true) {
		checkBadChecked = true;
		localStorage.setItem('checkBadChecked', JSON.stringify(true));
	} else {
		checkBadChecked = false;
		localStorage.setItem('checkBadChecked', JSON.stringify(false));
	}
});

// Display Score And Streak
score = localStorage.getItem('score');
streak = localStorage.getItem('streak');

if (score === null) {
	score = 0;
	localStorage.setItem('score', score);
	scoreDisplay.innerHTML = `Score: ${parseInt(score)}`;
} else {
	scoreDisplay.innerHTML = `Score: ${parseInt(score)}`;
}

if (streak === null) {
	streak = 0;
	localStorage.setItem('streak', streak);
	streakDisplay.innerHTML = `Streak: ${parseInt(streak)}`;
} else {
	streakDisplay.innerHTML = `Streak: ${parseInt(streak)}`;
}

// GOOD HABIT
class Goodhabit {
	constructor(goodHabit) {
		this.goodHabit = goodHabit;
	}
}

class UI {
	addGoodHabit(goodhabit, callback) {
		const goodHabitList = document.getElementById('good-habit-list');

		// Create tr element
		const goodHabitRow = document.createElement('tr');

		// Insert html
		goodHabitRow.innerHTML = `
            <td class="good-habit">${goodhabit.goodHabit}</td>
            <td class="remove" id="remove-good">&#10005</td>
        `;

		// Add row to list
		goodHabitList.appendChild(goodHabitRow);

		if (callback) {
			callback();
		}
	}

	removeGoodHabit(target, callback) {
		if (target.id === 'remove-good') {
			target.parentElement.remove();

			callback();
		}
	}

	clearFields() {
		document.getElementById('good-habit-input').value = '';
	}
}

class Storegood {
	static getGoodHabits() {
		let goodhabitsls;
		if (localStorage.getItem('goodhabitsls') === null) {
			goodhabitsls = [];
		} else {
			goodhabitsls = JSON.parse(localStorage.getItem('goodhabitsls'));
		}

		return goodhabitsls;
	}

	static displayGoodHabits() {
		const goodhabitsls = Storegood.getGoodHabits();

		goodhabitsls.forEach(function (goodhabit) {
			// Instantiate ui
			const ui = new UI();

			// Add good habit to ui
			ui.addGoodHabit(goodhabit);
		});
	}

	static addGoodHabitToLs(goodhabit) {
		const goodhabitsls = Storegood.getGoodHabits();

		goodhabitsls.push(goodhabit);

		localStorage.setItem('goodhabitsls', JSON.stringify(goodhabitsls));
	}

	static removeGoodHabitFromLs(habit) {
		const goodhabitsls = Storegood.getGoodHabits();

		goodhabitsls.forEach(function (goodhabit, index) {
			console.log(goodhabit);
			console.log(habit);

			if (goodhabit.goodHabit == habit) {
				console.log('same');
				goodhabitsls.splice(index, 1);
			}
		});

		localStorage.setItem('goodhabitsls', JSON.stringify(goodhabitsls));
	}
}

Storegood.displayGoodHabits();

// Event Listener For Adding A Good Habit
document
	.getElementById('button-good-habit')
	.addEventListener('click', function (e) {
		// Get form value
		const goodHabit = document.getElementById('good-habit-input').value;

		// Instantiate good habit
		const goodhabit = new Goodhabit(goodHabit);

		// Instantiate UI
		const ui = new UI();

		// Validate
		if (goodHabit === '') {
			let toastElList = [].slice.call(document.querySelectorAll('.toast'));
			let toastList = toastElList.map(function (toastEl) {
				return new bootstrap.Toast(toastEl);
			});
			toastList[0].show();
		} else {
			// add good habit to list
			ui.addGoodHabit(goodhabit, goodHabitsNode);

			// add to ls
			Storegood.addGoodHabitToLs(goodhabit);

			// clear fields
			ui.clearFields();

			// initiateGood();
		}
	});

// Event Listener For Removing A Good Habit
document
	.getElementById('good-habit-list')
	.addEventListener('click', function (e) {
		remGood = document.querySelectorAll('#remove-good');

		if (remGood.length > 1) {
			// Instantiate UI
			const ui = new UI();

			// Remove good habit from list
			ui.removeGoodHabit(e.target, goodHabitsNode);

			// Remove from ls
			Storegood.removeGoodHabitFromLs(
				e.target.previousElementSibling.textContent
			);
		} else {
			let toastElList = [].slice.call(document.querySelectorAll('.toast'));
			let toastList = toastElList.map(function (toastEl) {
				return new bootstrap.Toast(toastEl);
			});
			toastList[2].show();
		}
	});

// Callback To Get Node List Of All Good Habits
function goodHabitsNode() {
	// Create node list of all good habits
	const goodHabits = document.querySelectorAll('.good-habit');

	// Create array from node list
	const goodHabitsArr = Array.from(goodHabits);

	if (initiated === true && startDate != todayDate) {
		// Generate random good habit from array
		myGoodHabitsListLength = goodHabitsArr.length;
		numGoodHabits = Math.floor(Math.random() * myGoodHabitsListLength + 1);
		randGoodHabit = goodHabitsArr[numGoodHabits - 1];

		myGoodHabit = randGoodHabit.innerHTML;

		localStorage.setItem('myGoodHabit', myGoodHabit);

		dailyGoodHabit.innerHTML = `${myGoodHabit}`;

		if (checkGood.checked === true && checkBad.checked === true) {
			console.log('checked');
			score = parseInt(localStorage.getItem('score', score));
			streak = parseInt(localStorage.getItem('streak', streak));
			score += 1;
			streak += 1;

			localStorage.setItem('score', score);
			localStorage.setItem('streak', streak);

			scoreDisplay.innerHTML = `Score: ${parseInt(score)}`;

			streakDisplay.innerHTML = `Streak: ${parseInt(streak)}`;
		} else {
			console.log('not checked');
			score = parseInt(localStorage.getItem('score', score));
			streak = 0;

			localStorage.setItem('score', score);
			localStorage.setItem('streak', streak);

			scoreDisplay.innerHTML = `Score: ${parseInt(score)}`;

			streakDisplay.innerHTML = `Streak: ${parseInt(streak)}`;
		}

		checkGood.checked = false;
		localStorage.setItem('checkGoodChecked', JSON.stringify(false));
		checkBad.checked = false;
		localStorage.setItem('checkBadChecked', JSON.stringify(false));
	} else {
		console.log('First habit or Habit ongoing');

		if (goodHabitsArr.length > 0 && dailyGoodHabit.innerHTML === '') {
			myGoodHabitsListLength = goodHabitsArr.length;
			numGoodHabits = Math.floor(Math.random() * myGoodHabitsListLength + 1);
			randGoodHabit = goodHabitsArr[numGoodHabits - 1];

			myGoodHabit = randGoodHabit.innerHTML;

			localStorage.setItem('myGoodHabit', myGoodHabit);

			dailyGoodHabit.innerHTML = `${myGoodHabit}`;
		}
	}
}

// BAD HABIT
class Badhabit {
	constructor(badHabit) {
		this.badHabit = badHabit;
	}
}

class UI2 {
	addBadHabit(badhabit, callback) {
		const badHabitList = document.getElementById('bad-habit-list');

		// Create tr element
		const badHabitRow = document.createElement('tr');

		// Insert html
		badHabitRow.innerHTML = `
            <td class="bad-habit">${badhabit.badHabit}</td>
            <td class="remove" id="remove-bad">&#10005;</td>
        `;

		// Add row to list
		badHabitList.appendChild(badHabitRow);
		if (callback) {
			callback();
		}
	}

	removeBadHabit(target, callback) {
		if (target.id === 'remove-bad') {
			target.parentElement.remove();

			callback();
		}
	}

	clearFields() {
		document.getElementById('bad-habit-input').value = '';
	}
}

class Storebad {
	static getBadHabits() {
		let badhabitsls;
		if (localStorage.getItem('badhabitsls') === null) {
			badhabitsls = [];
		} else {
			badhabitsls = JSON.parse(localStorage.getItem('badhabitsls'));
		}

		return badhabitsls;
	}

	static displayBadHabits() {
		const badhabitsls = Storebad.getBadHabits();

		badhabitsls.forEach(function (badhabit) {
			// Instantiate ui
			const ui2 = new UI2();

			// Add good habit to ui
			ui2.addBadHabit(badhabit);
		});
	}

	static addBadHabitToLs(badhabit) {
		const badhabitsls = Storebad.getBadHabits();

		badhabitsls.push(badhabit);

		localStorage.setItem('badhabitsls', JSON.stringify(badhabitsls));
	}

	static removeBadHabitFromLs(habit) {
		const badhabitsls = Storebad.getBadHabits();

		badhabitsls.forEach(function (badhabit, index) {
			console.log(badhabit);
			console.log(habit);

			if (badhabit.badHabit == habit) {
				console.log('same');
				badhabitsls.splice(index, 1);
			}
		});

		localStorage.setItem('badhabitsls', JSON.stringify(badhabitsls));
	}
}

Storebad.displayBadHabits();

// Event Listener For Adding A Bad Habit
document
	.getElementById('button-bad-habit')
	.addEventListener('click', function (e) {
		// Get form value
		const badHabit = document.getElementById('bad-habit-input').value;

		// Instantiate bad habit
		const badhabit = new Badhabit(badHabit);

		// Instantiate UI
		const ui2 = new UI2();

		// Validate
		if (badHabit === '') {
			let toastElList = [].slice.call(document.querySelectorAll('.toast'));
			let toastList = toastElList.map(function (toastEl) {
				return new bootstrap.Toast(toastEl);
			});
			toastList[0].show();
		} else {
			// add bad habit to list
			ui2.addBadHabit(badhabit, badHabitsNode);

			// add to ls
			Storebad.addBadHabitToLs(badhabit);

			// clear fields
			ui2.clearFields();

			// initiateBad();
		}
	});

// Event Listener For Removing A Bad Habit
document
	.getElementById('bad-habit-list')
	.addEventListener('click', function (e) {
		remBad = document.querySelectorAll('#remove-bad');

		if (remBad.length > 1) {
			// Instantiate UI
			const ui2 = new UI2();

			// Remove good habit from list
			ui2.removeBadHabit(e.target, badHabitsNode);

			// Remove from ls
			Storebad.removeBadHabitFromLs(
				e.target.previousElementSibling.textContent
			);
		} else {
			let toastElList = [].slice.call(document.querySelectorAll('.toast'));
			let toastList = toastElList.map(function (toastEl) {
				return new bootstrap.Toast(toastEl);
			});
			toastList[2].show();
		}
	});

// Callback To Get Node List Of All Bad Habits
function badHabitsNode() {
	// Create node list of all bad habits
	const badHabits = document.querySelectorAll('.bad-habit');

	// Create array from node list
	const badHabitsArr = Array.from(badHabits);

	if (initiated === true && startDate != todayDate) {
		// Generate random bad habit from array
		myBadHabitsListLength = badHabitsArr.length;
		numBadHabits = Math.floor(Math.random() * myBadHabitsListLength + 1);
		randBadHabit = badHabitsArr[numBadHabits - 1];

		myBadHabit = randBadHabit.innerHTML;

		localStorage.setItem('myBadHabit', myBadHabit);

		dailyBadHabit.innerHTML = `${myBadHabit}`;

		// Reset start date
		startDate = todayDate;

		localStorage.setItem('startDate', JSON.stringify(startDate));
	} else {
		console.log('First habit or Habit ongoing');

		if (badHabitsArr.length > 0 && dailyBadHabit.innerHTML === '') {
			myBadHabitsListLength = badHabitsArr.length;
			numBadHabits = Math.floor(Math.random() * myBadHabitsListLength + 1);
			randBadHabit = badHabitsArr[numBadHabits - 1];

			myBadHabit = randBadHabit.innerHTML;

			localStorage.setItem('myBadHabit', myBadHabit);

			dailyBadHabit.innerHTML = `${myBadHabit}`;
		}
	}
}

// Toast When There Are No Habits
if (initiated != true) {
	let toastElList = [].slice.call(document.querySelectorAll('.toast'));
	let toastList = toastElList.map(function (toastEl) {
		return new bootstrap.Toast(toastEl);
	});
	toastList[1].show();
}

// Navbar Event Listeners
document.querySelector('.nav-link-home').addEventListener('click', () => {
	document.querySelector('.row-1').style = 'display: block';
	document.querySelector('.row-2').style = 'display: block';
	document.querySelector('.row-3').style = 'display: none';
	document.querySelector('.row-4').style = 'display: none';
});

document.querySelector('.nav-link-habits').addEventListener('click', () => {
	document.querySelector('.row-1').style = 'display: none';
	document.querySelector('.row-2').style = 'display: none';
	document.querySelector('.row-3').style = 'display: block';
	document.querySelector('.row-4').style = 'display: none';
});

document.querySelector('.nav-link-about').addEventListener('click', () => {
	document.querySelector('.row-1').style = 'display: none';
	document.querySelector('.row-2').style = 'display: none';
	document.querySelector('.row-3').style = 'display: none';
	document.querySelector('.row-4').style = 'display: block';
});

goodHabitsNode();
badHabitsNode();
