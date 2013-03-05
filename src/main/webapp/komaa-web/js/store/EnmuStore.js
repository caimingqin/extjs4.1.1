var managementTypeStore = Ext.create('Ext.data.Store', {
			model : 'ManagementType',
			data : [{
						"code" : "00",
						"name" : " "
					}, {
						"code" : "01",
						"name" : "1종"
					}, {
						"code" : "04",
						"name" : "4종"
					}, {
						"code" : "03",
						"name" : "3종"
					}]
		});

var handleTypeStore = Ext.create('Ext.data.Store', {
			model : 'HandleType',
			data : [{
						"code" : "00",
						"name" : " "
					}, {
						"code" : "01",
						"name" : "집행"
					}, {
						"code" : "02",
						"name" : "심사"
					}]
		});

var cityStore = Ext.create('Ext.data.Store', {
			model : 'City',
			data : [{
						"code" : "01",
						"name" : "서울"
					}, {
						"code" : "02",
						"name" : "부산"
					}, {
						"code" : "03",
						"name" : "대구"
					}, {
						"code" : "04",
						"name" : "마산"
					}, {
						"code" : "05",
						"name" : "대전"
					}, {
						"code" : "06",
						"name" : "광주"
					}, {
						"code" : "07",
						"name" : "전주"
					}, {
						"code" : "08",
						"name" : "인천"
					}, {
						"code" : "09",
						"name" : "구리"
					}, {
						"code" : "10",
						"name" : "호남"
					}, {
						"code" : "11",
						"name" : "원주"
					}]
		});

var roleTypeStore = Ext.create('Ext.data.Store', {
			model : 'UserRole',
			data : [{
						"code" : "00",
						"name" : "Admin"
					}, {
						"code" : "10",
						"name" : "관리자"
					}, {
						"code" : "20",
						"name" : "관리자2"
					}, {
						"code" : "25",
						"name" : "본부장"
					}, {
						"code" : "28",
						"name" : "총부접수관리"
					}, {
						"code" : "30",
						"name" : "팀장"
					}, {
						"code" : "40",
						"name" : "사원"
					}, {
						"code" : "50",
						"name" : "지원부"
					}, {
						"code" : "60",
						"name" : "기타"
					}, {
						"code" : "70",
						"name" : "보험사"
					}, {
						"code" : "150",
						"name" : "출력프린터"
					}]
		});

var customerTypeStore = Ext.create('Ext.data.Store', {
			model : 'CustomerType',
			data : [{
						"code" : "01",
						"name" : "생보"
					}, {
						"code" : "02",
						"name" : "손보"
					}, {
						"code" : "03",
						"name" : "공제"
					}]
		});

var accidentTypeStore = Ext.create('Ext.data.Store', {
			model : 'AccidentType',
			data : [{
						"code" : "00",
						"name" : " "
					}, {
						"code" : "01",
						"name" : "질병"
					}, {
						"code" : "02",
						"name" : "질병(사망)"
					}, {
						"code" : "03",
						"name" : "질병(암)"
					}, {
						"code" : "04",
						"name" : "상해"
					}, {
						"code" : "05",
						"name" : "상해(사망)"
					}, {
						"code" : "06",
						"name" : "질병(후유장애)"
					}, {
						"code" : "07",
						"name" : "일반후유자애"
					}, {
						"code" : "08",
						"name" : "교퉁후유장애"
					}, {
						"code" : "09",
						"name" : "고도후유장애"
					}]
		});

var insurancePersonLevelStore = Ext.create('Ext.data.Store', {
			model : 'InsurancePersonLevel',
			data : [{
						"code" : "00",
						"name" : " "
					}, {
						"code" : "01",
						"name" : "단순"
					}, {
						"code" : "02",
						"name" : "일반"
					}, {
						"code" : "03",
						"name" : "벙력"
					}, {
						"code" : "04",
						"name" : "병력(간이)"
					}, {
						"code" : "05",
						"name" : "모랄"
					}, {
						"code" : "06",
						"name" : "유선"
					}]
		});
var insuranceCategoryStore = Ext.create('Ext.data.Store', {
			model : 'InsuranceCategory',
			data : [{
						"code" : "00",
						"name" : " "
					}, {
						"code" : "01",
						"name" : "기술보험"
					}, {
						"code" : "02",
						"name" : "배상책"
					}, {
						"code" : "03",
						"name" : "재물보험"
					}, {
						"code" : "04",
						"name" : "신종보험"
					}]
		});
