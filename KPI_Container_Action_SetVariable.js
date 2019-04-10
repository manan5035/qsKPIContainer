define(['qlik'],
function(qlik){

    return {
        value : 'setVariable',
        label : 'Set Variable',
        definition: {
            setVariableName:{
                type:"string",
                ref: "action.setVariableName",
                label: "Variable Name",
                expression: "optional"
            },
            setVariableValue:{
                type:"string",
                ref: "action.setVariableValue",
                label: "Variable Value",
                expression: "optional"
            }
        },
        doAction : function(element, layout, data, index){
            var varName = data.action['setVariableName' + index];
            var varValue = data.action['setVariableValue' + index];
            var app = qlik.currApp();
            app.variable.setContent(varName, varValue);
        }
        
    };

}
);