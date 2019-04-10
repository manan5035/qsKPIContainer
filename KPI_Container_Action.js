define(["jquery",'./d3.v4','qlik','ng!$q', 'underscore', './leonardo-ui/leonardo-ui'
        , "./KPI_Container_Action_SheetNavigation"
        , "./KPI_Container_Action_Dialog"
        , "./KPI_Container_Action_SetVariable"
        , "./KPI_Container_Action_SelectField"
        , "./KPI_Container_Action_LockField"
        , "./KPI_Container_Action_Popover"
        , "./KPI_Container_Action_OpenWeb"],
function($,d3, qlik, $q, _,leonardoui
        , actionSheetNavigation
        , actionDialog
        , actionSetVariable
        , actionSelectField
        , actionLockField
        , actionPopover
        , actionOpenWeb){


    var ActionManager = {
        options: [],
        actions: [],
        actionDefinitionCount : 6,
        addAction : function(action){
            this.options.push({
                value: action.value,
                label: action.label
            });
            this.actions.push(action);
            return this;
        },
        getAction: function(actionValue){
            for(var i=0; i<this.options.length; ++i){
                if(this.options[i].value == actionValue)
                    return this.actions[i];
            }
        },
        doAction : function(element, layout, data){
            for(var i=0; i<this.actionDefinitionCount; ++i){
                var action = this.actions[i];
                if(data.action != undefined && data.action["action" + i] != undefined && data.action["action" + i] == true){
                    var action = this.getAction(data.action["actionType" + i]);
                    if(action != undefined){
                        action.doAction(element, layout, data);
                    }
                }
            }
        },
        appendDefinition: function(defItems){
            for(var index=1; index<=this.actionDefinitionCount; ++index){
                defItems['action' + index] = {
                    type: "boolean",
                     ref: "action.action" + index,
                     label: "Enable Action " + index,
                     component: "checkbox",
                };
                if(index > 1){
                    defItems['action' + index].show = new Function('d',
                       "return d.action != undefined && d.action['action' + " + (index - 1) + "] == true;"                    
                    );
                }

                defItems['actionType' + index] = {
                    type: "string",
                    ref: "action.actionType" + index,
                    label: "Action Type " + index,
                    component: "dropdown",
                    show : new Function('d',
                       "return d.action != undefined && d.action['action' + " + index + "] == true;"
                    ),
                    options:[
                        {value: 'none', label: "none"}
                    ]
                };

                this.appendActionDefinition(defItems, index);
            }
        },
        appendActionDefinition : function(defItems, index){
            for(var i=0; i<this.options.length; ++i){
                var option = this.options[i];
                defItems['actionType' + index].options.push(option);
                
                var action = this.actions[i];
                for(var defName in action.definition){
                    var def = $.extend({}, action.definition[defName]);
                    def.ref = def.ref + index;
                    def.label = def.label + ' ' + index;
                    def.show = new Function('d',
                        "return d.action != undefined && d.action['actionType" + index + "'] == '" + option.value + "';"
                    );
                    defItems[defName + index] = def;
                }
            }
        },
        updateCursor : function(element, layout, data){
            for(var i=1; i<=this.actionDefinitionCount; ++i){
                if(data.action != undefined){
                    var action = this.getAction(data.action["actionType" + i]);
                    if(action != undefined){
                        var actionTrigger = action.trigger == undefined ? 'click' : action.trigger;
                        if(actionTrigger == 'click'){                              
                                d3.select(element).style('cursor', 'pointer');
                        }
                    }
                }
                
            }
        },
        doAction : function(trigger, element, layout, data){
            for(var i=1; i<=this.actionDefinitionCount; ++i){
                if(data.action != undefined){
                    var action = this.getAction(data.action["actionType" + i]);
                    if(action != undefined){
                        var actionTrigger = action.trigger == undefined ? 'click' : action.trigger;
                        if(actionTrigger == trigger){
                            if(trigger == 'click'){                                
                                d3.select(element).style('cursor', 'pointer');
                            }
                            action.doAction(element, layout, data, i);
                        }
                    }
                }
                
            }
        }
    };

    ActionManager.addAction(actionSheetNavigation)
        .addAction(actionDialog)
        .addAction(actionSetVariable)
        .addAction(actionSelectField)
        .addAction(actionLockField)
        .addAction(actionPopover)
        .addAction(actionOpenWeb);

    var def = {
        definition: {
             label: "Actions",
             component: "expandable-items",
             items:{
                 item: { 
                     label: "Actions", 
                     items:{}
                 }
             }
        },
        attachAction : function(element, layout, comlist){
            var data = d3.select(element).datum();
            if(data.action != undefined && data.action.action1 == true){
                var self = this;
                element.onclick = function(){
                    if(qlik.navigation.getMode() != qlik.navigation.EDIT){
                        ActionManager.doAction('click', element, layout, data);
                    }
                };

                element.onmouseover = function() {
                    if(qlik.navigation.getMode() != qlik.navigation.EDIT){
                        ActionManager.updateCursor(element, layout, data);
                        ActionManager.doAction('mouseover', element, layout, data);
                    }
                } ;
            }
        }

    }

    ActionManager.appendDefinition(def.definition.items.item.items);
    return def;
}
);