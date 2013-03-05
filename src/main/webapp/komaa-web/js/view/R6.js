﻿Ext.define('view.R6', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.R6',
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
		// part start

		var fileName = Ext.widget('metext', {
					fieldLabel : '화밀명',
					width : 400
				});
		var comments = Ext.widget('metext', {
					fieldLabel : 'comments',
					width : 400
				});
		var description = Ext.widget('metext', {
					fieldLabel : '설명',
					width : 400
				});
		var uploadFile = Ext.widget('filefield', {
					name : 'file',
					width : 400,
					fieldLabel : '파일선택',
					msgTarget : 'side',
					allowBlank : false,
					buttonText : 'Select file...'
				});
				var fileId;		
		var uploadForm = Ext.create('Ext.form.Panel', {
			bodyStyle : 'background-color:#E9E9E9',
			border : false,
			layout : 'hbox',
			items : [uploadFile, {
				xtype : 'mebutton',
				text : 'Upload',
				handler : function() {
					clearFieldData();
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
							waitMsg : 'Uploading ...',
							failure : function(form, action) {
								fileId=action.result.contents;
								var names=fileId.split("@");
								Common.setValue(fileName,
										names[1]);
									Ext.Msg.alert('ok', names[1]);
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
		var formGridStore = Ext.create('Ext.data.Store', {
					model : 'HandlerUpload'

				});
		var formGrid = Ext.create('Ext.grid.Panel', {
					height : 140,
					scroll : true,
					padding : 0,
					margin : 0,
					store : formGridStore,
					columns : [{
								text : '문서명',
								flex : 4,
								dataIndex : 'name'
							}, {
								text : '비고',
								flex : 1,
								dataIndex : 'comments'

							}, {
								text : '비고2',
								flex : 1,
								dataIndex : 'description'
							}]
				})
		// part end
		var saveBtn = Ext.widget('mebutton', {
					text : '저장 ',
					handler : save,
					code : 'saveBtn',
					hidden : true
				})

		var tabPanel = Ext.create('Ext.tab.Panel', {
					region : 'center',
					tbar : [{
								xtype : 'tbfill'
							}, saveBtn],
					// bodyStyle : 'background-color:#E9E9E9',
					items : [{
						title : 'file',
						bodyStyle : 'background-color:#E9E9E9',
						items : [formGrid, uploadForm, fileName, comments,
								description]
					}]

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

		/*
		 * 
		 * var grid = Ext.create('Ext.grid.Panel', { region : 'north', height :
		 * 200, store : store, tbar : [date1, date2, searchBtn], columns : [{
		 * text : '보고서번호 ', flex : 1, dataIndex : 'documentNumber' }, { text :
		 * '보험사 ', flex : 1, dataIndex : 'customer', renderer : Common.cusRender //
		 * TODO } , { text : '접수일자 ', flex : 1, dataIndex : 'acceptDate',
		 * renderer : acceptDateRender }, { text : '보험계약자 ', flex : 1, dataIndex :
		 * 'accident', renderer : accidentRender }, { text : '분류 ', flex : 1,
		 * dataIndex : 'managementType', renderer : managementTypeRender }] })
		 */

		// add By woonill on 2013.02.17
		var grid = Ext.create('Ext.grid.Panel', {
			region : 'north',
			height : 200,
			//tbar : [date1, date2, likeCnd, likeComboCnd, searchBtn],
			tbar : [date1, date2, manageType, customerCdn,likeComboCnd, likeCnd,searchBtn],
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
							if (acc) {if( acc.type.name=="normal"){
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
							if (obj) {	if(obj.name=="normal"){
								return "--"
								}
								return obj.name;
							}
							return null;
						}
					}]
		})

		// end Grid

		me.items = [grid, tabPanel]
		me.callParent(arguments);
		var currentRequestCode;
		grid.on('itemclick', function(view, record, item, index, e, eOpts) {// 事件监听
					// console.log(Ext.encode(record.data))
					formGridStore.removeAll();
					clearFieldData();
					var obj = record.data;
					currentRequestCode = obj.code;
					formGridStore.loadData(obj.handlerUploads);

				});
		visibleBtn();
		function visibleBtn() {
			var rolePage = Common.getRolePage(rolePages, "R6");
			// console.log(rolePage);
			var btns = rolePage.buttons;
			for (var i = 0; i < btns.length; i++) {
				var visibleBtnCode = btns[i].code;
				if (visibleBtnCode == saveBtn.code) {
					// console.log(visibleBtnCode == saveBtn.code);
					Common.visibleBtn(saveBtn);
				} else if (visibleBtnCode == searchBtn.code) {
					Common.visibleBtn(searchBtn);
				}
			}
		}
		function clearFieldData() {
			Common.empty(fileName);
			Common.empty(comments);
			Common.empty(description);
			Common.empty(uploadFile);
		}
		formGrid.on('itemclick', function(view, record, item, index, e, eOpts) {// 事件监听
					// console.log(Ext.encode(record.data))
					clearFieldData();
					var obj = record.data;
					Common.setValue(fileName, obj.name);
					Common.setValue(comments, obj.comments);
					Common.setValue(description, obj.description);
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

		function save() {
			var obj = {};
			obj.requestCode = currentRequestCode;
			obj.name = Common.value(fileName);
			obj.fileId=fileId;
			obj.comments = Common.value(comments);
			obj.description = Common.value(description);
			var postData = new PostData(
					"createHandlerUploadForSurveyRequstCommand", Ext
							.encode(obj));
			 console.log(Ext.encode(postData));
			AppContext.command(postData, function(repsText) {
						alert(repsText);
					})
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
			return "0000-00-00";
		}

	}

});