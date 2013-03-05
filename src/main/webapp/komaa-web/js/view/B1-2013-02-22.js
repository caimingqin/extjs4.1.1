Ext.define('view.B1', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.B1',
	initComponent : function() {
		var me = this;
		me.border = false;
		me.bodyCls = 'background:#FFFFFF'
		me.layout = 'card';
		me.height = 620;// height decide this if layout is card 600 to 650
		// 2013-02-02
		var surverRuqestCode = Ext.widget('metext', {
					hidden : true
				});
		var mtypeCodeParent = Ext.widget('mefc', {
					fieldLabel : '보종',
					layout : 'hbox',
					items : [{
								itemId : 'mtypeCode',
								xtype : 'mecombo',
								queryMode : 'local',
								displayField : 'name',
								valueField : 'code',
								store : managementTypeStore,
								allowBlank : false
							}]
				});

		var acceptDate = Ext.widget('medate', {
					fieldLabel : '위임일자',
					allowBlank : false
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
					fieldLabel : '문서번호',
					readOnly : true
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
					store : customerStore,
					allowBlank : false
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
								width : 250
							}, {
								margin : '0 0 0 5',
								xtype : 'metext',
								itemId : 'apersonJumin',
								fieldLabel : '주민번호',
								width : 250
							}]
				})

		var insurer = Ext.widget('metext', {
					fieldLabel : '피해보험자',
					width : 250
				})
		var sJumin = Ext.widget('metext', {
					fieldLabel : '주민번호',
					margin : '0 0 0 5',
					width : 250
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
								width : 250
							}, {
								margin : '0 0 0 5',
								itemId : 'csAmount',
								xtype : 'metext',
								fieldLabel : '추산금액',
								width : 250,
								vtype : 'floater'
							}]
				})

		var apersonSnameAndaccidentAddress = Ext.widget('mefc', {
					layout : 'hbox',
					items : [{
								xtype : 'metext',
								itemId : 'apersonSname',
								fieldLabel : '피해자',
								width : 250
							}, {
								margin : '0 0 0 5',
								xtype : 'metext',
								itemId : 'accidentAddress',
								fieldLabel : '사고지역',
								width : 250
							}]
				})
		var accidentTypeAndaccidentDate = Ext.widget('mefc', {
					layout : 'hbox',
					items : [{
								xtype : 'mecombo',
								itemId : 'accidentType',
								fieldLabel : '사고유형',
								width : 250,
								queryMode : 'local',
								displayField : 'name',
								valueField : 'code',
								store : accidentTypeStore
							}, {
								margin : '0 0 0 5',
								xtype : 'medate',
								itemId : 'accidentDate',
								fieldLabel : '사고일자',
								width : 250
							}]
				})
		// TODO
		var apersonAddress = Ext.widget('metext', {
					fieldLabel : '주소',
					name : 'address2',
					buttonText : '우편번호',
					width : 500
				});
		var apersonJobAndapersonAge = Ext.widget('mefc', {
					layout : 'hbox',
					items : [{
								itemId : 'apersonJob',
								xtype : 'metext',
								fieldLabel : '직업',
								width : 200
							}, {
								itemId : 'apersonAge',
								margin : '0 0 0 5',
								xtype : 'metext',
								fieldLabel : '나이',
								labelWidth : 50,
								width : 150,
								vtype : 'number'
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
								width : 400
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
								width : 400
							}]
				});
		var aa83 = Ext.widget('fieldset', {
					layout : 'hbox',
					padding : 0,
					margin : 0,
					border : false,
					items : [{
								// fieldLabel : 'aa83',
								xtype : 'metext',
								width : 150
							}, {
								xtype : 'metext',
								width : 400
							}]
				});
		var aa8 = Ext.widget('mefc', {
					fieldLabel : '진단명',
					padding : 0,
					width : 500,
					items : [aa81, aa82, aa83]
				});
		var apersonDescription = Ext.widget('metext', {
					width : 500,
					fieldLabel : '기타사항'
				});
		var aa = Ext.widget('fieldset', {
					padding : 0,
					margin : '0 0 0 5',
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
								width : 170,
								queryMode : 'local',
								displayField : 'name',
								valueField : 'code',
								store : insurancePersonLevelStore
							}, {
								itemId : 'fee',
								xtype : 'metext',
								fieldLabel : 'FEE',
								width : 100,
								labelWidth : 40
							}, {
								itemId : 'requestLevelCode',
								margin : '0 0 0 5',
								xtype : 'mecombo',
								fieldLabel : '당사등급',
								queryMode : 'local',
								displayField : 'name',
								valueField : 'code',
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
								store : insuranceCategoryStore

							}, {
								itemId : 'cause',
								margin : '0 0 0 5',
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
								margin : '0 0 0 5',
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

		// upload start
		var array = new Array();
		var uploadFile = Ext.widget('filefield', {
					name : 'file',
					width : 400,
					fieldLabel : '파일선택',
					msgTarget : 'side',
					allowBlank : false,
					buttonText : 'Select file...'
				});
		var uploadForm = Ext.create('Ext.form.Panel', {
			layout : 'hbox',
			bodyStyle : 'background-color:#E9E9E9',
			border : false,
			items : [uploadFile, {
				xtype : 'mebutton',
				text : 'Upload',
				handler : function() {
					var CommandTranslate = uploadForm.getComponent('CommandTranslate');
					var datas = {};
					datas.code = "";
					var commandTranslate = {};
					commandTranslate.commandName = "UploadFileCommand";
					commandTranslate.contents = Ext.encode(datas);
					// console.log(Ext.encode(commandTranslate));
					CommandTranslate.setValue(Ext.encode(commandTranslate));
					var form = this.up('form').getForm();
					if (form.isValid()) {
						form.submit({
							url : 'http://1.232.123.197:9000/komaa/commandHandler.shtml',
							waitMsg : 'Uploading your file...',
							failure : function(form, action) {
								// console.log(action.result.contents);
								array.push(action.result.contents);
								// TODO
								// console.log(array.join(","));
								Common.setValue(fileUrlArea, array.join(","));
								Ext.Msg.alert('ok', action.result.contents);
							}
						});
					}
				}
			}, {
				xtype : 'textfield',
				name : 'CommandTranslate',
				labelWidth : 50,
				hidden : true,
				itemId : 'CommandTranslate'
			}]
		});
		// upload end

		var bb = Ext.widget('fieldset', {
					padding : 0,
					margin : '0 0 0 10',
					border : false,
					items : [levelAndfeeAndrequestLevelCode,
							insuranceCategoryCodeAndcause, phmallAndreturnRule,
							accidentContents, jsContents, fileUrlArea,
							uploadForm]
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
		var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
					clicksToEdit : 1
				});
		var addRowBtn = Ext.widget('mebutton', {
					text : '새로',
					handler : addRowFormGrid,
					code : 'addRowBtn',
					hidden : true
				});
		var formGrid = Ext.create('Ext.grid.Panel', {
					height : 120,
					scroll : true,
					padding : 0,
					margin : 0,
					store : insuranceContractStore,
					bbar : [addRowBtn],
					plugins : [cellEditing],
					columns : [{
								text : '보험종목',
								flex : 1,
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
		var editBtn = Ext.widget('mebutton', {
					text : '수정 ',
					handler : editBtnHandler,
					code : 'editBtn',
					hidden : true
				})

		var panel = Ext.create('Ext.panel.Panel', {
					overflowY : 'auto',
					bodyStyle : 'background-color:#E9E9E9',
					tbar : [{
								xtype : 'tbfill'
							}, editBtn, saveBtn, backBtn],

					items : [part1, part2, part3]

				})

		var store = Ext.create('Ext.data.Store', {
					model : 'SurveyRequest'
				});
		var initBtn = Ext.widget('mebutton', {
			text : '조회 ',
			handler : init,
			code : 'initBtn'
				// hidden : true
			});
		var createtBtn = Ext.widget('mebutton', {
					text : '추가 ',
					handler : create,
					code : 'createtBtn',
					hidden : true
				});

		// condition start
		var date1 = Ext.widget('medate', {
					fieldLabel : '접수일자',
					labelWidth : 70,
					width : 200
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
					store : managementTypeStore
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
		var likeCnd = Ext.widget('metext', {
			       labelWidth : 40,
			       width: 80
					
				})
		var likeComboCnd = Ext.widget('mecombo', {
					labelWidth : 40,
					 width:      120,
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
			tbar : [date1, date2, manageType, customerCdn, requestStatusCdn, likeComboCnd, likeCnd, 
					initBtn, createtBtn],
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
								return obj.name;
							}
							return null;
						}
					}]
		})
		this.items = [grid, panel];
		this.callParent(arguments);

		function init() {
			// alert('init');
			// console.log(initBtn.code);
			 Ext.MessageBox.show({
			    title:'잠시만 기다리십시요.'
			    ,msg:'데이터를 가져오는 중입니다...'
			    ,wait:true
			    ,waitConfig:{interval:200}
			});
			var dt=new Date();
			var date1Time;
			var date2Time;
			if (Common.isNull(date1) && Common.isNull(date2)) {
				var query="{ ";
				var result=buildQuery(query);
				console.log(result);
				var queryObject = new QueryObject('SurveyRequest', result,
					null,100)
			    AppContext.commandQuery(queryObject, function(contents) {
						// console.log(contents);
						store.loadData(Common.decode(contents));
						Ext.MessageBox.hide();
					});
			}else{
			if( Common.isNull(date2)){
					date1Time=Common.value(date1).getTime();
					date2Time=dt.getTime();
			}else{
					date1Time=Common.value(date1).getTime();
					date2Time=Common.value(date2).getTime();
			}
			
			var query = "{ acceptDate:{'$gte':" + date1Time
					+ ",'$lte':" + date2Time + "} ";

			var result=buildQuery(query);
			console.log(result);
			var queryObject = new QueryObject('SurveyRequest',query,
					null)
			AppContext.commandQuery(queryObject, function(contents) {
				console.log(contents);
						store.loadData(Common.decode(contents));
						Ext.MessageBox.hide();
					});
			} 
		}

		function buildQuery(query) {
			var mngCode = Common.value(manageType);
			var customerCode = Common.value(customerCdn);
			var requestStatusCode = Common.value(requestStatusCdn);
	
			// var deptCode=departmenTreeCdn.getValue();
			if (mngCode) {
				query += "managementType.code:" + Common.read(mngCode);
			}
			if (requestStatusCode) {
				query += ",requestStatus:" + Common.read(requestStatusCode);
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
			return query;
		}

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
		};
		grid.on('itemdblclick', function(view, record, item, index, e, eOpts) {// 事件监听
					initReadOnly(true);
					var obj = record.data;
					Common.setValue(surverRuqestCode, obj.code);
					Common.setValue(departmenTree, obj.department.code);
					Common.setValue(customer, obj.customer.code);
					Common.setValue(documentNumber, obj.documentNumber);
					Common.setValue(acceptDate, new Date(obj.acceptDate));
					if (obj.managementType) {
						Common.setValue(mtypeCode, obj.managementType.code);
					}
					Common.setValue(jsContents, obj.jsContents);
					Common.setValue(cause, obj.cause);
					Common.setValue(returnRule, obj.returnRule);
					Common.setValue(fee, obj.fee);
					if (obj.requestLevel) {
						Common
								.setValue(requestLevelCode,
										obj.requestLevel.code);
					}
					Common.setValue(insuranceCategoryCode,
							obj.insuranceCategory.code);
					Common.setValue(accidentNumber, obj.accident.number);
					Common.setValue(accidentType, obj.accident.type.code);
					Common.setValue(accidentContents, obj.accident.contents);
					Common.setValue(accidentDate,
							new Date(obj.accident.theDate));
					Common.setValue(accidentAddress, obj.accident.address);
					Common.setValue(csAmount, obj.accident.csAmount);
					Common.setValue(apersonName, obj.accident.person.name);
					Common.setValue(apersonSname, obj.accident.person.sname);
					Common.setValue(apersonJumin, obj.accident.person.jumin);
					Common.setValue(sJumin, obj.accident.person.sjumin);
					Common.setValue(apersonMobile, obj.accident.person.mobile);
					Common
							.setValue(apersonAddress,
									obj.accident.person.address);
					Common.setValue(apersonJob, obj.accident.person.job);
					Common.setValue(apersonAge, obj.accident.person.age);
					Common.setValue(apersonDescription,
							obj.accident.person.description);
					Common.setValue(level, obj.requestLevel.code);
					Common.setValue(insurer, obj.insurer);
					Common.setValue(phmall, obj.phmall);
					Common.setValue(fileUrlArea, obj.fileUrl);
					array = [];
					array.push(obj.fileUrl.split(","));
					insuranceContractStore
							.loadData(obj.accident.person.contracts);
					me.layout.setActiveItem(1);

				});


//	  grid.load({callback:function(){ //以grid为例
//		    Ext.Msg.hide();
//		}});

		function backMainPanel() {
			me.layout.setActiveItem(0);
		}
		// function showCreatPanel() {
		// me.layout.setActiveItem(1);
		// }
		
		
		visibleBtn();
		function visibleBtn() {
				loadCustomerStore();
			// console.log(rolePages);
			var rolePage = Common.getRolePage(rolePages, "B1");
			// console.log(rolePage);
			var btns = rolePage.buttons;
			for (var i = 0; i < btns.length; i++) {
				var visibleBtnCode = btns[i].code;
				// console.log(visibleBtnCode + "," + createtBtn.code + ",");
				if (visibleBtnCode == saveBtn.code) {
					// console.log(visibleBtnCode == saveBtn.code);
					Common.visibleBtn(saveBtn);
				} else if (visibleBtnCode == initBtn.code) {
					Common.visibleBtn(initBtn);
				} else if (visibleBtnCode == editBtn.code) {
					Common.visibleBtn(editBtn);
				} else if (visibleBtnCode == addRowBtn.code) {
					Common.visibleBtn(addRowBtn);
				} else if (visibleBtnCode == backBtn.code) {
					Common.visibleBtn(backBtn);
				} else if (visibleBtnCode == createtBtn.code) {
					Common.visibleBtn(createtBtn);
				}
			}

		}

		function create() {
			initReadOnly(false);
			// loadCustomerStore();
			loadDeptTreeStore();
			me.layout.setActiveItem(1);
			Common.empty(surverRuqestCode);
			// Common.visible(saveBtn, true);
			// Common.visible(editBtn, false);
			// console.log(departmenTree.getValue());
			Common.empty(departmenTree);
			Common.empty(customer);
			Common.empty(documentNumber);
			Common.empty(acceptDate);
			// Common.empty(mtypeCode);
			Common.empty(jsContents);
			Common.empty(cause);
			Common.empty(returnRule);
			Common.empty(fee);
			// Common.empty(requestLevelCode);
			// Common.empty(insuranceCategoryCode);
			Common.empty(accidentNumber);
			// Common.empty(accidentType);
			Common.empty(accidentContents);
			Common.empty(accidentDate);
			Common.empty(accidentAddress);
			Common.empty(csAmount);
			Common.empty(apersonName);
			Common.empty(apersonSname);
			Common.empty(apersonJumin);
			// obj.apersonsJumin=Common.empty();
			Common.empty(apersonMobile);
			Common.empty(apersonAddress);
			Common.empty(apersonJob);
			Common.empty(apersonAge);
			Common.empty(apersonDescription);
			Common.empty(insurer);
			// Common.empty(level);
			Common.empty(fileUrlArea);
			array = [];
			insuranceContractStore.loadData([]);

		}

		function editBtnHandler() {
			Common.visible(saveBtn, true);
			initReadOnly(false);
		}

		function save() {
			if (!Common.value(customer)) {
				alert("please select customer! ")
				return;
			}
			if (!departmenTree.getValue()) {
				alert("please select department! ")
				return;
			}

			if (!Common.value(documentNumber)) {
				alert("documentNumber  is null! ")
				return;
			}
			if (!Common.value(mtypeCode)) {
				alert("mtypeCode  is null! ")
				return;
			}
			if (!Common.value(acceptDate)) {
				alert("acceptDate  is null! ")
				return;
			}
			if (!departmenTree.getValue()) {
				alert("department  is null! ")
				return;
			}
			var obj = {};
			obj.code = surverRuqestCode.getValue();
			obj.departmentCode = departmenTree.getValue();
			obj.customer = Common.value(customer);
			// obj.documentNumber = Common.value(documentNumber);
			obj.acceptDate = Common.value(acceptDate);
			obj.mtypeCode = Common.value(mtypeCode);
			obj.jsContents = Common.value(jsContents);
			obj.cause = Common.value(cause);
			obj.returnRule = Common.value(returnRule);
			obj.fee = Common.value(fee);
			obj.requestLevelCode = Common.value(requestLevelCode);
			obj.insuranceCategoryCode = Common.value(insuranceCategoryCode);
			obj.accidentNumber = Common.value(accidentNumber);
			obj.accidentType = Common.value(accidentType);
			obj.accidentContents = Common.value(accidentContents);
			obj.accidentDate = Common.value(accidentDate);
			obj.accidentAddress = Common.value(accidentAddress);
			obj.csAmount = Common.value(csAmount);
			obj.apersonName = Common.value(apersonName);
			obj.apersonSname = Common.value(apersonSname);
			obj.apersonJumin = Common.value(apersonJumin);
			// obj.apersonsJumin=Common.value();
			obj.apersonMobile = Common.value(apersonMobile);
			obj.apersonAddress = Common.value(apersonAddress);
			obj.apersonJob = Common.value(apersonJob);
			obj.apersonAge = Common.value(apersonAge);
			obj.apersonDescription = Common.value(apersonDescription);
			obj.level = Common.value(level);
			obj.insurer = Common.value(insurer);
			obj.phmall = Common.value(phmall);
			obj.fileUrl = Common.value(fileUrlArea);
			var arr = insuranceContractStore.data.items;
			var contracts = [];
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
			obj.contracts = contracts;
			var postData = new PostData("createSurveyRequest", Ext.encode(obj));
			// console.log(Ext.encode(postData));
			AppContext.command(postData, function(reps) {
						alert(reps);
					})
		}

		// formGrid

		// 添加 1
		function addRowFormGrid() {
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