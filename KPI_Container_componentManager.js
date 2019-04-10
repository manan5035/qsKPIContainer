define(['./KPI_Container_Text', './KPI_Container_Chart'],
function(comText, comChart){
    return {
            itemList : [comText, comChart],
            getComponent : function(visualType){
                for(var i=0; i<this.itemList.length; ++i){
                    if(visualType == this.itemList[i].visualType){
                        return this.itemList[i];
                    }
                }
            },
            paintComponent : function(d3Obj, layout){
                var component = this.getComponent(d3Obj.datum().visualType);
                if(component) component.paint(d3Obj, layout);
            }
        };
});