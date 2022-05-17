const { query } = require("express");
const express = require("express");
const empleados = express.Router();
const db = require('../config/database');

empleados.post('/create', async (req, res, netx) => {
    const{emp_nombre, emp_apellido, emp_telefono, emp_correo, emp_direccion} = req.body;
    
    if (emp_nombre && emp_apellido && emp_telefono && emp_correo && emp_direccion){
        let query = 'INSERT INTO empleados (nombre, apellido, telefono, correo, direccion)';
        query +=`VALUES('${emp_nombre}','${emp_apellido}','${emp_telefono}','${emp_correo}','${emp_direccion}');`;
    
        const rows = await db.query(query);
        console.log(rows); 
        if (rows.affectedRows==1){
            return res.status(200).json({code: 201, Message:"Empleado insertado correctamente"});
        }
        return res.status(500).json({code:1, Message:"Ocurrio un error "});
    } 
    return res.status(500).json({code:500, Message: "Campos incompletos"});
});

empleados.delete("/delete", async (req, res, next) =>{
    const query = `DELETE FROM empleados WHERE id=${req.body.emp_id}`;
    const rows = await db.query(query);
    if(rows.affectedRows == 1){
        return res.status(200).json({code: 200, Message: "empleado borrado correctamente"});
    }
    return res.status(404).json({code: 404, Message: "empleado no encotrado"})
});

empleados.put("/update", async (req, res, next) => {
    const{emp_nombre, emp_apellido, emp_telefono, emp_correo, emp_id, emp_direccion} = req.body;

    if (emp_nombre && emp_apellido && emp_telefono && emp_correo && emp_id){
        let query = `UPDATE empleados SET nombre='${emp_nombre}',apellido='${emp_apellido}',`;
        query += `telefono='${emp_telefono}',correo='${emp_correo}', direccion='${emp_direccion}' WHERE id = '${emp_id}';`;
    
        const rows = await db.query(query);
        console.log(rows);
        if (rows.affectedRows==1){
            return res.status(200).json({code: 200, Message:"Empleado actualizado correctamente"});
        }
        return res.status(500).json({code:1, Message:"Ocurrio un error "});
    }
    return res.status(500).json({code:500, Message: "Campos incompletos"});
});


empleados.get('/', async (req, res, netx) =>{
    const emp = await db.query('SELECT * FROM empleados');
    return res.status(200).json({code:1, Message: emp});
});
empleados.post('/byid', async (req, res, next) =>{ 
    const id = req.body.id;
    if (id >= 1 && id <= 722){    
        const emp = await db.query('SELECT * FROM empleados WHERE id='+id+' LIMIT 1; ');    
        return res.status(200).json({code:200, Message: emp }); 
    }res.status(404).send({code:404, Message: 'User was not found'});
});

empleados.get('/:name([A-Za-z]+)', async (req, res, next) =>{
    const name = req.params.name;
    const emp = await db.query('SELECT * FROM empleados WERE emp_nombre='+name+'; '); 
        if (emp.length > 0){      
            return res.status(200).json({code:200, Message: emp }); 
        }res.status(404).send({code:404, Message: 'empleados no encontrado'});
});

module.exports = empleados; //exportar una sola cosa 