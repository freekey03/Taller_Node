window.onload = init;
function init(){
    //if(!localStorage.getItem("token")) {
        document.querySelector('.btn-secondary').addEventListener('click', function(){
        window.location.href = "registro_emp.html"
        });
        document.querySelector('.btn-primary').addEventListener('click', registro);
    //}else{
    //    console.log("holii");
    //} 
}

function registro(){
    console.log("ya entre");
    var emp_nombre = document.getElementById('nombre').value;
    var emp_apellido = document.getElementById('apellido').value;
    var emp_telefono = document.getElementById('telefono').value;
    var emp_correo = document.getElementById('correo').value;
    var emp_direccion = document.getElementById('direccion').value;
    console.log("name:", emp_nombre);
    console.log("lastName:", emp_apellido);
    console.log("telefono:", emp_telefono);
    console.log("correo:", emp_correo);
    console.log("direccion:", emp_direccion);
    axios({
        method:'post',
        url:'http://localhost:3000/empleados/create',
        data:{
            emp_nombre: emp_nombre,
            emp_apellido: emp_apellido,
            emp_telefono: emp_telefono,
            emp_correo: emp_correo,
            emp_direccion: emp_direccion 
        }
    }).then(function(res){
        //if(res.data)
        console.log(res);
        alert("Registro exitoso");
        window.location.href = "registro_emp.html";
    }).catch(function(err){
        console.log(err);
    })
}