Ext.define('view.C2', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.C2',
			initComponent : function() {
				var me = this;
				me.padding = '0 0 0 5';
				me.layout = 'anchor';
				me.height = 650;
				me.defaults = {
					split : true
				};
				var combo1 = Ext.widget('mecombo', {
							width : 60
						});
				var combo2 = Ext.widget('mecombo', {
							width : 60
						});
				var date1 = Ext.widget('medate', {
							width : 100
						});
				var date2 = Ext.widget('medate', {
							width : 100
						});
				var combo3 = Ext.widget('mecombo', {});
				var combo4 = Ext.widget('mecombo', {});
				var combo5 = Ext.widget('mecombo', {});
				var text = Ext.widget('metext', {});
				var btn = Ext.widget('mebutton', {
							text : '조회'
						});

						//지점		전월미결	발생	처리	취소	미결	현재미결

				var grid = Ext.create('Ext.grid.Panel', {
							anchor : '100% 99%',
							tbar : [date1, date2, combo3, btn],
							columns : [{
										text : '지점',
										flex : 1,
										dataIndex : 'id'
									}, {
										text : '전월미결',
										flex : 1,
										dataIndex : 'id'
									}, {
										text : '발생',
										flex : 1,
										dataIndex : 'name'
									}, {
										text : '처리',
										flex : 1,
										dataIndex : 'name'
									}, {
										text : '취소',
										flex : 1,
										dataIndex : 'level'
									}, {
										text : '미결',
										flex : 1,
										dataIndex : 'id'
									}, {
										text : '현재미결',
										flex : 1,
										dataIndex : 'id'
									}]
						})

				this.items = [grid];
				this.callParent(arguments);

			}
		});
