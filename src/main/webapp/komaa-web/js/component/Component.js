Ext.define('component.MeButton', {
			extend : 'Ext.button.Button',
			alias : 'widget.mebutton',
			initComponent : function() {
				this.addClsWithUI(this.overCls);
				this.callParent(arguments);
			},
			onMouseLeave : function(e) {
			}
		});
Ext.define('component.MeText', {
			extend : 'Ext.form.field.Text',
			alias : 'widget.metext',
			initComponent : function() {
				this.callParent(arguments);
			}
		})

Ext.define('component.MeLabel', {
			extend : 'Ext.form.Label',
			alias : 'widget.melabel',
			initComponent : function() {
				this.callParent(arguments);
			}
		})

Ext.define('component.MeCheckbox', {
			extend : 'Ext.form.field.Checkbox',
			alias : 'widget.mecheckbox',
			initComponent : function() {
				this.callParent(arguments);
			}
		})

Ext.define('component.MeComboBox', {
			extend : 'Ext.form.field.ComboBox',
			alias : 'widget.mecombo',
			initComponent : function() {
				this.callParent(arguments);
			}
		})

Ext.define('component.MeRadioGroup', {
			extend : 'Ext.form.RadioGroup',
			alias : 'widget.meradiogroup',
			initComponent : function() {
				this.callParent(arguments);
			}
		})
Ext.define('component.MeDate', {
			extend : 'Ext.form.field.Date',
			alias : 'widget.medate',
			format : 'Y-m-d',
			initComponent : function() {
				this.callParent(arguments);
			}
		})

Ext.define('component.MeFieldContainer', {
			extend : 'Ext.form.FieldContainer',
			alias : 'widget.mefc',
			initComponent : function() {
				this.callParent(arguments);
			}
		})

Ext.define('component.MeDisplay', {
			extend : 'Ext.form.Display',
			alias : 'widget.medisplay',
			initComponent : function() {
				this.callParent(arguments);
			}
		})


Ext.define('component.MeTextArea', {
			extend : 'Ext.form.TextArea',
			alias : 'widget.mearea',
			initComponent : function() {
				this.callParent(arguments);
			}

		})

Ext.define('component.MeHContainer', {
			extend : 'Ext.container.Container',
			alias : 'widget.mehc',
			layout : {
				type : 'hbox'
			},
			border : 1,
			style : {
				borderColor : '#E9E9E9',
				borderStyle : 'solid',
				borderWidth : '4px',
				background : '#E9E9E9'
			},
			defaults : {
				labelWidth : 80,
				// implicitly create Container by specifying xtype
				flex : 1,
				margin : '5 0 0 10'
			},
			initComponent : function() {
				this.callParent(arguments);
			}
		});

Ext.define('component.MeVContainer', {
			extend : 'Ext.container.Container',
			alias : 'widget.mevc',
			layout : {
				type : 'vbox'
			},
			border : 1,
			style : {
				borderColor : '#E9E9E9',
				borderStyle : 'solid',
				borderWidth : '4px',
				background : '#E9E9E9'
			},
			defaults : {
				labelWidth : 80,
				// implicitly create Container by specifying xtype
				flex : 1,
				margin : '5 0 0 10'
			},
			initComponent : function() {
				this.callParent(arguments);
			}
		});

Ext.define('component.MeFieldSet', {
			extend : 'Ext.form.FieldSet',
			alias : 'widget.mefs',
			initComponent : function() {
				this.callParent(arguments);
			}
		});

// Ext.form.TextArea
// Ext.container.Container
// Ext.toolbar.Spacer
