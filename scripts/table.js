function createTable(id, rowNum, colNum){
    table = document.getElementById(id).appendChild(document.createElement('table'));
    var row = table.insertRow(i);
    for(var j = 0; j < colNum; j++){
            row.appendChild(document.createElement('th'));
        }
    for(var i = 1; i < rowNum; i++){
        var row = table.insertRow(i);    
        for(var j = 0; j < colNum; j++){
            row.insertCell(j);
        }
        var chart = row.lastChild;
        chart.id = 'table_chart';
        addDiv(addDiv(chart, 'chart_left'),'negative');
        addDiv(addDiv(chart, 'chart_right'),'positive');
    }
}

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

var max_negative, max_positive;

function fillTable(id, keys, headers, num){
    max_positive =  getMaxOfArray(getValuesByKey(data, 'positive', num - 1));
    max_negative = getMaxOfArray(getValuesByKey(data, 'negative', num - 1));
    row = table.getElementsByTagName('tr')[0];
    for(var j = 0; j < headers.length; j++){
            row.children[j].innerHTML = headers[j];
        }
    for (var i = 0; i < headers.length - 1; i++){
        for (var j = 1; j < num; j++ ){
            var row = table.getElementsByTagName('tr')[j];
            row.children[i].innerHTML = data[j-1][keys[i]];
            drawChart(j-1);
        }
    }
    if (document.querySelector("#distrib select").value === 'percent'){
        fillPercentageTable();
    }
}

function fillPercentageTable(){
    var table = document.getElementById('table').children[0];
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

function drawChart(i){
    var negative_width = (Math.abs(data[0]['negative'] / data[0]['total'] * 100)).toFixed(2);
    var positive_width = 100 - negative_width;
    document.getElementsByClassName('chart_left')[i].style.width = negative_width + "%";
    document.getElementsByClassName('chart_right')[i].style.width = positive_width + "%";
    var negative = (Math.abs(data[i]['negative'] / max_negative * 100)).toFixed(2);
    var positive = (Math.abs(data[i]['positive'] / max_positive * 100)).toFixed(2);
    document.getElementsByClassName('negative')[i].style.width = negative + "%";
    document.getElementsByClassName('positive')[i].style.width = positive + "%";
}