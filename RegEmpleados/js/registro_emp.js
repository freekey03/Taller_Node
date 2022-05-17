window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init(){
    if(localStorage.getItem("token")){
        //token = localStorage.getItem("token");
        headers = {
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }
        loadEmpleados();
    }else{
        window.location.href = "index.html";
    }
}

function loadEmpleados() {
    axios.get(url + "/empleados", headers)
    .then(function(res){
        console.log(res);
        displayEmpleados(res.data.Message);
    }).catch(function(err){
        console.log(err);
    })
}


function deleteEmpleado(id) {
    axios({
        method:'delete',
        url:'http://localhost:3000/empleados/delete',
        data:{
            emp_id: id, 
        }
    }).then(function(res){
        //if(res.data)
        console.log(res);
        alert("Registro eliminado exitosamente");
        window.location.href = "registro_emp.html";
    }).catch(function(err){
        console.log(err);
    })
}

function displayEmpleados(empleados) {
    var body = document.querySelector("body");
    console.log(empleados);
    body.innerHTML +=
    `<table class=table>
    <tr>
        <th>No Empleado</th>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Telefono</th>
        <th>Correo</th>
        <th>Direccion</th>
        <th>Acciones</th>
        </tr>
         <tr style='min-width:850px'>
             ${
                Object.values(empleados)
                .map(
                   value => `<tr> 
                   <td>${value.id}</td> 
                   <td>${value.nombre}</td> 
                   <td>${value.apellido}</td> 
                   <td>${value.telefono}</td> 
                   <td>${value.correo}</td> 
                   <td>${value.direccion}</td> 
                   <td><a href="edit.html?${value.id}" class="btn btn-secondary">Edit</a> <button class="btn btn-danger" onclick="deleteEmpleado(${value.id})">Delete</button></td> 
                   </tr>`
                ).join("\n")
              }
           </tr>
      </table>`;
   /* for(var i = 0; i < empleados.length; i++){
        
        body.innerHTML += `<tr>`
        body.innerHTML += `<td>${empleados[i].id}</td>`;
        body.innerHTML += `<td>${empleados[i].nombre}</td>`;
        body.innerHTML += `<td>${empleados[i].apellido}</td>`;
        body.innerHTML += `<td>${empleados[i].telefono}</td>`;
        body.innerHTML += `<td>${empleados[i].correo}</td>`;
        body.innerHTML += `<td>${empleados[i].direccion}</td>`;
        body.innerHTML += `<td><a href="edit.html?${empleados[i].id}" class="btn btn-secondary">Edit</a></td>`;
        var id=empleados[i].id;
        body.innerHTML += `<button type="submit" class="btn btn-danger" onclick="deleteEmpleado(${empleados[i].id})">Delete</button>`;
        body.innerHTML += `</tr>`
    }
    body.innerHTML +=`</table>`*/
}