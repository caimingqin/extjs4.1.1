Ext.define('view.Z6', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.Z6',
	initComponent : function() {
		var me = this;
		this.layout = 'border', this.height = 650, this.defaults = {
			split : true
		};
		var queryObject = new QueryObject('DocumentCategory', "{}", "{'_id':0}");
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
		proxy.extractResponseData = function(response) {
			//console.log(response);
			var repData = Common.decode(response.responseText);
			//console.log(repData);
			var obj = {};
			obj.children = Common.decode(repData.contents);
			//console.log(obj);
			//console.log(Ext.encode(obj));
			return obj;
		};
		var treeStore = Ext.create('Ext.data.TreeStore', {
					model : 'DocumentCategory',
					autoLoad : true,
					proxy : proxy
				});

		var treeGrid = Ext.create('Ext.tree.Panel', {
					tbar : [{
								xtype : 'tbfill'
							}, {
								xtype : 'mebutton',
								text : 'find',
								handler : init
							}],
					region : 'north',
					height : 300,
					// collapsible : true,
					useArrows : true,
					rootVisible : false,
					store : treeStore,
					multiSelect : true,
					// singleExpand: true,// 只张开一个树。
					columns : [{
								xtype : 'treecolumn',
								text : 'code',
								dataIndex : 'code',
								flex : 1

							}, {
								text : 'name',
								dataIndex : 'name',
								flex : 1

							}]
				});

		// doc start
		var documentCategoryQueryObject = new QueryObject('DocumentCategory',
				"{}", "{'_id':0}");
		var documentCategoryPostData = new PostData('mongoCommand', Ext
						.encode(queryObject));
		var documentCategoryProxy = new Ext.data.proxy.Ajax();
		documentCategoryProxy.url = AppContext.HOST
				+ '/komaa/commandHandler.shtml';
		documentCategoryProxy.reader = {
			type : 'json',
			root : 'children'
		};
		documentCategoryProxy.actionMethods = {
			create : 'POST',
			read : 'POST',
			update : 'POST',
			destroy : 'POST'
		}
		documentCategoryProxy.extraParams = {
			qcmd : Ext.JSON.encode(documentCategoryPostData)
		};

		function visit(visitor, item) {
			visitor(item);
			var cl = item.children;
			//console.log(cl);
			if (cl != null && "undefined" != cl && cl.length > 0) {
				for (var i = 0; i < cl.length; i++) {
					var cItem = cl[i];
					visitor(cItem);
				}
			}
		}

		documentCategoryProxy.extractResponseData = function(response) {
			var repData = Ext.JSON.decode(response.responseText);
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
							//console.log(cItem.id);
						}, rootDept);
				root.children.push(rootDept);
			}
			return root;
		};

		var documentCategoryTreeStore = Ext.create('Ext.data.TreeStore', {
			model : 'DocumentCategory',
			autoLoad : true,
			proxy : documentCategoryProxy
				// init treepanel treestore must has documentCategoryProxy
			});

		function loadDocumentCategoryStore() {

			documentCategoryTreeStore.reload(documentCategoryProxy);
		}

		// doc end

		// main end
		var detailPanelField = Ext.create('Ext.form.FieldSet', {
					xtype : 'fieldset',
					border : 0,
					layout : {
						type : 'vbox'
					},
					defaultType : 'textfield',
					items : [{
								xtype : 'treepicker',
								fieldLabel : '상위코드(parent)',
								padding : '0 10 0 0',
								itemId : 'parentCode',
								displayField : 'name',
								store : documentCategoryTreeStore

							}, {
								fieldLabel : '부서코드(code)',
								itemId : 'code',
								readOnly : true
							}, {
								fieldLabel : '부서명(name)',
								itemId : 'name'
							}]
				});

		var detailPanelFieldForPage = Ext.create('Ext.form.FieldSet', {
					xtype : 'fieldset',
					border : 0,
					layout : {
						type : 'vbox'
					},
					defaultType : 'textfield',
					items : [{
								fieldLabel : '부서코드(code)',
								itemId : 'code',
								readOnly : true
							}, {
								fieldLabel : '부서명(name)',
								itemId : 'name',
								width : 400
							}, {
								fieldLabel : '부서명(url)',
								itemId : 'url',
								width : 600
							}]
				});

		var pageGridStore = Ext.create('Ext.data.Store', {
					model : 'DocumentPage'
				});
		var pageGrid = Ext.widget('grid', {
					height : 200,
					store : pageGridStore,
					width : 200,
					defualts : {
						flex : 1
					},
					columns : [{
								text : '코드(name)',
								flex : 1,
								dataIndex : 'name'
							}, {
								text : '약식명(url)',
								flex : 1,
								dataIndex : 'url'
							}]
				})

		var detailPanel = Ext.create('Ext.tab.Panel', {
					bodyStyle : 'background-color:#E9E9E9',
					region : 'center',
					border : false,
					margin : 0,
					fieldDefaults : {
						labelAlign : 'left',
						labelWidth : 60,
						width : 200

					},

					defaults : {
						padding : '0 0 0 0',
						titleAlign : 'center'
					},
					items : [{
								layout : 'hbox',
								title : 'menu',
								tbar : [{
											xtype : 'tbfill'
										}, {
											xtype : 'mebutton',
											text : 'create',
											handler : createMenu
										}, {
											xtype : 'mebutton',
											text : 'edit',
											handler : edit
										}, {
											xtype : 'mebutton',
											text : 'save',
											handler : saveMenu
										}],
								items : [detailPanelField]
							}, {
								layout : 'hbox',
								title : 'page',
								tbar : [{
											xtype : 'tbfill'
										}, {
											xtype : 'mebutton',
											text : 'create',
											handler : createPage
										}, {
											xtype : 'mebutton',
											text : 'edit',
											handler : edit
										}, {
											xtype : 'mebutton',
											text : 'save',
											handler : savePage
										}],
								items : [pageGrid, detailPanelFieldForPage]
							}]
				})
		// detailPanel end
		this.items = [treeGrid, detailPanel], this.callParent(arguments);

		var menuParent = detailPanelField.getComponent('parentCode');
		var menuCode = detailPanelField.getComponent('code');
		var menuName = detailPanelField.getComponent('name');

		var pageUrl = detailPanelFieldForPage.getComponent('url');
		var pageCode = detailPanelFieldForPage.getComponent('code');
		var pageName = detailPanelFieldForPage.getComponent('name');

		// init tree grid

		function init() {
			treeStore.reload(proxy);
			//console.log(treeStore);
			//console.log(treeStore.getRootNode());
		}
		var currentMenuCode;
		treeGrid.on('itemclick', function(view, record, item, index, e, eOpts) {
					var obj = record.data;
					//console.log(obj);
					currentMenuCode = obj.code;
					loadPage(currentMenuCode);
					//console.log(currentMenuCode);
					var parentCode = record.parentNode.data.code;
					Common.setValue(menuParent, parentCode);
					Common.setValue(menuCode, obj.code);
					Common.setValue(menuName, obj.name);

				});
		pageGrid.on('itemclick', function(view, record, item, index, e, eOpts) {
					var obj = record.data;
					//console.log(obj);
					Common.setValue(pageCode, obj.code);
					Common.setValue(pageName, obj.name);
					Common.setValue(pageUrl, obj.url);

				});
		function createMenu() {
			loadDocumentCategoryStore();
			Common.empty(menuParent);
			Common.empty(menuCode);
			Common.empty(menuName);
			initReadOnly(false);
		}
		function createPage() {
			Common.empty(pageCode);
			Common.empty(pageName);
			Common.empty(pageUrl);
			initReadOnly(false);
		}

		function initReadOnly(mboolean) {
			Common.setReadOnly(parent, mboolean);
			Common.setReadOnly(code, mboolean);
			Common.setReadOnly(name, mboolean);
		}

		function edit() {
			initReadOnly(false);
		}
		function saveMenu() {
			var obj = {};
			obj.code = Common.value(menuCode);
			obj.name = Common.value(menuName);
			obj.parentCode = Common.value(menuParent);
			var postData = new PostData("addDocumentCategory", Ext.JSON
							.encode(obj));// TODO
			//console.log(Ext.JSON.encode(postData));
			AppContext.command(postData, function(reps) {
						alert(reps);
					})

		}
		function loadPage(menuCode) {
			var queryObject = new QueryObject('DocumentPage', "{menuCode:"
							+ Common.read(menuCode) + "}", null)
			AppContext.commandQuery(queryObject, function(contents) {
						//console.log(contents);
						pageGridStore.loadData(Common.decode(contents));
					});
		}
		function savePage() {
			var obj = {};
			obj.code = Common.value(pageCode);
			obj.menuCode = currentMenuCode;
			obj.name = Common.value(pageName);
			obj.url = Common.value(pageUrl);
			var postData = new PostData("createDocumentPageCommand", Ext.JSON
							.encode(obj));// TODO
			//console.log(Ext.JSON.encode(postData));
			AppContext.command(postData, function(reps) {
						alert(reps);
					})

		}

	}// init end

})