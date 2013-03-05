Ext.define('view.B5', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.B5',
			initComponent : function() {
				var me = this;
				me.padding = '0 0 0 5';
				me.layout = 'card';
				me.height = 650;
				me.defaults = {
					split : true
				};

				var btn = Ext.widget('mebutton', {
							text : '조회',
							handler : init
						});
				var store = Ext.create('Ext.data.Store', {
							model : 'SurveyRequest'
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
								width : 120,
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
				var requestStatusCdn = Ext.widget('mecombo', {
							labelWidth : 40,
							width : 120,
							fieldLabel : '상태',
							displayField : 'code',
							valueField : 'code',
							queryMode : 'local',
							store : requestStatusStore

						})
						
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

				var grid = Ext.create('Ext.grid.Panel', {
							// region : 'north',
							// height : 600,
							anchor : '100% 98%',
							tbar : [date1, date2, manageType, customerCdn,
									requestStatusCdn,likeCnd,likeComboCnd, btn],
							store : store,
							columns : [{
										text : '보고서번호 ',
										flex : 1,
										dataIndex : 'documentNumber'
									}, {
										text : '보험사 ',
										flex : 1,
										dataIndex : 'customer',
										renderer : Common.cusRender
									}, {
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
							fieldLabel : '팀배정(remove)',
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
									accidentTypeAndaccidentDate,
									apersonAddress, apersonJobAndapersonAge,
									aa8, apersonDescription]
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
										fieldLabel : 'FEE',
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
									insuranceCategoryCodeAndcause,
									phmallAndreturnRule, accidentContents,
									jsContents, fileUrlArea]
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
				var backBtn = Ext.widget('mebutton', {
							text : '뒤로 ',
							handler : backMainPanel
						});
				var panel = Ext.create('Ext.panel.Panel', {
							// height : 600,
							overflowY : 'auto',
							// layout : 'vbox'
							// layout : 'anchor',
							// anchor : '100% 99%',
							bodyStyle : 'background-color:#E9E9E9',
							tbar : [{
										xtype : 'tbfill'
									}, backBtn],
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
				var csAmount = apersonMobileAndcsAmount
						.getComponent('csAmount');

				var level = levelAndfeeAndrequestLevelCode
						.getComponent('level');
				var fee = levelAndfeeAndrequestLevelCode.getComponent('fee');
				var requestLevelCode = levelAndfeeAndrequestLevelCode
						.getComponent('requestLevelCode');

				var apersonJob = apersonJobAndapersonAge
						.getComponent('apersonJob');
				var apersonAge = apersonJobAndapersonAge
						.getComponent('apersonAge');

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
				grid.on('itemdblclick', function(view, record, item, index, e,
						eOpts) {// 事件监听
							initReadOnly(true);
							// console.log(Ext.encode(record.data))
							var obj = record.data;
							Common.setValue(departmenTree, obj.department.code);
							Common.setValue(customer, obj.customer.code);
							Common.setValue(documentNumber, obj.documentNumber);
							Common.setValue(acceptDate,
									new Date(obj.acceptDate));
							Common.setValue(mtypeCode, obj.managementType.code);
							Common.setValue(jsContents, obj.jsContents);
							Common.setValue(cause, obj.cause);
							Common.setValue(returnRule, obj.returnRule);
							Common.setValue(fee, obj.fee);
							// Common.setValue(requestLevelCode);
							Common.setValue(requestLevelCode,
									obj.requestLevel.code);
							// Common.setValue(insuranceCategoryCode);
							Common.setValue(insuranceCategoryCode,
									obj.insuranceCategory.code);
							Common
									.setValue(accidentNumber,
											obj.accident.number);
							// Common.setValue(accidentType);
							Common.setValue(accidentType,
									obj.accident.type.code);
							Common.setValue(accidentContents,
									obj.accident.contents);
							Common.setValue(accidentDate,
									new Date(obj.accident.theDate));
							Common.setValue(accidentAddress,
									obj.accident.address);
							Common.setValue(csAmount, obj.accident.csAmount);
							Common.setValue(apersonName,
									obj.accident.person.name);
							Common.setValue(apersonSname,
									obj.accident.person.sname);
							Common.setValue(apersonJumin,
									obj.accident.person.jumin);
							Common.setValue(sJumin, obj.accident.person.sjumin);		
							// Common.setValue(apersonSJumin,obj.accident.person.jumin);
							// obj.apersonsJumin=Common.setValue();
							Common.setValue(apersonMobile,
									obj.accident.person.mobile);
							Common.setValue(apersonAddress,
									obj.accident.person.address);
							Common
									.setValue(apersonJob,
											obj.accident.person.job);
							Common
									.setValue(apersonAge,
											obj.accident.person.age);
							Common.setValue(apersonDescription,
									obj.accident.person.description);
							// Common.setValue(level);
							Common.setValue(level, obj.requestLevel.code);
							Common.setValue(insurer, obj.insurer);
							Common.setValue(phmall, obj.phmall);
							Common.setValue(fileUrlArea, obj.fileUrl);
							// console.log(obj.fileUrl.split(","));
							array = [];
							array.push(obj.fileUrl.split(","));
							insuranceContractStore
									.loadData(obj.accident.person.contracts);
							me.layout.setActiveItem(1);

						});

				function init() {
					var queryObject = new QueryObject('SurveyRequest',
							buildQuery(), null)
					AppContext.commandQuery(queryObject, function(contents) {
								// console.log(contents);
								store.loadData(Common.decode(contents));
							});
				};
				function buildQuery() {
					if (Common.isNull(date1) || Common.isNull(date2)) {
						alert("please select date!");
						return;
					}
					var query = "{ acceptDate:{'$gte':"
							+ Common.value(date1).getTime() + ",'$lte':"
							+ Common.value(date2).getTime() + "} ";

					var mngCode = Common.value(manageType);
					var customerCode = Common.value(customerCdn);
					var requestStatusCode = Common.value(requestStatusCdn);
					// var deptCode=departmenTreeCdn.getValue();
					if (mngCode) {
						query += ",managementType.code:" + Common.read(mngCode);
					}
					if (requestStatusCode) {
						query += ",requestStatus:"
								+ Common.read(requestStatusCode);
					}
					if (customerCode) {
						query += ",customer.code:" + Common.read(customerCode);
					}
					// if(deptCode){
					// query+=",department.code:"+Common.read(deptCode);
					// }
					var likeValue=Common.value(likeCnd);
			var likeComboxValue=Common.value(likeComboCnd);
			if(likeComboxValue&&likeValue){
			query += ","+likeComboxValue+":" + Common.read(likeValue);
			}	
					query += "}";
					console.log(query);
					return query;
				}
				function backMainPanel() {
					me.layout.setActiveItem(0);
				}
				function accidentRender(accident) {// value: current cell'field
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
