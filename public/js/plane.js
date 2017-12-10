function docLoaded(fn){
	if(document.readyState !== 'loading'){
		fn();
	} else{
		document.addEventListener('DOMContentLoaded', fn);
	}
}

function indexPageLoaded() {
	DisplayItems();
}

function DisplayItems(){

    var table = document.createElement('TABLE');
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
            var n = 1;
	        for(n; n < 31; n++){
		        var td = document.createElement('TD');
		        tr1.appendChild(td);
                var button = document.createElement("button");
                button.setAttribute("name", "seat");
                var text = k.toString() + n.toString();
                var OBS = "OBS! You have selected a seat which requires you to open emergency doors in case of energancy. Hence if you are traveling with child, have a disability etc. please select a new seat.";
                if(text.charAt(0) == 0){
                    if(text.charAt(1)==1 && (text.charAt(2)==3 || text.charAt(2)==4 || text.charAt(2)==5)){
                        text = n.toString() + "A"+ "\n" + OBS;
                        console.log("du klickade rätt iaf"); 
                    }else{
                        text = n.toString() + "A"; 
                    }                   
                }else if(text.charAt(0) == 1){
                    if(text.charAt(1)==1 && (text.charAt(2)==3 || text.charAt(2)==4 || text.charAt(2)==5)){
                        text = n.toString()  +"B"  + OBS; 
                    }else{
                        text = n.toString() + "B"; 
                    }                   
                }else if(text.charAt(0) == 2){
                    if(text.charAt(1)==1 && (text.charAt(2)==3 || text.charAt(2)==4 || text.charAt(2)==5)){
                        text = n.toString() + "C" + OBS; 
                    }else{
                        text = n.toString() + "C"; 
                    }
                }else if(text.charAt(0) == 4){
                    if(text.charAt(1)==1 && (text.charAt(2)==3 || text.charAt(2)==4 || text.charAt(2)==5)){
                        text = n.toString() + "D" + OBS; 
                    }else{
                        text = n.toString() + "D"; 
                    }        
                }else if(text.charAt(0) == 5){
                    if(text.charAt(1)==1 && (text.charAt(2)==3 || text.charAt(2)==4 || text.charAt(2)==5)){
                        text = n.toString() + "E" + OBS; 
                    }else{
                        text = n.toString() + "E"; 
                    }        
                }else if(text.charAt(0) == 6){
                    if(text.charAt(1)==1 && (text.charAt(2)==3 || text.charAt(2)==4 || text.charAt(2)==5)){
                        text = n.toString() + "F" + OBS; 
                    }else{
                        text = n.toString() + "F"; 
                    }        
                }else{
                   text = k.toString() + n.toString();
            }
               	button.setAttribute("value", text);
                button.setAttribute("type", "submit");        
                button.setAttribute("id", "planeButton"); 
                td.appendChild(button);
            }
        }   
    document.getElementById("seatForm").appendChild(table);  
    }
}