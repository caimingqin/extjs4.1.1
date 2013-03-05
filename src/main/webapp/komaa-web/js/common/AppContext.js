Ext.define('AppContext', {// caimingqin 2012-11-11
	statics : {// 静态变量
		HOST : '',
		command : function(postData, callback) { // test in ajax.js
			var defaultUrl = 'commandHandler.shtml';
			Ext.Ajax.request({
						url : defaultUrl,
						jsonData : postData, // string or object
						method : 'POST',
						success : function(resp) {
							var repsText = resp.responseText;
							callback(repsText);
						},
						failure : function(resp, options) {
							Ext.Msg.alert(resp.responseText);
						}
					});
		},
		commandQuery : function(queryObject, callback) { // test in ajax.js
			var defaultUrl = 'commandHandler.shtml';
			var postData = new PostData("mongoCommand", Ext.JSON
							.encode(queryObject));
			Ext.Ajax.request({
						url : defaultUrl,
						jsonData : postData, // string or object
						method : 'POST',
						success : function(resp) {
							var repsText = resp.responseText;
							var repObject = Ext.JSON.decode(repsText);
							callback(repObject.contents);
						},
						failure : function(resp, options) {
							Ext.Msg.alert(resp.responseText);
						}
					});
			
		}
	} // 静态变量 end
})
