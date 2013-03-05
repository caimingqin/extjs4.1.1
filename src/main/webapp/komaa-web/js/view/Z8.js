Ext.define('view.Z8', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.Z8',
	initComponent : function() {
		var me = this;
		me.layout = 'border';
		me.height = 650;
		me.defaults = {
			split : true
		};

		var rolePagesStore = Ext.create('Ext.data.Store', {
					model : 'RolePages'
				})
		var roleComboForSearch = Ext.create('Ext.form.field.ComboBox', {
					fieldLabel : '사용자롤(roleCode)',
					queryMode : 'local',
					displayField : 'name',
					valueField : 'code',
					store : roleTypeStore

				});
		var grid = Ext.create('Ext.grid.Panel', {
					region : 'north',
					height : 300,
					store : rolePagesStore,
					tbar : [roleComboForSearch, {
								xtype : 'tbfill'
							}, {
								xtype : 'mebutton',
								text : '查询',
								handler : loadRolePages
							}],
					columns : [{
								text : 'rolePageCode',
								flex : 1,
								dataIndex : 'apageCode'
							}, {
								text : 'description',
								flex : 1,
								dataIndex : 'description'
							}]
				});

		var rolePageCode = Ext.widget('metext', {
					fieldLabel : '页面编号'
				})
		var rolePageDesc = Ext.widget('metext', {
					fieldLabel : '页面编号'
				})
		var rigthPanelField = Ext.create('Ext.form.FieldSet', {
					border : 0,
					layout : {
						type : 'vbox'
					},
					items : [rolePageCode, rolePageDesc]
				})
		var rigthPanelGridStore = Ext.create('Ext.data.Store', {
					model : 'Button'
				})
		var rigthPanelGrid = Ext.create('Ext.grid.Panel', {
					// minHeight : 200,
					// maxHeight : 400,
					height : 200,
					width : 400,
					store : rigthPanelGridStore,
					multiSelect : true,
					selModel : {
						selType : 'checkboxmodel',
						mode : 'SIMPLE'
					},
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
		var rigthPanel = Ext.create('Ext.panel.Panel', {
					layout : 'hbox',
					items : [rigthPanelField, rigthPanelGrid]
				})

		// rolePage save fields
		var roleCombo = Ext.create('Ext.form.field.ComboBox', {
					fieldLabel : '사용자롤(roleCode)',
					queryMode : 'local',
					displayField : 'name',
					valueField : 'code',
					store : roleTypeStore

				});

		var pageStore = Ext.create('Ext.data.Store', {
					model : 'Page'
				})

		var pageGrid = Ext.create('Ext.grid.Panel', {
					height : 200,
					width : 400,
					store : pageStore,
					multiSelect : true,
					selModel : {
						selType : 'checkboxmodel',
						mode : 'SIMPLE'
					},
					columns : [{
								text : 'code',
								flex : 1,
								dataIndex : 'code'
							}, {
								text : 'name',
								flex : 1,
								dataIndex : 'description'
							}]
				})
		// rolePage save fields

		var tabs = Ext.create('Ext.tab.Panel', {
					bodyStyle : 'background-color:#E9E9E9',
					region : 'center',
					items : [{
								layout : 'vbox',
								title : '基本信息',
								tbar : [{
											xtype : 'tbfill'
										}, {
											xtype : 'mebutton',
											text : 'create',
											handler : createRolePage
										}, {
											xtype : 'mebutton',
											text : 'save',
											handler : saveRolePage
										}],
								items : [roleCombo, pageGrid]
							}, {
								title : 'bindbutton',
								layout : 'hbox',
								tbar : [{
											xtype : 'tbfill'
										}, {
											xtype : 'mebutton',
											text : '绑定',
											handler : bindBtn
										}],
								items : [rigthPanel]

							}]

				})
		me.items = [grid, tabs];
		me.callParent(arguments);
		var currentBtnCode;
		var rolePagesButtons;
		var checkBoxModel = rigthPanelGrid.getSelectionModel();
		var pageGridCheckBoxModel = pageGrid.getSelectionModel();
		grid.on('itemclick', function(view, record, item, index, e, eOpts) {// 事件监听
					var obj = record.data;
					Common.setValue(roleCombo, obj.role.code);
					// Common.setValue(pageCombo, obj.code);
					Common.setValue(rolePageCode, obj.apageCode)
					Common.setValue(rolePageDesc, obj.description);
					loadRigthPanelGridStore(obj.code);
					rolePagesButtons = obj.buttons;

			});

		rigthPanelGrid.on('itemclick', function(view, record, item, index, e,
				eOpts) {// 事件监听
					var obj = record.data;
					currentBtnCode = obj.code;
				});

		function loadRigthPanelGridStore(pageCode) {// page buttons
			var queryObject = new QueryObject('Page', "{code:"
							+ Common.read(pageCode) + "}", null)
			//console.log(Ext.encode(queryObject));
			AppContext.commandQuery(queryObject, function(contents) {
				//console.log(contents);
				// //console.log(contents[0]);
				rigthPanelGridStore.loadData(contents[0].buttons);// page
				// buttons
				var btns = rigthPanelGridStore.data.items;
				var pageButtons = contents[0].buttons;
				//console.log(pageButtons);
				//console.log(rolePagesButtons);
				//console.log(pageButtons);
				for (var j = 0; j < rolePagesButtons.length; j++) {
					for (var i = 0; i < pageButtons.length; i++) {
						if (pageButtons[i].code == rolePagesButtons[j].code) {
							checkBoxModel.select(i, true);// TODO
						}
					}
				}
			});
		}
		function loadRolePages() {
			var roleCode = Common.value(roleComboForSearch);
			var query;
			if (roleCode) {
				query = "{role.code:" + Common.read(roleCode) + "}";
			} else {
				query = "{}";
			}
			var queryObject = new QueryObject('RolePages', query, null)
			AppContext.commandQuery(queryObject, function(contents) {
						//console.log(contents);
						rolePagesStore.loadData(Common.decode(contents));
					});
		}
		function initPageStore() {
			var queryObject = new QueryObject('Page', '{}', null)
			AppContext.commandQuery(queryObject, function(contents) {
						//console.log(contents);
						pageStore.loadData(Common.decode(contents));

					});
		}
		function createRolePage() {
			Common.empty(roleCombo);
			initPageStore();
		}
		function saveRolePage() {
			var obj = {};
			var selects = pageGridCheckBoxModel.getSelection();
			// //console.log('selects' + selects);
			var pages = [];
			for (var i = 0; i < selects.length; i++) {
				var page = {};
				page.code = selects[i].data.code;
				pages.push(page);
			}
			obj.pages = pages;
			obj.roleCode = Common.value(roleCombo);
			var postData = new PostData("addRolePageCommand", Ext.encode(obj));
			//console.log(Ext.encode(postData));
			AppContext.command(postData, function(repsText) {
						alert(repsText);
					})

		}

		function bindBtn() {
			var obj = {};
			var selects = checkBoxModel.getSelection();
			// //console.log('selects' + selects);
			var arrButton = [];
			for (var i = 0; i < selects.length; i++) {
				var checkBtn = {};
				checkBtn.code = selects[i].data.code;
				checkBtn.name = selects[i].data.name;
				checkBtn.type = selects[i].data.type;
				arrButton.push(checkBtn);
			}
			obj.buttons = arrButton;
			obj.rpageCode = Common.value(rolePageCode);
			var postData = new PostData("addAuthorizationButtonCommand", Ext
							.encode(obj));
			//console.log(Ext.encode(postData));
			AppContext.command(postData, function(repsText) {
						alert(repsText);
					})

		}

	}// initComponent end

});
