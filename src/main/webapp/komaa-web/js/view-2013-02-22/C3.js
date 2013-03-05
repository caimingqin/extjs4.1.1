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
				var grid = Ext.create('Ext.grid.Panel', {
							region : 'north',
							height : 300,
							store : store,
							tbar : [{
										xtype : 'tbfill'
									}, searchBtn],
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
										text : '분류(wait5) ',
										flex : 1,
										dataIndex : 'wait'
									}, {
										text : '보험사 ',
										flex : 1,
										dataIndex : 'user',
										renderer : function(user) {
											if (user) {
												return user.name
											}
										}
									}, {
										text : '보고서번호',
										flex : 1,
										dataIndex : 'insurer'
									}, {
										text : '보험사 ',
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
				function search() {
					var queryObject = new QueryObject('SurveyRequest', '{}',
							null)
					AppContext.commandQuery(queryObject, function(contents) {
								//console.log(contents);
								store.loadData(Common.decode(contents));
							});
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