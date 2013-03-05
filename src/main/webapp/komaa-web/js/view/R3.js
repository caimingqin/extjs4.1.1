Ext.define('view.R3', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.R3',
	initComponent : function() {
		var me = this;
		me.border = false;
		me.bodyCls = 'background:#FFFFFF'
		// me.padding = '0 5 0 5';
		me.layout = 'card';
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
					fieldLabel : '접수일자'
				});
		var accidentType = Ext.widget('metext', {
					fieldLabel : '사고유형'
				});

		var fs1 = Ext.widget('mefs', {
					title : '위임 내용',
					layout : 'hbox',
					items : [insurer, jumin, acceptDate, accidentType]
				});
		// fs1 end
		// fs2 start

		var rcode = Ext.widget('mecombo', {
					fieldLabel : '사정결과',
					queryMode : 'local',
					displayField : 'name',
					valueField : 'code',
					store : resultsInvestigationStore
				});
		var amountRequested = Ext.widget('metext', {
					fieldLabel : '청구/추산액'
				});
		var amountConfirm = Ext.widget('metext', {
					fieldLabel : '확정/지급액'
				});
		var depAmount = Ext.widget('metext', {
					fieldLabel : '삭감금액'
				});

		var fc1 = Ext.widget('mefc', {
					title : 'fs2',
					layout : 'hbox',
					items : [rcode, amountRequested, amountConfirm, depAmount]
				});
		var reportDate = Ext.widget('medate', {
					fieldLabel : '보고일자'
				});
		var moral = Ext.widget('mecombo', {
					fieldLabel : '모럴여부',
					queryMode : 'local',
					displayField : 'name',
					valueField : 'code',
					store : moralStore
				});
		var dcode = Ext.widget('mecombo', {
					fieldLabel : '면책/삭감근거',
					queryMode : 'local',
					displayField : 'name',
					valueField : 'code',
					store : dAccordingStore

				});
		var lacode = Ext.widget('mecombo', {
					fieldLabel : '해지근거',
					queryMode : 'local',
					displayField : 'name',
					valueField : 'code',
					store : liftedAccordingStore
				});
		var fc2 = Ext.widget('mefc', {
					title : '손해사정결과',
					layout : 'hbox',
					items : [reportDate, moral, dcode, lacode]
				});
		var fs2 = Ext.widget('mefs', {
					title : '손해사정결과',
					layout : 'vbox',
					items : [fc1, fc2]
				});
		// fs2 end
		var saveBtn = Ext.widget('mebutton', {
					text : '저장 ',
					handler : save,
					code : 'saveBtn',
					hidden : true
				})
		var backBtn = Ext.widget('mebutton', {
					text : '뒤로 ',
					handler : backMainPanel,
					code : 'backBtn',
					hidden : true
				});
		// var editorPanel = Ext.create('Ext.panel.Panel', {
		// tbar : [{
		// xtype : 'tbfill'
		// }, {
		// xtype : 'mebutton',
		// text : 'getAllHtml',
		// handler : getAllHtml
		// }],
		// overflowY : true,
		// width : 500,
		// height : 300,
		// html : '<div><script id="editor" type="text/plain"
		// style="width:400px;" ></script></div>'
		// });
		var panel = Ext.create('Ext.panel.Panel', {
			overflowY : 'auto',
			bodyStyle : 'background-color:#E9E9E9',
			padding : 0,
			width : 500,
			height : 300,
			html : '<div><script  id="editor" type="text/plain"></script></div>',
			tbar : [{
						xtype : 'tbfill'
					}, saveBtn, backBtn],

			items : [fs1, fs2]

		});

		var store = Ext.create('Ext.data.Store', {
					model : 'SurveyRequest'
				});
		var searchBtn = Ext.widget('mebutton', {
					text : '조회 ',
					handler : search,
					code : 'searchBtn',
					hidden : true
				})

		// condition start
		var date1 = Ext.widget('medate', {
					fieldLabel : '접수일자',
					labelWidth : 55,
					width : 160
					
				});
		var date2 = Ext.widget('medate', {
					fieldLabel : 'to',
					labelWidth : 20,
					width : 140
					
				});
		var manageType = Ext.widget('mecombo', {
					labelWidth : 40,
                                        width : 110,
					fieldLabel : '종목',
					xtype : 'mecombo',
					queryMode : 'local',
					displayField : 'name',
					valueField : 'code',
					store : managementTypeStore,
					allowBlank : false
				})
		var customerCdn = Ext.widget('mecombo', {
					labelWidth : 45,
					fieldLabel : '보험사',
					displayField : 'name',
					valueField : 'code',
					queryMode : 'local',
					store : customerStore
				});

		var likeCnd = Ext.widget('metext', {
			       labelWidth : 40,
			       width:120
					
				})
		var likeComboCnd = Ext.widget('mecombo', {
					labelWidth : 35,
					 width:130,
					fieldLabel : '항목',
					displayField : 'name',
					valueField : 'code',
					queryMode : 'local',
					store : likeComboStore
				})
		// condition end


		/** start Grid

		var grid = Ext.create('Ext.grid.Panel', {
					// region : 'north',
					height : 650,
					store : store,
					tbar : [date1, date2, manageType, customerCdn, searchBtn],
					columns : [{
								text : '보고서번호 ',
								flex : 1,
								dataIndex : 'documentNumber'
							}, {
								text : '보험사 ',
								flex : 1,
								dataIndex : 'customer',
								renderer : Common.cusRender
								// TODO
						}	, {
								text : '접수일자 ',
								flex : 1,
								dataIndex : 'acceptDate',
								renderer : Common.yyyy_MM_dd
							}, {
								text : '보험계약자 ',
								flex : 1,
								dataIndex : 'accident',
								renderer : accidentRender
							}, {
								text : '분류 ',
								flex : 1,
								dataIndex : 'managementType',
								renderer : managementTypeRender
							}]
				})
 */


