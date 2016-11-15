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
		if(data[i].child){
			createSubTable(data[i].child, keys, i);
		}
	}
	if (document.querySelector("#distrib select").value === 'percent'){
        fillPercentageTable();
    }
}

function createSubTable(data, keys, n){
	for(var i = 0; i < data.length; i++){
		table.appendChild(addRow((n + "ch" + i), getValuesByKeys(data, i, keys)));
	}
}

function addHeaders(headers){
	var	row = document.createElement('tr');
	row.className = "table_header";
	for(var el of headers){
		var th = document.createElement('th');
		th.innerHTML = el;
		row.appendChild(th);
	}
	return row;
}

function addRow(num, values){
	var	row = document.createElement('tr');
	row.id = "row" + num;
	for(var el of values){
		var td = document.createElement('td');
		td.innerHTML = el;
		row.appendChild(td);
	}
	var chart = row.appendChild(document.createElement('td'));
	var a = addDiv(addDiv(chart, 'chart_left'),'negative');
    addDiv(addDiv(chart, 'chart_right'),'positive');
    drawChart(row);
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

function addDiv(parent, divClass){
       var div = document.createElement('div');
       div.setAttribute("class", divClass);
       return parent.appendChild(div);
}

var max_positive, max_negative;
var negative_width = (Math.abs(data[0]['negative'] / data[0]['total'] * 100)).toFixed(2);
var positive_width = (Math.abs(data[0]['positive'] / data[0]['total'] * 100)).toFixed(2);

function drawChart(row){

    row.getElementsByClassName('chart_left')[0].style.width = negative_width + "%";
    row.getElementsByClassName('chart_right')[0].style.width = positive_width + "%";
    var negative = (Math.abs(row.children[2].innerHTML / max_negative * 100)).toFixed(2);
    var positive = (Math.abs(row.children[3].innerHTML / max_positive * 100)).toFixed(2);
    row.getElementsByClassName('negative')[0].style.width = negative + "%";
    row.getElementsByClassName('positive')[0].style.width = positive + "%";
}