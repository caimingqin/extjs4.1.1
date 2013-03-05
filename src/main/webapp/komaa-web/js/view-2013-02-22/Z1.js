Ext.define('view.Z1', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.Z1',
	initComponent : function() {
		var me = this;
		me.layout = 'border', me.height = 650, me.defaults = {
			split : true
		};
		var left = Ext.widget('panel', {
					width : 180,
					height : 200,
					html : '   ',
					bbar : [{
								xtype : 'tbfill'
							}, {
								text : 'photo'
							}, {
								xtype : 'tbfill'
							}]
				})
		var code = Ext.create('Ext.form.FieldContainer', {
					layout : 'hbox',
					items : [{
								itemId : 'code',
								readOnly : true,
								xtype : 'textfield',
								fieldLabel : '사원번호',
								readOnly : true

							}]
				});
		var name = Ext.create('Ext.form.field.Text', {
					fieldLabel : '성명',
					allowBlank : false
				});
		var password = Ext.create('Ext.form.field.Text', {
					fieldLabel : '비밀번호',
					inputType : 'password',
					allowBlank : false
				});
		// var a4 = Ext.create('Ext.form.field.ComboBox', {
		// fieldLabel : '부서',
		// name : 'level',
		// queryMode : 'local',
		// emptyText : 'Select a level...'
		//
		// })

		var departmenTree = Ext.create('Ext.ux.TreePicker', {
					fieldLabel : '부서',
					store : deptTreeStore,
					displayField : 'name',
					allowBlank : false
				});

		var a = Ext.create('Ext.form.FieldSet', {
					border : false,
					padding : '0 0 0 10',
					bodyPadding : 0,
					defaults : {
						width : 400,
						labelWidth : 100
					},
					items : [code, name, password, departmenTree]

				});

		var ids = Ext.create('Ext.form.field.Text', {
					fieldLabel : '아이디'
				});
		var jumin = Ext.create('Ext.form.field.Text', {
					fieldLabel : '주민번호'
				});
		var password2 = Ext.create('Ext.form.field.Text', {
					fieldLabel : '비밀번호확인',
					inputType : 'password'
				});
		var roleCode = Ext.create('Ext.form.field.ComboBox', {
					fieldLabel : '사용자롤',
					name : 'roleCode',
					queryMode : 'local',
					displayField : 'name',
					valueField : 'code',
					store : roleTypeStore,
					allowBlank : false

				})

		var b = Ext.create('Ext.form.FieldSet', {
					border : false,
					padding : '0 0 0 10',
					defaults : {
						width : 400,
						labelWidth : 100
					},
					items : [ids, jumin, password2, roleCode]

				});

		var part1 = Ext.create('Ext.form.FieldSet', {
					bodyStyle : 'background-color:#E9E9E9',
					// renderTo : Ext.getBody(),
					padding : 10,
					// title : 'part1',
					border : false,
					layout : 'hbox',
					items : [left, a, b]

				});

		// part1 end

		// part2 start

		var level = Ext.create('Ext.form.field.ComboBox', {
					fieldLabel : '직급',
					queryMode : 'local',
					emptyText : 'Select a level...',
					store : hrLevelStore,
					valueField : 'code',
					displayField : 'name'

				});

		var mobile = Ext.create('Ext.form.field.Text', {
					fieldLabel : '핸드폰'
				});
		var schoolClass = Ext.create('Ext.form.field.Text', {
					fieldLabel : '학과'
				});
		var inDate = Ext.widget('medate', {
					fieldLabel : '입사일',
					value : new Date()

				});
		var birthday = Ext.create('Ext.form.FieldContainer', {
					layout : 'hbox',
					items : [{
								itemId : 'birthday',
								xtype : 'medate',
								fieldLabel : '생년월일'

							}, {
								xtype : 'radiogroup',
								columns : 2,
								vertical : true,
								items : [{
											boxLabel : '음력',
											name : 'rb',
											inputValue : '1'
										}, {
											boxLabel : '양력',
											name : 'rb',
											inputValue : '2',
											checked : true
										}

								]
							}]
				});
		var lastSchool = Ext.create('Ext.form.field.Text', {
					fieldLabel : '최종출신학교'
				});

		var aa11 = Ext.widget('mefc', {
					padding : 0,
					margin : 0,
					layout : 'hbox',
					width : 400,
					items : [{
								xtype : 'mecombo',
								fieldLabel : '사용자롤'
							}]
				});

		var email = Ext.widget('mefc', {
					width : 400,
					padding : 0,
					margin : 0,
					items : [{
								itemId : 'email',
								xtype : 'metext',
								fieldLabel : '이메일'
							}]
				})

		var companyPhone = Ext.widget('mefc', {
					padding : 0,
					margin : 0,
					width : 400,
					layout : 'hbox',
					items : [{
								itemId : 'companyPhone',
								xtype : 'metext',
								fieldLabel : '회사/내선'
							}
					// , {
					// xtype : 'melabel',
					// text : '-'
					// }, {
					// xtype : 'metext'
					// }
					]
				});
		var phone = Ext.widget('mefc', {
					padding : 0,
					margin : 0,
					width : 400,
					layout : 'hbox',
					items : [{
								itemId : 'phone',
								xtype : 'metext',
								fieldLabel : '집전화'
							}]
				});

		var weedingDay = Ext.widget('mefc', {
					padding : 0,
					margin : 0,
					width : 400,
					layout : 'hbox',
					items : [{
								itemId : 'weedingDay',
								xtype : 'medate',
								fieldLabel : '결혼기념일'
							}]
				});
		var address = Ext.widget('mefc', {
					padding : 0,
					margin : 0,
					labelAlign : 'middle',
					fieldLabel : '주소',
					layout : 'vbox',
					items : [{
								itemId : 'address',
								xtype : 'metext',
								margin : '5 0 0 0',
								width : 400
							}]
				});

		var part2Left = Ext.widget('mefc', {

					items : [level, mobile, schoolClass, inDate, birthday,
							address]
				})
		var part2Right = Ext.widget('mefc', {

					items : [lastSchool, email, companyPhone, phone, weedingDay]
				})

		var part2 = Ext.create('Ext.form.FieldSet', {
					// title : 'part2',
					padding : 10,
					border : false,
					layout : 'hbox',
					// width : 1000,
					items : [part2Left, part2Right]

				});
		// var part2 = Ext.create('Ext.form.FieldSet', {
		// // title : 'part2',
		// padding : 10,
		// border : false,
		// layout : 'vbox',
		// // width : 1000,
		// items : [level, mobile, schoolClass, inDate, birthday,
		// lastSchool, email, companyPhone, phone, weedingDay,
		// address]
		//
		// });
		// tab3
		var surveyStore = Ext.create('Ext.data.Store', {
					model : 'SurveyRequest'
				});

		var surveyGrid = Ext.create('Ext.grid.Panel', {
					height : 200,
					width : 200,
					store : surveyStore,
					columns : [{
								text : '문서번호 ',
								flex : 1,
								dataIndex : 'documentNumber'
							}]
				})
		var userBindCode = Ext.widget('metext', {
					readOnly : true,
					fieldLabel : '사원번호 '
				});
		var survyBindCode = Ext.widget('metext', {
					readOnly : true,
					fieldLabel : '부서코드 '
				});

		var bindFC = Ext.widget('mefc', {
					items : [survyBindCode, userBindCode]
				})

		function findSurveyStore(deptCode) {
			var queryObject = new QueryObject('SurveyRequest',
					"{'department.code':" + Common.read(deptCode) + "}", null);
			AppContext.commandQuery(queryObject, function(contents) {
						surveyStore.loadData(Common.decode(contents));
					});
		}

		surveyGrid.on('itemclick', function(view, recoder) {
					Common.setValue(survyBindCode, recoder.get('code'));
				})
		// tab3 end
		var store = Ext.create('Ext.data.Store', {
					model : 'User'
				});
		var searchBtn = Ext.widget('mebutton', {
			text : '조회',
			handler : find,
			code : 'searchBtn'
				// ,
				// hidden : true
			})
		var grid = Ext.create('Ext.grid.Panel', {
					region : 'north',
					height : 300,
					store : store,
					tbar : [{
								xtype : 'tbfill'
							}, searchBtn],
					columns : [{
								text : '사원번호 ',
								flex : 1,
								dataIndex : 'code'
							}, {
								text : '사원명 ',
								flex : 1,
								dataIndex : 'name'
							}, {
								text : '부서명 ',
								flex : 1,
								dataIndex : 'department',
								renderer : deparmentRender
							}, {
								text : '레벨 ',
								flex : 1,
								dataIndex : 'userRole',
								renderer : function(userRole) {
									if (userRole != null) {
										return userRole.name;
									}
									return null;
								}
							}, {
								text : 'status',
								flex : 1,
								dataIndex : 'status'
							}]
				})
		var createBtn = Ext.widget('mebutton', {
			text : '신규추가 ',
			handler : createPart1,
			code : 'createBtn'
				// ,
				// hidden : true
			})
		var editBtn = Ext.widget('mebutton', {
			text : '수정모드 ',
			handler : editPart1,
			code : 'editBtn'
				// ,
				// hidden : true
			})
		var saveBtn = Ext.widget('mebutton', {
			text : '저장 ',
			handler : savePart1,
			code : 'saveBtn'
				// ,
				// hidden : true
			})
		var tabPanel = Ext.create('Ext.tab.Panel', {
					// hidden : true,
					// closable : true,
					// closeAction : 'hide',
					// collapsible : true,
					// collapseDirection : 'bottom',
					// collapseMode : 'header',
					region : 'center',
					items : [{
								bodyStyle : 'background-color:#E9E9E9',
								title : '기본정보 ',
								tbar : [{
											xtype : 'tbfill'
										}, createBtn, editBtn, saveBtn],
								items : [part1]
							}, {
								bodyStyle : 'background-color:#E9E9E9',
								title : '부가정보 ',
								tbar : [{
											xtype : 'tbfill'
										}, {
											xtype : 'mebutton',
											text : '추가',
											handler : createPart2
										}, {
											xtype : 'mebutton',
											text : '저장 ',
											handler : savePart2
										}],
								items : [part2]
							}, {
								bodyStyle : 'background-color:#E9E9E9',
								title : '부서별 ',
								layout : 'hbox',
								tbar : [{
											xtype : 'tbfill'
										}, {
											xtype : 'mebutton',
											text : 'bind',
											handler : bind
										}],
								items : [surveyGrid, bindFC]
							}],
					doClose : function() {
						tabPanel.animate({
									duration : 1000,
									to : {
										y : 12
									},
									listeners : {
										beforeanimate : function() {
											// Execute my custom method
											// before the animation
											// console.log('beforeanimate');
										},
										afteranimate : function() {
											// Execute my custom method
											// after the animation
											// console.log('afteranimate');
											grid.setHeight(650);
											tabPanel.setVisible(false);

										}
									}
								});

					}
				})

		me.items = [grid, tabPanel];
		me.callParent(arguments);
		var birthdayItem = birthday.getComponent('birthday');
		var weedingDayItem = weedingDay.getComponent('weedingDay');

		// conact
		var emailItem = email.getComponent('email');
		var compnayPhoneItem = companyPhone.getComponent('companyPhone');
		var addressItem = address.getComponent('address');
		var phoneItem = phone.getComponent('phone');
		var codeItem = code.getComponent('code');
		grid.on('itemclick', function(view, record, item, index, e, eOpts) {// 事件监听
					// console.log(record);
					createPart1();
					createPart2();
					grid.setHeight(297);
					tabPanel.setVisible(true);
					var obj = record.data;
					initPart1ReadOnly(true);
					// console.log(Ext.encode(obj))
					if(obj.department){
					Common.setValue(departmenTree, obj.department.code);
					findSurveyStore(obj.department.code);
					}
					Common.setValue(userBindCode, obj.code);
					Common.setValue(codeItem, obj.code);
					Common.setValue(name, obj.name);
					Common.setValue(ids, obj.ids);
					Common.setValue(password, obj.password);
					Common.setValue(password2, obj.password);
					if (obj.contact) {
						Common.setValue(emailItem, obj.contact.email);
						Common.setValue(compnayPhoneItem,
								obj.contact.companyPhone);
						Common.setValue(mobile, obj.contact.mobile);
						Common.setValue(addressItem, obj.contact.address);
						Common.setValue(phoneItem, obj.contact.phone);
					}
					if (obj.hrInfo) {
						Common.setValue(birthdayItem,
								new Date(obj.hrInfo.birthday.theDay));
						Common.setValue(weedingDayItem,
								new Date(obj.hrInfo.weedingDay));
						Common.setValue(inDate, new Date(obj.hrInfo.inDate));
						Common.setValue(lastSchool, obj.hrInfo.shcool.name);
						Common.setValue(schoolClass,
								obj.hrInfo.shcool.schoolClass);
						Common.setValue(level, obj.hrInfo.hrLevel.code);
					}
					Common.setValue(jumin, obj.jumin);
					Common.setValue(roleCode, obj.userRole.code);

				});
		// visibleBtn();
		function visibleBtn() {
			var rolePage = Common.getRolePage(rolePages, "Z1");
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
		function createPart1() {
			loadDeptTreeStore();
			initPart1ReadOnly(false);
			Common.empty(codeItem);
			Common.empty(departmenTree);
			Common.empty(name);
			Common.empty(ids);
			Common.empty(password);
			Common.empty(password2);
			Common.empty(jumin);
			Common.empty(roleCode);

		}

		function initPart1ReadOnly(mboolean) {
			Common.setReadOnly(departmenTree, mboolean);
			Common.setReadOnly(name, mboolean);
			Common.setReadOnly(ids, mboolean);
			Common.setReadOnly(password, mboolean);
			Common.setReadOnly(password2, mboolean);
			Common.setReadOnly(jumin, mboolean);
			Common.setReadOnly(roleCode, mboolean);

		}
		function editPart1() {
			initPart1ReadOnly(false);
		}
		function savePart1() {
			var obj = {};
			if (Common.isNull(name)) {
				alert("name is null");
				return;
			}
			if (Common.isNull(password)) {
				alert("password is null");
				return;
			}
			if (Common.isNull(roleCode)) {
				alert("role is null");
				return;
			}
			if (Common.isNull(departmenTree)) {
				alert("department is null");
				return;

			}
			if (password.getValue() != password2.getValue()) {
				alert('password is not same');
				return;
			}
			obj.code = codeItem.getValue();
			obj.name = name.getValue();
			obj.password = password.getValue();
			obj.deptCode = departmenTree.getValue();
			obj.ids = ids.getValue();
			obj.roleCode = roleCode.getValue();
			obj.jumin = jumin.getValue();
			var postData = new PostData('createUser', Ext.encode(obj));
			console.log(postData);
			AppContext.command(postData, function(reps) {
						alert(reps);
					})

		}

		function find() {
			var queryObject = new QueryObject('User', '{}', null);
			AppContext.commandQuery(queryObject, function(contents) {
						// console.log(contents);
						store.loadData(Common.decode(contents));
					});
		}

		function createPart2() {
			Common.empty(level);
			Common.empty(emailItem);
			Common.empty(compnayPhoneItem);
			Common.empty(mobile);
			Common.empty(addressItem);
			Common.empty(phoneItem);
			Common.empty(birthdayItem);
			Common.empty(weedingDayItem);
			Common.empty(lastSchool);
			Common.empty(schoolClass);
			Common.empty(inDate);

		}

		function savePart2() {
			var obj = {};
			obj.userCode = codeItem.getValue();
			obj.phone = phone.getComponent('phone').getValue();
			obj.mobile = mobile.getValue();
			obj.weedingDay = weedingDay.getComponent('weedingDay').getValue();
			obj.address = address.getComponent('address').getValue();
			obj.lastSchool = lastSchool.getValue();
			obj.schoolClass = schoolClass.getValue();
			obj.inDate = inDate.getValue();
			obj.birthday = birthday.getComponent('birthday').getValue();
			obj.email = email.getComponent('email').getValue();
			obj.companyPhone = companyPhone.getComponent('companyPhone')
					.getValue();
			obj.hrLevel = level.getValue();
			var postData = new PostData('updateUser', Ext.encode(obj));
			console.log(postData);
			AppContext.command(postData, function(reps) {
						alert(reps);
					})

		}

		function bind() {
			// private String userCode;
			// private String requestCode;
			var obj = {};
			obj.userCode = Common.value(userBindCode);
			obj.requestCode = Common.value(survyBindCode);
			var postData = new PostData("bindSurveyRequest", Ext.encode(obj));
			// console.log(postData);
			AppContext.command(postData, function(reps) {
						alert(reps);

					});
		}

		function deparmentRender(value) {
			if (value != null) {
				return value.name;
			}
			return null;
		}

	}// initComponent end

});