// add By woonill on 2013.02.17

		var grid = Ext.create('Ext.grid.Panel', {
					// region : 'north',
					height : 650,
					tbar : [date1, date2, manageType, customerCdn, likeComboCnd, likeCnd, searchBtn],
					store : store,
					columns : [{
								text : '보고서 번호 ',
								flex : 1,
								dataIndex : 'documentNumber'
							},{
								text : '등록일자 ',
								flex : 1,
								dataIndex : 'created',
								renderer : Common.yyyy_MM_dd
							}, {
								text : '위임일자 ',
								flex : 1,
								dataIndex : 'acceptDate',
								renderer : Common.yyyy_MM_dd
							}, {
								text : '상태(접수/진행과정/종결) ',
								flex : 1,
								dataIndex : 'requestStatus',
								renderer:Common.statusName
							}, {
								text : '보험사 ',
								flex : 1,
								dataIndex : 'customer',
								renderer : function(obj) {
									if (obj) {
										return obj.name.name
									}
									return null
								}
						}	, {
								text : '피보험자 ',
								flex : 1,
								dataIndex : 'insurer'
							}, {
								text : '계약자 ',
								flex : 1,
								dataIndex : 'contracts',
								renderer : function(contracts){
								if(contracts){
								return contracts[0].number;
								}
								return null;
								}
							}, {
								text : '팀/조사자 ',
								flex : 1,
								dataIndex : 'user',
								renderer : function(user){
								if(user){
								
									return user.name;
								}
								return null;
								}
							}, {
								text : '분류(질병/상해) ',
								flex : 1,
								dataIndex : 'accident',
								renderer : function(acc){
								if(acc){if( acc.type.name=="normal"){
								  return "--"
								}
								return acc.type.name;
								
								}
								return null;
								}
							}, {
								text : '사고일자',
								flex : 1,
								dataIndex : 'accident',
								renderer : function(acc){
								if(acc){
								return Common.yyyy_MM_dd(acc.theDate);
								
								}
								return null;
								}
							}, {
								text : '조사지역 ',
								flex : 1,
								dataIndex : 'user',
								renderer : function(user){
								if(user&&user.department&&user.department.city){
									
								return user.department.city.name;
								}
								return null;
								}
							}, {
								text : '보험종목 ',
								flex : 1,
								dataIndex : 'insuranceCategory',
								renderer : function(obj){
								  if(obj){	if(obj.name=="normal"){
								return "--"
								}
								  return obj.name;
								  }
								  return null;
								}
							}]
				})

