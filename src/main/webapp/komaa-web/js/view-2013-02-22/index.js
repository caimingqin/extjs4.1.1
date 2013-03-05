var WEB_SOCKET_SWF_LOCATION = "js/websocket/WebSocketMain.swf";
WEB_SOCKET_DEBUG = false;
Ext.apply(Ext.form.field.VTypes, {
			number : function(v) {
				return /^[0-9]*[0-9]$/.test(v);
			},
			numberText : 'Must be a numeric '
		})

Ext.apply(Ext.form.field.VTypes, {
			floater : function(v) {
				return /^([0-9]*)(\.{0,1})([0-9]+)$/.test(v);
			},
			floaterText : 'Must be a numeric '
		})
Ext.example = function() {
	function createBox(t, s, num) {
		return '<div class="msg"' + ' id= ' + num + '>' + t + "  " + s
				+ '<button id="close">关闭</button></div>';
	}
	return {
		msg : function(title, format) {
			var msgCt = Ext.DomHelper.insertFirst(document.body, {
						class : 'msg-div'
					}, true);
			// }
			var s = Ext.String.format.apply(String, Array.prototype.slice.call(
							arguments, 1));
			var num = new Date().getTime();
			var m = Ext.DomHelper.append(msgCt, createBox(title, s, num), true);

			msgCt.slideIn('t', {
						easing : 'easeOut',
						duration : 700
					});
			var closeE = Ext.get('close');
			closeE.on('click', function(e) {
						m.slideOut('t', {
									easing : 'easeOut',
									duration : 700,
									remove : true,
									useDisplay : false
								});
					})

			var dTask = new Ext.util.DelayedTask();
			dTask.delay(5000, function() {
						msgCt.remove();
					})
		}
	};
}();

Ext.onReady(function() {
			loadLoginUser();
			// loadRolePages();
			main();
//			webSocketConnetion();

		});

