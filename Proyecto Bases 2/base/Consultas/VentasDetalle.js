var db = require ('../dbconnect');
exports.getVentasDetalle = function (req,resp) {
	var instruction = "execute ConsultaDetalleFactura ";

	if (req.body.id == "") instruction+="null";
	else instruction+=req.body.id

	console.log(instruction);
	db.executeSQL(instruction,function(data,err) {
		if(err) {
			console.log("[ERROR]:[Ocurrió un error en la consulta a la base de datos]")
			console.log(err)
		}else {
			console.log("[MENSAJE]:[Se realizó una consulta en la base de datos con exito]");
			console.log("	[TABLA]:[Sales.SalesOrders]");
			resp.json(data.recordset)
		}
	});
};
