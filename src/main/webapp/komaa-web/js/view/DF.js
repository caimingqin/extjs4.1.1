Ext.define('view.DF', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.DF',
	initComponent : function() {
		var me = this;
		me.border = false;
		me.bodyCls = 'background:#FFFFFF'
		// me.padding = '0 5 0 5';
		me.layout = 'border';
		me.defaults = {
			split : true
		};
		me.height = 650;// height decide this if layout is card

		// fs1 start
		var insurer = Ext.widget('metext', {
					fieldLabel : '피급여자'
				});
		// jumin
		var jumin = Ext.widget('metext', {
					fieldLabel : '주민번호'
				});
		// acceptDate
		var acceptDate = Ext.widget('medate', {
					fieldLabel : '접수일자',
					readOnly : true
				});
		var accidentType = Ext.widget('metext', {
					fieldLabel : '사고유형'
				});

		var fs1 = Ext.widget('mefs', {
					layout : 'hbox',
					padding : 0,
					margin : '5 0 0 0',
					border : false,
					items : [insurer, jumin, acceptDate, accidentType]
				});
		// fs1 end

		// fs2
		var invoiceType = Ext.widget('mecombo', {
					fieldLabel : '확인처구분',
					queryMode : 'local',
					displayField : 'name',
					valueField : 'code',
					store : invoiceTypeStore
				});
		var payType = Ext.widget('mecombo', {
					fieldLabel : '확인처구분',
					queryMode : 'local',
					displayField : 'name',
					valueField : 'code',
					store : payTypeStore
				});
		var postDate = Ext.widget('medate', {
					fieldLabel : 'postDate'
				});

		var unitPrice = Ext.widget('metext', {
					fieldLabel : '단가'
				});
		// acceptDate

		var quantity = Ext.widget('metext', {
					fieldLabel : '수량'
				});
		var amount = Ext.widget('metext', {
					fieldLabel : '금액',
					readOnly : true
				});
		var description = Ext.widget('metext', {
					fieldLabel : 'description',
					width : 600
				});

		var fs2 = Ext.widget('mefs', {
					layout : 'vbox',
					padding : 0,
					margin : 0,
					border : false,
					items : [invoiceType, payType, postDate, unitPrice,
							quantity, amount, description]
				});
		// fs1 end
		var formGridStore = Ext.create('Ext.data.Store', {
					model : 'Invoice'

				});
		var formGrid = Ext.create('Ext.grid.Panel', {
					height : 220,
					scroll : true,
					padding : 0,
					margin : 0,
					store : formGridStore,
					columns : [{
								text : '코드',
								flex : 1,
								dataIndex : 'code'
							}, {
								text : '보험종목',
								flex : 1,
								dataIndex : 'type'
							}, {
								text : '단가',
								flex : 1,
								dataIndex : 'unitPrice'
							}, {
								text : '수량',
								flex : 1,
								dataIndex : 'quantity'
							}, {
								text : '금액',
								flex : 1,
								dataIndex : 'amount'
							}, {
								text : '지출구분',
								flex : 1,
								dataIndex : 'payType'
							}]
				})
		// part end
		var saveBtn = Ext.widget('mebutton', {
					text : '저장 (save)',
					handler : save,
					code : 'saveBtn',
					hidden : true
				})

		var tabPanel = Ext.create('Ext.tab.Panel', {
					region : 'center',
					// bodyStyle : 'background-color:#E9E9E9',
					items : [{
								title : 'save',
								tbar : [{
											xtype : 'tbfill'
										}, saveBtn],
								bodyStyle : 'background-color:#E9E9E9',
								items : [fs1, fs2]
							}, {
								title : 'formGrid',
								bodyStyle : 'background-color:#E9E9E9',
								items : [formGrid]
							}]

				})
		var store = Ext.create('Ext.data.Store', {
					model : 'SurveyRequest'
				});
		var searchBtn = Ext.widget('mebutton', {
					text : '조회(search) ',
					handler : search,
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
								text : '보고서번호 ',
								flex : 1,
								dataIndex : 'postDate'
							}, {
								text : '보고서번호',
								flex : 1,
								dataIndex : 'customer',
								renderer : function(obj) {
									if (obj) {
										return obj.name.name;
									}
								}
							}, {

								text : '보고서번호',
								flex : 1,
								dataIndex : 'insurer'
							}, {
								text : '보험사',
								flex : 1,
								dataIndex : 'department',
								renderer : function(obj) {
									if (obj) {
										return obj.name.name;
									}
								}
							}, {
								text : '접수일자',
								flex : 1,
								dataIndex : 'user',
								renderer : function(obj) {
									if (obj) {
										return obj.name.name;
									}
								}
							}, {
								text : '보험계약자 ',
								flex : 1,
								dataIndex : 'requestStatus'
							}, {
								text : '분류(',
								flex : 1,
								dataIndex : 'accident',
								renderer : function(obj) {
									if (obj) {
										return obj.number;
									}
								}
							}]
				})

		me.items = [grid, tabPanel]
		me.callParent(arguments);
		var currentRequestCode;
		grid.on('itemclick', function(view, record, item, index, e, eOpts) {// 事件监听
					//console.log(Ext.encode(record.data))
					formGridStore.removeAll();
					var obj = record.data;
					currentRequestCode = obj.code;
					Common.setValue(insurer, obj.insurer);
					Common.setValue(acceptDate, new Date(obj.acceptDate));
					Common.setValue(jumin, obj.accident.person.jumin);
					Common.setValue(accidentType, obj.accident.type.name);
					searchInvoice(currentRequestCode);

				});

		visibleBtn();
		function visibleBtn() {
			var rolePage = Common.getRolePage(rolePages, "R6");
			//console.log(rolePage);
			var btns = rolePage.buttons;
			for (var i = 0; i < btns.length; i++) {
				var visibleBtnCode = btns[i].code;
				if (visibleBtnCode == saveBtn.code) {
					//console.log(visibleBtnCode == saveBtn.code);
					Common.visibleBtn(saveBtn);
				}else if (visibleBtnCode == searchBtn.code) {
					//console.log(visibleBtnCode == saveBtn.code);
					Common.visibleBtn(searchBtn);
				}
			}
		}

		function searchInvoice(currentRequestCode) {
			var queryObject = new QueryObject('Invoice', "{requestCode:"
							+ Common.read(currentRequestCode) + "}", null)
			AppContext.commandQuery(queryObject, function(contents) {
						//console.log(contents);
						formGridStore.loadData(Common.decode(contents));
					});
		}

		function search() {
			var queryObject = new QueryObject('SurveyRequest', '{}', null)
			AppContext.commandQuery(queryObject, function(contents) {
						store.loadData(Common.decode(contents));
					});
		}
		function clearPostData() {
			Common.empty(invoiceType);
			Common.empty(postDate);
			Common.empty(unitPrice);
			Common.empty(quantity);
			Common.empty(description);
			Common.empty(payType);
			Common.empty(insurer);
			Common.empty(jumin);
			Common.empty(acceptDate);
			Common.empty(accidentType);
		}
		quantity.on('change', function(view, newValue, oldValue) {
					var price = Common.value(unitPrice);
					Common.setValue(amount, newValue * price);
				});
		unitPrice.on('change', function(view, newValue, oldValue) {
					var qty = Common.value(quantity)
					Common.setValue(amount, qty * newValue);
				});

		function save() {
			var obj = {};
			obj.requestCode = currentRequestCode;
			obj.tcode = Common.value(invoiceType);
			obj.ddate = Common.value(postDate);
			obj.uprice = Common.value(unitPrice);
			obj.quantity = Common.value(quantity);
			obj.description = Common.value(description);
			obj.pcode = Common.value(payType);

			var postData = new PostData("createInvoiceCommand", Ext.encode(obj));
			//console.log(Ext.encode(postData));
			AppContext.command(postData, function(repsText) {
						alert(repsText);
						var obj = Ext.decode(repsText);
						if (obj.statusCode == "200") {
							clearPostData();
						}
					})
		}

	}

});