define(['qlik', 'jquery', './KPI_Container_ComponentIcon', './leonardo-ui/leonardo-ui'],
function(qlik, $,IconComponentDefinition, leonardoui){
    return {
        visualType : 'text',
        definition:{
           label: "Visual",
           component : "expandable-items",
           show: function(d){
               return d.visualType == 'text';
           },
           items:{
               item: {
                   label: "Text Settings",
                   items:{
                        horzAlign :{
                            type: "string",
                            ref: "align",
                            component: "dropdown",
                            label:"Horizontal Align",
                            options:[
                                {value:'left',label:'left'},
                                {value:'center',label:'center'},
                                {value:'right',label:'right'}
                            ]
                        },
                        vertAlign :{
                            type: "string",
                            ref: "verticalAlign",
                            component: "dropdown",
                            label:"Vertical Align",
                            options:[
                                {value:'top',label:'top'},
                                {value:'middle',label:'middle'},
                                {value:'bottom',label:'bottom'}
                            ]
                        },
                        fontSize :{
                            type: "string",
                            ref: "fontSize",
                            label:"Font Size",
                            options:[
                                'top',
                                'middle',
                                'bottom'
                            ]
                        },
                        fontColor :{
                            type: "string",
                            ref: "fontColor",
                            label:"Font Color",
                            expression: "optional",
                        },
                        fontWeight :{
                            type: "string",
                            ref: "fontWeight",
                            label:"Font Weight",
                            component: "dropdown",
                            defaultValue: "normal",
                            options:[
                                {value:'normal',label:'normal'},
                                {value:'bold',label:'bold'},
                                {value:'bolder',label:'bolder'},
                                {value:'lighter',label:'lighter'}
                            ]
                        },               
                        text : {
                            type: "string",
                            ref: "text",
                            label:"Text",
                            expression: "optional",
                            show : function(data){
                                return (data.contentType == undefined || data.contentType == 'text');
                            }
                        },
                        showIcon : {
                            type: "boolean",
                            component: "checkbox",
                            label: "Show Icon",
                            ref: "showIcon",
                            defaultValue: false
                        },   
                        iconPosition : {
                            type: "string",
                            component: "buttongroup",
                            label: "Icon Position",
                            ref: "iconPosition",
                            options: [{
                                value: "left",
                                label: "left",
                                tooltip: "Left"
                            }, {
                                value: "right",
                                label: "right",
                                tooltip: "Right"
                            }],
                            defaultValue: 'left',
                            show: function(d){
                                return d.showIcon == true;
                            }
                        }, 
                        icon : {
                            type: "string",
                            component : IconComponentDefinition,
                            ref: "icon",
                            label:"Icons",
                            show : function(data){
                                //return (data.contentType != undefined && data.contentType == 'icon');
                                return data.showIcon == true;
                            }
                        }
                   }
               }
            }
        },
        paint : function(d3Obj, layout){
            
            d3Obj.html(null);

            d3Obj = d3Obj.append('div')
                .style('display', 'table')
                .style('height', '100%')
                .style('width', '100%')
                .append('div')
                .style('display', 'table-cell')
                .style('height', '100%')
                .style('width', '100%')

            d3Obj.style('text-align', function(d){
                return d.align
            }).style('vertical-align', function(d){
                return d.verticalAlign;
            }).style('font-size', function(d){
                return d.fontSize;
            }).style('color', function(d){
                return d.fontColor;
            }).style('font-weight', function(d){
                return d.fontWeight;
            }).style('line-height', function(d){
                return null;
            });


            var data = d3Obj.datum();
            var text = "";
            if(data.showIcon){
                if(data.iconPosition == 'right'){
                    d3Obj.html((data.text == '' ? '' : (data.text + '&nbsp;&nbsp;')) + '<span class="lui-icon  '+data.icon+'"></span>');
                }else{
                    d3Obj.html('<span class="lui-icon  '+data.icon+'"></span>' + (data.text == '' ? '' : ('&nbsp;&nbsp;' + data.text)));
                }
            }else{
                d3Obj.html(data.text);
            }
        }
    }
}

);