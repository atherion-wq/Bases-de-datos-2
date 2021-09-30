USE WideWorldImporters
GO

--ESTE PROCEDIMIENTO ALMACENADO SE UTILIZA PARA LAS CONSULTAS DEL MÓDULO CLIENTE

CREATE PROC ConsultaClientes
	@CustomerNameSerch nvarchar(100),
	@CustomerCategoryNameSerch nvarchar(50),
	@DeliveryMethodNameSerch nvarchar(50)
AS
BEGIN
SELECT sc.CustomerID,sc.CustomerName,scc.CustomerCategoryName, ISNULL(sbg.BuyingGroupName, 'N/A') BuyingGroupName,
	   p.FullName PrimaryContact, ISNULL(pe.FullName, 'N/A') AlternativeContact,
	   adm.DeliveryMethodName, ac.CityName, sc.PostalPostalCode,
	   sc.PhoneNumber, sc.FaxNumber, sc.PaymentDays, sc.WebsiteURL,
	   aco.CountryName+', '+asp.StateProvinceName+', '+ac.CityName+', '+
	   sc.DeliveryAddressLine2 CustomerAddress, sc.DeliveryLocation.Lat Latitud, sc.DeliveryLocation.Long Longitud
FROM Sales.Customers sc
INNER JOIN Sales.CustomerCategories scc ON scc.CustomerCategoryID=sc.CustomerCategoryID
INNER JOIN Application.People p ON p.PersonID=sc.PrimaryContactPersonID 
FULL JOIN Application.People pe ON pe.PersonID=sc.AlternateContactPersonID ---FULL JOIN: ESTO PORQUE EXISTEN CLIENTES SIN ALTERNATIVECONTACT
FULL JOIN Sales.BuyingGroups sbg ON sbg.BuyingGroupID=sc.BuyingGroupID ---FULL JOIN: ESTO PORQUE EXISTEN CLIENTES QUE NO TIENEN BUYINGGROUPS
INNER JOIN Application.DeliveryMethods adm ON adm.DeliveryMethodID=sc.DeliveryMethodID
INNER JOIN Application.Cities ac ON ac.CityID=sc.DeliveryCityID
INNER JOIN Application.StateProvinces asp ON ac.StateProvinceID=asp.StateProvinceID
INNER JOIN Application.Countries aco ON aco.CountryID=asp.CountryID
WHERE sc.CustomerName like '%'+@CustomerNameSerch+'%'
and scc.CustomerCategoryName like '%'+@CustomerCategoryNameSerch+'%'
and adm.DeliveryMethodName like '%'+@DeliveryMethodNameSerch+'%'

ORDER BY sc.CustomerName
END
GO
--ESTE PROCEDIMIENTO CONSULTA LOS DETALLES DE UN CLIENTE POR ID
CREATE PROC ConsultaClienteDetalle
	@id int
AS
BEGIN
SELECT	sc.CustomerName, 
		scc.CustomerCategoryName, 
		ISNULL(sbg.BuyingGroupName, 'N/A') BuyingGroupName,
		p.FullName PrimaryContact, 
		ISNULL(pe.FullName, 'N/A') AlternativeContact,
		adm.DeliveryMethodName, 
		ac.CityName, 
		sc.PostalPostalCode,
		sc.PhoneNumber, 
		sc.FaxNumber, 
		sc.PaymentDays, 
		sc.WebsiteURL,
		aco.CountryName+', '+asp.StateProvinceName+', '+ac.CityName+', '+ sc.DeliveryAddressLine2 CustomerAddress, 
		sc.DeliveryLocation
