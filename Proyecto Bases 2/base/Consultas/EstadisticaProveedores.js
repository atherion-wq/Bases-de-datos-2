var db = require ('../dbconnect');
exports.getEstadisticaProveedores = function (req,resp) {
	var instruction = "execute ConsultaEstadisticaUno ";

	if (req.body.nombre == "") {instruction+="null";}
	else {instruction+="'";instruction+=req.body.nombre+"'"}

    
	console.log(instruction);
	db.executeSQL(instruction,function(data,err) {
		if(err) {
			console.log("[ERROR]:[Ocurrió un error en la consulta a la base de datos]")
			console.log(err)
		}else {
			console.log("[MENSAJE]:[Se realizó una consulta en la base de datos con exito]");
			console.log("	[TABLA]:[Purchasing.PurchaseOrders]");
			resp.json(data.recordset)
		}
	});
};
