Ext.define('view.Z5', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.Z5',
	initComponent : function() {
		var me = this;
		this.layout = 'border', this.height = 650, this.defaults = {
			split : true
		};
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
		proxy.extractResponseData = function(response) {
			// console.log(response);
			var repData = Common.decode(response.responseText);
			// console.log(repData);
			var obj = {};
			obj.children = Common.decode(repData.contents);
			// console.log(obj);
			// console.log(Ext.encode(obj));
			return obj;
		};
		var treeStore = Ext.create('Ext.data.TreeStore', {
					model : 'Department',
					autoLoad : true,
					proxy : proxy
				});
		var searchBtn = Ext.widget('mebutton', {
					text : 'find',
					handler : init,
					code : 'searchBtn',
					hidden : true
				})
		var treeGrid = Ext.create('Ext.tree.Panel', {
					tbar : [{
								xtype : 'tbfill'
							}, searchBtn],
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
		// main end
		var a11 = Ext.widget('meradiogroup', {
					fieldLabel : '사용여부',
					columns : 2,
					vertical : true,
					width : 300,
					items : [{
								boxLabel : '사용',
								name : 'a11',
								inputValue : '1'
							}, {
								boxLabel : '사용안함',
								name : 'a11',
								inputValue : '2',
								checked : true
							}

					]
				})
		var detailPanelField = Ext.create('Ext.form.FieldSet', {
					xtype : 'fieldset',
					border : 0,
					layout : {
						type : 'vbox'
					},
					defaultType : 'textfield',
					items : [{
								xtype : 'treepicker',
								fieldLabel : '상위코드',
								padding : '0 10 0 0',
								itemId : 'parentCode',
								displayField : 'name',
								store : deptTreeStore

							}, {
								fieldLabel : '부서코드',
								itemId : 'code',
								readOnly : true,
								allowBlank : false
							}, {
								fieldLabel : '부서명',
								itemId : 'name',
								allowBlank : false
							}, {
								fieldLabel : '부서지역',
								itemId : 'cityType',
								xtype : 'mecombo',
								queryMode : 'local',
								store : cityStore,
								displayField : 'name',
								valueField : 'code',
								allowBlank : false
							}, {
								fieldLabel : '사업분야',
								itemId : 'mngType',
								xtype : 'mecombo',
								store : managementTypeStore,
								queryMode : 'local',
								displayField : 'name',
								valueField : 'code',
								allowBlank : false
							}, {
								fieldLabel : '사업파트',
								itemId : 'handleType',
								xtype : 'mecombo',
								store : handleTypeStore,
								queryMode : 'local',
								displayField : 'name',
								valueField : 'code',
								allowBlank : false
							}, a11]
				});
		var createBtn = Ext.widget('mebutton', {
					text : '추가 ',
					handler : create,
					code : 'createBtn',
					hidden : true
				})
		var editBtn = Ext.widget('mebutton', {
					text : '수정 ',
					handler : edit,
					code : 'editBtn',
					hidden : true
				})
		var saveBtn = Ext.widget('mebutton', {
					text : '저장 ',
					handler : save,
					code : 'saveBtn',
					hidden : true
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
							title : '기본정보',
							tbar : [{
									xtype : 'tbfill'
									}, createBtn, editBtn, saveBtn],
								items : [detailPanelField]
							}]
				})
		// detailPanel end
		this.items = [treeGrid, detailPanel], this.callParent(arguments);

		var parent = detailPanelField.getComponent('parentCode');
		var code = detailPanelField.getComponent('code');
		var name = detailPanelField.getComponent('name');
		var cityType = detailPanelField.getComponent('cityType');
		var handleType = detailPanelField.getComponent('handleType');
		var mngType = detailPanelField.getComponent('mngType');
		// init tree grid
		function init() {
			treeStore.reload(proxy);
			// console.log(treeStore);
			// console.log(treeStore.getRootNode());
		}

		treeGrid.on('itemclick', function(view, record, item, index, e, eOpts) {
					initReadOnly(true);
					var obj = record.data;
					var parentCode = record.parentNode.data.code;
					Common.setValue(parent, parentCode);
					Common.setValue(code, obj.code);
					Common.setValue(name, obj.name);
					Common.setValue(cityType, obj.city.code);
					Common.setValue(handleType, obj.handleType.code);
					Common.setValue(mngType, obj.mngType.code);

				});

		visibleBtn();
		function visibleBtn() {
			var rolePage = Common.getRolePage(rolePages, "Z5");
			// console.log(rolePage);
			var btns = rolePage.buttons;
			for (var i = 0; i < btns.length; i++) {
				var visibleBtnCode = btns[i].code;
				if (visibleBtnCode == saveBtn.code) {
					// console.log(visibleBtnCode == saveBtn.code);
					Common.visibleBtn(saveBtn);
				} else if (visibleBtnCode == searchBtn.code) {
					Common.visibleBtn(searchBtn);
				} else if (visibleBtnCode == createBtn.code) {
					Common.visibleBtn(createBtn);
				} else if (visibleBtnCode == editBtn.code) {
					Common.visibleBtn(editBtn);
				}
			}
		}
		function create() {
			loadDeptTreeStore();
			Common.empty(parent);
			Common.empty(code);
			Common.empty(name);
			cityType.setValue("01");
			handleType.setValue("01");
			mngType.setValue("01");
			initReadOnly(false);
		}

		function initReadOnly(mboolean) {
			Common.setReadOnly(parent, mboolean);
			Common.setReadOnly(code, mboolean);
			Common.setReadOnly(name, mboolean);
			Common.setReadOnly(cityType, mboolean);
			Common.setReadOnly(handleType, mboolean);
			Common.setReadOnly(mngType, mboolean);

		}

		function edit() {
			initReadOnly(false);
		}
		function save() {
			if (Common.isNull(code)) {
				alert("code is null");
				return;
			}
			if (Common.isNull(name)) {
				alert("name is null");
				return;
			}
			if (Common.isNull(cityType)) {
				alert("cityType is null");
				return;
			}
			if (Common.isNull(mngType)) {
				alert("mngType is null");
				return;
			}
			if (Common.isNull(handleType)) {
				alert("handleType is null");
				return;
			}

			var obj = {};
			obj.deptCode = code.getValue();
			obj.deptName = name.getValue();
			obj.parentCode = parent.getValue();
			obj.cityCode = cityType.getValue();
			obj.mngType = mngType.getValue();
			obj.handleType = handleType.getValue();
			var postData = new PostData("addDeptCommand", Ext.JSON.encode(obj));
			// console.log(Ext.JSON.encode(postData));
			AppContext.command(postData, function(reps) {
						alert(reps);
					})

		}

	}// init end

})