FROM Sales.Customers sc
INNER JOIN Sales.CustomerCategories scc ON scc.CustomerCategoryID=sc.CustomerCategoryID
INNER JOIN Application.People p ON p.PersonID=sc.PrimaryContactPersonID 
FULL JOIN Application.People pe ON pe.PersonID=sc.AlternateContactPersonID ---FULL JOIN: ESTO PORQUE EXISTEN CLIENTES SIN ALTERNATIVECONTACT
FULL JOIN Sales.BuyingGroups sbg ON sbg.BuyingGroupID=sc.BuyingGroupID ---FULL JOIN: ESTO PORQUE EXISTEN CLIENTES QUE NO TIENEN BUYINGGROUPS
INNER JOIN Application.DeliveryMethods adm ON adm.DeliveryMethodID=sc.DeliveryMethodID
INNER JOIN Application.Cities ac ON ac.CityID=sc.DeliveryCityID
INNER JOIN Application.StateProvinces asp ON ac.StateProvinceID=asp.StateProvinceID
INNER JOIN Application.Countries aco ON aco.CountryID=asp.CountryID
WHERE sc.CustomerID = @id
END
GO

--ESTE PROCEDIMIENTO ALMACENADO SE UTILIZA PARA CONSULTAS DEL MÓDULO PROVEEDORES
CREATE PROC ConsultaProveedores
	@SupplierNameSerch nvarchar(100),
	@SupplierCategoryNameSerch nvarchar(50),
	@DeliveryMethodNameSerch nvarchar(50)
AS
BEGIN
IF (@DeliveryMethodNameSerch = '')
	BEGIN
	SELECT ps.SupplierID, ps.SupplierReference, ps.SupplierName, psc.SupplierCategoryName, p.FullName PrimaryContact,
		   pe.FullName AlternativeContact, ISNULL(adm.DeliveryMethodName, 'N/A') DeliveryMethodName, ac.CityName, ps.DeliveryPostalCode,
		   ps.PhoneNumber, ps.FaxNumber, ps.WebsiteURL, aco.CountryName+', '+asp.StateProvinceName+', '+ac.CityName+', '+
    	   ps.DeliveryAddressLine2 SupplierAddress, ps.DeliveryLocation, ps.BankAccountName, ps.BankAccountNumber, ps.PaymentDays
	FROM Purchasing.Suppliers ps
	INNER JOIN Purchasing.SupplierCategories psc ON psc.SupplierCategoryID=ps.SupplierCategoryID
	FULL JOIN Application.DeliveryMethods adm ON adm.DeliveryMethodID=ps.DeliveryMethodID
	INNER JOIN Application.Cities ac ON ac.CityID=ps.DeliveryCityID
	INNER JOIN Application.People p ON p.PersonID=ps.PrimaryContactPersonID
	INNER JOIN Application.People pe ON pe.PersonID=ps.AlternateContactPersonID
	INNER JOIN Application.StateProvinces asp ON ac.StateProvinceID=asp.StateProvinceID
	INNER JOIN Application.Countries aco ON aco.CountryID=asp.CountryID
	WHERE ps.SupplierName like '%'+ @SupplierNameSerch +'%'
	and psc.SupplierCategoryName like '%'+ @SupplierCategoryNameSerch +'%'
	ORDER BY ps.SupplierName
	END
ELSE
	BEGIN
	SELECT ps.SupplierID, ps.SupplierReference, ps.SupplierName, psc.SupplierCategoryName, p.FullName PrimaryContact,
		   pe.FullName AlternativeContact, adm.DeliveryMethodName, ac.CityName, ps.DeliveryPostalCode,
		   ps.PhoneNumber, ps.FaxNumber, ps.WebsiteURL, aco.CountryName+', '+asp.StateProvinceName+', '+ac.CityName+', '+
		   ps.DeliveryAddressLine2 SupplierAddress, ps.DeliveryLocation, ps.BankAccountName, ps.BankAccountNumber, ps.PaymentDays
	FROM Purchasing.Suppliers ps
	INNER JOIN Purchasing.SupplierCategories psc ON psc.SupplierCategoryID=ps.SupplierCategoryID
	FULL JOIN Application.DeliveryMethods adm ON adm.DeliveryMethodID=ps.DeliveryMethodID
	INNER JOIN Application.Cities ac ON ac.CityID=ps.DeliveryCityID
	INNER JOIN Application.People p ON p.PersonID=ps.PrimaryContactPersonID
	INNER JOIN Application.People pe ON pe.PersonID=ps.AlternateContactPersonID
	INNER JOIN Application.StateProvinces asp ON ac.StateProvinceID=asp.StateProvinceID
	INNER JOIN Application.Countries aco ON aco.CountryID=asp.CountryID
	WHERE ps.SupplierName like '%'+ @SupplierNameSerch +'%'
	and psc.SupplierCategoryName like '%'+ @SupplierCategoryNameSerch +'%'
	and adm.DeliveryMethodName like '%'+ @DeliveryMethodNameSerch +'%'
	ORDER BY ps.SupplierName
	END
