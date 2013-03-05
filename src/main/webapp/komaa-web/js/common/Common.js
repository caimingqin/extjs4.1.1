// var clientUser;
Ext.define('Common', {
			statics : {
				empty : function(cmp) {
					cmp.setValue(null);
				},
				visible : function(cmp, mboolean) {
					cmp.setVisible(mboolean);
				},
				read : function(value) {// for QeuryObject
					return "'" + value + "'";
				},
				setValue : function(cmp, value) {
					cmp.setValue(value);
				},
				value : function(cmp) {
					return cmp.getValue();
				},
				setReadOnly : function(cmp, mboolean) {
					cmp.setReadOnly(mboolean);
				},
				decode : function(data) {
					if (typeof(data) == "string") {
						return Ext.decode(data);
					}
					return data;
				},
				yyyy_MM_dd : function(milliseconds) {
					if(milliseconds){
							return Ext.util.Format
							.date(new Date(milliseconds), 'Y-m-d');
					}
			      	return null;
				},
				defaultRender : function(obj) {
					if (obj) {
						return obj.name;
					}

				},
				sameBtn : function(clientId, serverId) {
					if (clientId == serverId) {
						return true;
					}
					return false;
				},
				samePage : function(clientId, serverId) {
					if (clientId == serverId) {
						return true;
					}
					return false;
				},
				getRolePage : function(all, id) {
					for (var i = 0; i < all.length; i++) {
						if (all[i].code == id) {
							return all[i];
						}
					}
				},
				visibleBtn : function(btn) {
					btn.setVisible(true);
				},
				cusRender : function(obj) {
					if (obj) {
						return obj.name.name
					}
					return null
				},
				statusName : function(value) {
					if (value == 'allocated') {
						return '접수';
					} else if (value == 'process') {
						return '진행 과정';
					} else if (value == 'complete') {
						return '종결';
					} else if (value == 'preComplete') {
						return '종결진행';
					} else if (value == 'normal') {
						return '접수';
					}else if (value == 'preallocated') {
						return '미배정';
					}
					return null;
				},
				isNull : function(cmp) {
					var val = cmp.getValue();
					if (!val || val == "*") {
						return true
					}
					return false;
				},
				notnull : function(value) {
					if (!value || value == "*") {
						return false
					}
					return true;
				},
				alert : function(reps,executFunc,refleshDataFunc) {
//					  	var rObj = Ext.decode(reps);
						if (Common.success(reps)) {
							Ext.MessageBox.alert("제시", "처리 성공");
							if(typeof executFunc=='function'){
							    executFunc;
							}
							if(typeof refleshDataFunc=='function' ){
							    refleshDataFunc;
							}
						} else {
							Ext.MessageBox.alert("경고", "처리 실패");
						}
				},
				success : function(reps) {
					var rObj = Ext.decode(reps);
					if (rObj.statusCode == "200") {
						return true;
					}
					return false;
				},
				convert:function(value){
				if(value=='normal'){
				  return null;
				  }else{
				  return value;
				  }
				  
				}
			}

		})