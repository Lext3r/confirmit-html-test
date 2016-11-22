"use strict";
function createTable(id, headers, keys, data){
	max_negative = getMaxOfArray(getValuesByKey(data, 'negative'));
	max_positive =  getMaxOfArray(getValuesByKey(data, 'positive'));
	var table = document.getElementById(id);
	table.appendChild(addHeaders(headers));
	sortByKey(data, document.querySelector("#chart_type select").value);
	fillTable(table, data, keys);
	addArrowHandlers();
	showNRows(document.querySelector("#row_num select").value);
}


function showNRows(rowNum){
	var rows = document.querySelectorAll('table tr.main-category');
	for (var i = 0; i < rowNum; i++){
		rows[i].style.display = "table-row";
	}
	for(var i = rowNum; i < rows.length; i++){
		rows[i].style.display = "none";
	}
}	


function fillTable(table, data, keys){
	for(var el of data){
		addRow(table, el, keys);
		if(el.child){
			fillTable(table, el.child, keys);
		}
	}
}

function addRow(table, el, keys){
	var categories = getValuesByKey(data, 'category').join(' ');
	var row = document.createElement('tr');
	row.appendChild(addTitle(el));
	for(var name of keys){
		var td = document.createElement('td');
		td.innerText = el[name];
		row.appendChild(td);
	}
	if(!categories.includes(el.category)){
		row.style.display = "none";
		row.className = "child";
	} else {
		row.className = "main-category";
	}
	if (el.child)
		row.setAttribute('childs', el.child.length);
	row.appendChild(addChart());
	drawChart(row);
	table.appendChild(row);
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

function addTitle(el){
	var td = document.createElement('td');
	td.innerHTML = "<span>" + el.category + "</span>";
	if (el.child){
		td.appendChild(addArrowImage());
	}
	return td;
}

function addChart(){
	var td = document.createElement('td');
	addDiv(addDiv(td, 'chart_left'), 'negative');
	addDiv(addDiv(td, 'chart_right'), 'positive');
	return td;
}


function addDiv(parent, divClass){
       var div = document.createElement('div');
       div.setAttribute("class", divClass);
       return parent.appendChild(div);
}

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

function fillPercentageTable(id){
    var table = document.getElementById(id);
    for(var i = 1; i < table.rows.length; i++){
        table.rows[i].cells[2].innerHTML =
         (table.rows[i].cells[2].innerHTML / table.rows[i].cells[1].innerHTML * 100).toFixed(0) + "%";
        table.rows[i].cells[3].innerHTML =
         (table.rows[i].cells[3].innerHTML / table.rows[i].cells[1].innerHTML * 100).toFixed(0) + "%";
    }
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


function addArrowImage(){
	var img = document.createElement('img');
    img.className = "arrow";
    img.src = "./img/arrow.png";
    return img;
}

function addArrowHandlers(){
	for (var el of document.querySelectorAll(".arrow")){
		el.onclick = function(){
			var row = this.parentNode.parentNode;
			hideSubTable(row, row.getAttribute('childs'));
		};
	};
}

function hideSubTable(row, childsNum){
	for(var i = 0; i < childsNum; i++){
		row = row.nextSibling;
		if (row.style.display == "table-row"){
			if(row.hasAttribute('childs') && row.nextSibling.style.display == "table-row"){
				hideSubTable(row, row.getAttribute('childs'));
			}
			row.style.display = "none";
		} else {
			row.style.display = "table-row"
		}
	}
}