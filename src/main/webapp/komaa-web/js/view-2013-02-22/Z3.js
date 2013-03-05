Ext.define('view.Z3', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.Z3',
	initComponent : function() {
		var me = this;
		me.layout = 'border', me.height = 650, me.defaults = {
			split : true
		};
		var a1 = Ext.widget('metext', {
					fieldLabel : '질병코드',
					allowBlank : false
				});
		var a2 = Ext.widget('metext', {
					fieldLabel : '질병명',
					width : 400,
					allowBlank : false

				});
		var a3 = Ext.widget('metext', {
					fieldLabel : '질병명',
					width : 400
				});
		var a4 = Ext.widget('mecombo', {
					value : 'a4',
					fieldLabel : '상별구분'
				});
		var a5 = Ext.widget('meradiogroup', {
					fieldLabel : '성별구분',
					columns : 2,
					vertical : true,
					width : 300,
					items : [{
								boxLabel : '남',
								name : 'gender',
								inputValue : 'male',
								checked : true
							}, {
								boxLabel : '여',
								name : 'gender',
								inputValue : 'female'

							}
					]
				})
		var a6 = Ext.widget('metext', {
					fieldLabel : '비고',
					width : 600
				});

		var store = Ext.create('Ext.data.Store', {
					model : 'DiseaseType'
				})
		var searchBtn = Ext.widget('mebutton', {
					text : '검색',
					handler : find,
					code : 'searchBtn',
					hidden : true
				})
		var grid = Ext.create('Ext.grid.Panel', {
					region : 'north',
					height : 300,
					store : store,
					tbar : [{
								xtype : 'tbfill'
							}, searchBtn],
					columns : [{
								text : 'Code',
								flex : 1,
								dataIndex : 'code'
							}, {
								text : '한글명',
								flex : 1,
								dataIndex : 'kuName'
							}, {
								text : '영문명',
								flex : 1,
								dataIndex : 'enName'
							}
					]
				})
		var createBtn = Ext.widget('mebutton', {
					text : '추가 ',
					handler : createDiseaseType,
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
		var tabPanel = Ext.widget('tabpanel', {
					bodyStyle : 'background-color:#E9E9E9',
					region : 'center',
					tbar : [{
								xtype : 'tbfill'
							}, createBtn, editBtn, saveBtn],
					items : [{
								bodyStyle : 'background-color:#E9E9E9',
								title : 'part1',
								layout : 'vbox',
								padding : 10,
								items : [a1, a2, a3, a5, a6]
							}]
				})
		this.items = [grid, tabPanel];
		this.callParent(arguments);

		// click
		grid.on('itemclick', function(view, record, item, index, e, eOpts) {
					initReadOnly(true);
					var obj = record.data;
					a1.setValue(obj.code);
					a2.setValue(obj.kuName);
					a3.setValue(obj.enName);
					// a5.setValue(obj.gender);
					if (obj.gender == 'male') {
						// console.log(a5.items);
						a5.items.items[0].setValue(true);
					} else if (obj.gender == 'female'){
						a5.items.items[1].setValue(true);
					} else
					{
						a5.items.items[0].setValue(false);
						a5.items.items[1].setValue(false);
					}

					a6.setValue(obj.description);
					
				});
		visibleBtn();
		function visibleBtn() {
			var rolePage = Common.getRolePage(rolePages, "Z3");
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
		function find() {
			var queryObject = new QueryObject("DiseaseType", "{}", null);
			// console.log(Ext.JSON.encode(queryObject));
			AppContext.commandQuery(queryObject, function(contents) {
						// alert(contents);
						store.loadData(Common.decode(contents));
					});

		}

		function createDiseaseType() {
			Common.empty(a1);
			Common.empty(a2);
			Common.empty(a3);
			Common.empty(a5);
			Common.empty(a6);
			initReadOnly(false);

		}

		function initReadOnly(mboolean) {
			Common.setReadOnly(a1, mboolean);
			Common.setReadOnly(a2, mboolean);
			Common.setReadOnly(a3, mboolean);
			Common.setReadOnly(a5, mboolean);
			Common.setReadOnly(a6, mboolean);
		}

		function edit() {
			initReadOnly(false);
		}
		function save() {
			if (Common.isNull(a1)) {
				alert("code is null");
				return;
			}
			if (Common.isNull(a2)) {
				alert("name is null");
				return;
			}
			var a1Value = a1.getValue();
			var a2Value = a2.getValue();
			var a3Value = a3.getValue();
			var a5Value = a5.getValue().gender;
			// console.log(a5.getValue());
			var a6Value = a6.getValue();
			// console.log(a2Value + " " + a3Value + " " + a6Value + " ");
			// console.log(a5Value);
			var obj = {};
			obj.code = a1Value;
			obj.enName = a2Value;
			obj.korName = a3Value;
			obj.gender = a5Value;
			obj.description = a6Value;
			var postData = new PostData("createDTCommand", Ext.JSON.encode(obj));
			// console.log(Ext.JSON.encode(postData));
			AppContext.command(postData, function(reps) {
						alert(reps);
					});

		}

	}
});
