Ext.define('view.R2', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.R2',
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
					title : '위임사건 내용',
					layout : 'hbox',
					items : [insurer, jumin, acceptDate, accidentType]
				});
		// fs1 end

		// fs2 start
		// user
		var user = Ext.widget('metext', {
					fieldLabel : '조사자'
				});
		// var date1=Ext.widget('medate',{fieldLabel:'date1'});
		// var date2=Ext.widget('medate',{fieldLabel:'date2'});
		var from = Ext.widget('medate', {});
		var to = Ext.widget('medate', {});
		var tag = Ext.widget('medisplay', {
					value : '~'
				});
		var dateRange = Ext.widget('mefc', {
					fieldLabel : '날짜',
					padding : 0,
					layout : 'hbox',
					items : [from, tag, to]
				})
		// typeCode
		var typeCode = Ext.widget('mecombo', {
					fieldLabel : '진행항목',
					queryMode : 'local',
					displayField : 'name',
					valueField : 'code',
					store : handleResultTypeStore
				});
		var comb2 = Ext.widget('mecombo', {
					fieldLabel : 'comb2'
				});
		// locationCode
		var locationCode = Ext.widget('mecombo', {
					fieldLabel : '확인처구분',
					queryMode : 'local',
					displayField : 'name',
					valueField : 'code',
					store : handleLocationStore
				});
		var comb4 = Ext.widget('mecombo', {
					fieldLabel : 'comb3'
				});

		var locationDetail = Ext.widget('metext', {
					fieldLabel : '항목(기관명)'
				});
		var conents = Ext.widget('mearea', {
					fieldLabel : '처리내용',
					height : 100,
					width : 600
				})
		var measure = Ext.widget('metext', {
					fieldLabel : '담당자조치',
					width : 600
				});
		//var description = Ext.widget('metext', {
		//			fieldLabel : '지연사유',
		//			width : 600
		//		});
		var fs2 = Ext.widget('mefs', {
					padding : 0,
					title : '조사 내용',
					items : [user, dateRange, typeCode, locationCode,
							locationDetail, conents, measure]
				});
		// fs2 end
		// part3 start
		var formGridStore = Ext.create('Ext.data.Store', {
					model : 'HandleCourse'
				});
		var formGrid = Ext.create('Ext.grid.Panel', {
					height : 140,
					scroll : true,
					padding : 0,
					margin : 0,
					store : formGridStore,
					columns : [{
								text : '날짜',
								flex : 1,
								dataIndex : 'duration',
								renderer : durationRender
							}, {
								text : '진행항목',
								flex : 1,
								dataIndex : 'handleType',
								renderer : handleTypeRender
							}, {
								text : '항목(기관명)',
								flex : 1,
								dataIndex : 'locationDetail'
							}, {
								text : '지연사유',
								flex : 1,
								dataIndex : 'target'
							}]
				})
		var part3 = Ext.widget('fieldset', {
					// height : 150,
					title : '계약사항',
					margin : 0,
					padding : 0,
					items : [formGrid]
				});
		// part3 end
		var saveBtn = Ext.widget('mebutton', {
					text : '저장 ',
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
		// var editBtn = Ext.widget('mebutton', {
		// text : 'edit ',
		// handler : editBtnHandler
		//							
		// })

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
					text : '추가',
					handler : create,
					code : 'createBtn',
					hidden : true
				})
		var date1 = Ext.widget('medate', {
					width : 100
				});
		var date2 = Ext.widget('medate', {
					width : 100
				});
		// condition start
		var date1 = Ext.widget('medate', {
					fieldLabel : '접수일자',
					labelWidth : 70,
					width : 200,
					value : new Date()
				});
		var date2 = Ext.widget('medate', {
					fieldLabel : 'to',
					labelWidth : 20,
					width : 140,
					value : new Date()
				});
		var manageType = Ext.widget('mecombo', {
					labelWidth : 40,
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
			       width:120,
					fieldLabel : '항목'
				})
		var likeComboCnd = Ext.widget('mecombo', {
					labelWidth : 40,
					 width:120,
					displayField : 'name',
					valueField : 'code',
					queryMode : 'local',
					store : likeComboStore

				})
				
		// condition end

		/*
		var grid = Ext.create('Ext.grid.Panel', {
			// region : 'north',
			height : 650,
			store : store,
			tbar : [date1, date2, manageType, customerCdn, searchBtn, createBtn],
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
					tbar : [date1, date2, manageType, customerCdn, 	likeCnd,likeComboCnd,searchBtn],
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
								if(acc){
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
								  if(obj){
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
					var obj = record.data;
					currentRequestCode = obj.code;
					Common.setValue(insurer, obj.insurer);
					Common.setValue(acceptDate, new Date(obj.acceptDate));
					Common.setValue(jumin, obj.accident.person.jumin);
					Common.setValue(accidentType, obj.accident.type.name);
					Common.setValue(user, obj.user.name);
					formGridStore.loadData(obj.handleCourse);
					me.layout.setActiveItem(1);

				});
		formGrid.on('itemclick', function(view, record, item, index, e, eOpts) {// 事件监听
					// console.log(Ext.encode(record.data))
					var obj = record.data;
					Common.setValue(from, new Date(obj.duration.from));
					Common.setValue(to, new Date(obj.duration.to));
					Common.setValue(typeCode, obj.handleType.code);
					Common.setValue(locationCode, obj.handleLocation.code);
					Common.setValue(locationDetail, obj.locationDetail);
					Common.setValue(conents, obj.contents);
					Common.setValue(measure, obj.measure);
					Common.setValue(description, obj.description);
				});
		visibleBtn();
		function visibleBtn() {
			// var pageBtns=[];
			// pageBtns.push(saveBtn);
			// pageBtns.push(editBtn);
			// pageBtns.push(initBtn);
			// pageBtns.push(addRowBtn);

			var rolePage = Common.getRolePage(rolePages, "R2");
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
		loadCustomerStore();
		function search() {

			var queryObject = new QueryObject('SurveyRequest', buildQuery(),
					null)
			AppContext.commandQuery(queryObject, function(contents) {
						// console.log(contents);
						store.loadData(Common.decode(contents));
					});

		}

		function buildQuery() {
			if (Common.isNull(date1) || Common.isNull(date2)) {
				alert("please select date!");
				return;
			}
			var query = "{ acceptDate:{'$gte':" + Common.value(date1).getTime()
					+ ",'$lte':" + Common.value(date2).getTime() + "} "
					+ ",requestStatus:'complete'";

			var mngCode = Common.value(manageType);
			var customerCode = Common.value(customerCdn);
			if (mngCode) {
				query += ",managementType.code:" + Common.read(mngCode);
			}
			if (customerCode) {
				query += ",customer.code:" + Common.read(customerCode);
			}
			var likeValue=Common.value(likeCnd);
			var likeComboxValue=Common.value(likeComboCnd);
			if(likeComboxValue&&likeValue){
			query += ","+likeComboxValue+":" + Common.read(likeValue);
			}	
			query += "}";
			console.log(query);
			return query;
		}
		function create() {
			me.layout.setActiveItem(1);
		}
		function save() {
			// private String typeCode;
			// private String locationCode;
			// private Date from;
			// private Date to;
			// private String contents;
			// private String measure;
			// private String requestCode;
			// private String locationDetail;
			var obj = {};
			obj.typeCode = Common.value(typeCode);
			obj.locationCode = Common.value(locationCode);
			obj.from = Common.value(from);
			obj.to = Common.value(to);
			obj.contents = Common.value(conents);
			obj.measure = Common.value(measure);
			obj.description = Common.value(description);
			obj.requestCode = currentRequestCode;
			obj.locationDetail = Common.value(locationDetail);
			var postData = new PostData("addAddHandleCourseCommand", Ext
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
		function readOnly(mboolean) {
			// Common.setReadOnly(text1, mboolean);
			// Common.setReadOnly(text2, mboolean);
			// Common.setReadOnly(text3, mboolean);
			// Common.setReadOnly(text4, mboolean);
			//
			// Common.setReadOnly(date1, mboolean);
			// Common.setReadOnly(date2, mboolean);
			//
			// Common.setReadOnly(ext1, mboolean);
			// Common.setReadOnly(ext2, mboolean);
			// Common.setReadOnly(areaText1, mboolean);
			// Common.setReadOnly(comb1, mboolean);
			// Common.setReadOnly(comb2, mboolean);
			// Common.setReadOnly(comb3, mboolean);
			// Common.setReadOnly(comb4, mboolean);

		}

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