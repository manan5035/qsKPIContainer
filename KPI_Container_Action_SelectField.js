define(['qlik'],
function(qlik){

    return {
        value : 'selectField',
        label : 'Select / Clear Field(s)',
        definition: {
            selectFieldType:{
                type:"string",
                ref: "action.selectFieldType",
                component: "buttongroup",
                label: "Select / Clear",
                options: [{
							value: "select",
							label: "Select",
							tooltip: "Select a Field"
						}, {
							value: "clear",
							label: "Clear",
							tooltip: "Clear a Field"
						}],
				defaultValue: "v"
            },
            selectFieldName:{
                type:"string",
                ref: "action.selectFieldName",
                label: "Field Name",
                expression: "optional"
            },
            selectFieldValue:{
                type:"string",
                ref: "action.selectFieldValue",
                label: "Field Value",
                expression: "optional"
            },
            selectFieldValueSeparator:{
                type:"string",
                ref: "action.selectFieldValueSeparator",
                label: "Field Value Separator"
            }
        },
        doAction : function(element, layout, data, index){
            var selectFieldType = data.action['selectFieldType' + index];
            var fieldName = data.action['selectFieldName' + index];
            var fieldValue = data.action['selectFieldValue' + index];
            var selectFieldValueSeparator = data.action['selectFieldValueSeparator' + index];
            var app = qlik.currApp();
            if(selectFieldType == undefined || selectFieldType == 'select'){
                var field = app.field(fieldName);
                if(fieldValue != ''){
                    field.selectValues(fieldValue.split(selectFieldValueSeparator));
                }else{
                    field.clear();
                }
            }else{ //clear
                if(fieldName != ''){
                    var field = app.field(fieldName);
                    field.clear();
                }else{
                    app.clearAll();
                }

            }
        }
        
    };

}
);