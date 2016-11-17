"use strict";
window.onload = function(){
	var subTables = function (){
		for(var tr of document.querySelectorAll('.arrow')){
			tr.addEventListener("click", function(event){
				var id = event.target.parentNode.parentNode.id;
				for(var child of document.querySelectorAll("[id*=" + id + "_]")){
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

	(function(){
		var selector = document.querySelector('#categories_select');
		for(var value of getValuesByKey(data, 'category')){
			var option = document.createElement("option");
			option.text = value;
			option.value = value.toLowerCase();
			selector.appendChild(option);
		}
	})();

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
	document.getElementById("cross").addEventListener("click", function(){
		document.querySelector('#categories_select').value = "empty";
	})
	document.querySelector('#categories_select').addEventListener("change", function(){
		while(table.rows.length > 0) {
			table.deleteRow(0);
		}
		var category = this.value;
		if (this.value === "empty"){
			createTable('table', headers, keys, data);
		}
		for(var obj of data){
			if(category == obj["category"].toLowerCase()){
				if (obj.child)
					createTable('table', headers, keys, obj.child);
			}
		}
		subTables();
	});

	document.querySelector('#row0 td:first-child').addEventListener("click", function(){
		console.log(1);
	});

	document.querySelector('#row0 td:last-child').onclick = function(){
		document.querySelector('#row0 td:first-child').click();
	}

	
}