END
GO

--ESTE PROCEDIMIENTO TIENE SE UTILIZA PARA CONSULTAR LOS DETALLES DEL PROVEEDOR POR MEDIO DEL ID
CREATE PROC ConsultaProveedoresDetalle
	@id nvarchar
AS
BEGIN
	SELECT ps.SupplierReference, ps.SupplierName, psc.SupplierCategoryName, p.FullName PrimaryContact,
		   pe.FullName AlternativeContact, ISNULL(adm.DeliveryMethodName, 'N/A') DeliveryMethodName, ac.CityName, ps.DeliveryPostalCode,
		   ps.PhoneNumber, ps.FaxNumber, ps.WebsiteURL, aco.CountryName+', '+asp.StateProvinceName+', '+ac.CityName+', '+
    	   ps.DeliveryAddressLine2 SupplierAddress, ps.DeliveryLocation, ps.BankAccountName, ps.BankAccountNumber, ps.PaymentDays
	FROM Purchasing.Suppliers ps
	INNER JOIN Purchasing.SupplierCategories psc ON psc.SupplierCategoryID=ps.SupplierCategoryID
	FULL JOIN Application.DeliveryMethods adm ON adm.DeliveryMethodID=ps.DeliveryMethodID
	INNER JOIN Application.Cities ac ON ac.CityID=ps.DeliveryCityID
	INNER JOIN Application.People p ON p.PersonID=ps.PrimaryContactPersonID
	INNER JOIN Application.People pe ON pe.PersonID=ps.AlternateContactPersonID
	INNER JOIN Application.StateProvinces asp ON ac.StateProvinceID=asp.StateProvinceID
	INNER JOIN Application.Countries aco ON aco.CountryID=asp.CountryID
	WHERE ps.SupplierID = @id
END
GO

--ESTE PROCEDIMIENTO ALMACENADO SE UTILIZA PARA CONSULTAS DEL MÓDULO DE INVENTARIOS
CREATE PROC ConsultaInventarios
	@ItemNameSerch nvarchar(100),
	@groupNameSerch nvarchar(50),
	@QuantitySerch int
AS
BEGIN
IF (@QuantitySerch = -1 or @QuantitySerch IS NULL)
	BEGIN
	SELECT DISTINCT wsi.StockItemName, wsi.StockItemID, ps.SupplierName,wsg.StockGroupName, ISNULL(wc.ColorName, 'N/A') ColorName, wpt.PackageTypeName, wpts.PackageTypeName, ---DISTINCT: DEBIDO A QUE AL AGREGAR INNER JOIN DE GRUPOS Y FILTRARLO POR ESTOS SE TRIPLICAN LOS REGISTROS
		   wsi.RecommendedRetailPrice, wsi.TypicalWeightPerUnit, wsi.SearchDetails, wsi.QuantityPerOuter,
		   ISNULL(wsi.Brand, 'N/A') Brand, ISNULL(wsi.Size,'N/A') Size, wsi.TaxRate, wsi.UnitPrice, wsih.QuantityOnHand, wsih.BinLocation
	FROM Warehouse.StockItems wsi
	INNER JOIN Purchasing.Suppliers ps ON ps.SupplierID=wsi.SupplierID
	FULL JOIN Warehouse.Colors wc ON wc.ColorID=wsi.ColorID ---ESTO PORQUE EXISTEN PRODUCTOS SIN COLOR QUE NO SERÍAN CONTEMPLADOS
	INNER JOIN Warehouse.PackageTypes wpt ON wpt.PackageTypeID=wsi.UnitPackageID
	INNER JOIN Warehouse.PackageTypes wpts ON wpts.PackageTypeID=wsi.OuterPackageID
	INNER JOIN Warehouse.StockItemHoldings wsih ON wsih.StockItemID=wsi.StockItemID
	INNER JOIN Warehouse.StockItemStockGroups sisg ON sisg.StockItemID=wsi.StockItemID
	INNER JOIN Warehouse.StockGroups wsg ON wsg.StockGroupID=sisg.StockGroupID
	WHERE wsi.StockItemName like '%'+@ItemNameSerch+'%'
	and wsg.StockGroupName like '%'+@groupNameSerch+'%'
	ORDER BY wsi.StockItemName
	END
