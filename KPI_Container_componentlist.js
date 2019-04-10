define(['./KPI_Container_componentManager', './KPI_Container_Action','./d3.v4'],
function(ComponentManager, action, d3){
    var def = {
               type: "array",
               ref: "props.visualCells",
               label: "Visual Cells",
               itemTitleRef: "id",
               allowAdd: true,
               allowRemove: true,
               addTranslation: "Add Item",
               items: {
                   id: {
                       type: "string",
                       ref: "id",
                       label: "Id",
                       expression: "optional"
                   },   
                   Visible: {
                       type: "string",
                       ref: "visible",
                       label: "Visible",
                       expression: "optional"
                   },    
                   backgroundColor: {
                       type: "string",
                       label:"Background color",
                       ref: "backgroundColor",
                       expression: "optional"
                   },
                   backgroundColorOnMouseMove: {
                       type: "string",
                       label:"Background color on mouse move",
                       ref: "backgroundColorOnMouseMove",
                       expression: "optional"
                   },  
                   zIndex: {
                       type: "string",
                       label:"Z-Index",
                       ref: "zIndex",
                       expression: "optional"
                   },        
                   Position:{
                       label: "Border",
                       component: "expandable-items",
                       items:{
                           item: { 
                               label: "Position", 
                               items:{
                                   top: {
                                       type: "integer",
                                       ref: "top",
                                       label: "Top",
                                       expression: "optional",
                                       min: 0,
                                       max: 100
                                   },
                                   left: {
                                       type: "integer",
                                       ref: "left",
                                       label: "Left",
                                       expression: "optional",
                                       min: 0,
                                       max: 100
                                   },
                                   right: {
                                       type: "integer",
                                       ref: "right",
                                       label: "Right",
                                       expression: "optional",
                                       min: 0,
                                       max: 100
                                   },
                                   bottom: {
                                       type: "integer",
                                       ref: "bottom",
                                       label: "Bottom",
                                       expression: "optional",
                                       min: 0,
                                       max: 100
                                   }
                               }
                           }
                       }
                   },
                   showPaddingAndBorder : {
                        label: "Show Padding and Border Options",
                        type: "boolean",
                        ref: "showPaddingAndBorder",
                        component: "switch",
                        defaultValue: false,
                        options: [{
                            value: false,
                            label: "Hide"
                        }, {
                            value: true,
                            label: "Show"
                        }],
                   },
                   Padding:{
                       label: "Padding",
                       component: "expandable-items",
                       show : function(d){
                            return d.showPaddingAndBorder == true;
                       },
                       items:{
                           item: { 
                               label: "Padding", 
                               items:{
                                   leftPadding: {
                                       type: "string",
                                       label:"Left Padding",
                                       ref: "padding.left"
                                   },
                                   topPadding: {
                                       type: "string",
                                       label:"Top Padding",
                                       ref: "padding.top"
                                   },
                                   rightPadding: {
                                       type: "string",
                                       label:"Right Padding",
                                       ref: "padding.right"
                                   },
                                   bottomPadding: {
                                       type: "string",
                                       label:"Bottom Padding",
                                       ref: "padding.bottom"
                                   },
                               }
                           }
                       }
                   },
                   Border:{
                       label: "Border",
                       component: "expandable-items",
                       show : function(d){
                            return d.showPaddingAndBorder == true;
                       },
                       items:{
                           item : {
                               label: "Border",
                               items :{
                                   leftBorderStyle: {
                                       type: "string",
                                       component: "dropdown",
                                       label:"Left Border Style",
                                       ref: "border.left.style",
                                       defaultVlaues: "solid",
                                       options:[
                                           {value:'none',label:'none'},
                                           {value:'dotted',label:'dotted'},
                                           {value:'dashed',label:'dashed'},
                                           {value:'solid',label:'solid'},
                                           {value:'double',label:'double'}
                                       ]
                                   },
                                   leftBorderWidth: {
                                       type: "string",
                                       label:"Left Border Width",
                                       ref: "border.left.width"
                                   },
                                   leftBorderColor: {
                                       type: "string",
                                       label:"Left Border Color",
                                       ref: "border.left.color"
                                   },
                                   topBorderStyle: {
                                       type: "string",
                                       component: "dropdown",
                                       label:"Top Border Style",
                                       ref: "border.top.style",
                                       defaultVlaues: "solid",
                                       options:[
                                           {value:'none',label:'none'},
                                           {value:'dotted',label:'dotted'},
                                           {value:'dashed',label:'dashed'},
                                           {value:'solid',label:'solid'},
                                           {value:'double',label:'double'}
                                       ]
                                   },
                                   topBorderWidth: {
                                       type: "string",
                                       label:"Top Border Width",
                                       ref: "border.top.width"
                                   },
                                   topBorderColor: {
                                       type: "string",
                                       label:"Top Border Color",
                                       ref: "border.top.color"
                                   },
                                   rightBorderStyle: {
                                       type: "string",
                                       component: "dropdown",
                                       label:"Right Border Style",
                                       ref: "border.right.style",
                                       defaultVlaues: "solid",
                                       options:[
                                           {value:'none',label:'none'},
                                           {value:'dotted',label:'dotted'},
                                           {value:'dashed',label:'dashed'},
                                           {value:'solid',label:'solid'},
                                           {value:'double',label:'double'}
                                       ]
                                   },
                                   rightBorderWidth: {
                                       type: "string",
                                       label:"Right Border Width",
                                       ref: "border.left.width"
                                   },
                                   rightBorderColor: {
                                       type: "string",
                                       label:"Right Border Color",
                                       ref: "border.left.color"
                                   },
                                   bottomBorderStyle: {
                                       type: "string",
                                       component: "dropdown",
                                       label:"Bottom Border Style",
                                       ref: "border.bottom.style",
                                       defaultVlaues: "solid",
                                       options:[
                                           {value:'none',label:'none'},
                                           {value:'dotted',label:'dotted'},
                                           {value:'dashed',label:'dashed'},
                                           {value:'solid',label:'solid'},
                                           {value:'double',label:'double'}
                                       ]
                                   },
                                   bottomBorderWidth: {
                                       type: "string",
                                       label:"Bottom Border Width",
                                       ref: "border.bottom.width"
                                   },
                                   bottomBorderColor: {
                                       type: "string",
                                       label:"Bottom Border Color",
                                       ref: "border.bottom.color"
                                   }
                               }
                           }
                       }
                   },
                   action : action.definition,
                   visualType: {
                       type: "string",
                       ref: "visualType",
                       component: "dropdown",
                       label:"Visual Type",
                       defaultVlaue: "text",
                       options:function(){
                           var opts = [];
                           for(var i=0; i<ComponentManager.itemList.length; ++i){
                               opts.push({
                                   value: ComponentManager.itemList[i].visualType,
                                   label: ComponentManager.itemList[i].visualType
                               });
                           }
                           return opts;
                       }
                   }
               }
       };

       for(var i=0; i<ComponentManager.itemList.length; ++i){
           var com = ComponentManager.itemList[i];
           def.items[com.visualType + 'Props'] = com.definition;
       }

       return {
           definition: def,
           paintAllCells : function(d3Obj, layout, inDashboard){
               var comlist = this;
                return d3Obj.style('display', function(d){
                          var visible = d.visible == undefined || d.visible == '' || d.visible != 0 ? 'block' : 'none';
                          d.visibleChanged = d3.select(this).style('display') != visible;
                          return visible;
                      })
                      .style('z-index', function(d){
                          return d.zIndex;
                      })
                      .style('float', 'left')
                      .style('position', inDashboard == true ? 'absolute':'relative')
                      .style('left', function(d){
                          return d.left;
                      })
                      .style('top', function(d){
                          return d.top;
                      })
                      .style('right', function(d){
                          return d.right;
                      })
                      .style('bottom', function(d){
                          return d.bottom;
                      })
                      .style('background-color', function(d){
                          return d.backgroundColor;
                      }).style('padding-left', function(d){
                          return d.padding == undefined || d.padding == null ? '0px' : d.padding.left;
                      }).style('padding-top', function(d){
                          return d.padding == undefined || d.padding == null ? '0px' :  d.padding.top;
                      }).style('padding-right', function(d){
                          return d.padding == undefined || d.padding == null ? '0px' :  d.padding.right;
                      }).style('padding-bottom', function(d){
                          return d.padding == undefined || d.padding == null ? '0px' :  d.padding.bottom;
                      })
                      .style('border-left', function(d){
                          return (d.border == undefined || d.border.left == undefined) 
                                      ? null 
                                          : (d.border.left.style + ' ' + d.border.left.width + ' ' + d.border.left.color); 
                      })
                      .style('border-bottom', function(d){
                          return (d.border == undefined || d.border.bottom == undefined) 
                                      ? null 
                                          : (d.border.bottom.style + ' ' + d.border.bottom.width + ' ' + d.border.bottom.color); 
                      })
                      .style('border-top', function(d){
                          return (d.border == undefined || d.border.top == undefined) 
                                      ? null 
                                          : (d.border.top.style + ' ' + d.border.top.width + ' ' + d.border.top.color); 
                      })
                      .style('border-right', function(d){
                          return (d.border == undefined || d.border.right == undefined) 
                                      ? null 
                                          : (d.border.right.style + ' ' + d.border.right.width + ' ' + d.border.right.color); 
                      })
                      .each(function(p, j){
                          var data = d3.select(this).datum();
                          if(data.backgroundColorOnMouseMove != undefined){
                              var self = this;
                              this.onmousemove = function(ele){
                                  if(data.backgroundColorOnMouseMove != undefined && data.backgroundColorOnMouseMove != '')
                                    d3.select(self).style('background-color', data.backgroundColorOnMouseMove);
                              };

                              this.onmouseout = function(ele){
                                  if(data.backgroundColorOnMouseMove != undefined && data.backgroundColorOnMouseMove != '')
                                    d3.select(self).style('background-color', data.backgroundColor);
                              };
                          }
                          
                          if(inDashboard)
                            action.attachAction(this, layout, comlist);
                          ComponentManager.paintComponent(d3.select(this), layout);
                      });;
           },
           paint : function(dCell, layout){
                dCell.exit().remove();
                this.paintAllCells(dCell.enter().append('div').attr('class', 'CIO-KPI-Container-Visual'), layout, true);
                this.paintAllCells(dCell, layout, true);
           }
       };
}
);