// end Grid 



		me.items = [grid, panel]
		me.callParent(arguments);
		var currentRequestCode;

		grid.on('itemdblclick', function(view, record, item, index, e, eOpts) {// 事件监听
					clear();
					// console.log(Ext.encode(record.data))
					var obj = record.data;
					currentRequestCode = obj.code;
					Common.setValue(insurer, obj.insurer);
					Common.setValue(acceptDate, new Date(obj.acceptDate));
					Common.setValue(jumin, obj.accident.person.jumin);
					Common.setValue(accidentType, Common.convert(obj.accident.type.name));
					if (obj.result) {

						Common.setValue(amountRequested,
								obj.result.amountRequested);
						Common
								.setValue(amountConfirm,
										obj.result.amountConfirm);
						Common.setValue(reportDate,
								new Date(obj.result.reportDate));
						Common.setValue(moral, obj.result.moral);
						Common
								.setValue(lacode,
										obj.result.liftedAccording.code);
						Common.setValue(dcode,
								obj.result.depreciate.reason.code);
						Common
								.setValue(depAmount,
										obj.result.depreciate.amount);
						UE.getEditor('editor').setContent(obj.result.contents);
					}
					me.layout.setActiveItem(1);
				});
		visibleBtn();
		function visibleBtn() {
			var rolePage = Common.getRolePage(rolePages, "R3");
			// console.log(rolePage);
			var btns = rolePage.buttons;
			for (var i = 0; i < btns.length; i++) {
				var visibleBtnCode = btns[i].code;
				if (visibleBtnCode == saveBtn.code) {
					// console.log(visibleBtnCode == saveBtn.code);
					Common.visibleBtn(saveBtn);
				} else if (visibleBtnCode == searchBtn.code) {
					Common.visibleBtn(searchBtn);
				} else if (visibleBtnCode == backBtn.code) {
					Common.visibleBtn(backBtn);
				}
			}
		}
		function clear() {
			Common.empty(insurer);
			Common.empty(acceptDate);
			Common.empty(jumin);
			Common.empty(accidentType);
			Common.empty(rcode);
			Common.empty(amountRequested);
			Common.empty(amountConfirm);
			Common.empty(reportDate);
			Common.empty(moral);
			Common.empty(lacode);
			Common.empty(dcode);
			Common.empty(depAmount);
			UE.getEditor('editor').setContent("");
		}
		loadCustomerStore();
		 // search start
		function search() {
			Ext.MessageBox.show({
						title : '잠시만 기다리십시요.',
						msg : '데이터를 가져오는 중입니다...',
						wait : true,
						waitConfig : {
							interval : 200
						}
					});
			var dt = new Date();
			var date1Time;
			var date2Time;
			if (Common.isNull(date1) && Common.isNull(date2)) {
				var query = "{requestStatus:'complete' ";
				var result = buildQuery(query, function() {
								return true;
						});
				console.log(result);
				var queryObject = new QueryObject('SurveyRequest', result,
						null, 100)
				AppContext.commandQuery(queryObject, function(contents) {
						    store.removeAll();
						    if(contents!=null){
							store.loadData(Common.decode(contents));
						    }
							Ext.MessageBox.hide();
						});
			} else {

				if (Common.isNull(date2)) {
					date1Time = Common.value(date1).getTime();
					date2Time = dt.getTime();
				} else {
					date1Time = Common.value(date1).getTime();
					date2Time = Common.value(date2).getTime();
				}

				var query = "{ acceptDate:{'$gte':" + date1Time + ",'$lte':"
						+ date2Time + "} "+ ",requestStatus:'complete'";;

				var result = buildQuery(query, function() {
							return true
						});
				console.log(result);
				var queryObject = new QueryObject('SurveyRequest', result, null);
				AppContext.commandQuery(queryObject, function(contents) {
							store.removeAll();
							if (null != contents) {
								store.loadData(Common.decode(contents));
							}
							Ext.MessageBox.hide();
						});
			}
		}

		function buildQuery(query, callbackFunc) {
			var mngCode = Common.value(manageType);
			var customerCode = Common.value(customerCdn);
			var cb = function(field, value) {
				var rstr = callbackFunc() ? "," : "";
				return rstr + "'" + field + "'" + ":" + value;
			};
			if (Common.notnull(mngCode)) {
				query += cb("managementType.code", Common.read(mngCode));

			}
			if (Common.notnull(customerCode)) {
				query += cb("customer.code", Common.read(customerCode));
			}
			var likeValue = Common.value(likeCnd);
			var likeComboxValue = Common.value(likeComboCnd);
			if (likeComboxValue && likeValue) {
				query += cb(likeComboxValue, Common.read(likeValue));

			}
			query += "}";
			return query;
		}
		//search end
		function save() {

			// private String rcode;
			// private BigDecimal amountRequested;
			// private BigDecimal amountConfirm;
			// private Date reportDate;
			// private BigDecimal depAmount;
			// private String dcode;
			// private boolean moral;
			// private String lacode;
			// private String contents;

			var obj = {};
			obj.requestCode = currentRequestCode;
			obj.rcode = Common.value(rcode);
			obj.amountRequested = Common.value(amountRequested);
			obj.amountConfirm = Common.value(amountConfirm);
			obj.reportDate = Common.value(reportDate);
			obj.depAmount = Common.value(depAmount);
			obj.dcode = Common.value(dcode);
			obj.moral = Common.value(moral);
			obj.lacode = Common.value(lacode);
			obj.contents = getAllHtml();
			var postData = new PostData("addHandleResultCommand", Ext
							.encode(obj));
			// console.log(Ext.encode(postData));
			AppContext.command(postData, function(repsText) {
						alert(repsText);
					})
		}

		function backMainPanel() {
			me.layout.setActiveItem(0);
		}

		function editBtnHandler() {
		}
		// editor
		function init() {
			UE.getEditor('editor');
		}
		function getAllHtml() {
			return UE.getEditor('editor').getAllHtml()
		}
		init();
		// editor
		function customernameRender(name) {
			// //console.log(customer);
			if (name != null) {
				return name.name;
			}
			return null;
		};
		function accidentRender(accident) {// value: current cell'field
			// value
			// console.log(accident);
			// console.log(accident.person.sname);
			if (accident != null) {
				return accident.person.sname
			}
			return null;
		};
		function managementTypeRender(managementType) {
			if (managementType != null) {
				return managementType.name;
			}
			return null;
		};

		function handleTypeRender(handleType) {
			if (handleType) {
				return handleType.name;
			}
			return null;
		}

		function durationRender(duration) {
			if (duration) {
				return duration.from + "~" + duration.to;
			}
			return null;
		}

	}

});