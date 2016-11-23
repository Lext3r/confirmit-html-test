"use strict";
window.onload = function(){
		var headers = ["Categories", "Total", "Negative", "Positive", "Charts"];
		var keys = ['total', 'negative','positive'];
		createTable('table', headers, keys, data);

		document.querySelector("#chart_type select").addEventListener("change", function(){
			while(table.rows.length > 0) {
				table.deleteRow(0);
			}
			sortByKey(data, this.value);
			createTable('table', headers, keys, data);
		});

		document.querySelector("#row_num select").addEventListener("change", function(){
			showNRows(table, this.value);
		});

		document.querySelector("#distrib select").addEventListener("change", function(){
			if (this.value === 'counts'){
				while(table.rows.length > 0) {
					table.deleteRow(0);
				}
				createTable('table', headers, keys, data);
			}
			if (this.value === 'percent'){
				fillPercentageTable('table');
			}
		});



	/*document.querySelector('#row0 td:last-child').onclick = function(){
		document.querySelector('#row0 td:first-child').click();
	}*/
}

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