var requsetLevelStore = Ext.create('Ext.data.Store', {
			model : 'RequsetLevel',
			data : [{
						"code" : "00",
						"name" : " "
					}, {
						"code" : "01",
						"name" : "장해조사"
					}, {
						"code" : "02",
						"name" : "암진단 조사"
					}, {
						"code" : "03",
						"name" : "여성 질환조사"
					}, {
						"code" : "04",
						"name" : "가입전 사고력 조사"
					}, {
						"code" : "05",
						"name" : "사고 경위조사"
					}, {
						"code" : "06",
						"name" : "입원 적정성 조사"
					}, {
						"code" : "07",
						"name" : "사망사고 조사"
					}, {
						"code" : "08",
						"name" : "다소보험 가입자 조사"
					}, {
						"code" : "09",
						"name" : "특정질환진단비"
					}, {
						"code" : "09",
						"name" : "후유장애 진단비"
					}]
		});
var managementTypeStore = Ext.create('Ext.data.Store', {
			model : 'ManagementType',
			data : [{
						"code" : "*",
						"name" : "select"
					},{
						"code" : "01",
						"name" : "1종"
					}, {
						"code" : "03",
						"name" : "3종"
					}, {
						"code" : "04",
						"name" : "4종"
					}]
		});
var hrLevelStore = Ext.create('Ext.data.Store', {
			model : 'HRLevel',
			data : [{
						"code" : "01",
						"name" : "대표이사"
					}, {
						"code" : "02",
						"name" : "CIO"
					}, {
						"code" : "03",
						"name" : "CTO"
					}, {
						"code" : "04",
						"name" : "CFO"
					}, {
						"code" : "05",
						"name" : "임원"
					}, {
						"code" : "06",
						"name" : "부장"
					}, {
						"code" : "07",
						"name" : "차장"
					}, {
						"code" : "08",
						"name" : "과장"
					}, {
						"code" : "09",
						"name" : "주임"
					}, {
						"code" : "10",
						"name" : "대리"
					}, {
						"code" : "11",
						"name" : "사원"
					}]
		});
var requsetStatusStore = Ext.create('Ext.data.Store', {
			model : 'RequsetStatus',
			// normal,allocated,process,complete,active
			data : [{
						"code" : "01",
						"name" : "--"
					}, {
						"code" : "02",
						"name" : "allocated"
					}, {
						"code" : "03",
						"name" : "process"
					}, {
						"code" : "04",
						"name" : "complete"
					}, {
						"code" : "05",
						"name" : "active"
					}]
		});

var handleResultTypeStore = Ext.create('Ext.data.Store', {
			model : 'HandleResultType',
			data : [{
						"code" : "01",
						"name" : "수임안내"
					}, {
						"code" : "01",
						"name" : "1차탐문"
					}, {
						"code" : "02",
						"name" : "피보험자면담(서류징구)"
					}, {
						"code" : "03",
						"name" : "타보험사 지급상황 확인"
					}, {
						"code" : "04",
						"name" : "2차탐문(과거력 확인)"
					}, {
						"code" : "05",
						"name" : "초진병원확인"
					}, {
						"code" : "06",
						"name" : "청구병원(관광서)확인"
					}, {
						"code" : "07",
						"name" : "탐문병원확인"
					}, {
						"code" : "08",
						"name" : "선임조사자와의 상의"
					}, {
						"code" : "09",
						"name" : "보험사 담장자와의 확인"
					}, {
						"code" : "10",
						"name" : "의료자문"
					}, {
						"code" : "11",
						"name" : "계약자 합의(조정)"
					}, {
						"code" : "11",
						"name" : "보고서작성시작"
					}]
		});

var handleLocationStore = Ext.create('Ext.data.Store', {
			model : 'HandleLocation',
			data : [{
						"code" : "00",
						"name" : "병원"
					}, {
						"code" : "01",
						"name" : "경찰서"
					}, {
						"code" : "02",
						"name" : "소방서"
					}, {
						"code" : "03",
						"name" : "동업사"
					}, {
						"code" : "04",
						"name" : "녹취확인"
					}, {
						"code" : "05",
						"name" : "목격자"
					}, {
						"code" : "06",
						"name" : "모집인"
					}, {
						"code" : "07",
						"name" : "수익자"
					}, {
						"code" : "08",
						"name" : "관련인"
					}, {
						"code" : "09",
						"name" : "의료자문"
					}, {
						"code" : "10",
						"name" : "피보험사"
					}, {
						"code" : "11",
						"name" : "기타"
					}]
		});

var resultsInvestigationStore = Ext.create('Ext.data.Store', {
			model : 'ResultsInvestigation',
			data : [{
						"code" : "00",
						"name" : "부책종결"
					}, {
						"code" : "01",
						"name" : "면책종결"
					}, {
						"code" : "02",
						"name" : "소송종결"
					}]
		});
