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

populateSelect();

document.querySelector(".hihi").innerHTML = readFromJSON(path.join(__dirname, '../database/misc.json')).obj.username;

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
                         <input type="button" onclick="registerEvent(${event.key})" value="Register">
                      <!--</div>-->
                   </td>
                </tr>
             `
            }
            placeholder.innerHTML = output;
        });
}

function registerEvent(key) {
    let requests = readFromJSON(path.join(__dirname, '../database/requests.json'));
    let events = readFromJSON(path.join(__dirname, '../database/events.json'));
    let name;
    for (i of events)
        if (i.key == key) {
            name = i.event_name;
            break;
        }
    requests.push({
        student__name: readFromJSON(path.join(__dirname, '../database/misc.json')).obj.username,
        event__name: name
    });
    // console.log(requests);
    writeToJSON(path.join(__dirname, '../database/requests.json'), requests);
}

updateEvents();