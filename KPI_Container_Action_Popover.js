define(['jquery', './leonardo-ui/leonardo-ui'],
function($, leonardoui){
    var popover = null;
    return {
        value : 'popover',
        label : "Show Popover",
        trigger: 'mouseover',
        definition: {
              popoverWidth:{
                  type:"string",
                  ref: "action.popoverWidth",
                  label: "Popover Width",
                  expression: "optional"      
              },
              popoverTitle:{
                  type:"string",
                  ref: "action.popoverTitle",
                  label: "Popover Title"      
              },
              popoverContent:{
                  type:"string",
                  ref: "action.popoverContent",
                  label: "Popover Content",
                  expression:"optional"         
              },
              popoverContentType:{
                  type:"string",
                  ref: "action.popoverContentType",
                  label: "Show Content as",
                  component: "switch",
                  defaultValue: 'html',
                  options: [{
                          value: 'text',
                          label: "Text"
                      },{ 
                          value: 'html',
                          label: "HTML"
                  }]                          
              },
              popoverDock:{
                  type:"string",
                  ref: "action.popoverDock",
                  label: "Dock",
                  component: "dropdown",
                  defaultValue: 'bottom',
                  options: [{
                          value: 'bottom',
                          label: "bottom"
                      },{ 
                          value: 'top',
                          label: "top"
                      },{ 
                          value: 'right',
                          label: "right"
                      },{ 
                          value: 'left',
                          label: "left"
                  }
                  ]                          
              }
        },
        doAction : function(element, layout, data, index){
            var popoverTitle = data.action['popoverTitle' + index];
            var popoverContent = data.action['popoverContent' + index];
            var popoverContentType = data.action['popoverContentType' + index];
            var popoverWidth = data.action['popoverWidth' + index];
            var popoverDock = data.action['popoverDock' + index];

            var id = "KPI_LEGO_POPOVER_" + layout.qInfo.qId;               
            this.init(element, layout);
            var popover = leonardoui.popover( {
                content: $('#' + id)[0].innerHTML,
                closeOnEscape: true,
                alignTo : element,
                dock: popoverDock == undefined ? 'bottom' : popoverDock
            } );

            $(popover.element.querySelectorAll( ".lui-popover__title" )[0]).html(popoverTitle);

            if(popoverWidth != undefined && popoverWidth != ''){
                $(popover.element).css('width', popoverWidth);
            }
            
            if(popoverContentType == undefined || popoverContentType == 'html'){
                $(popover.element.querySelectorAll( ".lui-popover__body" )[0]).html('<pre>'+popoverContent+'</pre>');
            }else{
                $(popover.element.querySelectorAll( ".lui-popover__body" )[0]).html($('<pre></per>').text(popoverContent));
            }

            // Dialog was shown
            var closeButton = popover.element.querySelectorAll( ".close-button" )[0];
            closeButton.focus();
            closeButton.onclick= function() {
                popover.close();
            } ;

            element.addEventListener('mouseout', function() {
                popover.close();
            } );
        },
        init : function(element, layout){
            var id = "KPI_LEGO_POPOVER_" + layout.qInfo.qId;
            if($('#' + id).length == 0){
               var html = '<div id="'+id+'" class="popover-content" style="display: none;">'+
                               '<div class="lui-popover" style="width: 400px;">'+
                                   '<div class="lui-popover__header">'+
                                    '<div class="lui-popover__title">Popover title</div>'+
                                   '</div>'+
                                   '<div class="lui-popover__body">'+
                                   'Bacon ipsum dolor amet ham hock pork short loin, cow bacon doner jerky pork loin hamburger. Pork chop biltong chuck turkey, cow meatloaf corned beef fatback pancetta drumstick landjaeger jowl.'+
                                   '</div>'+
                                   '<div class="lui-popover__footer">'+
                                   '<button class="lui-button  lui-popover__button  close-button">OK</button>'+
                                   '</div>'+
                               '</div>'+
                           '</div>';
               $(element).parent().append(html);               
            }
        },
        
    };

}
);