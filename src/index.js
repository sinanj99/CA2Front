import 'bootstrap/dist/css/bootstrap.css'
/*
new fullpage('#fullpage', {
    autoScrolling: true,
    navigation: true
})
*/
let res = document.querySelectorAll("section")[1];
let table = document.querySelector("table");

function makeOptions(http_method, body) {
    var options = {
        method: http_method,
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        }
    }
    if (body) {
        options.body = JSON.stringify(body);
    }
    return options;
}

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json();
}

document.querySelector("#createBtn").addEventListener('click', function() {
    const fname = document.getElementById("cFname").value;
    const lname = document.getElementById("cLname").value;
    const email = document.getElementById("cEmail").value;
    const phone = document.getElementById("cPhone").value;
    const phoneDesc = document.getElementById("cPhoneDesc").value;
    const street = document.getElementById("cStreet").value;
    const streetInfo = document.getElementById("cStreetInfo").value;
    const zip = document.getElementById("cZip").value;
    const city = document.getElementById("cCity").value;
    const hobby = document.getElementById("cHobby").value;
    const hobbyDesc = document.getElementById("cHobbyDesc").value;

    const hobbyy = "name:"+hobby+",description:"+hobbyDesc;
    

    const hobbies = []
    hobbies[0] = hobbyy;

    const phonee = "number:"+phone+",description:"+phoneDesc;

    const phones = []
    phones[0] = phonee;

    const data = { 
        firstName: fname, 
        lastName: lname, 
        email: email, 
        phones: phones,
        street: street,
        streetInfo: streetInfo,
        zip: zip,
        city: city,
        hobbies: hobbies
    };
    const options = makeOptions("POST", data);

    fetch("http://localhost:8080/startcodeoas/api/person/", options)
        .then(res => handleHttpErrors(res))
        .then(data => {
            document.getElementById("createRes").innerHTML = "<h1>Du er nu blevet oprettet!</h1>";
            console.log(data);
        }).catch(err => {
            if (err.status) {
                if(err.status === 409){
                    document.getElementById("createRes").innerHTML = "<h1>Person med de indtastede oplysninger eksisterer allerede!</h1>";
                }else if(console.log(400)){
                    document.getElementById("createRes").innerHTML = "<h1>Alle felter skal udfyldes!</h1>";
                }else{
                    document.getElementById("createRes").innerHTML = "<h1>Der opstod en fejl, prøv igen.</h1>";
                }
            } else {
                console.log("Network error");
            }
        });
    
})
/*
document.getElementById("edit").onclick = function () {
    const id = document.getElementById("editId").value;
    const name = document.getElementById("name").value;
    const data = { name: name };
    const options = makeOptions("PUT", data);
    fetch("https://sinanjasar.dk/rest-jpa-devops-starter-1.0.1/api/person/" + id, options);
}
*/
document.querySelector(".find .button").addEventListener('click', function() {
    table.innerHTML = "";
    const input = document.querySelector(".find .search").value;
    let resource;
    let res_size = document.getElementById("res_size");
    if (!isNaN(input)) {
        resource = "phone";
    } else {
        resource = "hobby";
    }
    fetch(`http://localhost:8080/startcodeoas/api/person/${resource}/${input}`)
        .then(res => handleHttpErrors(res))
        .then(data => {
            res_size.style.margin = "20px";
            res_size.classList.add("m-3");
            let tablehead = "<thead><tr><td>Navn</td><td>Email</td><td>Vej</td><td>Postnummer</td><td>By</td></tr></thead>";
            let tabledata;
            if (data.length > 1) {
                res_size.innerHTML = `${data.length} resultater`;
                tabledata = "<tbody>" + data.map(obj => `<tr><td>${obj.firstName} ${obj.lastName}</td>
            <td>${obj.email}</td><td>${obj.street}</td><td>${obj.zip}</td><td>${obj.city}</td></tr>`).join('') + "</tbody>";
            } else {
                tabledata = "<tbody>" + `<tr><td>${data.firstName} ${data.lastName}</td>
            <td>${data.email}</td><td>${data.street}</td><td>${data.zip}</td><td>${data.city}</td></tr>` + "</tbody>";
                res_size.innerHTML = `1 resultat`;
            }
            table.innerHTML = tablehead + tabledata;
        }).catch(err => {
            if (err.status) {
                err.fullError.then(e => table.innerHTML = "<h1>Ingen personer fundet !</h1>")
            } else {
                console.log("Network error");
            }
        });
})