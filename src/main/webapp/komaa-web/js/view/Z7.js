Ext.define('view.Z7', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.Z7',
			initComponent : function() {
				var me = this;
				me.layout = 'border';
				me.height = 650;
				me.defaults = {
					split : true
				};
				var pageCode = Ext.widget('metext', {
							fieldLabel : 'code'
						});
				// var pageName = Ext.widget('metext', {
				// fieldLabel : 'name',
				// width : 400
				//
				// });
				var pageDesc = Ext.widget('metext', {
							fieldLabel : 'description',
							width : 400
						});
				var buttonCode = Ext.widget('metext', {
							fieldLabel : 'code'
						});
				var buttonName = Ext.widget('metext', {
							fieldLabel : 'name',
							width : 400

						});

				var buttonType = Ext.widget('mecombo', {
							fieldLabel : '확인처구분(buttonType)',
							queryMode : 'local',
							displayField : 'name',
							valueField : 'code',
							width : 400,
							store : buttonTypeStore
						});

				var store = Ext.create('Ext.data.Store', {
							model : 'Page'
						})

				var grid = Ext.create('Ext.grid.Panel', {
							region : 'north',
							height : 300,
							store : store,
							tbar : [{
										xtype : 'tbfill'
									}, {
										xtype : 'mebutton',
										text : 'find',
										handler : find
									}],
							columns : [{
										text : 'code',
										flex : 1,
										dataIndex : 'code'
									}, {
										text : 'desc',
										flex : 1,
										dataIndex : 'description'
									}

							]
						})
				var createPageBtn = Ext.widget('mebutton', {
							text : 'create',
							handler : createPage
						})
				var savePageBtn = Ext.widget('mebutton', {
							text : 'save',
							handler : savePage
						})
				var createButtonBtn = Ext.widget('mebutton', {
							text : 'create',
							handler : createButton
						})
				var saveButtonBtn = Ext.widget('mebutton', {
							text : 'save',
							handler : saveButton
						})
				var buttonDetailfieldSet = Ext.widget('mefs', {
							items : [buttonCode, buttonName, buttonType]

						})
				var buttonStore = Ext.create('Ext.data.Store', {
							model : 'Button'
						})
				var buttonGrid = Ext.create('Ext.grid.Panel', {
					        border:false,
							height : 200,
							width : 400,
							store : buttonStore,
							columns : [{
										text : 'code',
										flex : 1,
										dataIndex : 'code'
									}, {
										text : 'name',
										flex : 1,
										dataIndex : 'name'
									}]
						})

				var tabPanel = Ext.widget('tabpanel', {
							bodyStyle : 'background-color:#E9E9E9',
							region : 'center',
							items : [{
										tbar : [{
													xtype : 'tbfill'
												}, createPageBtn, savePageBtn],
										bodyStyle : 'background-color:#E9E9E9',
										title : 'page',
										layout : 'vbox',
										items : [pageCode, pageDesc]
									}, {
										tbar : [{
													xtype : 'tbfill'
												}, createButtonBtn,
												saveButtonBtn],
										bodyStyle : 'background-color:#E9E9E9',
										title : 'button',
										layout : 'hbox',
										items : [buttonGrid, buttonDetailfieldSet]
									}]
						})
				this.items = [grid, tabPanel];
				this.callParent(arguments);

				// click
				grid.on('itemclick', function(view, record, item, index, e,
								eOpts) {
							var obj = record.data;
							Common.setValue(pageCode, obj.code);
							Common.setValue(pageDesc, obj.description);
							buttonStore.loadData(obj.buttons);
						});
				buttonGrid.on('itemclick', function(view, record, item, index, e,
								eOpts) {
							var obj = record.data;
							Common.setValue(buttonCode, obj.code);
							Common.setValue(buttonName, obj.name);
							Common.setValue(buttonType, obj.type);
						});

				function find() {
					var queryObject = new QueryObject('Page', '{}', null)
					AppContext.commandQuery(queryObject, function(contents) {
								//console.log(contents);
								store.loadData(Common.decode(contents));
							});
				}

				function createPage() {
					Common.empty(pageCode);
					Common.empty(pageDesc);

				}
				function createButton() {
					Common.empty(buttonCode);
					Common.empty(buttonName);
					Common.empty(buttonType);
				}

				function initReadOnly(mboolean) {
				}

				function edit() {
				}
				function savePage() {
					var obj = {};
					obj.code = Common.value(pageCode);
					obj.desc = Common.value(pageDesc);
					var postData = new PostData("addPageCommand", Ext
									.encode(obj));
					//console.log(Ext.encode(postData));
					AppContext.command(postData, function(repsText) {
								alert(repsText);
							})

				}
				function saveButton() {
					// private String pageCode;
					// private String btnId;
					// private String btnName;
					// private String rwCode;
					var obj = {};
					obj.pageCode = Common.value(pageCode);
					obj.btnId = Common.value(buttonCode);
					obj.btnName = Common.value(buttonName);
					obj.rwCode = Common.value(buttonType);
					var postData = new PostData("addButtonCommand", Ext
									.encode(obj));
					//console.log(Ext.encode(postData));
					AppContext.command(postData, function(repsText) {
								alert(repsText);
							})

				}

			}
		});
