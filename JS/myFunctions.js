/// <reference path="../scripts/jquery-1.7.2.min.js" />
/// <reference path="../scripts/jquery-1.7.2-vsdoc.js" />

var apiEndpoint = "/api";
var questionTier = 1;
var CFRguid;
$(document).ready(function () {

    
	

});


function getRadioVal(form, name) {
    var val;
    // get list of radio buttons with specified name
    var radios = form.elements[name];

    // loop through list of radio buttons
    for (var i = 0, len = radios.length; i < len; i++) {
        if (radios[i].checked) { // radio checked?
            val = radios[i].value; // if so, hold its value in val
            break; // and break out of for loop
        }
    }
    return val; // return value of checked radio or undefined if none checked
}
function submitButton() {
    //debugger;

    questionTier = (questionTier || 0) + 1;
    // get value of selected 'ship' radio button in 'demoForm'
    var val = getRadioVal(document.getElementById('quiz'), 'q1');
    var PrevAnswer = val;
    //tabulateAnswers(val);
    var Clientnames;
    var Clientguids;

    if (!val) {
        //first page load no action required
        alert("Please select and answer");
    }
    else {
        if (questionTier == 2) {
            

                switch (val) {
                    case "c1":
                        //alert(document.getElementById("q1Head").innerText);

                        if (document.getElementById("q1Head").innerText == "Would you like to select migration data by Central Fileroom?") {
                            document.getElementById("q1Head").innerText = "From what clients would you like to migrate?"

                            //to be replaced with xhr pull of client list from chosen CFR
                            //debugger;
                            $.ajax({
                                url: "https://localhost:5001/Plan/hint",
                                type: 'POST',
                                dataType: 'json',
                                accept: 'text/plain',

                                contentType: 'application/json',
                                data: JSON.stringify({
                                    'user': { "desktopUserId": "3fa85f64-5717-4562-b3fc-2c963f66afa6", "computerName": "win1064Off19tst", "idaasUserId": "3fa85f64-5717-4562-b3fc-2c963f66afa6", "axcessEnvironment": "string" },
                                    'questionId': 2,
                                    'planId': 1,
                                    'options': "{\"CfrGuid\":\""+ CFRguid +"\"}"
                                }),
                                success: function (result) {
                                    getClientList(result);
                                    //alert(JSON.stringify(data));
                                },
                                error: function (error) {
                                    alert("Cannot get data" + error.error);
                                }
                            });

                            //xhr replaces this 
                            //var ClientListXhr = [
                            //    {
                            //        "name": "Client 2 CFR 2",
                            //        "id": "",
                            //        "clientGuid": "1b255132-6a3f-4243-9d7d-1ceb76fb8d00"
                            //    },
                            //    {
                            //        "name": "Client Eng Mig 2",
                            //        "id": "",
                            //        "clientGuid": "4fec6e9e-6124-425d-b7a1-d3a33454be94"
                            //    }
                            //]
                            
                        }

                        break;
                    case "c2":
                        debugger;
                        if (document.getElementById("q1Head").innerText == "Would you like to select migration data by Central Fileroom?") {
                            document.getElementById("q1Head").innerText = "From what clients would you like to migrate?"

                            //to be replaced with xhr pull of client list from chosen CFR
                            //xhr replaces this 



                            var myClients = {
                                "name": ["Client 1", "Client 2", "Client 3", "Client 4", "Client 5", "Client 6", "Client 7", "Client 8", "Client 9", "Client 10", "Client 11", "Client 12", "Client 13"],
                                "id": ["5BFD542F-021B-41EB-8BFB-3C5F322C3744", "5F029959-890C-486F-9A92-9EFBE01475FE", "D471AAEB-853F-467B-91E0-B46F57DEC457, 5BFD542F-021B-41EB-8BFB-3C5F322C3744", "5F029959-890C-486F-9A92-9EFBE01475FE", "D471AAEB-853F-467B-91E0-B46F57DEC457, 52GW542F-021B-41EB-8BFB-3C5F322C3744", "FHJW959-890C-486F-9A92-9EFBE01475FE", "FWSTB-853F-467B-91E0-B46F57DEC457, 5BFD542F-021B-41EB-8BFB-3DFGW22C3744", "5F029959-890C-RGWF-9A92-9EFBE01475FE", "D471AAEB-853F-467B-91E0-B46F57DEC457", "D471RFWB-853F-467B-91E0-B46F57DEC457"]
                            }
                            for (var i in myClients) {
                                if (i = "name") {
                                    Clientnames = myClients[i];

                                }
                                if (i = "id") {
                                    Clientguids = myClients[i]
                                }
                            }
                            var node = document.getElementById("Question1");
                            node.innerHTML = "";

                            var h2 = document.createElement("h2");
                            h2.id = "q" + name + "Head";
                            h2.innerText = "Which client below would you like to migrate from?";//"CFR 89514987235648973892674"
                            node.appendChild(h2);

                            var clientNameArr = Clientnames.toString().split(',');
                            var clientGuidArr = Clientguids.toString().split(',');

                            for (name in clientNameArr) {

                                var li = document.createElement("li");         // Create a <li> node
                                li.style.display = "none";
                                var lable = document.createElement("lable");
                                lable.id = "q1c" + (parseInt(name) + 1);
                                lable.innerHTML = "<input type=\"radio\" name=\"q1\" value=\"c" + (parseInt(name) + 1) + "\" onclick=\"tabulateAnswers('q1c" + (parseInt(name) + 1) + "')\" />" + clientNameArr[name];
                                var input = document.createElement("input");

                                li.appendChild(lable);

                                node.appendChild(li);// Append the <li> to <div>

                            }
                            document.getElementById("Question1").innerHTML = document.getElementById("Question1").innerHTML + "<br /><div><select id=\"drop1\" onchange=\"dropChange()\"></select></div ><br />";
                            var dropOpt = document.createElement("option");
                            document.getElementById("drop1").appendChild(dropOpt);

                            for (name2 in clientNameArr) {
                                dropOpt = document.createElement("option");
                                dropOpt.innerText = clientNameArr[name2];
                                document.getElementById("drop1").appendChild(dropOpt);

                            }
                            //document.getElementById("q1c1").innerText = "Client 1"
                            //document.getElementById("q1c2").innerText = "Client 2"
                        }
                        //alert("Answer to Question 1 = Choice 2");
                        break;
                    case "c3":
                        //alert("Answer to Question 1 = Choice 3");
                        break;
                    case "c4":
                        //alert("Answer to Question 1 = Choice 4");
                        break;
                    case "c5":
                        //alert("Answer to Question 1 = Choice 5");
                        break;
                    case "c6":
                        //alert("Answer to Question 1 = Choice 6");
                        break;
                    case "c7":
                        //alert("Answer to Question 1 = Choice 7");
                        break;
                    case "c8":
                        //alert("Answer to Question 1 = Choice 8");
                        break;
                    case "c9":
                        //alert("Answer to Question 1 = Choice 9");
                        break;
                    case "c10":
                        //alert("Answer to Question 1 = Choice 10");
                        break;
                    case "c11":
                        //alert("Answer to Question 1 = Choice 11");
                        break;
                    case "c12":
                        //alert("Answer to Question 1 = Choice 12");
                        break;
                    case "c13":
                        //alert("Answer to Question 1 = Choice 13");
                        break;
                    case "c14":
                        //alert("Answer to Question 1 = Choice 14");
                        break;
                    case "c15":
                        //alert("Answer to Question 1 = Choice 15");
                        break;
                    default:
                        break;
                

            }
        }

        
        //alert(document.getElementById("Question2").innerText);

    }


}