function main() {
	var tabs = Ext.create('Ext.tab.Panel', {
				region : 'center',
				autoDestroy : false,
				items : [{
							title : 'Home',
							id : 'home',
							closable : false,
							items : {
								xtype : 'Home'
							}
						}]
			});

	var store = Ext.create('Ext.data.TreeStore', {
				root : {
					expanded : true,
					children : [{
								text : '접수관리',
								id : 'B0',
								expanded : true,
								children : [{
											text : '접수입력',
											id : 'B1',
											leaf : true
										}, {
											text : '접수현황',
											id : 'B2',
											leaf : true
										}, {
											text : '장기미결',
											id : 'B3',
											leaf : true
										}, {
											text : '민원현황',
											id : 'B5',
											leaf : true 
										}]
							}, {
								text : '조사작업',
								expanded : true,
								id : 'R0',
								children : [{
											text : '민원입력(RF)',
											id : 'RF',
											leaf : true
										}, {
											text : '고객전달 출력물 선택',
											id : 'B4',
											leaf : true
										}, {
											text : '계약사항 입력/현황(R1)',
											id : 'R1',
											leaf : true
										}, {
											text : '사고처리과정입력(R2)',
											id : 'R2',
											leaf : true
										}, {
											text : '손해사정결과(R3)',
											id : 'R3',
											leaf : true
										}, {
											text : '보고서 문서 Upload(R5)',
											id : 'R5',
											leaf : true
										}, {
											text : '철부자료 Upload(R6)',
											id : 'R6',
											leaf : true
										}]
							}, {
								text : '보고관리',
								expanded : true,
								id : 'C0',
								children : [{
											text : '진행보고',
											id : 'C1',
											leaf : true
										}, {
											text : ' 진행별보고',
											id : 'C2',
											leaf : true
										}, {
											text : '보험사보고',
											id : 'C3',
											leaf : true
										}, {
											text : '민원현현황보고',
											id : 'C4',
											leaf : true
										}]
							}, {
								text : '회계관리',
								expanded : false,
								id : 'D0',
								children : [{
											text : '인보이스리스트',
											id : 'DF',
											leaf : true
										}, {
											text : '인보이스리스트',
											id : 'D1',
											leaf : true
										}, {
											text : '처리대기',
											id : 'D2',
											leaf : true
										}, {
											text : '지급대기',
											id : 'D3',
											leaf : true
										}, {
											text : '입금내역처리',
											id : 'D4',
											leaf : true
										}, {
											text : '경비집계',
											id : 'D5',
											leaf : true
										}]
							}, {
								text : '통계관리',
								expanded : false,
								id : 'E0',
								children : [{
											text : '사용자 현황',
											id : 'E1',
											leaf : true
										}, {
											text : '종결 현황',
											id : 'E2',
											leaf : true
										}, {
											text : '실적 현황',
											id : 'E3',
											leaf : true
										}, {
											text : '진행과정 현황',
											id : 'E4',
											leaf : true
										}, {
											text : '보험사보고 현황',
											id : 'E5',
											leaf : true
										}, {
											text : '인보이스 현황',
											id : 'E6',
											leaf : true
										}, {
											text : '입금처리 현황',
											id : 'E7',
											leaf : true
										}, {
											text : '미수금 현황',
											id : 'E8',
											leaf : true
										}, {
											text : '경비 현황	',
											id : 'E9',
											leaf : true
										}]
							}, {
								text : '관리자',
								expanded : true,
								id : 'Z0',
								children : [{
											text : '사용자 관리',
											id : 'Z1',
											leaf : true
										}, {
											text : '보험사 정보',
											id : 'Z2',
											leaf : true
										}, {
											text : '질병코드 관리',
											id : 'Z3',
											leaf : true
										}, {
											text : '조직관리',
											id : 'Z5',
											leaf : true
										}, {
											text : 'PRINT페이지입력',
											id : 'Z6',
											leaf : true
										}, {
											text : '페이지관리',
											id : 'Z7',
											leaf : true
										}, {
											text : '권한페이지관리 ',
											id : 'Z8',
											leaf : true
										}]
							}]
				}
			});

	var northPanel = Ext.create('Ext.Panel', {
		bodyStyle : 'background-color:#E9E9E9',
		region : 'north',
		height : 30,
		html : '<div style="padding-top:8px" >Komaa Claim Adjustment & Survey Co., LTD.</div>'
	})
	var treePanelApp = Ext.create('Ext.tree.Panel', {
				id : 'tree-panel',
				title : 'Menu',
				region : 'west',
				collapsible : true,
				split : true,
				width : 180,
				rootVisible : false,
				store : store
			});
	var tabMap = new Ext.util.HashMap();
	treePanelApp.on('itemclick', function(view, record, item, index, e, eOpts) {
				if (record.get('leaf')) {
					var id = record.getId();
					// //console.log(containRolePage(id));
					// createtBtn
					// containRolePage(id)
					if (true) {
						var text = record.get('text');
						// 不存在
						var hasTab = tabMap.get(id);
						// //console.log(hasTab);
						if (!hasTab) {
							var t;
							// 动态添加tab
							if (id == 'Z1') {
								t = tabs.add({
											title : text,
											id : id,
											closable : true,
											items : [{
														xtype : 'Z1'
													}]
										});
							} else if (id == 'Z2') {
								t = tabs.add({
											title : text,
											id : id,
											bodyStyle : 'background-color:#E9E9E9',
											closable : true,
											items : [{
														xtype : 'Z2'
													}]
										});

							} else if (id == 'Z3') {
								t = tabs.add({
											title : text,
											id : id,
											bodyStyle : 'background-color:#E9E9E9',
											closable : true,
											items : [{
														xtype : 'Z3'
													}]
										});

							} else if (id == 'Z5') {
								t = tabs.add({
											title : text,
											id : id,
											bodyStyle : 'background-color:#E9E9E9',
											closable : true,
											items : [{
														xtype : 'Z5'
													}]
										});

							} else if (id == 'Z6') {
								t = tabs.add({
											title : text,
											id : id,
											bodyStyle : 'background-color:#E9E9E9',
											closable : true,
											items : [{
														xtype : 'Z6'
													}]
										});

							} else if (id == 'Z8') {
								t = tabs.add({
											title : text,
											id : id,
											bodyStyle : 'background-color:#E9E9E9',
											closable : true,
											items : [{
														xtype : 'Z8'
													}]
										});

							} else if (id == 'Z7') {
								t = tabs.add({
											title : text,
											id : id,
											bodyStyle : 'background-color:#E9E9E9',
											closable : true,
											items : [{
														xtype : 'Z7'
													}]
										});

							} else if (id == 'B1') {
								t = tabs.add({
											title : text,
											id : id,
											// bodyStyle :
											// 'background-color:#E9E9E9',
											closable : true,
											items : [{
														xtype : 'B1'
													}]
										});

							} else if (id == 'B2') {
								t = tabs.add({
											title : text,
											id : id,
											bodyStyle : 'background-color:#E9E9E9',
											closable : true,
											items : [{
														xtype : 'B2'
													}]
										});

							} else if (id == 'B3') {
								t = tabs.add({
											title : text,
											id : id,
											bodyStyle : 'background-color:#E9E9E9',
											closable : true,
											items : [{
														xtype : 'B3'
													}]
										});

							} else if (id == 'B4') {
								t = tabs.add({
											title : text,
											id : id,
											bodyStyle : 'background-color:#E9E9E9',
											closable : true,
											items : [{
														xtype : 'B4'
													}]
										});

							} else if (id == 'B5') {
								t = tabs.add({
											title : text,
											id : id,
											bodyStyle : 'background-color:#E9E9E9',
											closable : true,
											items : [{
														xtype : 'B5'
													}]
										});

							} else if (id == 'C3') {
								t = tabs.add({
											title : text,
											id : id,
											bodyStyle : 'background-color:#E9E9E9',
											closable : true,
											items : [{
														xtype : 'C3'
													}]
										});

							} else if (id == 'C4') {
								t = tabs.add({
											title : text,
											id : id,
											bodyStyle : 'background-color:#E9E9E9',
											closable : true,
											items : [{
														xtype : 'C4'
													}]
										});

							} else if (id == 'C1') {
								t = tabs.add({
											title : text,
											id : id,
											bodyStyle : 'background-color:#E9E9E9',
											closable : true,
											items : [{
														xtype : 'C1'
													}]
										});

							} else if (id == 'C2') {
								t = tabs.add({
											title : text,
											id : id,
											bodyStyle : 'background-color:#E9E9E9',
											closable : true,
											items : [{
														xtype : 'C2'
													}]
										});

							} else if (id == 'RF') {
								t = tabs.add({
											title : text,
											id : id,
											bodyStyle : 'background-color:#E9E9E9',
											closable : true,
											items : [{
														xtype : 'RF'
													}]
										});

							} else if (id == 'R1') {
								t = tabs.add({
											title : text,
											id : id,
											bodyStyle : 'background-color:#E9E9E9',
											closable : true,
											items : [{
														xtype : 'R1'
													}]
										});

							} else if (id == 'R2') {
								t = tabs.add({
											title : text,
											id : id,
											bodyStyle : 'background-color:#E9E9E9',
											closable : true,
											items : [{
														xtype : 'R2'
													}]
										});

							} else if (id == 'R3') {
								t = tabs.add({
											title : text,
											id : id,
											bodyStyle : 'background-color:#E9E9E9',
											closable : true,
											items : [{
														xtype : 'R3'
													}]
										});

							} else if (id == 'R5') {
								t = tabs.add({
											title : text,
											id : id,
											bodyStyle : 'background-color:#E9E9E9',
											closable : true,
											items : [{
														xtype : 'R5'
													}]
										});

							} else if (id == 'R6') {
								t = tabs.add({
											title : text,
											id : id,
											bodyStyle : 'background-color:#E9E9E9',
											closable : true,
											items : [{
														xtype : 'R6'
													}]
										});

							} else if (id == 'DF') {
								t = tabs.add({
											title : text,
											id : id,
											bodyStyle : 'background-color:#E9E9E9',
											closable : true,
											items : [{
														xtype : 'DF'
													}]
										});

							} else {
								t = tabs.add({
											title : text,
											id : id,
											closable : true

										});
							}

							t.on('close', function(tab, eps) {
										// //console.log(tab);
										// tabs.remove(id);
										// //console.log(tab.getId());
										tabMap.removeAtKey(tab.getId());
									})
							tabMap.add(id, t);

						}
						// 存在
						tabs.setActiveTab(id);
					} else {
						alert("you not has priviledge");
					}
				}

			});
	Ext.create('Ext.container.Viewport', {
				layout : 'border',
				items : [northPanel, treePanelApp, tabs]
			});
}
var rolePages;
var loginUser;
function webSocketConnetion() {
	var sessionId = document.cookie.split(";")[2].split("=")[1];
	// var sessionId=loginUser.sessionId;
	// //console.log(sessionId);
//	var wsUri = AppContext.HOST+"/chat.shtml?token=" + sessionId;
	var wsUri ="ws://1.232.123.197:8080/komaa/chat.shtml?token=" + sessionId;
	
	var websocket = new WebSocket(wsUri);
	websocket.onopen = function(evt) {
		console.log("open====>>")
		// showPanel("open====>>");
		// //console.log(evt);
	};
	websocket.onclose = function(evt) {
		console.log("onclose====>>");
		console.log(evt);
	};
	websocket.onmessage = function(evt) {
		console.log("onmessage====>>");
		console.log(evt.data.toString());
		var task = Common.decode(evt.data.toString());
		showPanel(task.name);
	};
	websocket.onerror = function(evt) {
		 console.log("onerror====>>");
		 console.log(evt);
	};
}

