function QueryObject(colName,query,fields,limit,extraParams){
	this.colName=colName;
	this.query=query;
	this.fields=fields;
	this.limit=limit;
	this.extraParams=extraParams;
}