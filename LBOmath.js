//Declare user-defined variables
var entryMultiple = 10;
var exitMultiple = 12;
var entryEBITDA = 10;
var exitEBITDA = 20;
var entryLeverageMultiple = 5;
var entryDebt;
var exitDebt;
var entryEquity;
var exitEquity;
var freeCashFlow = 20;
var holdPeriod = 5;
var entryEquity;
var exitEquity;
var nPD_Multiple_Expansion;
var nPD_EBITDA_Growth;
var nPD_FCF;
var nPD_Total;
var html;
var calculateButton = document.getElementById("calculate");

//Event Listeners
calculateButton.addEventListener("click", function() {
	calculateLBO();
});

//Define functions
function iRR(exitEquity, entryEquity) {
	var iRR = Math.pow((exitEquity / entryEquity),(1 / holdPeriod)) - 1;
	console.log(exitEquity + " " + entryEquity + " " + holdPeriod);
	return iRR;
}

function mOI(exitEquity, entryEquity) {
	var mOI = (exitEquity / entryEquity);
	return mOI;
}

function print(message) {
  var outputDiv = document.getElementById('output');
  outputDiv.innerHTML = message;
}

function calculateLBO () {
//Get Form Values
	entryMultiple = parseInt(document.getElementById("entryMultipleForm").value);
	exitMultiple = parseInt(document.getElementById("exitMultipleForm").value);
	entryEBITDA = parseInt(document.getElementById("entryEBITDAForm").value);
	exitEBITDA = parseInt(document.getElementById("exitEBITDAForm").value);
	entryLeverageMultiple = parseInt(document.getElementById("entryLeverageMultipleForm").value);
	freeCashFlow = parseInt(document.getElementById("freeCashFlowForm").value);
	holdPeriod = parseInt(document.getElementById("holdPeriodForm").value);

//Do LBO Math
	entryDebt = entryEBITDA * entryLeverageMultiple;
	entryEquity = entryMultiple * entryEBITDA - entryDebt;
	exitDebt = entryDebt - freeCashFlow;
	exitEquity = exitMultiple * exitEBITDA - exitDebt;
	nPD_Multiple_Expansion = (exitMultiple - entryMultiple) * entryEBITDA;
	nPD_EBITDA_Growth = (exitEBITDA - entryEBITDA) * exitMultiple;
	nPD_FCF = freeCashFlow;
	nPD_Total = exitEquity - entryEquity;
	
	if ((nPD_FCF + nPD_EBITDA_Growth + nPD_Multiple_Expansion) !== nPD_Total) {
		alert("your code sucks");
	}

//Print to screen
	html = '';
	html += "<h2> The IRR is " + Math.round(iRR(exitEquity, entryEquity) * 100) + "% </h2>";
	html += "<h2> The MOI is " + Math.round(mOI(exitEquity, entryEquity) * 10) / 10 + "x </h2>";
	print(html);
	console.log(entryMultiple, exitMultiple, entryEBITDA, exitEBITDA, entryLeverageMultiple, freeCashFlow, holdPeriod, nPD_FCF,nPD_Multiple_Expansion,nPD_EBITDA_Growth,nPD_Total);
}
