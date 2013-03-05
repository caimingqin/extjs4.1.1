Ext.define('view.C1', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.C1',
			initComponent : function() {
				var me = this;
				me.defaults = {
					split : true
				};
				me.bodyCls = 'background:#FFFFFF'
				// me.padding = '0 5 0 5';
				me.layout = 'border';
				me.height = 650;// height decide this if layout is card

				var formGridStore = Ext.create('Ext.data.Store', {
							model : 'HandleCourse'
						});
				var formGrid = Ext.create('Ext.grid.Panel', {
							// height : 300,
							scroll : true,
							anchor : '100% 100%',
							padding : 0,
							margin : 0,
							store : formGridStore,
							columns : [{
										text : '날짜',
										flex : 4,
										dataIndex : 'duration',
										renderer : durationRender
									}, {
										text : '진행사항',
										flex : 1,
										dataIndex : 'handleType',
										renderer : handleTypeRender
									}, {
										text : '지연사유',
										flex : 1,
										dataIndex : 'delayReason'
									}, {
										text : '담당자조치',
										flex : 1,
										dataIndex : 'measure'
									}]
						})

				var tabPanel = Ext.create('Ext.tab.Panel', {
							bodyStyle : 'background-color:#E9E9E9',
							region : 'center',
							items : [{
										layout : 'anchor',
										title : '진행사항',
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
										text : '접수일자 ',
										flex : 1,
										dataIndex : 'customer',
										renderer : function(customer) {
											if (customer) {
												return customer.name.name;
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
										text : '분류(wait5) ',
										flex : 1,
										dataIndex : 'wait'
									}, {
										text : '분류(',
										flex : 1,
										dataIndex : 'requestStatus'
										// ,
									// renderer : function(obj) {
									// if (obj) {
									// return obj.name;
									// }
									// }

								}	, {
										text : '분류(wait7) ',
										flex : 1,
										dataIndex : 'managementType'
									}, {
										text : '분류',
										flex : 1,
										dataIndex : 'accident',
										renderer : function(obj) {
											if (obj) {
												return obj.number;
											}
										}
									}, {
										text : '분류(wait9) ',
										flex : 1,
										dataIndex : 'managementType'
									}, {
										text : '분류 (wait10)',
										flex : 1,
										dataIndex : 'managementType'
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
							formGridStore.loadData(obj.handleCourse);
							me.layout.setActiveItem(1);

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