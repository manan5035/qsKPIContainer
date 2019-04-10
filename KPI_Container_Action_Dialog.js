define(['jquery', './leonardo-ui/leonardo-ui'],
function($, leonardoui){

    return {
        value : 'dialog',
        label : "Show Dialog",
        definition: {
              dialogWidth:{
                  type:"string",
                  ref: "action.dialogWidth",
                  label: "Dialog Width"      
              },
              dialogTitle:{
                  type:"string",
                  ref: "action.dialogTitle",
                  label: "Dialog Title"      
              },
              dialogContent:{
                  type:"string",
                  ref: "action.dialogContent",
                  label: "Dialog Content",
                  expression:"optional"         
              },
              dialogContentType:{
                  type:"string",
                  ref: "action.dialogContentType",
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
              }
        },
        doAction : function(element, layout, data, index){
            var dialogTitle = data.action['dialogTitle' + index];
            var dialogContent = data.action['dialogContent' + index];
            var dialogContentType = data.action['dialogContentType' + index];
            var dialogWidth = data.action['dialogWidth' + index];

            var id = "KPI_LEGO_DIALOG_" + layout.qInfo.qId;               
            this.initDialog(element, layout);
            var dialog = leonardoui.dialog( {
                content: $('#' + id)[0].innerHTML,
                closeOnEscape: true
            } );

            if(dialogWidth != undefined && dialogWidth != ''){
                 $(dialog.element).css('width', dialogWidth);
            }

            $(dialog.element.querySelectorAll( ".lui-dialog__title" )[0]).html(dialogTitle);
            
            if(dialogContentType == undefined || dialogContentType == 'html'){
                $(dialog.element.querySelectorAll( ".lui-dialog__body" )[0]).html('<pre>'+dialogContent+'</pre>');
            }else{
                $(dialog.element.querySelectorAll( ".lui-dialog__body" )[0]).html($('<pre></per>').text(dialogContent));
            }

            // Dialog was shown
            var closeButton = dialog.element.querySelectorAll( ".close-button" )[0];
            closeButton.focus();
            closeButton.addEventListener( "click", function() {
                dialog.close();
            } );
        },
        initDialog : function(element, layout){
            var id = "KPI_LEGO_DIALOG_" + layout.qInfo.qId;
            if($('#' + id).length == 0){
               var html = '<div id="'+id+'" class="dialog-content" style="display: none;">'+
                               '<div class="lui-dialog" style="width: 400px;">'+
                                   '<div class="lui-dialog__header">'+
                                   '<div class="lui-dialog__title">Dialog title</div>'+
                                   '</div>'+
                                   '<div class="lui-dialog__body">'+
                                   'Bacon ipsum dolor amet ham hock pork short loin, cow bacon doner jerky pork loin hamburger. Pork chop biltong chuck turkey, cow meatloaf corned beef fatback pancetta drumstick landjaeger jowl.'+
                                   '</div>'+
                                   '<div class="lui-dialog__footer">'+
                                   '<button class="lui-button  lui-dialog__button  close-button">OK</button>'+
                                   '</div>'+
                               '</div>'+
                           '</div>';
               $(element).parent().append(html);               
            }
        },
        
    };

}
);