"use strict";
window.onload = function(){
	var rowNum = parseInt(document.querySelector("#row_num select").value);
	var keys = ['category', 'total', 'negative','positive'];
	var headers = ["Categories", "Total", "Negative", "Positive", "Charts"];
	createTable('table', headers, keys, data, rowNum);

	document.querySelector("#row_num select").addEventListener("change", function(){
		while(table.rows.length > 0) {
			table.deleteRow(0);
		}
		rowNum = parseInt(this.value);
		createTable('table', headers, keys, data, rowNum);
	});

	document.querySelector("#chart_type select").addEventListener("change", function(){
		while(table.rows.length > 0) {
			table.deleteRow(0);
		}
		sortByKey(data, this.value);
		createTable('table', headers, keys, data, rowNum);
	});

	document.querySelector("#distrib select").addEventListener("change", function(){
		if (this.value === 'counts'){
			while(table.rows.length > 0) {
				table.deleteRow(0);
			}
			createTable('table', headers, keys, data, rowNum);
		}
		if (this.value === 'percent'){
			fillPercentageTable();
		}
	});
}