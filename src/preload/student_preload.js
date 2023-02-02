// const path = require('path');
// const fs = require('fs');

// function readFromJSON(file) {
//    return JSON.parse(fs.readFileSync(file));
// }

// function writeToJSON(file, data) {
//    fs.writeFileSync(file, JSON.stringify(data, null, 2), {
//       encoding: 'utf-8',
//       flag: 'w'
//    });
//    console.log(`Wrote ${data} to ${file}`);
// }

// function populateSelect() {
//    fetch(path.join(__dirname, '../database/events.json'))
//       .then(function (response) {
//          return response.json();
//       })
//       .then(function (events) {
//          let placeholder = document.querySelector('.event__options');
//          let output = '';
//          for (event of events) {
//             output += `
//                <option>${event.event_name}</option>
//             `
//          }
//          placeholder.innerHTML = output;
//       });
// }

// populateSelect();

// function showForm() {
//    document.querySelector('.form__title').innerHTML = document.querySelector('.event__options').value;
// }

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

function populateSelect() {
    fetch(path.join(__dirname, '../database/events.json'))
        .then(function (response) {
            return response.json();
        })
        .then(function (events) {
            let placeholder = document.querySelector('.event__options');
            let output = '';
            for (event of events) {
                output += `
               <option>${event.event_name}</option>
            `
            }
            placeholder.innerHTML = output;
        });
}

document.querySelector('.hihi').innerHTML = JSON.parse(localStorage.getItem("key")).fname;

populateSelect();

function showForm() {
    document.querySelector('.form__title').innerHTML = document.querySelector('.event__options').value;
}

function updateEvents() {
    fetch(path.join(__dirname, '../database/events.json'))
        .then(function (response) {
            return response.json();
        })
        .then(function (events) {
            let placeholder = document.querySelector('.events__output');
            let output = '';
            //   console.log(JSON.parse(localStorage.getItem("key")));
            for (event of events) {
                console.log(event.event_name);
                console.log(JSON.parse(localStorage.getItem("key")).points + '\n\n');
                output += `
                <tr>
                   <td>${event.event_name}</td>
                   <td>${event.event_description}</td>
                   <td>${event.prize}</td>
                   <td>${event.start_date}</td>
                   <td>${event.end_date}</td>
                   <td>
                      <!--<div class="button__bar">-->
                      <input type="button" onclick="registerEvent(${JSON.parse(localStorage.getItem("key")).points}, ${event.key})" value="register">
                      <!--</div>-->
                   </td>
                </tr>
             `
            }
            placeholder.innerHTML = output;
        });
}



function registerEvent(key, key1) {
    let requests = readFromJSON(path.join(__dirname, '../database/requests.json'));
    let users = readFromJSON(path.join(__dirname, '../database/accounts.json'));
    let events = readFromJSON(path.join(__dirname, '../database/events.json'));
    let stuName = 'p';
    for (i of users)
        if (i.points == key) {
            console.log(i)
            stuName = i.username;
            break;
        }
    let eventName = 'p';
    for (i of events)
        if (i.key == key1) {
            eventName = i.event_name;
            break;
        }
    requests.push({
        "student__name": stuName,
        "event__name": eventName
    });
    // writeToJSON(path.join(__dirname, '../database/requests.json'), requests);
    console.log(requests);
}

updateEvents();
