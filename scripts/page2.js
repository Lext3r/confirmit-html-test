"use strict";
window.onload = function(){
	var subTables = function (){
		for(var tr of document.querySelectorAll('#table tr td:first-child')){
			tr.addEventListener("click", function(event){
				var id = event.target.parentNode.id;
				for(var child of document.querySelectorAll("[id*=" + id + "ch]")){
					if (child.style.display == "table-row"){
						child.style.display = "none";
					}
					else{
						child.style.display = "table-row";
					};
				}
			})
		}
	}

	var rowNum = parseInt(document.querySelector("#row_num select").value);
	var keys = ['category', 'total', 'negative','positive'];
	var headers = ["Categories", "Total", "Negative", "Positive", "Charts"];
	createTable('table', headers, keys, data, rowNum);
	subTables();

	document.querySelector("#row_num select").addEventListener("change", function(){
		while(table.rows.length > 0) {
			table.deleteRow(0);
		}
		rowNum = parseInt(this.value);
		createTable('table', headers, keys, data, rowNum);
		subTables();
	});

	document.querySelector("#chart_type select").addEventListener("change", function(){
		while(table.rows.length > 0) {
			table.deleteRow(0);
		}
		sortByKey(data, this.value);
		createTable('table', headers, keys, data, rowNum);
		subTables();
	});

	document.querySelector("#distrib select").addEventListener("change", function(){
		if (this.value === 'counts'){
			while(table.rows.length > 0) {
				table.deleteRow(0);
			}
			createTable('table', headers, keys, data, rowNum);
			subTables();
		}
		if (this.value === 'percent'){
			fillPercentageTable();
		}
	});

	
}