// deptTreeStore start
Ext.onReady(function() {
	loadDeptTreeStore();
	});
var queryObject = new QueryObject('Department', "{}", "{'_id':0}");
var postData = new PostData('mongoCommand', Ext.encode(queryObject));
var proxy = new Ext.data.proxy.Ajax();
proxy.url = AppContext.HOST + '/komaa/commandHandler.shtml';
proxy.reader = {
	type : 'json',
	root : 'children'
};
proxy.actionMethods = {
	create : 'POST',
	read : 'POST',
	update : 'POST',
	destroy : 'POST'
}
proxy.extraParams = {
	qcmd : Ext.JSON.encode(postData)
};

function visit(visitor, item) {
	
//	visitor.visit(item);
	visitor(item);
	var cl = item.children;
	//console.log(cl);
	if (cl != null && "undefined" != cl && cl.length > 0) {
		for (var i = 0; i < cl.length; i++) {
			var cItem = cl[i];			
			visit(function(mItem){
				mItem.id = mItem.code;
				mItem.text = mItem.name;
			},cItem);
//			visitor(cItem);
		}
	}
}

//function visitor(mItem){
//	mItem.id = mItem.code;
//	mItem.text = mItem.name;	
//}


//var visitor = {}
//visitor.prototype.visit= function(cItem){
//	cItem.id = cItem.code;
//	cItem.text = cItem.name;
//}

// proxy.extractResponseData = function(response) {
//	//console.log(response);
//	var repData = Ext.JSON.decode(response.responseText);
//	//console.log(repData);
//	var obj = Ext.decode(repData.contents);
//	var rootDept = obj[0];
//	visit(function(cItem) {
//				cItem.id = cItem.code;
//				cItem.text = cItem.name;
//				//console.log(cItem.id);
//			}, rootDept);
//	//console.log(Ext.encode(rootDept));
//
//	var root = {};
//	root.text = 'root';
//	root.id = '999';
//	root.children = [];
//	root.children[0] = rootDept;
//	// return rootDept;
//	return root;
//};

proxy.extractResponseData = function(response) {
	//console.log(response);
	var repData = Common.decode(response.responseText);
	//console.log(repData);
	var arr = Common.decode(repData.contents);
	var root = {};
	root.text = 'root';
	root.id = '999';
	root.children = [];
	for (var i = 0; i < arr.length; i++) {
		var rootDept = arr[i];
		visit(function(cItem) {
					cItem.id = cItem.code;
					cItem.text = cItem.name;
				}, rootDept);
		root.children.push(rootDept);
	}
	//console.log(Ext.encode(root));
	return root;
};

var deptTreeStore = Ext.create('Ext.data.TreeStore', {
	model : 'Department',
	autoLoad : true,
	proxy : proxy
		// init treepanel treestore must has proxy
	});
function loadDeptTreeStore() {

	deptTreeStore.reload(proxy);
}

// deptTreeStore end
// customerStore start
var customerStore = Ext.create('Ext.data.Store', {
			fields : [{
						name : 'code',
						type : 'string'
					}, {
						name : 'name',
						type : 'auto',
						convert : function(obj) {
							//console.log(obj);
							if (obj != null) {
								return obj.simpleName
							}
							return null;
						}
					}]
		});

function loadCustomerStore() {
	var queryObject = new QueryObject('Customer', '{}',
			"{'code':'1','name':'1'}");
	AppContext.commandQuery(queryObject, function(contents) {
				//console.log(contents);
		        var arr=Common.decode(contents);
		        var result=[];
		        var obj={};
		        obj.code="*";
		        var name={};
		        name.simpleName="select";
		        obj.name=name;
		        result.push(obj)
		     for(var i=0;i<arr.length;i++){
		        result.push(arr[i]);
		     }
				customerStore.loadData(result);
			});
}



// customerStore end
