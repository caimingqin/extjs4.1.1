Ext.define('view.C4', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.C4',
			initComponent : function() {
				var me = this;
				me.border = false;
				me.bodyCls = 'background:#FFFFFF'
				// me.padding = '0 5 0 5';
				me.layout = 'border';
				me.height = 650;// height decide this if layout is card

				var formGridStore = Ext.create('Ext.data.Store', {
							model : 'Meenwon'
						});
				var formGrid = Ext.create('Ext.grid.Panel', {
							height : 140,
							scroll : true,
							padding : 0,
							margin : 0,
							store : formGridStore,
							columns : [{
										text : '민원일',
										flex : 1,
										dataIndex : 'postDate',
										renderer : function(obj) {
											if (obj) {
												return Common.yyyy_MM_dd(obj);
											}
										}
									}, {
										text : '종료일',
										flex : 1,
										dataIndex : 'endDate',
										renderer : function(obj) {
											if (obj) {
												return Common.yyyy_MM_dd(obj);
											}
										}

									}, {
										text : '민원유형',
										flex : 1,
										dataIndex : 'type',
										renderer : Common.defaultRender
									}]
						})

				var tabPanel = Ext.create('Ext.tab.Panel', {
							bodyStyle : 'background-color:#E9E9E9',
							region : 'center',
							items : [{
										title : '민원상세정보',
										items : [formGrid]
									}]

						})
				var store = Ext.create('Ext.data.Store', {
							model : 'SurveyRequest'
						});

				var searchBtn = Ext.widget('mebutton', {
							text : '추가',
							handler : search,
							code : 'searchBtn'
						})
				var grid = Ext.create('Ext.grid.Panel', {
							region : 'north',
							height : 300,
							store : store,
							tbar : [{
										xtype : 'tbfill'
									},searchBtn],
							columns : [{
										text : '보고서번호',
										flex : 1,
										dataIndex : 'customer',
										renderer : function(obj) {
											if (obj) {
												return obj.name.name;
											}
										}
									}, {
										text : '분류',
										flex : 1,
										dataIndex : 'insurer'
									}, {
										text : '보험사 ',
										flex : 1,
										dataIndex : 'department',
										renderer : function(obj) {
											if (obj) {
												return obj.name
											}
										}
									}, {
										text : '보고서번호',
										flex : 1,
										dataIndex : 'user',
										renderer : function(obj) {
											if (obj) {
												return obj.name
											}
										}
									}, {
										text : '보험사 ',
										flex : 1,
										dataIndex : 'requestStatus'
									}, {
										text : '보험계약자',
										flex : 1,
										dataIndex : 'accident',
										renderer : function(obj) {
											if (obj) {
												return obj.number
											}
										}

									}]
						})

				me.items = [grid, tabPanel]
				me.callParent(arguments);
				grid.on('itemclick', function(view, record, item, index, e,
						eOpts) {// 事件监听
							//console.log(Ext.encode(record.data))
							formGridStore.removeAll();
							var obj = record.data;
							searchMeenwon(obj.code)

						});

				function searchMeenwon(currentRequestCode) {
					var queryObject = new QueryObject('Meenwon',
							"{requestCode:" + Common.read(currentRequestCode)
									+ "}", null);
					//console.log("searchMeenwon:" + Ext.encode(queryObject));
					AppContext.commandQuery(queryObject, function(contents) {
								//console.log(contents);
								formGridStore.loadData(Common.decode(contents));
							});
				}
				function search() {
					var queryObject = new QueryObject('SurveyRequest', '{}',
							null)
					AppContext.commandQuery(queryObject, function(contents) {
								//console.log(contents);
								store.loadData(Common.decode(contents));
							});
				}

			}

		});