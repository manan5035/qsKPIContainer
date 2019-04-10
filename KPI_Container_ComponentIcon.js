define(['jquery'],
function(){
    var iconList = [
'lui-icon--image'
,'lui-icon--back'
,'lui-icon--forward'
,'lui-icon--history'
,'lui-icon--help'
,'lui-icon--info'
,'lui-icon--toggle-left'
,'lui-icon--toggle-right'
,'lui-icon--text'
,'lui-icon--group'
,'lui-icon--search'
,'lui-icon--zoom-in'
,'lui-icon--zoom-out'
,'lui-icon--export'
,'lui-icon--import'
,'lui-icon--field'
,'lui-icon--lock'
,'lui-icon--unlock'
,'lui-icon--database'
,'lui-icon--calendar'
,'lui-icon--bookmark'
,'lui-icon--library'
,'lui-icon--star'
,'lui-icon--print'
,'lui-icon--remove'
,'lui-icon--handle'
,'lui-icon--handle-horizontal'
,'lui-icon--menu'
,'lui-icon--list'
,'lui-icon--unordered-list'
,'lui-icon--clock'
,'lui-icon--puzzle'
,'lui-icon--table'
,'lui-icon--filterpane'
,'lui-icon--plus'
,'lui-icon--minus'
,'lui-icon--triangle-top'
,'lui-icon--triangle-bottom'
,'lui-icon--triangle-left'
,'lui-icon--triangle-right'
,'lui-icon--tick'
,'lui-icon--cogwheel'
,'lui-icon--settings'
,'lui-icon--cut'
,'lui-icon--copy'
,'lui-icon--paste'
,'lui-icon--align-left'
,'lui-icon--align-center'
,'lui-icon--align-right'
,'lui-icon--bold'
,'lui-icon--italic'
,'lui-icon--underline'
,'lui-icon--camera'
,'lui-icon--slide-show'
,'lui-icon--palette'
,'lui-icon--shapes'
,'lui-icon--effects'
,'lui-icon--file'
,'lui-icon--expand'
,'lui-icon--collapse'
,'lui-icon--bin'
,'lui-icon--link'
,'lui-icon--pivot'
,'lui-icon--reload'
,'lui-icon--add'
,'lui-icon--edit'
,'lui-icon--lasso'
,'lui-icon--key'
,'lui-icon--box'
,'lui-icon--home'
,'lui-icon--person'
,'lui-icon--stream'
,'lui-icon--grid'
,'lui-icon--cloud'
,'lui-icon--more'
,'lui-icon--folder'
,'lui-icon--toggle-bottom'
,'lui-icon--drop'
,'lui-icon--play'
,'lui-icon--tag'
,'lui-icon--close'
,'lui-icon--warning'
,'lui-icon--warning-triangle'
,'lui-icon--share'
,'lui-icon--top'
,'lui-icon--low-resolution'
,'lui-icon--high-resolution'
,'lui-icon--view'
,'lui-icon--control'
,'lui-icon--code'
,'lui-icon--upload'
,'lui-icon--repair'
,'lui-icon--split'
,'lui-icon--up-down'
,'lui-icon--disconnect'
,'lui-icon--photo-library'
,'lui-icon--application'
,'lui-icon--new-tab'
,'lui-icon--ascending'
,'lui-icon--descending'
,'lui-icon--arrow-up'
,'lui-icon--arrow-down'
,'lui-icon--arrow-right'
,'lui-icon--arrow-left'
,'lui-icon--sync'
,'lui-icon--draggable'
,'lui-icon--book'
,'lui-icon--measure'
,'lui-icon--download'
,'lui-icon--more-rounded'
,'lui-icon--align-object-left'
,'lui-icon--align-object-center'
,'lui-icon--align-object-right'
,'lui-icon--submit'
,'lui-icon--operators'
,'lui-icon--general-data-class'
,'lui-icon--building'
,'lui-icon--bell'
,'lui-icon--unlink'
,'lui-icon--lightbulb'
,'lui-icon--log-in'
,'lui-icon--log-out'
,'lui-icon--previous'
,'lui-icon--goto'
,'lui-icon--save'
,'lui-icon--sheet'
,'lui-icon--object'
,'lui-icon--clear-selections'
,'lui-icon--selections-tool'
,'lui-icon--selections-reload'
,'lui-icon--selections-back'
,'lui-icon--selections-forward'
,'lui-icon--expression'
,'lui-icon--select-alternative'
,'lui-icon--select-possible'
,'lui-icon--select-excluded'
,'lui-icon--select-all'
,'lui-icon--bar-chart'
,'lui-icon--bar-chart-horizontal'
,'lui-icon--line-chart'
,'lui-icon--pie-chart'
,'lui-icon--gauge-chart'
,'lui-icon--kpi'
,'lui-icon--scatter-chart'
,'lui-icon--map'
,'lui-icon--pivot-table'
,'lui-icon--treemap'
,'lui-icon--combo-chart'
,'lui-icon--direct-discovery'
,'lui-icon--data-model'
,'lui-icon--script'
,'lui-icon--run-script'
,'lui-icon--script-ok'
,'lui-icon--debug'
,'lui-icon--associate'
,'lui-icon--break-association'
,'lui-icon--auto-layout'
    ];

    var IconComponentDefinition = {
        template:'<div class="pp-component">' +
                    '<div class="label" title="Select an Icon">Select an Icon</div>' +
                    '<div style="border-radius:3px 3px 3px 3px; border:solid 1px #666666;height:auto"">'+
                    '<div ng-repeat="icon in iconList" style="display:block;overflow:auto;float:left;width:20px;height:20px;padding:2px;background-color: {{getIconBackgroundColor($index)}}">'+
                        '<span class="lui-icon  {{icon.size}} {{icon.id}}" ng-click="onClickIcon($index)"></span>'+
                    '</div>'+
                    '<div style="clear:both"></div>'+
                    '</div>'+
                '</div>',
        controller : ["$scope", "$element", function($scope, $element){
            $scope.iconList = [];
            $scope.selectedIndex = -1;
            for(var i=0; i<iconList.length; ++i){
                if($scope.data.icon == iconList[i]){
                    $scope.selectedIndex = i;
                }
                $scope.iconList.push({
                    size : 'lui-icon--large',
                    id : iconList[i],
                    selected : $scope.selectedIndex == i
                });
            }

            $scope.getIconBackgroundColor = function(idx){
                return $scope.iconList[idx].selected ? '#DDEBF7' : null;
            }

            $scope.onClickIcon = function(idx){
                if($scope.selectedIndex >= 0)
                    $scope.iconList[$scope.selectedIndex].selected = false;

                $scope.iconList[idx].selected = true;
                $scope.selectedIndex = idx;
                $scope.data.icon = $scope.iconList[idx].id;
                $scope.$emit('saveProperties');
            }
        }]
    };
    return IconComponentDefinition;
    
}

);