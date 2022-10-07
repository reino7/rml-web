'use strict';

/* local Dev or Test srv URL */
let getGurrentUrlHost = window.location.hostname;
let getGurrentUrlPort = window.location.port;
let getGurrentUrlProtocol = window.location.protocol;
let apiUrlHost = 'lt-test.ristissaar.ee';
let apiUrlPath = '/api/v1/schedule';
let apiUrl = `${getGurrentUrlProtocol}//${apiUrlHost}${apiUrlPath}`;

if (getGurrentUrlHost == 'localhost') {
  apiUrl = `${getGurrentUrlProtocol}//localhost:${getGurrentUrlPort}${apiUrlPath}`;
}

/* GET competitions list from API */
// fetch('http://localhost:3000/api/competitions-schedule')
// fetch('https://lt-test.ristissaar.ee/api/competitions-schedule')
fetch(apiUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (dataJson) {
    appendData2CompetitionsTable(dataJson);
  })
  .catch(function (err) {
    console.log('error: ' + err);
  });

// Display data from API to HTML Tables
function appendData2CompetitionsTable(data) {
  const competitionsTableContainer =
    document.getElementById('competitionsTable');

  for (let i = 0; i < data.length; i++) {
    competitionsTableContainer.innerHTML += `<tr>
      <td class="text-center">${parseDate(data[i].sche_date)}</td>
      <td class="text-center">${data[i].sche_time}</td>
      <td>
      ${data[i].sche_name}
      </td>
      <td>${data[i].sche_location}</td>
    </tr>`;
  }
}

function searchTableData() {
  let input, filter, table, tr, td, cell, i, j;
  input = document.getElementById('searchInput');
  filter = input.value.toUpperCase();
  table = document.getElementById('table');
  tr = table.getElementsByTagName('tr');
  for (i = 1; i < tr.length; i++) {
    // Hide the row initially.
    tr[i].style.display = 'none';

    td = tr[i].getElementsByTagName('td');
    for (j = 0; j < td.length; j++) {
      cell = tr[i].getElementsByTagName('td')[j];
      if (cell) {
        if (cell.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = '';
          break;
        }
      }
    }
  }
}

function parseDate(dateString) {
  /* axios uses JSON.stringify for serialisation and it causes 
  the translation to UTC. This loses 2 hours for timezone difference.
  Adding 2 hours to correct this */
  // dateString = moment(dateString).add(2, 'hours').format();

  let dateComponents = dateString.split('T');
  let datePieces = dateComponents[0].split('-');
  let year = datePieces[0];
  let month = datePieces[1];
  let day = datePieces[2];

  let competitionDate = `${day}.${month}.${year}`;

  return competitionDate;
}

// function getMonth(monthNumber) {
//   let monthNames = [
//     'jaanuar',
//     'veebruar',
//     'märts',
//     'aprill',
//     'mai',
//     'juuni',
//     'juuli',
//     'august',
//     'september',
//     'oktoober',
//     'november',
//     'detsember',
//   ];

//   return monthNames[monthNumber - 1];
// }
