Ext.define('view.C3', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.C3',
			initComponent : function() {
				var me = this;
				me.border = false;
				me.bodyCls = 'background:#FFFFFF'
				// me.padding = '0 5 0 5';
				me.layout = 'border';
				me.height = 650;// height decide this if layout is card

				var formGridStore = Ext.create('Ext.data.Store', {
							model : 'SurveyRequest'
						});
				var formGrid = Ext.create('Ext.grid.Panel', {
							height : 140,
							scroll : true,
							padding : 0,
							margin : 0,
							store : formGridStore,
							columns : [{
										text : '분류',
										flex : 1,
										dataIndex : 'accident',
										renderer : function(obj) {
											if (obj) {
												return obj.number;
											}
										}
									}, {
										text : '보험계약자',
										flex : 1,
										dataIndex : 'acceptDate',
										renderer : function(acceptDate) {
											if (acceptDate) {
												return Ext.util.Format.date(
														new Date(acceptDate),
														'Y-m-d');
											}
										}
									}, {
										text : '보고서번호',
										flex : 1,
										dataIndex : 'result',
										renderer : function(obj) {
											if (obj) {
												return Ext.util.Format
														.date(
																new Date(obj.reportDate),
																'Y-m-d');
											}
										}
									}, {
										text : '증권종목(wait)',
										flex : 1,
										dataIndex : 'handleType',
										renderer : handleTypeRender
									}, {
										text : '증권번호(wait)',
										flex : 1,
										dataIndex : 'handleLocation',
										renderer : handleLocationRender
									}, {
										text : '보고서번호',
										flex : 1,
										dataIndex : 'insurer'
									}, {
										text : '증권번호(wait7)',
										flex : 1,
										dataIndex : 'measure'
									}, {
										text : '증권번호',
										flex : 1,
										dataIndex : 'department',
										renderer : function(obj) {
											if (obj) {
												return obj.name;
											}
										}
									}, {
										text : '보험사',
										flex : 1,
										dataIndex : 'user',
										renderer : function(user) {
											if (user) {
												return user.name
											}
										}
									}, {
										text : '보험계약자',
										flex : 1,
										dataIndex : 'result',
										renderer : function(obj) {
											if (obj) {
												return obj.amountRequested
											}
										}

									}, {
										text : '보험계약자',
										flex : 1,
										dataIndex : 'result',
										renderer : function(obj) {
											if (obj) {
												return obj.depreciate.amount
											}
										}

									}]
						})

				var tabPanel = Ext.create('Ext.tab.Panel', {
							bodyStyle : 'background-color:#E9E9E9',
							region : 'center',
							items : [{
										title : 'formGrid',
										items : [formGrid]
									}]

						})
				var store = Ext.create('Ext.data.Store', {
							model : 'SurveyRequest'
						});
				var searchBtn = Ext.widget('mebutton', {
							text : '추가(search) ',
							handler : search,
							code : 'searchBtn'
						})
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
			        emptyText:'select',
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
				    emptyText:'select',
					labelWidth : 45,
					fieldLabel : '보험사',
					displayField : 'name',
					valueField : 'code',
					queryMode : 'local',
					store : customerStore
				});
		var requestStatusCdn = Ext.widget('mecombo', {
			        emptyText:'select',
					labelWidth : 40,
					width : 120,
					fieldLabel : '상태',
					displayField : 'name',
					valueField : 'code',
					queryMode : 'local',
					store : requestStatusStore

				})
		var likeCnd = Ext.widget('metext', {
			       labelWidth : 40,
			       width: 80
					
				})
		var likeComboCnd = Ext.widget('mecombo', {
			 emptyText:'select',
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
				region : 'north',
							height : 300,
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
							if (acc) {
								if( acc.type.name=="normal"){
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
								if(obj.name=="normal"){
								return "--"
								}
								return obj.name;
							}
							return null;
						}
					}]
		})
		

				me.items = [grid, tabPanel]
				me.callParent(arguments);
				var currentRequestCode;
				grid.on('itemclick', function(view, record, item, index, e,
						eOpts) {// 事件监听
							//console.log(Ext.encode(record.data))
							formGridStore.removeAll();
							var obj = record.data;
							var arr = new Array();
							arr.push(obj);
							formGridStore.loadData(arr);

						});
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
		

				function customernameRender(name) {
					// //console.log(customer);
					if (name != null) {
						return name.name;
					}
					return null;
				};
				function accidentRender(accident) {// value: current cell'field
					// value
					if (accident) {
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
				function handleLocationRender(handleLocation) {
					if (handleLocation) {
						return handleLocation.name;
					}
					return null;
				}

				function durationRender(duration) {
					if (duration) {
						return Ext.util.Format.date(new Date(duration.from),
								'Y-m-d')
								+ "~"
								+ Ext.util.Format.date(new Date(duration.to),
										'Y-m-d');
					}
					return null;
				}

			}

		});