ELSE
	BEGIN
	SELECT DISTINCT wsi.StockItemName,wsi.StockItemID, ps.SupplierName, ISNULL(wc.ColorName, 'N/A') ColorName, wpt.PackageTypeName, wpts.PackageTypeName, ---DISTINCT: DEBIDO A QUE AL AGREGAR INNER JOIN DE GRUPOS Y FILTRARLO POR ESTOS SE TRIPLICAN LOS REGISTROS
		   wsi.RecommendedRetailPrice, wsi.TypicalWeightPerUnit, wsi.SearchDetails, wsi.QuantityPerOuter,
		   ISNULL(wsi.Brand, 'N/A') Brand, ISNULL(wsi.Size,'N/A') Size, wsi.TaxRate, wsi.UnitPrice, wsih.QuantityOnHand, wsih.BinLocation
	FROM Warehouse.StockItems wsi
	INNER JOIN Purchasing.Suppliers ps ON ps.SupplierID=wsi.SupplierID
	FULL JOIN Warehouse.Colors wc ON wc.ColorID=wsi.ColorID ---ESTO PORQUE EXISTEN PRODUCTOS SIN COLOR QUE NO SERÍAN CONTEMPLADOS
	INNER JOIN Warehouse.PackageTypes wpt ON wpt.PackageTypeID=wsi.UnitPackageID
	INNER JOIN Warehouse.PackageTypes wpts ON wpts.PackageTypeID=wsi.OuterPackageID
	INNER JOIN Warehouse.StockItemHoldings wsih ON wsih.StockItemID=wsi.StockItemID
	INNER JOIN Warehouse.StockItemStockGroups sisg ON sisg.StockItemID=wsi.StockItemID
	INNER JOIN Warehouse.StockGroups wsg ON wsg.StockGroupID=sisg.StockGroupID
	WHERE wsi.StockItemName like '%'+@ItemNameSerch+'%'
	and wsg.StockGroupName like '%'+@groupNameSerch+'%'
	and wsih.QuantityOnHand = @QuantitySerch
	ORDER BY wsi.StockItemName
	END
END

GO

--ESTE PROCEDIMIENTO ALMACENADO SE UTILIZA PARA CONSULTAR LOS DETALLES DEL MÓDULO DE INVENTARIOS
CREATE PROC ConsultaInventariosDetalle
	@id INT
AS
BEGIN
	SELECT  distinct wsi.StockItemName, SupplierName , wsi.SupplierID, ISNULL(wc.ColorName, 'N/A') ColorName, wpt.PackageTypeName UnitPackage, wpts.PackageTypeName OuterPackage, ---DISTINCT: DEBIDO A QUE AL AGREGAR INNER JOIN DE GRUPOS Y FILTRARLO POR ESTOS SE TRIPLICAN LOS REGISTROS
			wsi.RecommendedRetailPrice, wsi.TypicalWeightPerUnit, wsi.SearchDetails, wsi.QuantityPerOuter,
			ISNULL(wsi.Brand, 'N/A') Brand, ISNULL(wsi.Size,'N/A') Size, wsi.TaxRate, wsi.UnitPrice, wsih.QuantityOnHand, wsih.BinLocation
	FROM Warehouse.StockItems wsi
	INNER JOIN Purchasing.Suppliers ps ON ps.SupplierID=wsi.SupplierID
	FULL JOIN Warehouse.Colors wc ON wc.ColorID=wsi.ColorID ---ESTO PORQUE EXISTEN PRODUCTOS SIN COLOR QUE NO SERÍAN CONTEMPLADOS
	INNER JOIN Warehouse.PackageTypes wpt ON wpt.PackageTypeID=wsi.UnitPackageID
	INNER JOIN Warehouse.PackageTypes wpts ON wpts.PackageTypeID=wsi.OuterPackageID
	INNER JOIN Warehouse.StockItemHoldings wsih ON wsih.StockItemID=wsi.StockItemID
	INNER JOIN Warehouse.StockItemStockGroups sisg ON sisg.StockItemID=wsi.StockItemID
	--INNER JOIN Warehouse.StockGroups wsg ON wsg.StockGroupID=sisg.StockGroupID
	WHERE wsi.StockItemID = @id