var dAccordingStore = Ext.create('Ext.data.Store', {
			model : 'DAccording',
			data : [{
						"code" : "00",
						"name" : "--"
					}, {
						"code" : "01",
						"name" : "기왕증감"
					}, {
						"code" : "02",
						"name" : "기여도"
					}, {
						"code" : "03",
						"name" : "담보해당무"
					}, {
						"code" : "04",
						"name" : "서면무동의"
					}, {
						"code" : "05",
						"name" : "고의사고"
					}, {
						"code" : "06",
						"name" : "보험사기"
					}, {
						"code" : "07",
						"name" : "허위청구"
					}, {
						"code" : "08",
						"name" : "합의면책"
					}, {
						"code" : "09",
						"name" : "추가청구방어"
					}, {
						"code" : "10",
						"name" : "고지의무위반"
					}, {
						"code" : "11",
						"name" : "기타고지"
					}]
		});
var liftedAccordingStore = Ext.create('Ext.data.Store', {
			model : 'LiftedAccording',
			data : [{
						"code" : "00",
						"name" : "--"
					}, {
						"code" : "01",
						"name" : "고지의무위반"
					}, {
						"code" : "02",
						"name" : "통지의무위반"
					}, {
						"code" : "03",
						"name" : "자진해지"
					}, {
						"code" : "04",
						"name" : "합의해지"
					}, {
						"code" : "05",
						"name" : "기타"
					}]
		});
var moralStore = Ext.create('Ext.data.Store', {
			fields : ['code', 'name'],
			data : [{
						"code" : true,
						"name" : "YES"
					}, {
						"code" : false,
						"name" : "NO"
					}]
		});

var meenwonTypeStore = Ext.create('Ext.data.Store', {
			model : 'MeenwonType',
			data : [{
						"code" : "00",
						"name" : "금융감독원"
					}, {
						"code" : "01",
						"name" : "일반민원"
					}, {
						"code" : "02",
						"name" : "VOC"
					}]
		});
var surveyReportTypeStore = Ext.create('Ext.data.Store', {
			model : 'SurveyReportType',
			data : [{
						"code" : "01",
						"name" : "현장"
					}, {
						"code" : "02",
						"name" : "중간"
					}, {
						"code" : "03",
						"name" : "종결"
					}]
		});

var invoiceTypeStore = Ext.create('Ext.data.Store', {
			model : 'SurveyReportType',
			data : [{
						"code" : "00",
						"name" : "일비"
					}, {
						"code" : "01",
						"name" : "여비교통비"
					}, {
						"code" : "02",
						"name" : "서류발급비"
					}, {
						"code" : "03",
						"name" : "의료자문의뢰비"
					}, {
						"code" : "04",
						"name" : "법률자문의뢰비"
					}, {
						"code" : "05",
						"name" : "추가사정료"
					}]
		});
var payTypeStore = Ext.create('Ext.data.Store', {
			model : 'SurveyReportType',
			data : [{
						"code" : "01",
						"name" : "지점"
					}, {
						"code" : "02",
						"name" : "회사"
					}, {
						"code" : "00",
						"name" : "본인"
					}]
		});
var buttonTypeStore = Ext.create('Ext.data.Store', {
			model : 'ButtonType',
			data : [{
						"code" : "r",
						"name" : "READ"
					}, {
						"code" : "w",
						"name" : "WRITE"
					}]
		});
//		normal, allocated, process, preComplete, complete, active
var requestStatusStore = Ext.create('Ext.data.Store', {
			fields:['code','name'],
			data : [{
						"code" : "*",
						"name" : "select"
					},{
						"code" : "normal",
						"name" : "접수"
					}, {
						"code" : "allocated",
						"name" : "접수"
					}, {
						"code" : "preallocated",
						"name" : "미배정"
					}, {
						"code" : "process",
						"name" : "진행"
					}, {
						"code" : "preComplete",
						"name" : "결재요청"
					}, {
						"code" : "complete",
						"name" : "종결"
					}]
		});
		

		
		
//피보험자		insurer
//계약자		apersonName
//사고자		apersonSname
//주민번호(피)		apersonSJumin
//조사/사고지		accidentAddress
//문서번호		dpcumentNumber
//접수번호		accidentNumber
	
var likeComboStore = Ext.create('Ext.data.Store', {
			fields:['code','name'],
			data : [{
						"code" : "*",
						"name" : "select"
					},{
						"code" : "insurer",
						"name" : "피보험자"
					}, {
						"code" : "accident.person.name",
						"name" : "계약자"
					}, {
						"code" : "accident.person.sname",
						"name" : "사고자"
					}, {
						"code" : "accident.person.sjumin",
						"name" : "주민번호(피)"
					}, {
						"code" : "accident.address",
						"name" : "조사/사고지"
					}, {
						"code" : "documentNumber",
						"name" : "문서번호"
					}, {
						"code" : "accident.number",
						"name" : "접수번호"
					}]
		});		