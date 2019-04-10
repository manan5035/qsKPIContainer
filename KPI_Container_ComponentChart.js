define(['jquery', 'qlik','ng!$q', './utils'],
function($, qlik, $q, util){
    var ChartComponentDefinition = {
        template:'<div class="pp-component">' +
                    '<div class="label" title="Select an Icon">Select an Object to copy</div>' +
                    '<select class="lui-select" ng-model="selectedObject">'+
                        '<option ng-repeat="obj in objectList" value="{{obj.qId}}">{{obj.type}} - {{obj.qId}}</option>' + 
                    '</select>' +      
                    '<button class="lui-button" style="margin-top: 3px;"  ng-click="onCopyObjectFrom()">Copy From</button>' +  
                    '<button class="lui-button" style="margin-top: 3px;" ng-click="onCopyObjectTo()"><span>Copy To&nbsp;&nbsp;</span>'+
                        '<span class="lui-icon  lui-icon--warning tooltip-trigger aria-haspopup="true" title="Please add any dimension or measure in the target chart before click this button" style="color: red"></span></button>' +      
                    
                '</div>',
        controller : ["$scope", "$element", function($scope, $element){
            
            if($scope.data != undefined){
                var prop = util.getRefValue($scope.data, $scope.definition.ref);
                $scope.selectedObject = prop.qInfo == undefined ? null : prop.qInfo.qId;
            }

            var app = qlik.currApp();
            var currSheetId = qlik.navigation.getCurrentSheetId().sheetId;
            var defer = $q.defer();
            app.getAppObjectList( 'sheet', function(reply){
                //if(reply.qInfo.qId != currSheetId) return;
                
                defer.resolve(reply);
                return defer.promise;
            }).then(function(data){
                var objList = [];
                $.each(data.layout.qAppObjectList.qItems, function(key, value) {
                    if(value.qInfo.qId != currSheetId) return;
                    $.each(value.qData.cells, function(k,v){
                        //if(v.type != 'barchart') return;
                        objList.push({
                            type: v.type,
                            qId : v.name
                        });
                    });
                });

                $scope.objectList = objList;
            });

            $scope.onCopyObjectFrom = function(){
                app.getObjectProperties($scope.selectedObject).then(function(model){
                    var props = JSON.parse(JSON.stringify(model.properties));
                    var seqId = util.getRefValue($scope.data, $scope.definition.ref + '.seqId');
                    util.setRefValue($scope.data, $scope.definition.ref, props);
                    seqId = seqId == undefined ? 0 : seqId;
                    util.setRefValue($scope.data, $scope.definition.ref + '.seqId', seqId + 1);
                    util.setRefValue($scope.data, $scope.definition.ref + '.qInfo.qId', null);
                    var qHyperCubeDef = util.getRefValue($scope.data, $scope.definition.ref + '.qHyperCubeDef');
                    util.setRefValue($scope.data, $scope.definition.ref + '.qHyperCubeDef1', qHyperCubeDef);
                    $scope.$emit('saveProperties');
                });	
            };

            
            $scope.onCopyObjectTo = function(){
                var props = util.getRefValue($scope.data, $scope.definition.ref);
                var props = JSON.parse(JSON.stringify(props));
                if(props.color != undefined && props.color.dimensionScheme != '12'){
                    props.color.dimensionScheme = '12';
                    props.color.auto = true;

                }
                delete props.qHyperCubeDef1;
                //delete props.qHyperCubeDef;
                delete props.extensionMeta;
                delete props.version;
                delete props.qMetaDef;
                delete props.qInfo;
                delete props.visualization;
                app.visualization.get($scope.selectedObject).then(function(vis){
                    vis.setOptions(props);
                    $scope.$emit('saveProperties');
                });
            };

        }]
    };
    return ChartComponentDefinition;
    
}

);