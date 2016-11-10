"use strict";
function createTable(id, headers, keys, data, num){
	var table = document.getElementById(id);
	table.appendChild(addHeaders(headers));
	max_negative = getMaxOfArray(getValuesByKey(data, 'negative', num));
	max_positive =  getMaxOfArray(getValuesByKey(data, 'positive', num));
	if (num === undefined){
		num = data.length;
	}
	sortByKey(data, document.querySelector("#chart_type select").value);
	for(var i = 0; i < num; i++){
		var values = getValuesByKeys(data, i, keys);
		table.appendChild(addRow(i, values));
		drawChart(i, data);
	}
	if (document.querySelector("#distrib select").value === 'percent'){
        fillPercentageTable();
    }
}

function createSubTable(num){
	
}

function addHeaders(headers){
	var	row = document.createElement('tr');
	row.className = "titles";
	for(var i = 0; i < headers.length; i++){
		var th = document.createElement('th');
		th.innerHTML = headers[i];
		row.appendChild(th);
	}
	return row;
}

function addRow(num, values){
	var	row = document.createElement('tr');
	row.id = "row" + num;
	for(var i = 0; i < values.length; i++){
		var td = document.createElement('td');
		td.innerHTML = values[i];
		row.appendChild(td);
	}
	var chart = row.appendChild(document.createElement('td'));
	addDiv(addDiv(chart, 'chart_left'),'negative');
    addDiv(addDiv(chart, 'chart_right'),'positive');
	return row;
}

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

function fillPercentageTable(){
    var table = document.getElementById('table');
    for(var i = 1; i < table.rows.length; i++){
        table.rows[i].cells[2].innerHTML =
         (table.rows[i].cells[2].innerHTML / table.rows[i].cells[1].innerHTML * 100).toFixed(0) + "%";
        table.rows[i].cells[3].innerHTML =
         (table.rows[i].cells[3].innerHTML / table.rows[i].cells[1].innerHTML * 100).toFixed(0) + "%";
    }
}

function addDiv(parent, elClass){
       var div = document.createElement('div');
       div.setAttribute("class", elClass);
       return parent.appendChild(div);
}

var max_positive, max_negative;
var negative_width = (Math.abs(data[0]['negative'] / data[0]['total'] * 100)).toFixed(2);
var positive_width = (Math.abs(data[0]['positive'] / data[0]['total'] * 100)).toFixed(2);

function drawChart(i, data){
    document.getElementsByClassName('chart_left')[i].style.width = negative_width + "%";
    document.getElementsByClassName('chart_right')[i].style.width = positive_width + "%";
    var negative = (Math.abs(data[i]['negative'] / max_negative * 100)).toFixed(2);
    var positive = (Math.abs(data[i]['positive'] / max_positive * 100)).toFixed(2);
    document.getElementsByClassName('negative')[i].style.width = negative + "%";
    document.getElementsByClassName('positive')[i].style.width = positive + "%";
}