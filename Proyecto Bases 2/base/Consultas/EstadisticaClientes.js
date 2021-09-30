var db = require ('../dbconnect');
exports.getEstadisticaClientes = function (req,resp) {
	var instruction = "execute ConsultaEstadisticaDos ";

	if (req.body.nombre == "") {instruction+="null";}
	else {instruction+="'";instruction+=req.body.nombre+"'"}

    
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
