var db = require ('../dbconnect');
exports.getProveedores = function (req,resp) {
	var instruction = "execute ConsultaProveedores ";

	if (req.body.proveedor == "") instruction+="'',";
	else  {instruction+="'";instruction+=req.body.proveedor+"',"} 

	if (req.body.categoria == "") instruction+="'',";
	else {instruction+="'";instruction+=req.body.categoria+"',"}

	if (req.body.entrega == "") instruction+="''";
    else {instruction+="'";instruction+=req.body.entrega+"'"}
    
	console.log(instruction);
	db.executeSQL(instruction,function(data,err) {
		if(err) {
			console.log("[ERROR]:[Ocurrió un error en la consulta a la base de datos]")
			console.log(err)
		}else {
			console.log("[MENSAJE]:[Se realizó una consulta en la base de datos con exito]");
			console.log("	[TABLA]:[Purchasing.Suplliers]");
			resp.json(data.recordset)
		}
	});
};	
