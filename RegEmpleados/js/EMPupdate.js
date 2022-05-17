window.onload = init;
function init(){
    //if(!localStorage.getItem("token")) {
        console.log(window.location)
        var dir = window.location.search;
        var mystring = dir.split("?")
        console.log(mystring[1])
        var id = mystring[1]
        console.log(id)
        axios({
            method:'post',
            url:'http://localhost:3000/empleados/byid',
            data:{
                id: id
            }
        }).then(function(res){
            //if(res.data)
            mostrarResultado(res.data.Message[0])
            console.log(res);
        }).catch(function(err){
            console.log(err);
        })
        document.querySelector('.btn-secondary').addEventListener('click', function(){
        window.location.href = "registro_emp.html"
        });
        document.querySelector('.btn-primary').addEventListener('click', actualizar);
    //}else{
    //    console.log("holii");
    //}
}
function mostrarResultado(data){
    if(data.id != null)
    {
        document.getElementById("id").value= data.id;
    } else {
     document.getElementById("id").value= '';
    }
    if(data.nombre != null)
    {
        document.getElementById("nombre").value= data.nombre;
    } else {
     document.getElementById("nombre").value= '';
    }
    if(data.apellido != null)
    {
        document.getElementById("apellido").value= data.apellido;
    } else {
     document.getElementById("apellido").value= '';
    }
    if(data.telefono != null)
    {
        document.getElementById("telefono").value= data.telefono;
    } else {
     document.getElementById("telefono").value= '';
    }
    if(data.correo != null)
    {
        document.getElementById("correo").value= data.correo;
    } else {
     document.getElementById("correo").value= '';
    }
    if(data.direccion != null)
    {
        document.getElementById("direccion").value= data.direccion;
    } else {
     document.getElementById("direccion").value= '';
    }
    }

function actualizar(){
    var emp_id = document.getElementById('id').value;
    var emp_nombre = document.getElementById('nombre').value;
    var emp_apellido = document.getElementById('apellido').value;
    var emp_telefono = document.getElementById('telefono').value;
    var emp_correo = document.getElementById('correo').value;
    var emp_direccion = document.getElementById('direccion').value;
    console.log("id:", id);
    console.log("name:", emp_nombre);
    console.log("lastName:", emp_apellido);
    console.log("telefono:", emp_telefono);
    console.log("correo:", emp_correo);
    console.log("direccion:", emp_direccion);
    axios({
        method:'put',
        url:'http://localhost:3000/empleados/update',
        data:{
            emp_id: emp_id,
            emp_nombre: emp_nombre,
            emp_apellido: emp_apellido,
            emp_telefono: emp_telefono,
            emp_correo: emp_correo,
            emp_direccion: emp_direccion 
        }
    }).then(function(res){
        //if(res.data)
        console.log(res);
        alert("Cambio exitoso");
        window.location.href = "registro_emp.html";
    }).catch(function(err){
        console.log(err);
    })
}