define(['qlik', 'jquery', './KPI_Container_ComponentChart', './utils'],
function(qlik, $,comChart, util){
    return {
        visualType : 'chart',
        definition:{
           label: "Visual",
           component : "expandable-items",
           show: function(d){
               return d.visualType == 'chart';
           },
           items:{         
               item:{     
                   label: "Chart Settings",
                   items:{
                        chartProperties: {
                            type: 'string',
                            label:"Chart",
                            component: comChart,
                            ref: "chart.properties"
                        },         
                        interaction: {
                            type: 'boolean',
                            label:"Interaction",
                            component: 'switch',
                            ref: "chart.interaction",
                            options: [{
                                    value: true,
                                    label: "Enable"
                                }, {
                                    value: false,
                                    label: "Disable"
                                }],
                            defaultValue: false
                        },         
                        selection: {
                            type: 'boolean',
                            label:"Selection",
                            component: 'switch',
                            ref: "chart.selection",
                            options: [{
                                    value: true,
                                    label: "Enable"
                                }, {
                                    value: false,
                                    label: "Disable"
                                }],
                            defaultValue: false
                        }
                   }
               }
            }
        },
        paint : function(d3Obj, layout){
                var ele = $(d3Obj._groups[0][0]);
                var data = d3Obj.datum();
                var prop = util.getRefValue(data, this.definition.items.item.items.chartProperties.ref);
                prop = JSON.parse(JSON.stringify(prop));
                if(typeof prop != 'object') return;
                var cols = [];
                if(prop.qHyperCubeDef1 != undefined){
                    for(var i=0; i<prop.qHyperCubeDef1.qDimensions.length;++i){
                        cols.push({
                            qDef : prop.qHyperCubeDef1.qDimensions[i].qDef,
                            qOtherTotalSpec : prop.qHyperCubeDef1.qDimensions[i].qOtherTotalSpec
                        });
                    }
                    for(var i=0; i<prop.qHyperCubeDef1.qMeasures.length;++i){
                        cols.push({
                            qDef : prop.qHyperCubeDef1.qMeasures[i].qDef,
                            qSortBy : prop.qHyperCubeDef1.qMeasures[i].qSortBy
                        });
                    }
                }

                

                
                delete prop.qHyperCube;
                delete prop.qMetaData;

                if(prop.qInfo.qType == 'pivot-table'){
                    prop.qHyperCubeDef = JSON.parse(JSON.stringify(prop.qHyperCubeDef1));
                    delete prop.qHyperCubeDef.qDimensions;
                    delete prop.qHyperCubeDef.qMeasures;
                }

               
                var interaction = util.getRefValue(data, this.definition.items.item.items.interaction.ref);
                interaction = interaction == undefined ? false : interaction;
                var selection = util.getRefValue(data, this.definition.items.item.items.selection.ref);
                selection = selection == undefined ? false : selection;

                if(prop == null) return;
                var visualChartId = 'KPI_Container_ComponentChart_' + layout.qInfo.qId + '_interaction_' + interaction + '_selection_' + selection + '_seqId_' + prop.seqId;
                var selector = 'KPI_Container_ComponentChartId="' +visualChartId + '"';
                if(data.visibleChanged) ele.html(null);
                if(ele.find('[' +selector + ']').length == 0){
                    ele.html(null);
                    ele.append('<div ' +selector+' style="width:100%; height:100%;"></div>');
                    ele = ele.find('[' +selector + ']');
                    qlik.currApp().visualization.create(prop.qInfo.qType, cols, prop).then(function(vis){
                        vis.show(ele,{
                            noInteraction : !interaction,
                            noSelections : !selection
                        });
                        

                    }); 
                }
                
                          
            }
        }
});