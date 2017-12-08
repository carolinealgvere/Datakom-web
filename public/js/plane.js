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
    var form = document.createElement("FORM");
    form.setAttribute("action", "/seatSelected");
    form.setAttribute("method", "POST");
    form.appendChild(table);
    var tr = document.createElement('TR');
    table.appendChild(tr);
    var i = 0;
	for(i; i < 30; i++){
		var th = document.createElement('TH');
		tr.appendChild(th);
		var txt = document.createTextNode(i+1);
        th.appendChild(txt); 
    }
    var k = 0;
    for(k; k<7; k++){
        if(k == 3){
            var tr1 = document.createElement('TR');
            table.appendChild(tr1);
            var m=0;
            for(m; m<30; m++){
                var td1 = document.createElement('TD');
                tr1.appendChild(td1);
                var txt = document.createTextNode("-");
                td1.appendChild(txt);
            }
        } else{
            var tr1 = document.createElement('TR');
            table.appendChild(tr1);
            var n = 0;
	        for(n; n < 30; n++){
		        var td = document.createElement('TD');
		        tr1.appendChild(td);
                var button = document.createElement("button");
                var id = "seat_" + k.toString() + n.toString();
                button.setAttribute("name", id);
                button.setAttribute("type", "submit");
                //button.style.background='#007800'; 
                button.setAttribute("id", "planeButton"); 
                button.addEventListener("click", pressed);             
                td.appendChild(button);
                console.log(button.name);
            }
        }   
    document.body.appendChild(form);
        
    }
}
function pressed(){
    console.log("you clicked me");
}