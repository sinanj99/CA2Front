import 'bootstrap/dist/css/bootstrap.css'
let res = document.querySelectorAll("section")[1];
let table = document.querySelector("table");

function makeOptions(http_method, body) {
    var options = {
        method: http_method,
        headers: {
            "Content-type": "application/json"
        }
    }
    if (body) {
        options.body = JSON.stringify(body);
    }
    return options;
}
/*
document.getElementById("add").onclick = function () {
    const name = document.getElementById("name").value;
    const data = { name: name };
    const options = makeOptions("POST", data);
    fetch("https://sinanjasar.dk/rest-jpa-devops-starter-1.0.1/api/person/", options);
  }

document.getElementById("edit").onclick = function () {
    const id = document.getElementById("editId").value;
    const name = document.getElementById("name").value;
    const data = { name: name };
    const options = makeOptions("PUT", data);
    fetch("https://sinanjasar.dk/rest-jpa-devops-starter-1.0.1/api/person/" + id, options);
  }
  */
document.querySelector(".find .button").onclick = function () {
    const hobby = document.querySelector(".find .search").value;
    console.log(hobby);
    fetch("http://localhost:8080/startcodeoas/api/person/hobby/" + hobby)
        .then(res => res.json())
        .then(data => {
            console.log("sne");
            res.classList.toggle("result");
            let tablehead = "<tr>" + Object.keys(data[0]).map(x => "<td>" + x.toUpperCase() + "</td>").join('') + "</tr>";
            let tabledata = data.map(obj => "<tr>" + Object.keys(obj).map(x => "<td>" + obj[x] + "</td>").join('') + "</tr>").join('');
            table.innerHTML = tablehead.concat(tabledata);
        });

};

