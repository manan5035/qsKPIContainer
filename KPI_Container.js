define( ["qlik", "jquery", "./KPI_Container_visual_properties", './KPI_Container_componentlist', './KPI_Container_componentManager','./d3.v4'],
	function (qlik, $, visualProp, comList,ComponentManager, d3) {
        var SHADOW_SIZE = {
            none : {num: 0, text: null, css: null},
            small : {num: 3, text: '3px', css: '0px 0px 3px #888888'},
            normal : {num: 5, text: '5px', css: '0px 0px 5px #888888'},
            big: {num: 10, text : '10px', css: '0px 0px 10px #888888'}
        };

        function calculateVisualPosition(visualCellDef, $element){
                var visualWidth = 0;
                if(visualCellDef.visual.width.indexOf('%') >= 0){ //%
                    visualWidth = parseFloat(visualCellDef.visual.width.substr(0, visualCellDef.visual.width.length-1)) / 100 * $element.width();                    
                }else{ //px
                    visualWidth = parseFloat(visualCellDef.visual.width.substr(0, visualCellDef.visual.width.length-2));
                }
                var visualHeight = 0;
                if(visualCellDef.visual.height.indexOf('%') >= 0){ //%
                    visualHeight = parseFloat(visualCellDef.visual.height.substr(0, visualCellDef.visual.height.length-1)) / 100 * $element.height();                    
                }else{ //px
                    visualHeight = parseFloat(visualCellDef.visual.height.substr(0, visualCellDef.visual.height.length-2));
                }

                if(visualCellDef.visual.border.left.style != 'none' && visualCellDef.visual.border.left.width && visualCellDef.visual.border.left.width.indexOf('%') >= 0){
                    visualWidth -= parseFloat(visualCellDef.visual.border.left.width.substr(0, visualCellDef.visual.border.left.width.length-1)) / 100 * $element.height();  
                }else if(visualCellDef.visual.border.left.style != 'none' && visualCellDef.visual.border.left.width){ //px
                    visualWidth -= parseFloat(visualCellDef.visual.border.left.width.substr(0, visualCellDef.visual.border.left.width.length-2));  
                }
                
                if(visualCellDef.visual.border.right.style != 'none' && visualCellDef.visual.border.right.width && visualCellDef.visual.border.right.width.indexOf('%') >= 0){
                    visualWidth -= parseFloat(visualCellDef.visual.border.right.width.substr(0, visualCellDef.visual.border.right.width.length-1)) / 100 * $element.height();  
                }else if(visualCellDef.visual.border.right.style != 'none' && visualCellDef.visual.border.right.width){ //px
                    visualWidth -= parseFloat(visualCellDef.visual.border.right.width.substr(0, visualCellDef.visual.border.right.width.length-2));  
                }

                
                if(visualCellDef.visual.border.top.style != 'none' && visualCellDef.visual.border.top.width && visualCellDef.visual.border.top.width.indexOf('%') >= 0){
                    visualHeight -= parseFloat(visualCellDef.visual.border.top.width.substr(0, visualCellDef.visual.border.top.width.length-1)) / 100 * $element.height();  
                }else if(visualCellDef.visual.border.top.style != 'none' && visualCellDef.visual.border.top.width){ //px
                    visualHeight -= parseFloat(visualCellDef.visual.border.top.width.substr(0, visualCellDef.visual.border.top.width.length-2));  
                }
                
                if(visualCellDef.visual.border.bottom.style != 'none' && visualCellDef.visual.border.bottom.width && visualCellDef.visual.border.bottom.width.indexOf('%') >= 0){
                    visualHeight -= parseFloat(visualCellDef.visual.border.bottom.width.substr(0, visualCellDef.visual.border.bottom.width.length-1)) / 100 * $element.height();  
                }else if(visualCellDef.visual.border.bottom.style != 'none' && visualCellDef.visual.border.bottom.width){ //px
                    visualHeight -= parseFloat(visualCellDef.visual.border.bottom.width.substr(0, visualCellDef.visual.border.bottom.width.length-2));  
                }

            

                var leftText = SHADOW_SIZE[visualCellDef.visual.shadow] == undefined ? '' : SHADOW_SIZE[visualCellDef.visual.shadow].text;
                visualWidth -= SHADOW_SIZE[visualCellDef.visual.shadow] == undefined ? 0 : SHADOW_SIZE[visualCellDef.visual.shadow].num * 2;
                visualHeight -= SHADOW_SIZE[visualCellDef.visual.shadow] == undefined ? 0 : SHADOW_SIZE[visualCellDef.visual.shadow].num;
                

                return {
                    visualWidth : visualWidth,
                    visualHeight: visualHeight,
                    leftText : leftText
                };
        };

        function getVisualBorderText(visualCellDef){
            return {
                leftBorder : visualCellDef.visual.border.left.style == 'none' ?  null :
                        visualCellDef.visual.border.left.style + ' ' + visualCellDef.visual.border.left.width + ' ' + visualCellDef.visual.border.left.color,
                rightBorder :  visualCellDef.visual.border.right.style == 'none' ?  null :
                        visualCellDef.visual.border.right.style + ' ' + visualCellDef.visual.border.right.width + ' ' + visualCellDef.visual.border.right.color, 
                topBorder :  visualCellDef.visual.border.top.style == 'none' ?  null :
                        visualCellDef.visual.border.top.style + ' ' + visualCellDef.visual.border.top.width + ' ' + visualCellDef.visual.border.top.color,  
                bottomBorder :  visualCellDef.visual.border.bottom.style == 'none' ?  null :
                        visualCellDef.visual.border.bottom.style + ' ' + visualCellDef.visual.border.bottom.width + ' ' + visualCellDef.visual.border.bottom.color                    
            }
            
        };
	    return {
	        initialProperties : {
	            version: 1.0,
	            qHyperCubeDef : {
	                qDimensions : [],
	                qMeasures : [],
	                qInitialDataFetch : [{
	                    qWidth : 2,
	                    qHeight : 50
	                }]
	            },
	            fontSize : {
	                min : 8,
	                max : 24
	            }
	        },
	        definition : { 
	            type: "items",
	            component: "accordion",
	            items: {	                              
	                settings: {
					    uses: "settings",
	                    items: {
                            
                            visual :visualProp,
                            
                            ComponentList : comList.definition
	                    }
	                }				  
	            }
	        },
			support: {
				snapshot: true,
				export: true,
				exportData: false
			},
			paint: function ($element, layout) {

              

                var id = "KPI_Container_" + layout.qInfo.qId;
                if($('#' + id).length == 0){
                    $('<div></div>').attr("id", id)
                        .appendTo($($element));
                }
                
			    var visualCellDef = $.extend(true, {
                    visual:{
                        width:'100%',
                        height:'100%',
                        backgroundColor: null,
                        border:{
                            left:{
                                style:null,
                                width:null,
                                color:null
                            },
                            top:{
                                style:null,
                                width:null,
                                color:null
                            },
                            right:{
                                style:null,
                                width:null,
                                color:null
                            },
                            bottom:{
                                style:null,
                                width:null,
                                color:null
                            }

                        }
                    },
                    visualCells : []
                }, this.$scope.layout.props);
                visualCellDef.visualCells = visualCellDef.visualCells.filter(function(value, index, ar){
                    return value.showInDialog != true;
                });


                //calculate height % to px
                var visualPosition = calculateVisualPosition(visualCellDef, $element);
                var visualWidth = visualPosition.visualWidth;
                var visualHeight = visualPosition.visualHeight;
                var visualLeftText = visualPosition.leftText;

                var rowWidth = visualWidth;
                var rowHeight = visualHeight;

                visualCellDef.visual.width = rowWidth + 'px';
                visualCellDef.visual.height = rowHeight + 'px';
                for (var c = 0; c < visualCellDef.visualCells.length; ++c) {
                    var cell = visualCellDef.visualCells[c];

                    //convert cell height from % to px
                    cell.top = rowHeight * (cell.top / 100.0) + 'px';
                    cell.left = rowWidth * (cell.left / 100.0) + 'px';
                    cell.bottom = cell.bottom == 0 ? 'auto' : rowHeight * (1 - cell.bottom / 100.0) + 'px';
                    cell.right = cell.right == 0 ? 'auto' : rowWidth * (1 - cell.right / 100.0) + 'px';
                }

                var dataPage = [];            
                dataPage.push({                     
                    visualCellDef : $.extend(true, {rowIndex: 0}, visualCellDef)
                });


			   
                var visualBorder = getVisualBorderText(visualCellDef);
                
                var dVisuals = d3.select('#' + id)
                    .style('position', 'relative')
                    .style('overflow', 'hidden')
                    .style('width', visualWidth + 'px')
                    .style('height', visualHeight + 'px')
                    .style('left', visualLeftText)
                    .style('background-color', visualCellDef.visual.backgroundColor)
                    .style('border-left', visualBorder.leftBorder)
                    .style('border-top', visualBorder.topBorder)
                    .style('border-right', visualBorder.rightBorder)
                    .style('border-bottom', visualBorder.bottomBorder)
                    .style('box-shadow', 
                        visualCellDef.visual.shadow == undefined || visualCellDef.visual.shadow == 'none' ? null : SHADOW_SIZE[visualCellDef.visual.shadow].css
                    )
                    .style('border-radius', function(d){
                        return (visualCellDef.visual.roundCornerRadius == undefined ? 0 : visualCellDef.visual.roundCornerRadius) + 'px';
                    })
                    .selectAll(function(){
                        return this.childNodes;
                    })
                    .data(dataPage);

                function processDVisuals(d3Obj){
                    return d3Obj.style('display', 'block')
                                .style('float', 'left')
                                .style('position', 'relative')                      
                                .style('width', function(d){
                                    return d.visualCellDef.visual.width;
                                })
                                .style('height', function(d){
                                    return d.visualCellDef.visual.height;
                                });
                }
                dVisuals.exit().remove();
                processDVisuals(dVisuals.enter().append('div'));
                processDVisuals(dVisuals);
                dVisuals = d3.select('#' + id).selectAll(function(){
                        return this.childNodes;
                    });

                dVisuals.each(function(p, j){
                     var dCell = d3.select(this).selectAll("div.CIO-KPI-Container-Visual")
                                    .data(function(d){
                                            return d.visualCellDef.visualCells;
                                    });
                    
                    comList.paint(dCell, layout);
                });            
                                                    
                
				return qlik.Promise.resolve();
			}
		};

	} );

