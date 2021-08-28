const { Router } = require('express');
const router = Router();

const { getDueno,createDueno,getDuenoByID,deleteDueno,UpdateDueno,getVehiculo,getVehiculoByID,
createVehiculo,deleteVehiculo,UpdateVehiculo } = require('../Controllers/index.controller');



router.get('/getDueno',getDueno);
router.get('/getDueno/:id',getDuenoByID);
router.post('/createDueno', createDueno);
router.delete('/deleteDueno/:id',deleteDueno)
router.put('/UpdateDueno/:id',UpdateDueno)


router.get('/getVehiculo',getVehiculo);
router.get('/getVehiculo/:id',getVehiculoByID);
router.post('/createVehiculo', createVehiculo);
router.delete('/deleteVehiculo/:id',deleteVehiculo)
router.put('/UpdateVehiculo/:id',UpdateVehiculo)

module.exports = router; 