function showPanel(msg) {
	var num = new Date().getTime();
	// //console.log(num);
	Ext.example.msg('新消息来了，请处理', msg)
}

function loadLoginUser() {
	// //console.log(document.cookie);
	// var loginUserCode = url.substring(url.indexOf("?") + 1, url.length);
	var loginUserCode = document.cookie.split(";")[0].split("=")[1];

	var queryObject = new QueryObject('User', "{code:"
					+ Common.read(loginUserCode) + "}", null);
	// //console.log(Ext.encode(queryObject));
	AppContext.commandQuery(queryObject, function(contents) {
		// //console.log(contents);
		loginUser = contents[0];
		// //console.log(loginUser.userRole.code);
		loadRolePages(loginUser.userRole.code);
			// //console.log("============>>>>>" + Ext.encode(loginUser));
		});
}

function loadRolePages(roleCode) {
	// var roleCode = document.cookie.split(";")[0].split("=")[1];
	var queryObject = new QueryObject('RolePages', "{role.code:"
					+ Common.read(roleCode) + "}", null)
	// //console.log("queryObject====>>>>>" + Ext.encode(queryObject));
	AppContext.commandQuery(queryObject, function(contents) {
		// //console.log(contents);
		rolePages = contents;
			// //console.log(rolePages);
		});
}
function containRolePage(pageCode) {
	var contian = false
	// //console.log(rolePages);
	for (var i = 0; i < rolePages.length; i++) {
		if (rolePages[i].code == pageCode) {
			contian = true;
			break;
		}
	}
	return contian;
}
