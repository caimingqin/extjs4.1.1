Ext.define('view.RF', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.RF',
	initComponent : function() {
		var me = this;
		me.border = false;
		me.bodyCls = 'background:#FFFFFF'
		// me.padding = '0 5 0 5';
		me.layout = 'card';
		me.height = 650;// height decide this if layout is card
		// fs1 start
		var insurer = Ext.widget('metext', {
					fieldLabel : '계약자'
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
					title : '의뢰 내용',
					layout : 'hbox',
					items : [insurer, jumin, acceptDate, accidentType]
				});
		// fs1 end

		// fs2 start
		var postDate = Ext.widget('medate', {
					fieldLabel : '민원일자',
					allowBlank : false
				});
		var type = Ext.widget('mecombo', {
					fieldLabel : '확인처구분',
					queryMode : 'local',
					displayField : 'name',
					valueField : 'code',
					store : meenwonTypeStore,
					allowBlank : false
				});
		var contents = Ext.widget('mearea', {
					fieldLabel : '민원내용',
					height : 100,
					width : 800
				})
		var endDate = Ext.widget('medate', {
					fieldLabel : '처리일자',
					allowBlank : false
				});

		var result = Ext.widget('mearea', {
					fieldLabel : '처리내용',
					height : 100,
					width : 600
				})

		var fs2 = Ext.widget('mefs', {
					padding : 0,
					title : '조사내용',
					layout : 'vbox',
					items : [postDate, type, contents, endDate, result]
				});
		// fs2 end
		// part3 start
		var formGridStore = Ext.create('Ext.data.Store', {
					model : 'Meenwon'
				});
		var formGrid = Ext.create('Ext.grid.Panel', {
					height : 140,
					scroll : true,
					padding : 0,
					margin : 0,
					store : formGridStore,
					columns : [{
								text : '민원일자',
								flex : 1,
								dataIndex : 'type',
								renderer : typeRender
							}, {
								text : '민원분류',
								flex : 1,
								dataIndex : 'endDate',
								renderer : endDateRender

							},{
								text : '민원내용',
								flex : 1,
								dataIndex : 'endDate',
								renderer : endDateRender

							},{
								text : '처리일자',
								flex : 1,
								dataIndex : 'endDate',
								renderer : endDateRender

							},{
								text : '처리내용',
								flex : 1,
								dataIndex : 'endDate',
								renderer : endDateRender

							}]
				})
		var part3 = Ext.widget('fieldset', {
					// height : 150,
					title : '조사 내역',
					margin : 0,
					padding : 0,
					items : [formGrid]
				});
		// part3 end
		var saveBtn = Ext.widget('mebutton', {
					text : '저장 (save)',
					handler : save,
					code : 'saveBtn',
					hidden : true
				})
		var backBtn = Ext.widget('mebutton', {
					text : '리스트 ',
					handler : backMainPanel,
					code : 'backBtn',
					hidden : true

				});

		var panel = Ext.create('Ext.panel.Panel', {
					overflowY : 'auto',
					bodyStyle : 'background-color:#E9E9E9',
					tbar : [{
								xtype : 'tbfill'
							}, saveBtn, backBtn],

					items : [fs1, part3, fs2]

				})
		var store = Ext.create('Ext.data.Store', {
					model : 'SurveyRequest'
				});

		var searchBtn = Ext.widget('mebutton', {
					text : '조회 ',
					handler : search,
					code : 'searchBtn',
					hidden : true
				})
		var createBtn = Ext.widget('mebutton', {
					text : '추가 ',
					handler : create,
					code : 'createBtn',
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



		var grid = Ext.create('Ext.grid.Panel', {
					// region : 'north',
					height : 600,
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
					// console.log(Ext.encode(record.data))
					clearMainGridData();
					var obj = record.data;
					currentRequestCode = obj.code;
					Common.setValue(insurer, obj.insurer);
					Common.setValue(acceptDate, new Date(obj.acceptDate));
					Common.setValue(jumin, obj.accident.person.jumin);
					Common.setValue(accidentType, Common.convert(obj.accident.type.name));
					searchMeenwon();
					me.layout.setActiveItem(1);

				});
		visibleBtn();
		function visibleBtn() {
			// var pageBtns=[];
			// pageBtns.push(saveBtn);
			// pageBtns.push(editBtn);
			// pageBtns.push(initBtn);
			// pageBtns.push(addRowBtn);

			var rolePage = Common.getRolePage(rolePages, "RF");
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
				} else if (visibleBtnCode == createBtn.code) {
					Common.visibleBtn(createBtn);
				}
			}
		}
		function clearMainGridData() {
			formGridStore.removeAll();
			Common.empty(insurer);
			Common.empty(acceptDate);
			Common.empty(jumin);
			Common.empty(accidentType);
			Common.empty(postDate);
			Common.empty(endDate);
			Common.empty(type);
			Common.empty(contents);
			Common.empty(result);
		}

		function searchMeenwon() {
			var queryObject = new QueryObject('Meenwon', "{requestCode:"
							+ Common.read(currentRequestCode) + "}", null);
			// console.log("searchMeenwon:" + Ext.encode(queryObject));
			AppContext.commandQuery(queryObject, function(contents) {
						// console.log(contents);
						formGridStore.loadData(Common.decode(contents));
					});
		}
		formGrid.on('itemclick', function(view, record, item, index, e, eOpts) {// 事件监听
					// console.log(Ext.encode(record.data))
					var obj = record.data;
					Common.setValue(postDate, new Date(obj.postDate));
					Common.setValue(endDate, new Date(obj.endDate));
					Common.setValue(type, obj.type.code);
					Common.setValue(contents, obj.contents);
					Common.setValue(result, obj.result);
				});
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

		function create() {
			me.layout.setActiveItem(1);
		}
		function save() {
			// private String requestCode;
			// private Date pdate;
			// private Date edate;
			// private String mtcode;
			// private String contents;
			// private String result;
			if (Common.isNull(postDate)) {
				alert('postdate is null');
				return;
			}
			if (Common.isNull(endDate)) {
				alert('endDate is null');
				return;
			}
			if (Common.isNull(type)) {
				alert('type is null');
				return;
			}
			var obj = {};
			obj.requestCode = currentRequestCode;
			obj.pdate = Common.value(postDate);
			obj.edate = Common.value(endDate);
			obj.mtcode = Common.value(type);
			obj.contents = Common.value(contents);
			obj.result = Common.value(result);
			var postData = new PostData("createMeenwonCommand", Ext.encode(obj));
			// console.log(Ext.encode(postData));
			AppContext.command(postData, function(repsText) {
						alert(repsText);
					})
		}

		function backMainPanel() {
			me.layout.setActiveItem(0);
		}

		function customernameRender(name) {
			// //console.log(customer);
			if (name != null) {
				return name.name;
			}
			return null;
		};
		function accidentRender(accident) {// value: current cell'field value
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

		function acceptDateRender(acceptDate) {
			if (acceptDate) {
				return Ext.util.Format.date(new Date(acceptDate), 'Y-m-d');
			}
			return null;
		}
		function postDateRender(postDate) {
			if (acceptDate) {
				return Ext.util.Format.date(new Date(postDate), 'Y-m-d');
			}
			return null;
		}
		function endDateRender(endDate) {
			if (acceptDate) {
				return Ext.util.Format.date(new Date(endDate), 'Y-m-d');
			}
			return null;
		}

		function typeRender(type) {
			if (type) {
				return type.name;
			}
			return "";
		}

	}

})