// hrinfo
// private Date weedingDay;
// private Date inDate ; //a8
// private Date birthday;//a9
// private SchoolInfo shcool;

// shcool
// private String name;
// private String schoolClass;

// contact
// private String phone;
// private String mobile;
// private String email;
// private String address;
// private String companyPhone;
Ext.define('User', {
			extend : 'Ext.data.Model',
			fields : ['code', 'name', 'ids', 'password', 'department',
					 'userRole', 'hrInfo', 'contact','jumin']
		})

Ext.define('Customer', {
			extend : 'Ext.data.Model',
			fields : ['code', 'name', 'customerType', 'homePage', 'prmAddress',
					'description','supportB2B','managementType','imageUrl','imageName']
		})
// var customerStore = Ext.create('Ext.data.Store', {
// model : 'Customer'
// })
// function loadCustomerStore() {
// var queryObject = new QueryObject('Customer', '{}', null);
// AppContext.commandQuery(queryObject, function(contents) {
// // alert(contents);
// customerStore.loadData(Ext.decode(contents));
// });
// }
// loadCustomerStore();
// Ext.define('Department', {
// extend : 'Ext.data.Model',
// fields : ['code', 'name', 'mngType',
// 'handleType','city']
// });
// ,{name:'leaf',type:'boolean'}

Ext.define('Department', {
			extend : 'Ext.data.Model',
			fields : ['code', 'name', 'city', 'mngType', 'handleType']
		});

// CustomerName
// private String name;
// private String simpleName;
// private String enName;
Ext.define('Customer', {
			extend : 'Ext.data.Model',
			fields : ['code', 'name', 'customerType', 'homePage', 'prmAddress',
					'description', 'mobile', 'phone', 'accountCode']
		});

Ext.define('SurveyRequest', {
			extend : 'Ext.data.Model',
			fields : ['code', 'customer', 'documentNumber', 'acceptDate',
					'accident', 'department', 'user', 'managementType',
					'jsContents', 'cause', 'returnRule', 'fee', 'requestLevel',
					'insuranceCategory', 'phmall','insurer','fileUrl','handleResults']
		});
		
Ext.define('HandleResult', {
			extend : 'Ext.data.Model',
			fields : ['duration', 'handleType', 'handleLocation', 'contents',
					'measure', 'locationDetail','description']
		});
	
		
		
// Ext.define('DiseaseType',{
// extend:'Ext.data.Model',
// fields:['','','','','','','']
// })

Ext.define('DiseaseType', {
			extend : 'Ext.data.Model',
			fields : ['code', 'gender', 'description', 'kuName', 'enName']
		});
		
		
//InsuranceContract
Ext.define('InsuranceContract', {
			extend : 'Ext.data.Model',
			fields : ['type', 'gztype', 'number', 'target', 'from','to','jumin']
		});		
		
		
		
		