//function to 
function pullCFRPHP() {
	const xmlhttp = new XMLHttpRequest();

	xmlhttp.onload = function () {
		const myPEngCFR = JSON.parse(this.responseText);
		document.getElementById("demo").innerHTML = myPEngCFR.cfrname + ", " + myPEngCFR.cfrguid;
	}
	xmlhttp.open("GET", "demo_file.php");
	xmlhttp.send();
}
function resetAnswer() {
    window.location.href = 'https://engmig2.azurewebsites.net/';

}
function dropChange(){
    if (document.getElementById("drop1").value != "") {
        //alert(document.getElementById("drop1").selectedIndex);
        document.getElementById("q1c" + (document.getElementById("drop1").selectedIndex)).firstChild.checked = true;
    }
    else {
        document.getElementById("message").innerHTML = "IMPOSSIBLE!!";
    }        
}

function getClientList(result) {
    myClientsXhr = result;
    //debugger;
    var myClients = {
        "name": myClientsXhr.map(y => y.name),
        "id": myClientsXhr.map(y => y.clientGuid)
    }

    //var myClients = {
    //    "name": ["Client 1", "Client 2", "Client 3", "Client 4", "Client 5", "Client 6", "Client 7", "Client 8", "Client 9", "Client 10", "Client 11", "Client 12", "Client 13"],
    //    "id": ["5BFD542F-021B-41EB-8BFB-3C5F322C3744", "5F029959-890C-486F-9A92-9EFBE01475FE", "D471AAEB-853F-467B-91E0-B46F57DEC457, 5BFD542F-021B-41EB-8BFB-3C5F322C3744", "5F029959-890C-486F-9A92-9EFBE01475FE", "D471AAEB-853F-467B-91E0-B46F57DEC457, 52GW542F-021B-41EB-8BFB-3C5F322C3744", "FHJW959-890C-486F-9A92-9EFBE01475FE", "FWSTB-853F-467B-91E0-B46F57DEC457, 5BFD542F-021B-41EB-8BFB-3DFGW22C3744", "5F029959-890C-RGWF-9A92-9EFBE01475FE", "D471AAEB-853F-467B-91E0-B46F57DEC457", "D471RFWB-853F-467B-91E0-B46F57DEC457"]
    //}
    for (var i in myClients) {
        if (i = "name") {
            Clientnames = myClients[i];

        }
        if (i = "id") {
            Clientguids = myClients[i]
        }
    }

    document.getElementById("Question2").remove();
    var node = document.getElementById("Question1");
    node.innerHTML = "";

    var h2 = document.createElement("h2");
    h2.id = "q" + name + "Head";
    h2.innerText = "Which client below would you like to migrate from?";//"CFR 89514987235648973892674"
    node.appendChild(h2);

    var clientNameArr = Clientnames.toString().split(',');
    var clientGuidArr = Clientguids.toString().split(',');

    for (name in clientNameArr) {

        var li = document.createElement("li");         // Create a <li> node
        li.style.display = "none";
        var lable = document.createElement("lable");
        lable.id = "q1c" + (parseInt(name) + 1);
        lable.innerHTML = "<input type=\"radio\" name=\"q1\" value=\"c" + (parseInt(name) + 1) + "\" onclick=\"tabulateAnswers('q1c" + (parseInt(name) + 1) + "')\" />" + clientNameArr[name];
        var input = document.createElement("input");

        li.appendChild(lable);

        node.appendChild(li);// Append the <li> to <div>

    }
    document.getElementById("Question1").innerHTML = document.getElementById("Question1").innerHTML + "<br /><div><select id=\"drop1\" onchange=\"dropChange()\"></select></div ><br />";
    var dropOpt = document.createElement("option");
    document.getElementById("drop1").appendChild(dropOpt);

    for (name2 in clientNameArr) {
        dropOpt = document.createElement("option");
        dropOpt.innerText = clientNameArr[name2];
        document.getElementById("drop1").appendChild(dropOpt);

    }
                            //document.getElementById("q1c1").innerText = "Client 1"
                            //document.getElementById("q1c2").innerText = "Client 2"
}
function getCFRList(result) {
    //debugger;
    myCFRsXhr = result;
    //alert(result);
    myCFRs = {
        "name": myCFRsXhr.map(y => y.name),
        "id": myCFRsXhr.map(y => y.id)
    };

    for (var i in myCFRs) {
        //alert(myCFRs[i]);
        if (i == "name") {
            CFRnames = myCFRs[i];

        }
        if (i == "id") {
            CFRguids = myCFRs[i]
        }
    }
    //alert(CFRguids);
    //alert(CFRguids);
    var nameArr = CFRnames.toString().split(',');
    var guidArr = CFRguids.toString().split(',');
    //alert(nameArr[0]);
    //alert("CFRName = " + nameArr[name] + ", CFRguid = " + guidArr[name]);
    var node = document.createElement("div");   // Create a <div> node
    node.id = "Question2";
    var h2 = document.createElement("h2");
    h2.id = "q" + name + "Head";
    h2.innerText = "Which CFR below would you like to migrate from?";//"CFR 89514987235648973892674"
    node.appendChild(h2);
    for (name in nameArr) {

        var li = document.createElement("li");         // Create a <li> node
        var lable = document.createElement("lable");
        lable.id = "q2c" + (parseInt(name) + 1);
        lable.innerHTML = "<input type=\"radio\" name=\"q2\" value=\"c" + (parseInt(name) + 1) + "&" + guidArr[name] + "\" onclick=\"tabulateAnswers('q2c" + (parseInt(name) + 1) + "&" + guidArr[name] + "')\" />" + nameArr[name] ;
        var input = document.createElement("input");

        li.appendChild(lable);

        node.appendChild(li);// Append the <li> to <div>


    }

    document.getElementById("questions").appendChild(node);
    

}
function pushToAxcess() {
    alert("UNDER CONSTRUCTION - Push to Axcess to come via API connection");

    //$.ajax({
    //    url: "https://api.???",
    //    type: 'POST',
    //    dataType: 'json',
    //    accept: 'text/plain',
    //    contentType: 'application/json',
    //    data: JSON.stringify({
    //        //???
    //        'user': { "desktopUserId": "3fa85f64-5717-4562-b3fc-2c963f66afa6", "computerName": machinename, "idaasUserId": "3fa85f64-5717-4562-b3fc-2c963f66afa6", "axcessEnvironment": "string" },
    //        'questionId': 1,
    //        'planId': 1,
    //    }),
    //    success: function (result) {
    //        //alert(JSON.stringify(result));
    //        alert(result);
    //    },
    //    error: function (error) {
    //        alert("Cannot get data" + error.error);
    //    }
    //});
}
function cfrAjax() {
    var machinename = document.getElementById('machinename').value;

    $.ajax({
        url: "https://localhost:5001/Plan/hint",
        type: 'POST',
        dataType: 'json',
        accept: 'text/plain',
        contentType: 'application/json',
        data: JSON.stringify({

            'user': { "desktopUserId": "3fa85f64-5717-4562-b3fc-2c963f66afa6", "computerName": machinename , "idaasUserId": "3fa85f64-5717-4562-b3fc-2c963f66afa6", "axcessEnvironment": "string" },
            'questionId': 1,
            'planId': 1,
        }),
        success: function (result) {
            //alert(JSON.stringify(result));
            getCFRList(result);
        },
        error: function (error) {
            alert("Cannot get data" + error.error);
        }
    });
}
// function to calculate the result of the survey
function tabulateAnswers(answerID) {
	//alert(answerID);
    var CFRnames;
    var CFRguids;
    var ClientEntTypesnames;
    var ClientEntTypesguids;
    var myCFRsXhr;
    var myCFRs=[];
    //debugger;

    var choice;
    var question;
    //q2c1&7b996213-48fd-45a4-b71a-33c1f35d6aa3
    if (questionTier == 1 && answerID == "c1") { choice = answerID; question = 1;}
    else {
        var QuestAndChoice = answerID.substring(0, answerID.length - 37);
        question = QuestAndChoice.substring(0, 2);
        choice = QuestAndChoice.replace(question, "");
        CFRguid = answerID.replace(question, "");
        CFRguid = CFRguid.replace(choice, "");
        CFRguid = CFRguid.replace("&", "");
    }
    

	switch (choice) {
		case "c1":
			//alert("Question 1 = Choice 1");
            if (questionTier == 1 && question == "1") { cfrAjax(); }
            if (questionTier == 1 && question == "q2") {  }

            
            

            //xhr replaces this 
            //var myCFRsXhr = [
            //    {
            //        "name": "cfr",
            //        "id": "7b996213-48fd-45a4-b71a-33c1f35d6aa3"
            //    },
            //    {
            //        "name": "Cfr 2",
            //        "id": "d54da65e-33fb-48c0-9c6e-c60e74e48292"
            //    }
            //]

            //var Cfrnames = myCFRsXhr.map(y => y.name);
            

            
           
            
           
            //var br = document.createElement("br");
            //document.getElementById("questions").appendChild(br);
			//document.getElementById("q2Head").innerHTML = "From what CFR would you like to migrate?";
			//document.getElementById("q2c1").innerHTML = CFRguids //"<input type=\"radio\"  name=\"q2\" value=\"c1\" onclick=\"tabulateAnswers('q2c1')\" />894690592367490236784802367";
			break;
		case "c2":
            //alert("Question 1 = Choice 1");
            //xhr replaces this 
            //$.ajax({
            //    url: "https://localhost:5001/Plan/hint",
            //    type: 'POST',
            //    dataType: 'json',
            //    accept: 'text/plain',

            //    data: {
            //        'user': { "desktopUserId": "3fa85f64-5717-4562-b3fc-2c963f66afa6", "computerName": "win1064Off19tst", "idaasUserId": "3fa85f64-5717-4562-b3fc-2c963f66afa6", "axcessEnvironment": "string" },
            //        'questionId': 1,
            //        'planId': 1,
            //    },
            //    success: function (result) {
            //        alert(JSON.stringify(data));
            //    },
            //    error: function (error) {
            //        alert("Cannot get data" + error.error);
            //    }
            //});


            var myClientEntTypesXhr = [
                {
                    "name": "ClientEntTypes 1",
                    "id": "7b996213-48fd-45a4-b71a-33c1f35d6aa3"
                },
                {
                    "name": "ClientEntTypes 2",
                    "id": "d54da65e-33fb-48c0-9c6e-c60e74e48292"
                }
            ]
            

            var myClientEntTypes = {
                "name": myClientEntTypesXhr.map(y => y.name),
                "id": myClientEntTypesXhr.map(y => y.id)
            }



            for (var i in myClientEntTypes) {
                if (i == "name") {
                    ClientEntTypesnames = myClientEntTypes[i];

                }
                if (i == "id") {
                    ClientEntTypesguids = myClientEntTypes[i]
                }
            }
            var ClientEntTypesnameArr = ClientEntTypesnames.toString().split(',');
            var ClientEntTypesguidArr = ClientEntTypesguids.toString().split(',');
            var node = document.createElement("div");   // Create a <div> node
            node.id = "Question2";
            var h2 = document.createElement("h2");
            h2.id = "q" + name + "Head";
            h2.innerText = "Which Client Entity type below would you like to migrate from?";//"CFR 89514987235648973892674"
            node.appendChild(h2);
            for (name in ClientEntTypesnameArr) {

                var li = document.createElement("li");         // Create a <li> node
                var lable = document.createElement("lable");
                lable.id = "q2c" + (parseInt(name) + 1);
                lable.innerHTML = "<input type=\"radio\" name=\"q2\" value=\"c" + (parseInt(name) + 1) + "\" onclick=\"tabulateAnswers('q2c" + (parseInt(name) + 1) + "')\" />" + ClientEntTypesnameArr[name];
                var input = document.createElement("input");

                li.appendChild(lable);

                node.appendChild(li);// Append the <li> to <div>


            }

            document.getElementById("questions").appendChild(node);
            document.getElementById("Question2").innerHTML = document.getElementById("Question2").innerHTML + "<br />Dropdown for later to replace the radioboxes<div><select id=\"drop1\"><option>ClientEntTypes1</option><option>ClientEntTypes2</option></select></div ><br />";
            
			break;
		
        default:

			break;
    // code block
	}


	
	
}