"use strict";
var inputData = data;
window.onload = function(){
	var headers = ["Categories", "Total", "Negative", "Positive", "Charts"];
	var keys = ['total', 'negative','positive'];
	createTable('table', headers, keys);
	addOption();
	document.querySelector("#chart_type select").addEventListener("change", function(){
		sortByKey(data, this.value);
		while(table.rows.length > 0) {
			table.deleteRow(0);
		}
		createTable('table', headers, keys);
	});

	document.querySelector("#row_num select").addEventListener("change", function(){
		showNRows(table, this.value);
	});

	document.querySelector("#categories_select").addEventListener("change", function(){
		rewriteTable();
	});

	document.querySelector("#cross").addEventListener("click", function(){
		var selector = document.querySelector("#categories_select");
		selector.value = "empty";
		createTable('table', headers, keys);
	});

	document.querySelector("#distrib select").addEventListener("change", function(){
		if (this.value === 'counts'){
			while(table.rows.length > 0) {
				table.deleteRow(0);
			}
			createTable('table', headers, keys);
		}
		if (this.value === 'percent'){
			fillPercentageTable('table');
		}
	});


	function rewriteTable(){
		while(table.rows.length > 0) {
				table.deleteRow(0);
			}
		createTable('table', headers, keys);
	}
}

function getCurrentCategory(){
	while(table.rows.length > 0) {
		table.deleteRow(0);
	}
	var category = document.getElementById('categories_select').value;
	if (category === "empty"){
		return data;
	}
	for(var obj of data){
		if(category == obj["category"].toLowerCase()){
			if (obj.child)
				return obj.child;
			}
		}
	};

function addEventHandlers(table){
	var titles = table.querySelectorAll('tr:not(.table_header) span');
	for(var el of titles){
		el.onclick = function(){
			alert(this.innerText + " clicked");
		}
	}
}

function addChartsHandlers(table){
	var charts = table.querySelectorAll('tr:not(.table_header) td:last-child');
	for(var el of charts){
		el.onclick = function(){
			this.parentNode.querySelector('span').click();
		}
	}
}

function addOption(){
	var selector = document.querySelector('#categories_select');
	var options = document.querySelectorAll('.main-category[childs] td:first-child span');
	for(var value of options){
		var option = document.createElement("option");
		option.text = value.innerText;
		option.value = value.innerText.toLowerCase();
		selector.appendChild(option);
	}
}