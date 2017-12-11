
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
                    //if(text.charAt(1)==1 && (text.charAt(2)==3 || text.charAt(2)==4 || text.charAt(2)==5)){
                      //  text = "A" + n.toString() +  "\n" + OBS;
                       // console.log("du klickade rätt iaf"); 
                   // }else{
                        text = "A" + n.toString() ; 
                    }                   
                else if(text.charAt(0) == 1){
                    /*if(text.charAt(1)==1 && (text.charAt(2)==3 || text.charAt(2)==4 || text.charAt(2)==5)){
                        text = "B"  + n.toString()  + OBS; 
                    }else{*/
                        text = "B" + n.toString() ; 
                    }                   
                else if(text.charAt(0) == 2){
                    /*if(text.charAt(1)==1 && (text.charAt(2)==3 || text.charAt(2)==4 || text.charAt(2)==5)){
                        text = "C" + n.toString() +  OBS; 
                    }else{*/
                        text = "C" + n.toString()  ; 
                    }
                else if(text.charAt(0) == 4){
                    /*if(text.charAt(1)==1 && (text.charAt(2)==3 || text.charAt(2)==4 || text.charAt(2)==5)){
                        text = "D" + n.toString() + OBS; 
                    }else{*/
                        text = "D" +n.toString() ; 
                    }        
                else if(text.charAt(0) == 5){
                    /*if(text.charAt(1)==1 && (text.charAt(2)==3 || text.charAt(2)==4 || text.charAt(2)==5)){
                        text ="E" + n.toString() +  OBS; 
                    }else{*/
                        text = "E" + n.toString() ; 
                    }        
                else if(text.charAt(0) == 6){
                   /* if(text.charAt(1)==1 && (text.charAt(2)==3 || text.charAt(2)==4 || text.charAt(2)==5)){
                        text = "F" + n.toString() +  OBS; 
                    }else{*/
                        text = "F" + n.toString(); 
                    }        
                else{
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