define(['qlik'],
function(qlik){

    return {
        value : 'openWeb',
        label : 'Open Webpage',
        definition: {
            openWebUrl:{
                type:"string",
                ref: "action.openWebUrl",
                label: "Webpage URL",
                expression: "optional"
            }
        },
        doAction : function(element, layout, data, index){
            var url = data.action['openWebUrl' + index];
            if ( url != undefined && url != '' ) {
				if ( url.substring(0,7) ==  'http://'  || url.substring(0,8) ==  'https://'  ) {
					window.open( url );
				} else {
					window.open( 'http://' + url );
				}
			}
        }
        
    };

}
);