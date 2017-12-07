function docLoaded(fn){
	if(document.readyState !== 'loading'){
		console.log("hejsan!");
		fn();
	} else{
		document.addEventListener('DOMContentLoaded', fn);
	}
}

function indexPageLoaded() {
	console.log("Du är i funktionen hello.");
	DisplayItems();

}

function DisplayItems(){

    console.log("hej");
    var table = document.createElement('TABLE');
    var tr = document.createElement('TR');
    table.appendChild(tr);
    var i = 0;
	for(i; i < 10; i++){
		var th = document.createElement('TH');
		tr.appendChild(th);
		var txt = document.createTextNode("hej");
        th.appendChild(txt); 
    }
    var tr1 = document.createElement('TR');
    table.appendChild(tr1);
    var n = 0;
	for(n; n < 10; n++){
		var td = document.createElement('TD');
		tr1.appendChild(td);
		var txt = document.createTextNode("hej");
        td.appendChild(txt); 
    }
    document.body.appendChild(table);
        

}