END
GO

--ESTE PROCEDIMIENTO ALMACENADO SE UTILIZA PARA OBTENER EL MÍNIMO Y MÁXIMO DE LAS FECHAS DE VENTAS
CREATE PROC GetMinMaxDateSales 
AS
BEGIN
SELECT MIN(invoiceDate) MinDate, MAX(invoiceDate) MaxDate FROM Sales.Invoices
END
GO

--Obtener la el total a pagar de cada factura
CREATE VIEW TotalInvoiceAmount AS
SELECT InvoiceID, SUM(ExtendedPrice) TotalAmount
FROM Sales.InvoiceLines
group by InvoiceID
GO

--ESTE PROCEDIMIENTO ALMACENADO SE UTILIZA PARA OBTENER EL MÍNIMO Y MÁXIMO DE TODOS LOS MONTOS DE FACTURAS
CREATE PROC GetMinMaxAmount
AS
BEGIN
SELECT MIN(TotalAmount) MinAmount, MAX(TotalAmount) MaxAmount FROM TotalInvoiceAmount
END
GO

CREATE PROC ConsultaEncabezadoFactura
	@InvoiceIDSerch int = -1,
	@MinDateSerch date ,
	@MaxDateSerch date,
	@CustomerNameSerch nvarchar(100),
	@DeliveryMethodNameSerch nvarchar(50),
	@MinAmountSerch int,
	@MaxAmountSerch int
AS
BEGIN
IF (@InvoiceIDSerch = -1 or @InvoiceIDSerch is NULL)
	BEGIN
	SELECT si.InvoiceID, sc.CustomerID, sc.CustomerName,adm.DeliveryMethodName, si.CustomerPurchaseOrderNumber,
		   ap.FullName ContactPerson, ps.SupplierName, si.InvoiceDate, si.DeliveryInstructions,
		   tia.TotalAmount
	FROM Sales.Invoices si
	INNER JOIN Sales.Customers sc ON sc.CustomerID=si.CustomerID
	INNER JOIN Application.DeliveryMethods adm ON adm.DeliveryMethodID=si.DeliveryMethodID
	INNER JOIN Application.People ap ON ap.PersonID=si.ContactPersonID
	INNER JOIN Purchasing.PurchaseOrders po ON po.PurchaseOrderID=si.OrderID
	INNER JOIN Purchasing.Suppliers ps ON ps.SupplierID= po.SupplierID
	INNER JOIN TotalInvoiceAmount tia ON tia.InvoiceID=si.InvoiceID
	WHERE si.InvoiceDate between coalesce(@MinDateSerch,si.InvoiceDate) and coalesce(@MaxDateSerch,si.InvoiceDate)and
	sc.CustomerName like '%'+@CustomerNameSerch+'%' and
	adm.DeliveryMethodName like '%'+@DeliveryMethodNameSerch+'%' and
	tia.TotalAmount between coalesce(@MinAmountSerch,tia.TotalAmount) and coalesce(@MaxAmountSerch,tia.TotalAmount)
	ORDER BY sc.CustomerName
	END
