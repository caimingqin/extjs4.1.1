Ext.onReady(function() {
	Ext.create('Ext.window.Window', {
		resizable : false,
		draggable : false,
		height : 150,
		width : 400,
		title : 'Komaa손해사정 조사시스템 Login',
		closable : false,
		items : {
			xtype : 'fieldset',
			border : 0,
			layout : {
				type : 'vbox'
			},
			defaultType : 'textfield',
			items : [{
						id : 'name',
						xtype : 'textfield',
						allowBlank : false,
						value : 'admin',
						fieldLabel : '사용자ID'

					}, {
						id : 'pwd',
						xtype : 'textfield',
						inputType : 'password',
						value : '123456',
						allowBlank : false,
						fieldLabel : '암호'
					}]
		},
		bbar : [{
					xtype : 'tbfill'
				}, {
					xtype : 'mebutton',
					text : 'Login',
					width : 60,
					handler : function() {
						var name = Ext.getCmp("name").getValue();
						var pwd = Ext.getCmp("pwd").getValue();
						//console.log(name + "," + pwd);
				
								+ "uname=" + name + "&passwd=" + pwd;
						Ext.Ajax.request({
									url : url,
									method : 'GET',
									success : function(resp) {
									//	alert(Ext.encode(resp));
										//console.log(Ext.encode(resp));
										var resObject = Ext
												.decode(resp.responseText);

										var loginUser = resObject.contents;
										window.location.href = 'index.htm'
//												+ loginUser.code;
										document.cookie="loginUserCode="+loginUser.code;
										document.cookie="roleCode="+loginUser.userRole.code;

									},
									failure : function(resp, options) {
										Ext.Msg.alert(resp.responseText);
									}
								});

					}
				}]
	}).show();
});
