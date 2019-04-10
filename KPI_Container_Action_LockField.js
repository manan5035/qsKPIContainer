define(['qlik'],
function(qlik){

    return {
        value : 'lockField',
        label : 'Lock/Unlock a Field',
        definition: {
            lockFieldName:{
                type:"string",
                ref: "action.lockFieldName",
                label: "Lock/Unlock Field Name",
                expression: "optional"
            },
            lockFieldStatus:{
                type:"string",
                ref: "action.lockFieldStatus",
                label: "Lock(1) or Unlock(0)",
                expression: "optional"
            }
        },
        doAction : function(element, layout, data, index){
            var lockFieldName = data.action['lockFieldName' + index];
            var lockFieldStatus = data.action['lockFieldStatus' + index];

            var app = qlik.currApp();
            var field = app.field(lockFieldName);
            if(lockFieldStatus == '1'){
                field.lock();
            }else{
                field.unlock();
            }
        }
        
    };

}
);