ELSE
	BEGIN
	SELECT si.InvoiceID, sc.CustomerID, sc.CustomerName, adm.DeliveryMethodName, si.CustomerPurchaseOrderNumber,
		   ap.FullName ContactPerson, ps.SupplierName, si.InvoiceDate, si.DeliveryInstructions,
		   tia.TotalAmount
	FROM Sales.Invoices si
	INNER JOIN Sales.Customers sc ON sc.CustomerID=si.CustomerID
	INNER JOIN Application.DeliveryMethods adm ON adm.DeliveryMethodID=si.DeliveryMethodID
	INNER JOIN Application.People ap ON ap.PersonID=si.ContactPersonID
	INNER JOIN Purchasing.PurchaseOrders po ON po.PurchaseOrderID=si.OrderID
	INNER JOIN Purchasing.Suppliers ps ON ps.SupplierID= po.SupplierID
	INNER JOIN TotalInvoiceAmount tia ON tia.InvoiceID=si.InvoiceID
	WHERE si.InvoiceID = @InvoiceIDSerch and
	si.InvoiceDate between coalesce(@MinDateSerch,si.InvoiceDate ) and coalesce(@MaxDateSerch,si.InvoiceDate)  and
	sc.CustomerName like '%'+@CustomerNameSerch+'%' and
	adm.DeliveryMethodName like '%'+@DeliveryMethodNameSerch+'%' and
	tia.TotalAmount between coalesce(@MinAmountSerch,tia.TotalAmount) and coalesce(@MaxAmountSerch,tia.TotalAmount)
	ORDER BY sc.CustomerName
	END
END
GO


--CONSULTA PARA OBTENER LINEAS DE FACTURA
CREATE PROC ConsultaDetalleFactura
	@InvoiceIDSerch int
AS
BEGIN
SELECT si.InvoiceID, sc.CustomerID, sc.CustomerName,adm.DeliveryMethodName, si.CustomerPurchaseOrderNumber,
		ap.FullName ContactPerson, ps.SupplierName, si.InvoiceDate, si.DeliveryInstructions, ape.FullName VendorName,
		tia.TotalAmount, wsi.StockItemName, sil.Quantity, sil.UnitPrice,
	   Concat(sil.TaxRate, '%') TaxRate, sil.TaxAmount, sil.ExtendedPrice, wsi.StockItemID
FROM Sales.InvoiceLines sil
INNER JOIN Sales.Invoices si ON si.InvoiceID = sil.InvoiceID
INNER JOIN Warehouse.StockItems wsi ON sil.StockItemID=wsi.StockItemID
INNER JOIN Sales.Customers sc ON sc.CustomerID=si.CustomerID
INNER JOIN Application.DeliveryMethods adm ON adm.DeliveryMethodID=si.DeliveryMethodID
INNER JOIN Application.People ap ON ap.PersonID=si.ContactPersonID
INNER JOIN Application.People ape ON ape.PersonID=si.SalespersonPersonID
INNER JOIN Purchasing.PurchaseOrders po ON po.PurchaseOrderID=si.OrderID
INNER JOIN Purchasing.Suppliers ps ON ps.SupplierID= po.SupplierID
INNER JOIN TotalInvoiceAmount tia ON tia.InvoiceID=si.InvoiceID
WHERE si.InvoiceID = @InvoiceIDSerch
END


GO


/* ********************************DATOS ESTADISTICOS*********************************** */

CREATE PROC ConsultaEstadisticaUno
	@SupplierNameSerch nvarchar(100)
AS
BEGIN
SELECT ISNULL(ps.SupplierName, '--TOTAL--') SupplierName, ISNULL(psc.SupplierCategoryName, '-') SupplierCategoryName,
	   MIN(pst.TransactionAmount) Minimo, MAX(pst.TransactionAmount) Maximo, AVG(pst.TransactionAmount) promedio
FROM Purchasing.PurchaseOrders ppo
INNER JOIN Purchasing.PurchaseOrderLines ppol ON ppol.PurchaseOrderID=ppo.PurchaseOrderID
INNER JOIN Purchasing.Suppliers ps ON ps.SupplierID=ppo.SupplierID
INNER JOIN Purchasing.SupplierTransactions pst ON pst.PurchaseOrderID=ppo.PurchaseOrderID
INNER JOIN Purchasing.SupplierCategories psc ON psc.SupplierCategoryID=ps.SupplierCategoryID
WHERE PS.SupplierName like '%'+@SupplierNameSerch+'%'
GROUP BY ROLLUP(ps.SupplierName), psc.SupplierCategoryName
END
GO



