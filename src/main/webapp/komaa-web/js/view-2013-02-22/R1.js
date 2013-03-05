Ext.define('view.R1', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.R1',
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

		// part3 start

		var insuranceContractStore = Ext.create('Ext.data.Store', {
					model : 'InsuranceContract'
				});
		var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
					clicksToEdit : 1
				});
		var formGrid = Ext.create('Ext.grid.Panel', {
					height : 400,
					scroll : true,
					padding : 0,
					margin : 0,
					store : insuranceContractStore,
					plugins : [cellEditing],
					columns : [{
								text : '보험종목',
								flex : 4,
								dataIndex : 'type',
								editor : {
									allowBlank : false
								}
							}, {
								text : '증권종목',
								flex : 1,
								dataIndex : 'gztype',
								editor : {
									allowBlank : false
								}
							}, {
								text : '증권번호',
								flex : 1,
								dataIndex : 'number',
								editor : {
									allowBlank : false
								}
							}, {
								text : '보험목적',
								flex : 1,
								dataIndex : 'target',
								editor : {
									allowBlank : false
								}
							}, {
								text : '보험기간',
								flex : 1,
								xtype : 'datecolumn',
								dataIndex : 'from',
								renderer : fromRender,
								format : 'Y-m-d',
								editor : {
									xtype : 'datefield',
									allowBlank : false,
									format : 'Y-m-d'
								}
							}, {
								text : '계약자',
								flex : 1,
								xtype : 'datecolumn',
								dataIndex : 'to',
								format : 'Y-m-d',
								renderer : toRender,
								// renderer :
								// Ext.util.Format.date('Y-m-d'),
								editor : {
									xtype : 'datefield',
									allowBlank : false,
									format : 'Y-m-d'
								}
							}, {
								text : '주민번호',
								flex : 1,
								dataIndex : 'jumin',
								editor : {
									allowBlank : false
								}
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
		var addRowBtn = Ext.widget('mebutton', {
					text : '계약 내용추가 ',
					handler : addRowToFormGrid,
					code : 'addRowBtn',
					hidden : true
				})

		var panel = Ext.create('Ext.panel.Panel', {
					overflowY : 'auto',
					bodyStyle : 'background-color:#E9E9E9',
					tbar : [{
						xtype : 'tbfill'
							}, addRowBtn, saveBtn, backBtn],

					items : [fs1, part3]

				})
		var store = Ext.create('Ext.data.Store', {
					model : 'SurveyRequest'
				});
		var searchBtn = Ext.widget('mebutton', {
					text : '조회',
					handler : search,
					code : 'searchBtn',
					hidden : true
				})
		var createBtn = Ext.widget('mebutton', {
					xtype : 'mebutton',
					text : '추가',
					handler : create,
					code : 'createBtn',
					hidden : true
				})
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


		/**
		var grid = Ext.create('Ext.grid.Panel', {
			// region : 'north',
			height : 650,
			store : store,
			tbar : [date1, date2, manageType, customerCdn, searchBtn, createBtn],
			//tbar : [date1, date2, manageType, customerCdn, searchBtn],
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
						renderer : acceptDateRender
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
					tbar : [date1, date2, manageType, customerCdn,	likeCnd,likeComboCnd, searchBtn, createBtn],
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
					if (obj.accident.person.addedContract) {
						insuranceContractStore
								.loadData(obj.accident.person.addedContract);
					}

					me.layout.setActiveItem(1);

				});

		visibleBtn();
		function visibleBtn() {
			var rolePage = Common.getRolePage(rolePages, "R1");
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
				} else if (visibleBtnCode == addRowBtn.code) {
					Common.visibleBtn(addRowBtn);
				}
			}
		}
		// 添加 1
		function addRowToFormGrid() {
			cellEditing.cancelEdit();
			var addModel = Ext.create('InsuranceContract', {
						type : '',
						gztype : '',
						number : '',
						target : '',
						from : '',
						to : '',
						jumin : ''
					});
			var count = insuranceContractStore.getCount();
			insuranceContractStore.insert(count, addModel);
			cellEditing.startEdit(0, 0);
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
			var obj = {};
			var contracts = [];
			var arr = insuranceContractStore.data.items;
			for (var i = 0; i < arr.length; i++) {
				var data = arr[i].data;
				// data 注意
				var contract = {};
				contract.type = arr[i].data.type;
				contract.gztype = arr[i].data.gztype;
				contract.number = arr[i].data.number;
				contract.target = arr[i].data.target;
				contract.from = arr[i].data.from;
				contract.to = arr[i].data.to;
				contract.jumin = arr[i].data.jumin;
				contracts.push(contract);
			}
			// console.log(Ext.encode(contracts));
			obj.ics = contracts;
			obj.requestCode = currentRequestCode;
			var postData = new PostData("addInsuranceContractCommand", Ext
							.encode(obj));
			// console.log(Ext.encode(postData));
			AppContext.command(postData, function(reps) {
						alert(reps);
					})
		}

		function backMainPanel() {
			me.layout.setActiveItem(0);
		}

		function editBtnHandler() {
		}
		function readOnly(mboolean) {

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
		function acceptDateRender(acceptDate) {
			if (acceptDate) {
				return Ext.util.Format.date(new Date(acceptDate), 'Y-m-d');
			}
			return "0000-00-00";
		}
		function fromRender(from) {
			if (from) {
				return Ext.util.Format.date(new Date(from), 'Y-m-d');
			}
			return from;
		}
		function toRender(to) {
			if (to) {
				return Ext.util.Format.date(new Date(to), 'Y-m-d');
			}
			return to;
		}
	}

});