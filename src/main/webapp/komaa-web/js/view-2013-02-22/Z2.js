Ext.define('view.Z2', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.Z2',
	initComponent : function() {
		var me = this;
		me.layout = 'border';
		me.height = 650;
		me.defaults = {
			split : true
		};

		var code = Ext.widget('metext', {
					fieldLabel : '보험사코드',
					readOnly : true
				});
		var nameCmp = Ext.widget('metext', {
					fieldLabel : '보험사명',
					allowBlank : false
				});
		var sname = Ext.widget('metext', {
					fieldLabel : '약식명',
					width : 400
				});

		var typeCode = Ext.widget('mecombo', {
					fieldLabel : '보험사분류',
					valueField : 'code',
					displayField : 'name',
					store : customerTypeStore,
					queryMode : 'local',
					allowBlank : false
				});
		var managementType = Ext.widget('mecombo', {
					fieldLabel : '종별',
					valueField : 'code',
					displayField : 'name',
					store : managementTypeStore,
					queryMode : 'local',
					allowBlank : false
				});
		var accountCode = Ext.widget('metext', {
					fieldLabel : '입금계좌'
				});
		var homePageAddress = Ext.widget('metext', {
					fieldLabel : '홈페이지주소',
					width : 700

				});
		var prmAddress = Ext.widget('metext', {
					fieldLabel : 'PRM주소',
					width : 700

				});
		var description = Ext.widget('metext', {
					fieldLabel : '비고',
					width : 700

				});

		var mobile = Ext.widget('metext', {
					fieldLabel : 'HP',
					width : 300

				});
		var phone = Ext.widget('metext', {
					fieldLabel : 'Tel.',
					width : 300

				});

		var a = Ext.widget('fieldset', {
					border : false,
					items : [code, nameCmp, sname, typeCode, managementType,
							accountCode, homePageAddress, prmAddress,
							description, mobile, phone]
				})

		var b1 = Ext.widget('panel', {
					width : 100,
					height : 50
				});
		var changingImage = Ext.create('Ext.Img', {
			src : 'http://www.sencha.com/img/20110215-feat-html5.png',
			width : 200,
			height : 200
			});
		var b2 = Ext.widget('filefield', {
					name : 'photo',
					width : 300,
					buttonText : '찾아보기'
				});

		// upload start

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
					datas.code = "123333";
					var commandTranslate = {};
					commandTranslate.commandName = "UploadFileCommand";
					commandTranslate.contents = Ext.encode(datas);
					// console.log(Ext.encode(commandTranslate));
					CommandTranslate.setValue(Ext.encode(commandTranslate));
					var form = this.up('form').getForm();
					if (form.isValid()) {
						form.submit({
							url : 'http://1.232.123.197:9000/komaa/commandHandler.shtml',
							waitMsg : 'Uploading your photo...',
							failure : function(form, action) {
								// console.log(action.result.contents);
								changingImage.setSrc(action.result.contents);
								Ext.Msg.alert('ok', action.result
												? action.result.contents
												: 'No response');
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

		var ename = Ext.widget('metext', {
					fieldLabel : '영문명'
				});
		// var b4 = Ext.widget('combo', {
		// fieldLabel : '합병사'
		// });
		var b2b = Ext.widget('mecheckbox', {
					boxLabel : 'B2B제공여부',
					name : 'supportB2B'
				});
		// TODO
		var b = Ext.widget('fieldset', {
					border : false,
					items : [changingImage, uploadForm, ename, b2b]
				})
		var part1 = Ext.widget('fieldset', {
					// title : 'part1',
					padding : 5,
					border : false,
					layout : 'hbox',
					items : [a, b]
				})
		var aa1 = Ext.widget('mecombo', {
					fieldLabel : '보고서형식'
				});
		var aa2 = Ext.widget('fieldcontainer', {
					fieldLabel : '담당팀장',
					items : [{
								xtype : 'metext'
							}]
				})
		var aa3 = Ext.widget('meradiogroup', {
					value : 'aa3',
					fieldLabel : '전산전송여부',
					columns : 2,
					vertical : true,
					width : 300,
					items : [{
								boxLabel : '예',
								name : 'aa3',
								inputValue : '1'
							}, {
								boxLabel : '아니오',
								name : 'aa3',
								inputValue : '2',
								checked : true
							}

					]
				})
		var aa = Ext.widget('fieldset', {
					border : false,
					items : [aa1, aa2, aa3]
				});
		var bb1 = Ext.widget('mecombo', {
					fieldLabel : '사고번호출력'
				});
		var bb2 = Ext.widget('mecombo', {
					fieldLabel : '결재팀장통보'
				});
		var bb3 = Ext.widget('meradiogroup', {
					value : 'bb3',
					fieldLabel : '보고서확인',
					columns : 2,
					vertical : true,
					width : 300,
					items : [{
								boxLabel : '예',
								name : 'bb3',
								inputValue : '1'
							}, {
								boxLabel : '아니오',
								name : 'bb3',
								inputValue : '2',
								checked : true
							}

					]
				})
		var bb = Ext.widget('fieldset', {
					border : false,
					items : [bb1, bb2, bb3]
				});

		var part2 = Ext.widget('fieldset', {
					// title : 'part2',
					padding : 10,
					border : false,
					layout : 'hbox',
					padding : 0,
					items : [aa, bb]
				});

		var aaa1 = Ext.widget('mecombo', {
					fieldLabel : '계산서발행구분'
				});
		var aaa2 = Ext.widget('mecombo', {
					fieldLabel : '개별발행여부'
				});
		var aaa = Ext.widget('fieldset', {
					border : false,
					items : [aaa1, aaa2]
				});
		var bbb1 = Ext.widget('mecombo', {
					fieldLabel : '전자발행여부'
				});

		var bbb = Ext.widget('fieldset', {
					border : false,
					items : [bbb1]
				});

		var part3 = Ext.widget('fieldset', {
					// title : 'part3',
					padding : 10,
					border : false,
					padding : 0,
					layout : 'hbox',
					items : [aaa, bbb]
				});
		// TODO
		var store = Ext.create('Ext.data.Store', {
					// model : 'Customer',
					fields : ['code', 'name', 'customerType', 'homePage',
							'prmAddress', 'description', 'supportB2B',
							'managementType', 'imageUrl', 'imageName']
				});
		var searchBtn = Ext.widget('mebutton', {
					text : '검색',
					handler : find,
					code : 'searchBtn',
					hidden : true
				})
		var grid = Ext.widget('grid', {
					region : 'north',
					height : 200,
					store : store,
					tbar : [{
								xtype : 'tbfill'
							}, searchBtn],
					columns : [{
								text : '코드',
								flex : 1,
								dataIndex : 'code'
							}, {
								text : '약식명',
								flex : 1,
								dataIndex : 'name',
								renderer : function(name) {
									if (name != null) {
										return name.name;
									}
									return null;
								}
							}, {
								text : '보험사명',
								flex : 1,
								dataIndex : 'name',
								renderer : function(name) {
									if (name != null) {
										return name.simpleName;
									}
									return null;
								}
							}, {
								text : '분류',
								flex : 1,
								dataIndex : 'customerType',
								renderer : function(customerType) {
									if (customerType != null) {
										return customerType.name;
									}
									return null;
								}
							}, {
								text : '거래계좌',
								flex : 1,
								dataIndex : 'accountCode'
							}]
				})

		var createBtn = Ext.widget('mebutton', {
					text : '추가 ',
					handler : create,
					code : 'createBtn',
					hidden : true
				})
		var editBtn = Ext.widget('mebutton', {
					text : 'edit ',
					handler : edit,
					code : 'editBtn',
					hidden : true
				})
		var saveBtn = Ext.widget('mebutton', {
					text : '저장 ',
					handler : save,
					code : 'saveBtn',
					hidden : true
				})
		var tabPanel = Ext.widget('tabpanel', {

					region : 'center',
					items : [{
								bodyStyle : 'background-color:#E9E9E9',
								title : '기본정보',
								tbar : [{
											xtype : 'tbfill'
										}, editBtn, createBtn, saveBtn],
								items : [part1]
							}

							, {
								bodyStyle : 'background-color:#E9E9E9',
								title : '계산서정보',
								items : [part3]
							}]
				})
		me.items = [grid, tabPanel]
		this.callParent(arguments);
		// TODO itemclick

		grid.on('itemclick', function(view, record, item, index, e, eOpts) {
					initReadOnly(true);
					var obj = record.data;
					// console.log(Ext.encode(obj));
					Common.setValue(code, obj.code);
					Common.setValue(typeCode, obj.customerType.code);
					Common.setValue(homePageAddress, obj.homePage);
					Common.setValue(prmAddress, obj.prmAddress);
					Common.setValue(description, obj.description);
					Common.setValue(nameCmp, obj.name.name);
					Common.setValue(sname, obj.name.simpleName);
					Common.setValue(ename, obj.name.enName);
					Common.setValue(phone, obj.phone);
					Common.setValue(mobile, obj.mobile);
					Common.setValue(accountCode, obj.accountCode);
					Common.setValue(b2b, obj.supportB2B);
					// console.log(obj.managementType);
					Common.setValue(managementType, obj.managementType.code);
					// console.log(obj.imageUrl);
					changingImage.setSrc(obj.imageUrl);

				});
		visibleBtn();
		function visibleBtn() {
			var rolePage = Common.getRolePage(rolePages, "Z2");
			// console.log(rolePage);
			var btns = rolePage.buttons;
			for (var i = 0; i < btns.length; i++) {
				var visibleBtnCode = btns[i].code;
				if (visibleBtnCode == saveBtn.code) {
					// console.log(visibleBtnCode == saveBtn.code);
					Common.visibleBtn(saveBtn);
				} else if (visibleBtnCode == searchBtn.code) {
					Common.visibleBtn(searchBtn);
				} else if (visibleBtnCode == createBtn.code) {
					Common.visibleBtn(createBtn);
				} else if (visibleBtnCode == editBtn.code) {
					Common.visibleBtn(editBtn);
				}
			}
		}
		function create() {
			// Common.empty(typeCode,obj.customerType.code);
			Common.empty(code);
			Common.setValue(typeCode, '00');
			Common.empty(homePageAddress);
			Common.empty(prmAddress);
			Common.empty(description);
			Common.empty(nameCmp);
			Common.empty(sname);
			Common.empty(ename);
			Common.empty(phone);
			Common.empty(mobile);
			Common.empty(accountCode);
			Common.empty(b2b);
			Common.empty(managementType);
			initReadOnly(false);

		}

		function initReadOnly(mboolean) {
			// Common.setReadOnly(code, mboolean);
			Common.setReadOnly(typeCode, mboolean);
			Common.setReadOnly(homePageAddress, mboolean);
			Common.setReadOnly(prmAddress, mboolean);
			Common.setReadOnly(description, mboolean);
			Common.setReadOnly(nameCmp, mboolean);
			Common.setReadOnly(sname, mboolean);
			Common.setReadOnly(ename, mboolean);
			Common.setReadOnly(phone, mboolean);
			Common.setReadOnly(mobile, mboolean);
			Common.setReadOnly(accountCode, mboolean);
			Common.setReadOnly(b2b, mboolean);
			Common.setReadOnly(managementType, mboolean);

		}

		function edit() {
			initReadOnly(false);
		}
		function save() {
			if (Common.isNull(nameCmp)) {
				alert("name is null");
				return;
			}
			if (Common.isNull(managementType)) {
				alert("managementType is null");
				return;
			}
			if (Common.isNull(typeCode)) {
				alert("type is null");
				return;
			}

			var obj = {};
			var managementTypeCode = managementType.getValue();
			obj.code = code.getValue();
			obj.managementTypeCode = managementTypeCode;
			obj.btb = b2b.getValue();
			obj.name = nameCmp.getValue();
			obj.sname = sname.getValue();
			obj.ename = ename.getValue();
			obj.typeCode = typeCode.getValue();
			obj.accountCode = accountCode.getValue();
			obj.homePageAddress = homePageAddress.getValue();
			obj.prmAddress = prmAddress.getValue();
			obj.description = description.getValue();
			obj.mobile = mobile.getValue();
			obj.phone = phone.getValue();
			obj.imageUrl = changingImage.src;
			var postData = new PostData('createCustomer', Ext.encode(obj));
			// console.log(postData);
			AppContext.command(postData, function(reps) {
						alert(reps);
					});
		}

		function find() {
			var queryObject = new QueryObject('Customer', '{}', null);
			AppContext.commandQuery(queryObject, function(contents) {
						// console.log(contents);
						store.loadData(Common.decode(contents));
					});
		}

	}// initComponent end

});
