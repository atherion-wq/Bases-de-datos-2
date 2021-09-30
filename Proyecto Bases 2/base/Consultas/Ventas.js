var db = require ('../dbconnect');
exports.getVentas = function (req,resp) {
	var instruction = "execute ConsultaEncabezadoFactura ";

	if (req.body.numFactura == "") instruction+="null,";
	else  {instruction+=req.body.numFactura+","} 

	if (req.body.fecha1 == "") instruction+="null,";
    else {instruction+="'";instruction+=req.body.fecha1+"',"}

	if (req.body.fecha2 == "") instruction+="null,";
    else {instruction+="'";instruction+=req.body.fecha2+"',"}
	
	if (req.body.cliente == "") instruction+="'',";
	else {instruction+="'";instruction+=req.body.cliente+"',"}

	if (req.body.entrega == "") instruction+="'',";
    else {instruction+="'";instruction+=req.body.entrega+"',"}
    
	if (req.body.montoMin == "") instruction+="null,";
    else {instruction+=req.body.montoMin+","}

	if (req.body.montoMax == "") instruction+="null";
    else {instruction+=req.body.montoMax}

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


// {"numFactura":"123321","cliente":"Bin Laden","entrega":"Avion","fecha1":"2020-09-01","fecha2":"2020-09-30","montoMinimo":"100","montoMaximo":"1000000000"}
