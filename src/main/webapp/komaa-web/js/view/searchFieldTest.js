Ext.onReady(function(){

    Ext.define("Post", {
        extend: 'Ext.data.Model',
//        proxy: {
//            type: 'jsonp',
//            url : 'http://www.sencha.com/forum/topics-remote.php',
//            reader: {
//                type: 'json',
//                root: 'topics',
//                totalProperty: 'totalCount'
//            }
//        },
        
                proxy : {
							type : 'ajax',
							url : 'http://www.sencha.com/forum/topics-remote.php',
							reader : {
								type : 'json',
								root : 'topics',
								totalProperty : 'totalCount'
							}
						},
        fields: [
            {name: 'code', mapping: 'post_id'},
            {name: 'description', mapping: 'topic_title'},
            {name: 'topicId', mapping: 'topic_id'},
            {name: 'author', mapping: 'author'},
            {name: 'lastPost', mapping: 'post_time', type: 'date', dateFormat: 'timestamp'},
            {name: 'excerpt', mapping: 'post_text'}
        ]
    });
  var ajax=new Ext.data.proxy.Ajax();
   ajax.url="http://1.232.123.197:9000/komaa/commandHandler.shtml";
   var  ds = Ext.create('Ext.data.Store', {
        pageSize: 100,
        model: 'Post',
        proxy:
    });

    panel = Ext.create('Ext.panel.Panel', {
        renderTo: Ext.getBody(),
        title: 'Search the Ext Forums',
        width: 600,
        bodyPadding: 10,
        layout: 'anchor',
        items: [{
            xtype: 'combo',
            store: ds,
            displayField: 'title',
            minChars:5,
            typeAhead: false,
            hideLabel: true,
            hideTrigger:true,
            anchor: '100%'

        }]
    });
});