var db = require ('../dbconnect');
exports.getInventario = function (req,resp) {
	var instruction = "execute ConsultaInventarios ";

	if (req.body.inventario == "") instruction+="'',";
	else {instruction+="'";instruction+=req.body.inventario+"',"} 

	if (req.body.grupo == "") instruction+="'',";
	else  {instruction+="'";instruction+=req.body.grupo+"',"} 

	if (req.body.cantidad == "") instruction+="null";
    else instruction+=req.body.cantidad
    
	console.log(instruction);
	db.executeSQL(instruction,function(data,err) {
		if(err) {
			console.log("[ERROR]:[Ocurrió un error en la consulta a la base de datos]")
			console.log(err)
		}else {
			console.log("[MENSAJE]:[Se realizó una consulta en la base de datos con exito]");
			console.log("	[TABLA]:[WareHouse.StockItems]");
			resp.json(data.recordset)
		}
	});
};


// else {instruction+="'";instruction+=req.body.cliente+"',"}
// {"inventario":"Anuel","grupo":"La mula","cantidad":"999"}


