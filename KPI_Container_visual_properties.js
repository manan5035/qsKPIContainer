define([],
function(){
    return {
               label: "Visual",
               items: {
                   common: {
                       label:"Common Settings",
                       items:{
                           width: {
                               type: "string",
                               label:"Width",
                               ref: "props.visual.width",
                               defaultValue: '100%',
                               expression: "optional"
                           },
                           height: {
                               type: "string",
                               label:"Height",
                               ref: "props.visual.height",
                               defaultValue: '100%',
                               expression: "optional"
                           },
                           backgroundColor: {
                               type: "string",
                               label:"Background color",
                               ref: "props.visual.backgroundColor",
                               expression: "optional"
                           },
                           shadow: {
                               type: "string",
                               component: "dropdown",
                               label:"Shadow",
                               ref: "props.visual.shadow",
                               defaultVlaues: "solid",
                               options:[
                                   {value:'none',label:'none'},
                                   {value:'small',label:'small'},
                                   {value:'normal',label:'normal'},
                                   {value:'big',label:'big'}
                               ]
                            },
                           shadow: {
                               type: "string",
                               component: "dropdown",
                               label:"Shadow",
                               ref: "props.visual.shadow",
                               defaultVlaues: "solid",
                               options:[
                                   {value:'none',label:'none'},
                                   {value:'small',label:'small'},
                                   {value:'normal',label:'normal'},
                                   {value:'big',label:'big'}
                               ]
                            },
                            roundCorner:{
                                type: "number",
                                component: "slider",
                                label: "Round Corner",
                                ref: "props.visual.roundCornerRadius",
                                min: 0,
                                max: 50,
                                step: 3,
                                defaultValue: 0
                            }
                       }
                   },
                   Border:{
                       label: "Border",
                       component: "expandable-items",
                       items:{
                           item: { 
                               label: "Border", 
                               items:{
                                   leftBorderStyle: {
                                       type: "string",
                                       component: "dropdown",
                                       label:"Left Border Style",
                                       ref: "props.visual.border.left.style",
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
                                       ref: "props.visual.border.left.width"
                                   },
                                   leftBorderColor: {
                                       type: "string",
                                       label:"Left Border Color",
                                       ref: "props.visual.border.left.color"
                                   },
                                   topBorderStyle: {
                                       type: "string",
                                       component: "dropdown",
                                       label:"Top Border Style",
                                       ref: "props.visual.border.top.style",
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
                                       ref: "props.visual.border.top.width"
                                   },
                                   topBorderColor: {
                                       type: "string",
                                       label:"Top Border Color",
                                       ref: "props.visual.border.top.color"
                                   },
                                   rightBorderStyle: {
                                       type: "string",
                                       component: "dropdown",
                                       label:"Right Border Style",
                                       ref: "props.visual.border.right.style",
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
                                       ref: "props.visual.border.right.width"
                                   },
                                   rightBorderColor: {
                                       type: "string",
                                       label:"Right Border Color",
                                       ref: "props.visual.border.right.color"
                                   },
                                   bottomBorderStyle: {
                                       type: "string",
                                       component: "dropdown",
                                       label:"Bottom Border Style",
                                       ref: "props.visual.border.bottom.style",
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
                                       ref: "props.visual.border.bottom.width"
                                   },
                                   bottomBorderColor: {
                                       type: "string",
                                       label:"Bottom Border Color",
                                       ref: "props.visual.border.bottom.color"
                                   }
                               }
                           }
                       }
                   }                                   
               }
        };
}
);