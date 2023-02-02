const path = require('path');
const fs = require('fs');

function readFromJSON(file) {
   return JSON.parse(fs.readFileSync(file));
}

function writeToJSON(file, data) {
   fs.writeFileSync(file, JSON.stringify(data, null, 2), {
      encoding: 'utf-8',
      flag: 'w'
   });
   console.log(`Wrote ${data} to ${file}`);
}

// AUTOMATICALLY RESIZE TEXTAREA

// const tx = document.getElementsByTagName('textarea');

// for (let i = 0; i < tx.length; i++) {
//    tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
//    tx[i].addEventListener('input', OnInput, false);
// }

// function OnInput() {
//    this.style.height = 0;
//    this.style.height = (this.scrollHeight) + 'px';
// }

function generateDefaultPassword(length = 8) {
   return Math.random().toString(36).slice(-length);
}


// change color of select dropdown on change
// var selectThing = document.querySelector('.student__grade');
// selectThing.onchange = function () {
//    selectThing.className = this.options[this.selectedIndex].className;
// }

// change color of date picker on change
let startDateCol = document.querySelector('.start__date');
let endDateCol = document.querySelector('.end__date');
startDateCol.style.color = (startDateCol.value !== '') ? '#aaa' : '#777';
endDateCol.style.color = (endDateCol.value !== '') ? '#aaa' : '#777';
startDateCol.onchange = function () {
   startDateCol.style.color = (startDateCol.value !== '') ? '#aaa' : '#777';
}
endDateCol.onchange = function () {
   endDateCol.style.color = (endDateCol.value !== '') ? '#aaa' : '#777';
}

function toggleEvents() {
   let eventsWindow = document.querySelector('.events__holder');
   eventsWindow.style.display = eventsWindow.style.display == 'none' ? 'block' : 'none';
}

function toggleAccounts() {
   let accountsWindow = document.querySelector('.accounts__holder');
   accountsWindow.style.display = accountsWindow.style.display == 'none' ? 'block' : 'none';
}

function updateEvents() {
   fetch(path.join(__dirname, '../database/events.json'))
      .then(function (response) {
         return response.json();
      })
      .then(function (events) {
         let placeholder = document.querySelector('.events__output');
         let output = '';
         for (event of events) {
            output += `
               <tr>
                  <td>${event.event_name}</td>
                  <td>${event.event_description}</td>
                  <td>${event.prize}</td>
                  <td>${event.start_date}</td>
                  <td>${event.end_date}</td>
                  <td>
                     <!--<div class="button__bar">-->
                        <input type="button" onclick="editEvent()" value="Edit">
                        <input type="button" onclick="deleteEvent()" value="Delete">
                     <!--</div>-->
                  </td>
               </tr>
            `
         }
         placeholder.innerHTML = output;
      });
}

updateEvents();

function updateAccounts() {
   fetch(path.join(__dirname, '../database/accounts.json')).then(function (res) {
      return res.json();
   }).then(function (accounts) {
      let placeholder = document.querySelector('.accounts__output');
      let output = '';
      for (account of accounts) {
         if (account.admin) {
            output += `
               <tr>
                  <td>${account.fname}</td>
                  <td>${account.lname}</td>
                  <td>${account.grade}</td>
                  <td>${account.username}</td>
                  <td>${account.points}</td>
                  <!--<td>
                     <input type="button" onclick="editAccount()" value="Edit">
                     <input type="button" onclick="deleteAccount()" value="Delete">
                  </td>-->
                  <td>ADMIN</td>
               </tr>
            `
         } else {
            output += `
               <tr>
                  <td>${account.fname}</td>
                  <td>${account.lname}</td>
                  <td>${account.grade}</td>
                  <td>${account.username}</td>
                  <td>${account.points}</td>
                  <td>
                     <input type="button" onclick="editAccount()" value="Edit">
                     <input type="button" onclick="deleteAccount()" value="Delete">
                  </td>
               </tr>
            `
         }
      }
      placeholder.innerHTML = output;
   });
}

updateAccounts();

function createNewEvent() {
   let currentEvents = readFromJSON(path.join(__dirname, '../database/events.json'));
   let eventName = document.querySelector('.event__name').value;
   let eventDescription = document.querySelector('.event__description').value;
   let prize = document.querySelector('.prize').value;
   let startDate = document.querySelector('.start__date').value;
   let endDate = document.querySelector('.end__date').value;
   if (
      eventName === '' ||
      eventDescription === '' ||
      prize === '' ||
      startDate === '' ||
      endDate === ''
   ) {
      alert('Empty fields present')
      return;
   } else if (endDate < startDate) {
      alert('Start date is later than end date');
      return;
   }
   startDate = startDate.split('-');
   endDate = endDate.split('-');
   startDate = `${startDate[1]}/${startDate[2]}/${startDate[0]}`;
   endDate = `${endDate[1]}/${endDate[2]}/${endDate[0]}`;
   let eventTemplate = {
      "event_name": eventName,
      "event_description": eventDescription,
      "prize": prize,
      "start_date": startDate,
      "end_date": endDate,
      "participants": []
   }
   currentEvents.push(eventTemplate);
   writeToJSON(path.join(__dirname, '../database/events.json'), currentEvents);
   updateEvents();
}

function editEvent() {
}

function deleteEvent() {
}

function createNewAccount() {
   let currentAccounts = readFromJSON(path.join(__dirname, '../database/accounts.json'));

   let fullName = document.querySelector('.student__name').value;
   let sanitized = fullName.toLowerCase();
   // alert(sanitized)
   // alert(fullName.split(' ')[1])
   let fname = fullName.split(' ')[0];
   let lname = fullName.split(' ')[1];

   let grade = document.querySelector('.student__grade').value;
   alert(grade)

   // let username = document.querySelector('.student__username').value;
   let username = `${sanitized.split(' ')[0][0]}${sanitized.split(' ')[1]}`

   let password = generateDefaultPassword();

   let accountTemplate = {
      "fname": fname,
      "lname": lname,
      "grade": grade,
      "username": username,
      "password": password,
      "points": 0,
      "admin": false
   }

   currentAccounts.push(accountTemplate);
   writeToJSON(path.join(__dirname, '../database/accounts.json'), currentAccounts);
   updateAccounts();
}