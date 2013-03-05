Ext.define('view.Home', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.Home',
			initComponent : function() {
				var me = this;
				me.layout = 'border';
				me.height = 650;
				me.defaults = {
					split : true
				};

				var leftGridStore = Ext.create('Ext.data.Store', {
							model : 'ConsMessage',
							sorters: [{
						         property: 'created',
						         direction: 'DESC'
						     }]
						});
				var leftGrid = Ext.create('Ext.grid.Panel', {
							region : 'west',
							store : leftGridStore,
							height : 650,
							width : 400,
							columns : [{
										text : 'TASK',
										flex : 1,
										dataIndex : 'name',
										renderer : function(name) {
											return "접수사항"
										}
									}, {
										text : '생성일자',
										flex : 1,
										dataIndex : 'created',
										renderer : Common.yyyy_MM_dd
									}]
						})
				var rGridStore = Ext.create('Ext.data.Store', {
							model : 'ConsMessage'
						});
				var rGrid = Ext.create('Ext.grid.Panel', {
							anchor : '100% 50%',
							store : rGridStore,
							columns : [{
										text : '공지사항',
										flex : 1,
										dataIndex : 'name'
									}, {
										text : '생성일자',
										flex : 1,
										dataIndex : 'body'
									}]
						})
				var nGridStore = Ext.create('Ext.data.Store', {
							model : 'Invoice',
							sorters: [{
						         property: 'postDate',
						         direction: 'DESC'
						     }]
						});
				// YIL("00", "일비"), TRAN_COST("01", "여비교통비"),
				// DOC_COST("02", "서류발급비"),
				// YILIAO_CONSOL_COST("03", "의료자문의뢰비"),
				// FALV_CONSOL_COST("04", "법률자문의뢰비");
				var nGrid = Ext.create('Ext.grid.Panel', {
							anchor : '100% 50%',
							store : nGridStore,
							columns : [{
										text : 'INVOICE',
										flex : 1,
										dataIndex : 'type',
										renderer : function(type) {
											if (type == "YIL") {
												return "일비";
											} else if (type == "TRAN_COST") {
												return "여비교통비";
											} else if (type = "DOC_COST") {
												return "서류발급비";
											} else if (type = "YILIAO_CONSOL_COST") {

												return "의료자문의뢰비";
											} else {
												"법률자문의뢰비"
											}
										}
									}, {
										text : '생성일자',
										flex : 1,
										dataIndex : 'postDate'
										,
										renderer : function(value){
											if(value){
											return value.substring(0,4)+"-"+value.substring(4,6)+"-"+value.substring(6,8);
											}
										return null;
										}
									}, {
										text : '금액',
										flex : 1,
										dataIndex : 'amount'
									}]
						})

				var panel = Ext.create('Ext.panel.Panel', {
							region : 'center',
							layout : "anchor",
							items : [rGrid, nGrid]
						});
				me.items = [leftGrid, panel];
				me.callParent(arguments);

				leftGrid.on('itemdblclick', function(view, record, item, index,
								e, eOpts) {
							var obj = record.data;
							cancelConsMessage(obj.obsId);
						})

				function cancelConsMessage(obsId) {

					var obj = {};
					obj.obsId = obsId;
					var postData = new PostData("cancelConsMessageCommand", Ext
									.encode(obj));
					AppContext.command(postData, function(reps) {
								if(Common.success(reps)){
								   var rec=leftGridStore.findRecord('obsId',obsId);
								    leftGridStore.remove(rec);
								}
							})
				}

				function loadConsMessage() {
														
					var leftArray = [];
					var rightArray = [];
					var queryObject = new QueryObject('ConsMessage',
							"{'status':'NONE'}", null);
					AppContext.commandQuery(queryObject, function(contents) {
								// var array = Common.decode(contents);
								// for (var index = 0; index < array.length;
								// index++) {
								// var item = array[index];
								// if (item.type.category == 'TASK') {
								// leftArray.push(item);
								// } else {
								// rightArray.push(item);
								// }
								// }
								leftGridStore.loadData(Common.decode(contents));
								
								rGridStore.loadData(rightArray);
							});

				}

				function loadInvoice() {
					var queryObject = new QueryObject('Invoice', '{}', null)
					AppContext.commandQuery(queryObject, function(contents) {
								// console.log(contents);
								nGridStore.loadData(Common.decode(contents));
							});
				}

				loadConsMessage();
				loadInvoice();
			}// initComponent end

		});
