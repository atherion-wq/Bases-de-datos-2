
const  {Pool} = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'password',
    database: 'tarea01',
    port: '5432'
});

const getDueno = async (req,res)=> {
    const response = await pool.query('Select * from dueño');
    res.status(200).json(response.rows)
}

const getDuenoByID = async (req,res)=> {
    const response = await pool.query('SELECT * from dueño WHERE idDueño = $1',[req.params.id]);
    res.json(response.rows)
}

const UpdateDueno = async (req,res)=> {
    const id = req.params.id;
    const {nombre, apellidos, cedula,telefono} = req.body;
    pool.query('UPDATE dueño SET nombre = $1, apellidos = $2, cedula = $3, telefono = $4 where idDueño = $5',[nombre, apellidos, cedula,telefono,id])
    res.send('Dueño actualizado')
}

//insert into Dueño (nombre,apellidos,cedula,telefono) 
const createDueno = async (req,res)=> {
    const {nombre, apellidos, cedula,telefono} = req.body;
    const response = await pool.query('insert into Dueño (nombre,apellidos,cedula,telefono) VALUES ($1,$2,$3,$4)',[nombre, apellidos, cedula,telefono]);
    res.json({
        message: 'Usuario agregado con exito',
        body: {
            user: {nombre,apellidos,cedula,telefono}
        }
    })
}

const deleteDueno = async (req,res)=> {
    pool.query('DELETE FROM vehiculo WHERE idDueño = $1',[req.params.id]);
    const response = await pool.query('DELETE FROM dueño WHERE idDueño = $1',[req.params.id]);
    res.json('El dueño ha sido borrado')
}
///--------------------------------------------------Comienza vehiculo

const getVehiculo = async (req,res)=> {
    const response = await pool.query('Select * from vehiculo');
    res.status(200).json(response.rows)
}

const getVehiculoByID = async (req,res)=> {
    const response = await pool.query('SELECT * from vehiculo WHERE idVechiculo = $1',[req.params.id]);
    res.json(response.rows)
}

const UpdateVehiculo = async (req,res)=> {
    const id = req.params.id;
    const {marca,modelo,año,kilometraje} = req.body;
    pool.query('UPDATE vehiculo SET marca = $1, modelo = $2, año = $3, kilometraje = $4 where idVechiculo = $5',[marca,modelo,año,kilometraje,id])
    res.send('Vehiculo actualizado')
}

//insert into Dueño (nombre,apellidos,cedula,telefono) 
const createVehiculo = async (req,res)=> {
    const {marca,modelo,año,kilometraje,idDueño} = req.body;
    const response = await pool.query('insert into Vehiculo (marca,modelo,año,kilometraje,idDueño) VALUES ($1,$2,$3,$4,$5)',[marca,modelo,año,kilometraje,idDueño]);
    res.json({
        message: 'Vehiculo agregado con exito',
        body: {
            user: {marca,modelo,año,kilometraje,idDueño}
        }
    })
}

const deleteVehiculo = async (req,res)=> {
    pool.query('DELETE FROM vehiculo WHERE idVechiculo = $1',[req.params.id]);
    res.json('El vehiculo ha sido borrado')
}


module.exports = {
    getDueno,
    getDuenoByID,
    createDueno,
    deleteDueno,
    UpdateDueno,
    getVehiculo,
    getVehiculoByID,
    createVehiculo,
    deleteVehiculo,
    UpdateVehiculo
}