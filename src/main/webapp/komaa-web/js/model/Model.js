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
					'userRole', 'hrInfo', 'contact', 'jumin']
		})

Ext.define('Customer', {
			extend : 'Ext.data.Model',
			fields : ['code', 'name', 'customerType', 'homePage', 'prmAddress',
					'description', 'supportB2B', 'managementType', 'imageUrl',
					'imageName']
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
Ext.define('DocumentCategory', {
			extend : 'Ext.data.Model',
			fields : ['code', 'name', 'parent', 'children']
		});
Ext.define('DocumentPage', {
			extend : 'Ext.data.Model',
			fields : ['code', 'name', 'url']
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
					'insuranceCategory', 'phmall', 'insurer', 'fileUrl',
					'handleCourse', 'result', 'handlerUploads',
					'requestStatus', 'created','diseaseTypes']
		});

Ext.define('HandleCourse', {// is handleCourse
	extend : 'Ext.data.Model',
	fields : ['duration', 'handleType', 'handleLocation', 'contents',
			'measure', 'locationDetail', 'description']
});

// Ext.define('DiseaseType',{
// extend:'Ext.data.Model',
// fields:['','','','','','','']
// })

Ext.define('DiseaseType', {
			extend : 'Ext.data.Model',
			fields : ['code', 'gender', 'description', 'kuName', 'enName']
		});

// InsuranceContract
Ext.define('InsuranceContract', {
			extend : 'Ext.data.Model',
			fields : ['type', 'gztype', 'number', 'target', 'from', 'to',
					'jumin']
		});

Ext.define('Meenwon', {
			extend : 'Ext.data.Model',
			fields : ['postDate', 'type', 'contents', 'endDate', 'result',
					'requestCode']
		});

Ext.define('HandlerUpload', {
			extend : 'Ext.data.Model',
			fields : ['name', 'comments', 'description']
		});
Ext.define('SurveyReport', {
			extend : 'Ext.data.Model',
			fields : ['code', 'surveyRequsetCode', 'reportStatus',
					'reportContents', 'type', 'uploadFile']
		});
Ext.define('Invoice', {
			extend : 'Ext.data.Model',
			fields : ['code', 'type', 'postDate', 'unitPrice', 'quantity',
					'description', 'requestCode', 'payType', 'amount']
		});

Ext.define('ConsMessage', {
			extend : 'Ext.data.Model',
			fields : ['name', 'type', 'body', 'obsId', 'created']
		});

Ext.define('Page', {
			extend : 'Ext.data.Model',
			fields : ['code', 'description', 'buttons']
		});

Ext.define('RolePages', {
			extend : 'Ext.data.Model',
			fields : ['code', 'description', 'buttons', 'role', 'apageCode']
		});
Ext.define('Button', {
			extend : 'Ext.data.Model',
			fields : ['code', 'name', 'type']
		});

Ext.define('MeenwonDTO', {
			extend : 'Ext.data.Model',
			fields : ['postDate','customerName', 'insurer', 'userName',
					'deptName', 'requestStatus', 'meenwonPostDate',
					'meenwonType', 'meenwonContents', 'meenwonEndDate',
					'meenwonResult','documentNumber']
		})