CREATE PROC ConsultaEstadisticaDos
	@CustomerNameSerch nvarchar(100)
AS
BEGIN
SELECT ISNULL(sc.CustomerName,'--TOTAL--') CustomerName, ISNULL(scc.CustomerCategoryName, '-') CustomerCategoryName,
	   MIN(sil.ExtendedPrice) minimo, MAX(sil.ExtendedPrice) maximo, AVG(sil.ExtendedPrice) promedio
FROM Sales.InvoiceLines sil
INNER JOIN Sales.Invoices si ON si.InvoiceID=sil.InvoiceID
INNER JOIN Sales.Customers sc ON sc.CustomerID=si.CustomerID
INNER JOIN Sales.CustomerCategories scc ON scc.CustomerCategoryID=sc.CustomerCategoryID
WHERE sc.CustomerName like '%'+@CustomerNameSerch+'%'
GROUP BY ROLLUP(sc.CustomerName), scc.CustomerCategoryName
END
GO



CREATE VIEW GetMinMaxYearMonth
AS
SELECT MIN(FORMAT(InvoiceDate,'yyyy-MM')) MinDate, MAX(FORMAT(InvoiceDate,'yyyy-MM')) MaxDate FROM Sales.Invoices
GO


CREATE PROC ConsultaEstadisticaTres
	@MinDateSerch date,
	@MaxDateSerch date
AS
BEGIN
SELECT TOP(10) wsi.StockItemName, SUM(sil.ExtendedPrice) Ganancia, RANK() OVER 
	   (ORDER BY SUM(sil.ExtendedPrice) DESC) Ranking
FROM Sales.InvoiceLines sil
INNER JOIN Warehouse.StockItems wsi ON wsi.StockItemID=sil.StockItemID
INNER JOIN Sales.Invoices si ON si.InvoiceID=sil.InvoiceID
WHERE FORMAT(si.InvoiceDate,'yyyy-MM') between FORMAT(@MinDateSerch,'yyyy-MM') and FORMAT(@MaxDateSerch,'yyyy-MM')
GROUP BY wsi.StockItemName
END
GO


CREATE PROC ConsultaEstadisticaCuatro
	@MinDateSerch date,
	@MaxDateSerch date
AS
BEGIN
SELECT TOP(10) sc.CustomerName, SUM(sil.ExtendedPrice) TotalSold, COUNT(si.InvoiceID) TotalInvoices,
	   RANK() OVER (ORDER BY COUNT(si.InvoiceID) DESC) Ranking
FROM Sales.Invoices si
INNER JOIN Sales.Customers sc ON sc.CustomerID=si.CustomerID
INNER JOIN Sales.InvoiceLines sil ON sil.InvoiceID=si.InvoiceID
WHERE FORMAT(si.InvoiceDate,'yyyy-MM') between FORMAT(@MinDateSerch,'yyyy-MM') and FORMAT(@MaxDateSerch,'yyyy-MM')
GROUP BY sc.CustomerName
END
GO

CREATE PROC  ConsultaEstadisticaCinco
	@MinDateSerch date,
	@MaxDateSerch date
AS
BEGIN
SELECT ps.SupplierName, SUM(pst.TransactionAmount) TotalOrdersAmount, COUNT(ppo.PurchaseOrderID) TotalOrders,
	   RANK() OVER(ORDER BY COUNT(ppo.PurchaseOrderID) DESC) Ranking 
FROM Purchasing.PurchaseOrders ppo
INNER JOIN Purchasing.Suppliers ps ON ppo.SupplierID=ps.SupplierID
INNER JOIN Purchasing.SupplierTransactions pst ON pst.PurchaseOrderID=ppo.PurchaseOrderID
WHERE FORMAT(ppo.OrderDate,'yyyy-MM') between FORMAT(@MinDateSerch,'yyyy-MM') and FORMAT(@MaxDateSerch,'yyyy-MM')
GROUP BY ps.SupplierName
END
GO