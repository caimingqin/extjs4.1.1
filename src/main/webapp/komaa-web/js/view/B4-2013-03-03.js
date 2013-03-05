Ext.define('view.B4', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.B4',
	initComponent : function() {
		var me = this;
		// me.padding = '0 0 0 5';
		me.layout = 'border';
		me.height = 650;
		me.defaults = {
			split : true
		};

		var store = Ext.create('Ext.data.Store', {
					model : 'SurveyRequest'
				});

		var searchBtn = Ext.widget('mebutton', {
					text : '조회 ',
					handler : init,
					code : 'searchBtn',
					hidden : true
				});

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


		/** woonill */

		var grid = Ext.create('Ext.grid.Panel', {
			// region : 'north',
			region : 'north',
			height : 260,
			tbar : [date1, date2, manageType, customerCdn, requestStatusCdn, likeComboCnd, likeCnd, 
					searchBtn],
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
							if (acc) {	if( acc.type.name=="normal"){
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
							if (obj) {if(obj.name=="normal"){
								return "--"
								}	
								return obj.name;
							}
							return null;
						}
					}]
		})

		/** end Grid */

		var queryObject = new QueryObject('DocumentCategory', "{}", "{'_id':0}");
		var postData = new PostData('mongoCommand', Ext.encode(queryObject));
		var proxy = new Ext.data.proxy.Ajax();
		proxy.url = AppContext.HOST + '/komaa/commandHandler.shtml';
		proxy.reader = {
			type : 'json',
			root : 'children'
		};
		proxy.actionMethods = {
			create : 'POST',
			read : 'POST',
			update : 'POST',
			destroy : 'POST'
		}
		proxy.extraParams = {
			qcmd : Ext.JSON.encode(postData)
		};
		proxy.extractResponseData = function(response) {
			// console.log(response);
			var repData = Common.decode(response.responseText);
			// console.log(repData);
			var obj = {};
			obj.children = Common.decode(repData.contents);
			// console.log(obj);
			// console.log(Ext.encode(obj));
			return obj;
		};
		var treeStore = Ext.create('Ext.data.TreeStore', {
					model : 'DocumentCategory',
					autoLoad : true,
					proxy : proxy
				});

		var treeGrid = Ext.create('Ext.tree.Panel', {
					height : 300,
					// collapsible : true,
					useArrows : true,
					rootVisible : false,
					store : treeStore,
					multiSelect : true,
					selModel : {
						selType : 'checkboxmodel',
						mode : 'SIMPLE',
						showHeaderCheckbox : false
					},
					width : 200,
					// singleExpand: true,// 只张开一个树。
					columns : [{
								xtype : 'treecolumn',
								text : '리스트',
								dataIndex : 'name',
								width : 200

							}]
				});

		var pageGridStore = Ext.create('Ext.data.Store', {
					model : 'DocumentPage'
				});
		var pageGrid = Ext.widget('grid', {
					region : 'center',
					height : 300,
					store : pageGridStore,
					width : 200,
					defualts : {
						flex : 1
					},
					columns : [{
								text : '출력물',
								flex : 1,
								dataIndex : 'name'
							}, {
								text : '내용',
								flex : 1,
								dataIndex : 'url'
							}]
				})

		var htmlViewPanel = Ext.create('Ext.panel.Panel', {

			width : 800,
			height : 300,
			html : '<iframe name="leftframe" marginwidth=10 marginheight=10  frameborder=no width="100%" scrolling="auto" height=100%></iframe>'
		});
		var saveBtn = Ext.widget('mebutton', {
					text : 'save',
					code : 'saveBtn',
					hidden : true,
					handler : save
				})
		var rightBtn = Ext.widget('mebutton', {
					text : '=>',
					handler : rightBtnClick
				});
		var leftBtn = Ext.widget('mebutton', {
					text : '<=',
					handler : leftBtnClick
				});
		var btnSet = Ext.widget('mefs', {
					border : false,
					margin : '100 0 0 0',
					layout : 'vbox',
					items : [rightBtn, leftBtn]
				})
		var printerStore=Ext.create('Ext.data.Store',{
		         fields:['code','name']
			
		});		
		var printerCombo = Ext.widget('mecombo', {
					fieldLabel : '보험사',
					margin:'0 20 0 0',
					displayField : 'name',
					valueField : 'code',
					queryMode : 'local',
					store : printerStore
				});		
		var detailPanel = Ext.create('Ext.tab.Panel', {
					bodyStyle : 'background-color:#E9E9E9',
					region : 'center',
					border : false,
					margin : 0,
					fieldDefaults : {
						labelAlign : 'left',
						labelWidth : 60,
						width : 200,
						padding : '5 '

					},

					defaults : {
						padding : '0 0 0 0',
						titleAlign : 'center'
					},
					items : [{
								layout : 'hbox',
								title : '요청 출력물 리스트',
								tbar : [printerCombo,{
											xtype : 'tbfill'
										},saveBtn],
								items : [treeGrid, btnSet, pageGrid,
										htmlViewPanel]
							}]
				})
		// detailPanel end
		this.items = [grid, detailPanel];
		this.callParent(arguments);
		
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
				var sf = true;
				var result = buildQuery(query, function() {
							if (sf) {
								sf = false;
								return false;
							}
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
						+ date2Time + "} ";

				var sf = true;
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
		//search end
		
//		function init() {
//
//			var queryObject = new QueryObject('SurveyRequest', buildQuery(),
//					null)
//			AppContext.commandQuery(queryObject, function(contents) {
//						// console.log(contents);
//				store.removeAll();
//				if(contents!=null){
//						store.loadData(Common.decode(contents));
//				}
//					});
//		};
//
//		function buildQuery() {
//			if (Common.isNull(date1) || Common.isNull(date2)) {
//				alert("please select date!");
//				return;
//			}
//			var query = "{ acceptDate:{'$gte':" + Common.value(date1).getTime()
//					+ ",'$lte':" + Common.value(date2).getTime() + "} ";
//
//			var mngCode = Common.value(manageType);
//			var customerCode = Common.value(customerCdn);
//			var requestStatusCode = Common.value(requestStatusCdn);
//			// var deptCode=departmenTreeCdn.getValue();
//			if (mngCode) {
//				query += ",managementType.code:" + Common.read(mngCode);
//			}
//			if (requestStatusCode) {
//				query += ",requestStatus:" + Common.read(requestStatusCode);
//			}
//			if (customerCode) {
//				query += ",customer.code:" + Common.read(customerCode);
//			}
//			// if(deptCode){
//			// query+=",department.code:"+Common.read(deptCode);
//			// }
//				var likeValue=Common.value(likeCnd);
//			var likeComboxValue=Common.value(likeComboCnd);
//			if(likeComboxValue&&likeValue){
//			query += ","+likeComboxValue+":" + Common.read(likeValue);
//			}
//			query += "}";
//			console.log(query);
//			return query;
//		}
		grid.on('itemdblclick', function(view, record, item, index, e, eOpts) {// 事件监听
					initReadOnly(true);
					// console.log(Ext.encode(record.data))
					var obj = record.data;

				});

		// treeGrid.on('itemclick', function(view, record, item, index, e,
		// eOpts) {
		// var obj = record.data;
		// // console.log(obj);
		// var menuCode = obj.code;
		// loadPage(menuCode);
		//
		// });

		var currentCode;
		pageGrid.on('itemclick', function(view, record, item, index, e, eOpts) {
			var obj = record.data;
			// console.log(obj);
			currentCode = obj.code;
			htmlViewPanel.body
					.update("<iframe name='leftframe' marginwidth=10 marginheight=10 src="
							+ obj.url
							+ " frameborder=no width='100%' scrolling='auto' height=100%></iframe>")

		});
		
		function loadPrinter(){
		var queryObject = new QueryObject('User', "{}", null)
			AppContext.commandQuery(queryObject, function(contents) {
						printerStore.loadData(Common.decode(contents));
					});
		}
		visibleBtn();
		function visibleBtn() {
			loadCustomerStore();
			var rolePage = Common.getRolePage(rolePages, "B4");
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
			loadPrinter();
		}

		var treeGridCheckBoxModel = treeGrid.getSelectionModel();

		function rightBtnClick() {
			var selects = treeGridCheckBoxModel.getSelection();
			var pages = [];
			for (var i = 0; i < selects.length; i++) {
				var menuCode = selects[i].data.code;
				console.log(menuCode);
				loadPage(menuCode, pages);

			}

			console.log(pages.length);
		}

		function leftBtnClick() {
			var pageArr = pageGridStore.data.items;
			for (var i = 0; i < pageArr.length; i++) {
				var obj = pageArr[i].data
				console.log(obj.code + "," + currentCode);
				if (obj.code == currentCode) {
					pageGridStore.removeAt(i);
					break;
				}
			}

			htmlViewPanel.body
					.update("");

		}
		function save() {
			var pageArr = pageGridStore.data.items;
			var pages = [];
			for (var i = 0; i < pageArr.length; i++) {
				var page = pageArr[i].data
				pages.push(page.code);
			}
			var obj = {};
			obj.userId=Common.value(printerCombo);
			obj.catCodes = pages;
			var postData = new PostData("applyPrintDocumentPageCommand", Ext
							.encode(obj));
			console.log(Ext.encode(postData));
			AppContext.command(postData, function(repsText) {
						Common.alert(repsText);
					})

		}

		function loadPage(menuCode, pages) {
			var queryObject = new QueryObject('DocumentPage', "{menuCode:"
							+ Common.read(menuCode) + "}", null)
			AppContext.commandQuery(queryObject, function(contents) {
						console.log(Ext.encode(contents));
						var arr = Common.decode(contents);
						for (var i = 0; i < arr.length; i++) {
							pages.push(arr[i]);
						}
						pageGridStore.loadData(pages);
						console.log(pages.length);
					});

		}
	}
});
