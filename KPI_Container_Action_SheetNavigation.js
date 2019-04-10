define(['qlik','ng!$q', 'underscore'],
function(qlik, $q, _){

    var getSheetList = function () {

		var defer = $q.defer();

		qlik.currApp().getAppObjectList( function ( data ) {
			var sheets = [];
			var sortedData = _.sortBy( data.qAppObjectList.qItems, function ( item ) {
				return item.qData.rank;
			} );
			_.each( sortedData, function ( item ) {
				sheets.push( {
					value: item.qInfo.qId,
					label: item.qMeta.title
				} );
			} );
			return defer.resolve( sheets );
		} );

		return defer.promise;
	};

    return {
        value : 'sheetNavigation',
        label : 'Navigate to Sheet',
        definition: {
                    navigateToSheet:{
                        type:"string",
                        ref: "action.sheetName",
                        label: "Sheet Name",
                        component: "dropdown",
                        options:getSheetList
                    }
        },
        doAction : function(element, layout, data, index){
            var sheetName = data.action['sheetName' + index];
            qlik.navigation.gotoSheet(sheetName);
        }
        
    };

}
);