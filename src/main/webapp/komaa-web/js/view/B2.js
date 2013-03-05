Ext.define('view.B2', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.B2',
	initComponent : function() {
		var me = this;
		// me.padding = '0 0 0 5';
		me.layout = 'card';
		me.height = 650;
		var managementTypeCombo1 = Ext.widget('mecombo', {
					// width : 100,
					queryMode : 'local',
					displayField : 'name',
					valueField : 'code',
					emptyText : 'select managementType....',
					store : managementTypeStore
				});
		loadCustomerStore();

		var customerCombo1 = Ext.widget('mecombo', {
					// width : 60,
					queryMode : 'local',
					displayField : 'name',
					valueField : 'code',
					emptyText : 'select customer....',
					store : customerStore
				});
		var requsetStatusCombo1 = Ext.widget('mecombo', {
					// width : 60,
					queryMode : 'local',
					displayField : 'name',
					valueField : 'name',
					emptyText : 'select requsetStatus....',
					store : requsetStatusStore
				});

		var acceptDateSearch = Ext.widget('medate', {
					fieldLabel : 'acceptDate'
				});

		var departmenTreeSearch = Ext.create('Ext.ux.TreePicker', {
					store : deptTreeStore,
					displayField : 'name'
				});

		var btn = Ext.widget('mebutton', {
					text : '조회',
					handler : init,
					code : 'searchBtn'
				});

		var store = Ext.create('Ext.data.Store', {
					model : 'SurveyRequest'
				});
		// condition start
		var date1 = Ext.widget('medate', {
			fieldLabel : '접수일자',
			labelWidth : 70,
			width : 200
				// value : new Date()
			});
		var date2 = Ext.widget('medate', {
			fieldLabel : 'to',
			labelWidth : 20,
			width : 140
				// value : new Date()
			});
		var manageType = Ext.widget('mecombo', {
					labelWidth : 40,
					width : 120,
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
		var departmenTreeCdn = Ext.create('Ext.ux.TreePicker', {
					fieldLabel : '부서',
					store : deptTreeStore,
					displayField : 'name'
				});
		var requestStatusCdn = Ext.widget('mecombo', {
					labelWidth : 40,
					width : 120,
					fieldLabel : '상태',
					displayField : 'code',
					valueField : 'code',
					queryMode : 'local',
					store : requestStatusStore
				})

		// var likeCnd = Ext.widget('metext', {
		// labelWidth : 40,
		// width:120,
		// fieldLabel : '항목'
		// })
		// var likeComboCnd = Ext.widget('mecombo', {
		// labelWidth : 40,
		// width:120,
		// displayField : 'name',
		// valueField : 'code',
		// queryMode : 'local',
		// store : likeComboStore
		var likeCnd = Ext.widget('metext', {
					labelWidth : 70,
					width : 120

				})
		var likeComboCnd = Ext.widget('mecombo', {
					labelWidth : 60,
					width : 120,
					fieldLabel : '항목',
					displayField : 'name',
					valueField : 'code',
					queryMode : 'local',
					store : likeComboStore
				})

		// condition end

		// start grid

		/**
		 * var grid = Ext.create('Ext.grid.Panel', { height : 650, tbar :
		 * [date1, date2, manageType, customerCdn, requestStatusCdn, btn], store :
		 * store, columns : [{ text : '보고서번호 ', flex : 1, dataIndex :
		 * 'documentNumber' }, { text : '보험사 ', flex : 1, dataIndex :
		 * 'customer', renderer : Common.cusRender }, { text : '접수일자 ', flex :
		 * 1, dataIndex : 'acceptDate', renderer : Common.yyyy_MM_dd }, { text :
		 * '보험계약자 ', flex : 1, dataIndex : 'accident', renderer : accidentRender }, {
		 * text : '분류 ', flex : 1, dataIndex : 'managementType', renderer :
		 * managementTypeRender }] })
		 */

		var grid = Ext.create('Ext.grid.Panel', {
			// region : 'north',
			height : 650,
			tbar : [date1, date2, manageType, customerCdn, requestStatusCdn,
					likeComboCnd, likeCnd, btn],
			store : store,
			columns : [{
						text : '보고서 번호 ',
						flex : 1,
						dataIndex : 'documentNumber'
					}, {
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
						renderer : Common.statusName
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
					}, {
						text : '피보험자 ',
						flex : 1,
						dataIndex : 'insurer'
					}, {
						text : '계약자 ',
						flex : 1,
						dataIndex : 'contracts',
						renderer : function(contracts) {
							if (contracts) {
								return contracts[0].number;
							}
							return null;
						}
					}, {
						text : '팀/조사자 ',
						flex : 1,
						dataIndex : 'user',
						renderer : function(user) {
							if (user) {

								return user.name;
							}
							return null;
						}
					}, {
						text : '분류(질병/상해) ',
						flex : 1,
						dataIndex : 'accident',
						renderer : function(acc) {
							if (acc) {
								if (acc.type.name == "normal") {
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
						renderer : function(acc) {
							if (acc) {
								return Common.yyyy_MM_dd(acc.theDate);

							}
							return null;
						}
					}, {
						text : '조사지역 ',
						flex : 1,
						dataIndex : 'user',
						renderer : function(user) {
							if (user && user.department && user.department.city) {

								return user.department.city.name;
							}
							return null;
						}
					}, {
						text : '보험종목 ',
						flex : 1,
						dataIndex : 'insuranceCategory',
						renderer : function(obj) {
							if (obj) {
								if (obj.name == "normal") {
									return "--"
								}
								return obj.name;
							}
							return null;
						}
					}]
		})
		// end Grid

		var mtypeCodeParent = Ext.widget('mefc', {
					fieldLabel : '보종',
					layout : 'hbox',
					items : [{
								itemId : 'mtypeCode',
								xtype : 'mecombo',
								queryMode : 'local',
								displayField : 'name',
								valueField : 'code',
								value : '01',
								store : managementTypeStore
							}]
				});

		var acceptDate = Ext.widget('medate', {
					fieldLabel : '위임일자'
				});
		var a3 = Ext.widget('mecombo', {
					hidden : true,
					fieldLabel : '수주부서'
				});
		var a = Ext.widget('fieldset', {
					border : false,
					items : [mtypeCodeParent, acceptDate, a3]
				});

		var b1 = Ext.widget('mefc', {
					layout : 'hbox',
					hidden : true,
					items : [{
								xtype : 'metext',
								fieldLabel : '담당자'
							}, {
								xtype : 'mebutton',
								text : 'click'
							}]
				});
		var documentNumber = Ext.widget('metext', {
					fieldLabel : '문서번호'
				});

		var departmenTree = Ext.create('Ext.ux.TreePicker', {
					store : deptTreeStore,
					displayField : 'name'
				});

		var b3 = Ext.widget('mefc', {
					fieldLabel : '팀배정',
					layout : 'hbox',
					items : [departmenTree]
				})
		var b = Ext.widget('fieldset', {
					border : false,
					items : [b1, documentNumber, b3]
				});

		var customer = Ext.widget('mecombo', {
					fieldLabel : '보험사',
					displayField : 'name',
					valueField : 'code',
					queryMode : 'local',
					store : customerStore
				});

		var accidentNumber = Ext.widget('metext', {
					fieldLabel : '사고/접수No'
				});

		var c = Ext.widget('fieldset', {
					border : false,
					items : [customer, accidentNumber]
				});

		var d1 = Ext.widget('metext', {
					hidden : true,
					fieldLabel : '부서'
				});
		var d = Ext.widget('fieldset', {
					border : false,
					items : [d1]
				})

		var part1 = Ext.widget('fieldset', {
					padding : 0,
					margin : 0,
					title : '일반사항',
					layout : 'hbox',
					items : [a, b, c, d]
				})
		var apersonNameAndapersonJumin = Ext.widget('mefc', {
					layout : 'hbox',
					items : [{
								xtype : 'metext',
								itemId : 'apersonName',
								fieldLabel : '계약자',
								width : 300
							}, {
								margin : '0 0 0 10',
								xtype : 'metext',
								itemId : 'apersonJumin',
								fieldLabel : '주민번호',
								width : 300
							}]
				})

		var insurer = Ext.widget('metext', {
					fieldLabel : '피해보험자',
					width : 300
				})
		var sJumin = Ext.widget('metext', {
					fieldLabel : '주민번호',
					margin : '0 0 0 10',
					width : 300
				})
		var insurerAndsJumin = Ext.widget('mefc', {
					layout : 'hbox',
					items : [insurer, sJumin]
				})
		var apersonMobileAndcsAmount = Ext.widget('mefc', {
					layout : 'hbox',
					items : [{
								xtype : 'metext',
								itemId : 'apersonMobile',
								fieldLabel : '휴대폰',
								width : 300
							}, {
								margin : '0 0 0 10',
								itemId : 'csAmount',
								xtype : 'metext',
								fieldLabel : '추산금액',
								width : 300
							}]
				})

		var apersonSnameAndaccidentAddress = Ext.widget('mefc', {
					layout : 'hbox',
					items : [{
								xtype : 'metext',
								itemId : 'apersonSname',
								fieldLabel : '피해자',
								width : 300
							}, {
								margin : '0 0 0 10',
								xtype : 'metext',
								itemId : 'accidentAddress',
								fieldLabel : '사고지역',
								width : 300
							}]
				})
		var accidentTypeAndaccidentDate = Ext.widget('mefc', {
					layout : 'hbox',
					items : [{
								xtype : 'mecombo',
								itemId : 'accidentType',
								fieldLabel : '사고유형',
								width : 300,
								queryMode : 'local',
								displayField : 'name',
								valueField : 'code',
								value : '00',
								store : accidentTypeStore
							}, {
								margin : '0 0 0 10',
								xtype : 'medate',
								itemId : 'accidentDate',
								fieldLabel : '사고일자',
								width : 300
							}]
				})
		// TODO
		var apersonAddress = Ext.widget('metext', {
					fieldLabel : '주소',
					name : 'address2',
					buttonText : '우편번호',
					width : 600
				});
		var apersonJobAndapersonAge = Ext.widget('mefc', {
					layout : 'hbox',
					items : [{
								itemId : 'apersonJob',
								xtype : 'metext',
								fieldLabel : '직업',
								width : 300
							}, {
								itemId : 'apersonAge',
								margin : '0 0 0 10',
								xtype : 'metext',
								fieldLabel : '나이',
								width : 150
							}, {

								xtype : 'mecheckbox',
								fieldLabel : '모럴건',
								labelWidth : 50,
								width : 70
							}]
				})
		var aa81 = Ext.widget('fieldset', {
					layout : 'hbox',
					padding : 0,
					margin : 0,
					border : false,
					items : [{
								xtype : 'metext',
								width : 150
							}, {

								xtype : 'metext',
								width : 450
							}]
				});
		var aa82 = Ext.widget('fieldset', {
					layout : 'hbox',
					margin : 0,
					padding : 0,
					border : false,
					items : [{
								xtype : 'metext',
								width : 150
							}, {
								xtype : 'metext',
								width : 450
							}]
				});
		var aa83 = Ext.widget('fieldset', {
					layout : 'hbox',
					padding : 0,
					margin : 0,
					border : false,
					items : [{
								xtype : 'metext',
								width : 150
							}, {
								xtype : 'metext',
								width : 450
							}]
				});
		var aa8 = Ext.widget('mefc', {
					fieldLabel : '진단명',
					padding : 0,
					width : 600,
					items : [aa81, aa82, aa83]
				});
		var apersonDescription = Ext.widget('metext', {
					width : 600,
					fieldLabel : '기타사항'
				});
		var aa = Ext.widget('fieldset', {
					padding : 0,
					margin : '0 0 0 10',
					border : false,
					items : [apersonNameAndapersonJumin, insurerAndsJumin,
							apersonMobileAndcsAmount,
							apersonSnameAndaccidentAddress,
							accidentTypeAndaccidentDate, apersonAddress,
							apersonJobAndapersonAge, aa8, apersonDescription]
				})

		var levelAndfeeAndrequestLevelCode = Ext.widget('mefc', {
					layout : 'hbox',
					items : [{
								itemId : 'level',
								xtype : 'mecombo',
								fieldLabel : '보험사등급',
								labelWidth : 50,
								width : 150,
								queryMode : 'local',
								displayField : 'name',
								valueField : 'code',
								value : '00',
								store : insurancePersonLevelStore
							}, {
								itemId : 'fee',
								xtype : 'metext',
								fieldLabel : 'FEE:',
								width : 100,
								labelWidth : 50
							}, {
								itemId : 'requestLevelCode',
								margin : '0 0 0 10',
								xtype : 'mecombo',
								fieldLabel : '당사등급',
								queryMode : 'local',
								displayField : 'name',
								valueField : 'code',
								value : '00',
								store : requsetLevelStore
							}]
				})
		var insuranceCategoryCodeAndcause = Ext.widget('mefc', {
					layout : 'hbox',
					items : [{
								itemId : 'insuranceCategoryCode',
								xtype : 'mecombo',
								fieldLabel : '보험종목구분',
								width : 250,
								queryMode : 'local',
								displayField : 'name',
								valueField : 'code',
								value : '00',
								store : insuranceCategoryStore

							}, {
								itemId : 'cause',
								margin : '0 0 0 10',
								xtype : 'metext',
								fieldLabel : '위뢰사유'
							}]
				})
		var phmallAndreturnRule = Ext.widget('mefc', {
					layout : 'hbox',
					items : [{
								itemId : 'phmall',
								xtype : 'metext',
								fieldLabel : '피해물',
								width : 250
							}, {
								itemId : 'returnRule',
								margin : '0 0 0 10',
								xtype : 'metext',
								fieldLabel : '장애지급률'
							}]
				})

		var accidentContents = Ext.widget('mearea', {
					fieldLabel : '사고내용',
					height : 50,
					width : 500
				});
		var jsContents = Ext.widget('mearea', {
					fieldLabel : '조사 요구사항 및 지시사상',
					height : 50,
					width : 500
				});
		var fileUrlArea = Ext.widget('mearea', {
					fieldLabel : '첨부파일',
					height : 50,
					width : 500
				});

		var bb = Ext.widget('fieldset', {
					padding : 0,
					margin : '0 0 0 10',
					border : false,
					items : [levelAndfeeAndrequestLevelCode,
							insuranceCategoryCodeAndcause, phmallAndreturnRule,
							accidentContents, jsContents, fileUrlArea]
				})

		var part2 = Ext.widget('fieldset', {
					padding : 0,
					margin : 0,
					title : '피보험자 정보[사고정보]',
					layout : 'hbox',
					items : [aa, bb]
				});
		var insuranceContractStore = Ext.create('Ext.data.Store', {
					model : 'InsuranceContract'
				});

		var formGrid = Ext.create('Ext.grid.Panel', {
					height : 140,
					scroll : true,
					padding : 0,
					margin : 0,
					store : insuranceContractStore,
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
		// role team bind salesman
		var userStore = Ext.create('Ext.data.Store', {
					model : 'User'
				});

		var userCombo = Ext.widget('mecombo', {
					fieldLabel : '조사담당자',
					xtype : 'mecombo',
					queryMode : 'local',
					displayField : 'name',
					valueField : 'code',
					store : userStore,
					code : 'userCombo',
					hidden : true
				})

		var bindSalesManBtn = Ext.widget('mebutton', {
					text : '조사자 할당',
					handler : bindSalesMan,
					code : 'bindSalesManBtn',
					hidden : true
				});
		var acceptSurveyRequstBtn = Ext.widget('mebutton', {
					text : '조사할당 수용',
					handler : acceptSurveyRequst,
					code : 'bindSalesManBtn',
					hidden : true
				});
		var rejectSurveyRequstBtn = Ext.widget('mebutton', {
					text : '조사할당 거부',
					handler : rejectSurveyRequst
				});

		var bindSalesManBtn = Ext.widget('mebutton', {
					text : '조사자 할당',
					handler : bindSalesMan
				});

		var backBtn = Ext.widget('mebutton', {
					text : '리스트 ',
					handler : backMainPanel
				});
		var panel = Ext.create('Ext.panel.Panel', {
					overflowY : 'auto',
					bodyStyle : 'background-color:#E9E9E9',
					tbar : [{
								xtype : 'tbfill'
							}, userCombo, bindSalesManBtn,
							acceptSurveyRequstBtn, rejectSurveyRequstBtn,
							backBtn],
					items : [part1, part2, part3]

				})

		this.items = [grid, panel];
		this.callParent(arguments);

		var insuranceCategoryCode = insuranceCategoryCodeAndcause
				.getComponent('insuranceCategoryCode');
		var cause = insuranceCategoryCodeAndcause.getComponent('cause');
		var phmall = phmallAndreturnRule.getComponent('phmall');
		var returnRule = phmallAndreturnRule.getComponent('returnRule');

		var accidentType = accidentTypeAndaccidentDate
				.getComponent('accidentType');
		var accidentDate = accidentTypeAndaccidentDate
				.getComponent('accidentDate');

		var apersonSname = apersonSnameAndaccidentAddress
				.getComponent('apersonSname');
		var accidentAddress = apersonSnameAndaccidentAddress
				.getComponent('accidentAddress');

		var apersonMobile = apersonMobileAndcsAmount
				.getComponent('apersonMobile');
		var csAmount = apersonMobileAndcsAmount.getComponent('csAmount');

		var level = levelAndfeeAndrequestLevelCode.getComponent('level');
		var fee = levelAndfeeAndrequestLevelCode.getComponent('fee');
		var requestLevelCode = levelAndfeeAndrequestLevelCode
				.getComponent('requestLevelCode');

		var apersonJob = apersonJobAndapersonAge.getComponent('apersonJob');
		var apersonAge = apersonJobAndapersonAge.getComponent('apersonAge');

		var apersonName = apersonNameAndapersonJumin
				.getComponent('apersonName');
		var apersonJumin = apersonNameAndapersonJumin
				.getComponent('apersonJumin');
		var mtypeCode = mtypeCodeParent.getComponent('mtypeCode')

		function initReadOnly(mboolean) {
			Common.setReadOnly(departmenTree, mboolean);
			Common.setReadOnly(customer, mboolean);
			Common.setReadOnly(documentNumber, mboolean);
			Common.setReadOnly(acceptDate, mboolean);
			Common.setReadOnly(mtypeCode, mboolean);
			Common.setReadOnly(jsContents, mboolean);
			Common.setReadOnly(cause, mboolean);
			Common.setReadOnly(returnRule, mboolean);
			Common.setReadOnly(fee, mboolean);
			Common.setReadOnly(requestLevelCode, mboolean);
			Common.setReadOnly(insuranceCategoryCode, mboolean);
			Common.setReadOnly(accidentNumber, mboolean);
			Common.setReadOnly(accidentType, mboolean);
			Common.setReadOnly(accidentContents, mboolean);
			Common.setReadOnly(accidentDate, mboolean);
			Common.setReadOnly(accidentAddress, mboolean);
			Common.setReadOnly(csAmount, mboolean);
			Common.setReadOnly(apersonName, mboolean);
			Common.setReadOnly(apersonSname, mboolean);
			Common.setReadOnly(apersonJumin, mboolean);
			Common.setReadOnly(apersonMobile, mboolean);
			Common.setReadOnly(apersonAddress, mboolean);
			Common.setReadOnly(apersonJob, mboolean);
			Common.setReadOnly(apersonAge, mboolean);
			Common.setReadOnly(apersonDescription, mboolean);
			Common.setReadOnly(level, mboolean);
			Common.setReadOnly(insurer, mboolean);
			Common.setReadOnly(fileUrlArea, mboolean);
		};
		var currentRequestCode;
		grid.on('itemdblclick', function(view, record, item, index, e, eOpts) {// 事件监听
					initReadOnly(true);
					clearData();
					var obj = record.data;
					currentRequestCode = obj.code;
					Common.setValue(departmenTree, obj.department.code);
					Common.setValue(customer, obj.customer.code);
					Common.setValue(documentNumber, obj.documentNumber);
					Common.setValue(acceptDate, new Date(obj.acceptDate));
					Common.setValue(mtypeCode, obj.managementType.code);
					Common.setValue(jsContents, obj.jsContents);
					Common.setValue(cause, obj.cause);
					Common.setValue(returnRule, obj.returnRule);
					Common.setValue(fee, obj.fee);
					Common.setValue(requestLevelCode, obj.requestLevel.code);
					Common.setValue(insuranceCategoryCode,
							obj.insuranceCategory.code);
					if (obj.accident) {
						Common.setValue(accidentNumber, obj.accident.number);
						Common.setValue(accidentType, obj.accident.type.code);
						Common
								.setValue(accidentContents,
										obj.accident.contents);
						if (obj.accident.theDate) {
							Common.setValue(accidentDate,
									new Date(obj.accident.theDate));
						}
						Common.setValue(accidentAddress, obj.accident.address);
						Common.setValue(csAmount, obj.accident.csAmount);
						Common.setValue(apersonName, obj.accident.person.name);
						Common
								.setValue(apersonSname,
										obj.accident.person.sname);
						Common
								.setValue(apersonJumin,
										obj.accident.person.jumin);
						Common.setValue(sJumin, obj.accident.person.sjumin);
						Common.setValue(apersonMobile,
								obj.accident.person.mobile);
						Common.setValue(apersonAddress,
								obj.accident.person.address);
						Common.setValue(apersonJob, obj.accident.person.job);
						Common.setValue(apersonAge, obj.accident.person.age);
						Common.setValue(apersonDescription,
								obj.accident.person.description);
						insuranceContractStore
								.loadData(obj.accident.person.contracts);
					}
					Common.setValue(level, obj.requestLevel.code);
					Common.setValue(insurer, obj.insurer);
					Common.setValue(phmall, obj.phmall);
					Common.setValue(fileUrlArea, obj.fileUrl);
					array = [];
					if (obj.fileUrl) {
						array.push(obj.fileUrl.split(","));
					}
					loadUser();
					me.layout.setActiveItem(1);

				});
		function clearData() {
			departmenTree.setRawValue("");
			Common.empty(departmenTree);
			Common.empty(customer);
			Common.empty(documentNumber);
			Common.empty(acceptDate);
			Common.empty(mtypeCode);
			Common.empty(jsContents);
			Common.empty(cause);
			Common.empty(returnRule);
			Common.empty(fee);
			Common.empty(requestLevelCode);
			Common.empty(insuranceCategoryCode);
			Common.empty(accidentNumber);
			Common.empty(accidentType);
			Common.empty(accidentContents);
			Common.empty(accidentDate);
			Common.empty(accidentAddress);
			Common.empty(csAmount);
			Common.empty(apersonName);
			Common.empty(apersonSname);
			Common.empty(apersonJumin);
			Common.empty(sJumin);
			Common.empty(apersonMobile);
			Common.empty(apersonAddress);
			Common.empty(apersonJob);
			Common.empty(apersonAge);
			Common.empty(apersonDescription);
			Common.empty(insurer);
			Common.empty(level);
			Common.empty(fileUrlArea);
			array = [];
			insuranceContractStore.removeAll();

		}

		// search start
		function init() {
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
				var query = "{ ";
				var result = buildQuery(query, function() {
							return false;
						});
				console.log(result);
				var queryObject = new QueryObject('SurveyRequest', result,
						null, 100)
				AppContext.commandQuery(queryObject, function(contents) {
							store.removeAll();
							if (contents != null) {
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
						+ date2Time + "} ";

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
			var requestStatusCode = Common.value(requestStatusCdn);

			var cb = function(field, value) {
				var rstr = callbackFunc() ? "," : "";
				return rstr + "'" + field + "'" + ":" + value;
			};
			// var deptCode=departmenTreeCdn.getValue();
			if (Common.notnull(mngCode)) {
				query += cb("managementType.code", Common.read(mngCode));

			}
			if (Common.notnull(requestStatusCode)) {
				query += cb("requestStatus", Common.read(requestStatusCode));
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
		// search end

		visibleBtn();
		function visibleBtn() {
			var rolePage = Common.getRolePage(rolePages, "B2");
			var btns = rolePage.buttons;
			for (var i = 0; i < btns.length; i++) {
				var visibleBtnCode = btns[i].code;
				// console.log(visibleBtnCode + "," + createtBtn.code + ",");
				if (visibleBtnCode == userCombo.code) {
					Common.visibleBtn(userCombo);
				} else if (visibleBtnCode == bindSalesManBtn.code) {
					Common.visibleBtn(bindSalesManBtn);
				} else if (visibleBtnCode == acceptSurveyRequstBtn.code) {
					Common.visibleBtn(acceptSurveyRequstBtn);
				}
			}

		}
		function bindSalesMan() {
			var userCode = Common.value(userCombo);
			var obj = {};
			obj.userCode = userCode;
			obj.requestCode = currentRequestCode;
			var postData = new PostData("bindSurveyRequest", Ext.encode(obj));
			// console.log(Ext.encode(postData));
			AppContext.command(postData, function(reps) {
						alert(reps);
					})
		}

		function acceptSurveyRequst() {
			var obj = {};
			obj.requestCode = currentRequestCode;
			var postData = new PostData("acceptSurveyRequestCommand", Ext
							.encode(obj));
			// console.log(Ext.encode(postData));
			AppContext.command(postData, function(reps) {
						alert(reps);
					})

		}
		function rejectSurveyRequst() {

			var mesBox = Ext.create('Ext.window.Window', {
				title : 'reason',
				height : 200,
				width : 400,
				layout : 'fit',
				items : {
					// fieldLabel : 'reason',
					xtype : 'mearea',
					border : false
				},
				bbar : [{
					xtype : 'mebutton',
					text : 'reject',
					handler : function() {
						var userCode = loginUser.code;
						var obj = {};
						obj.userCode = userCode;
						obj.requestCode = currentRequestCode;
						var postData = new PostData(
								"rejectSurveyRequestCommand", Ext.encode(obj));
						// console.log(Ext.encode(postData));
						AppContext.command(postData, function(reps) {
									alert(reps);
									Common.visible(mesBox);
								})
					}
				}]
			}).show();

		}

		function backMainPanel() {
			me.layout.setActiveItem(0);
		}

		function loadUser() {
			var queryObject = new QueryObject('User', '{department.code:'
							+ Common.read(loginUser.department.code) + '}',
					"{'code':'1','name':'1'}");
			console.log(Ext.encode(queryObject));
			AppContext.commandQuery(queryObject, function(contents) {
						// console.log(contents);
						userStore.loadData(Common.decode(contents));
					});
		}

		function customernameRender(name) {
			if (name != null) {
				return name.name;
			}
			return null;
		};
		function accidentRender(accident) {// value: current cell'field
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

		function fromRender(from) {
			if (from != null) {
				return new Date(from);
			}
			return from;
		}

		function toRender(to) {
			if (to != null) {
				return new Date(to);
			}
			return to;
		}

	}
});
