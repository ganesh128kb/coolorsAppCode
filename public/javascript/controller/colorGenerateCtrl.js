
var safeColors = ['00','ff','66','99','cc','ff'];
var rand = function() {
	return Math.floor(Math.random()*6);
};
var randomColor = function() {
	var r = safeColors[rand()];
	var g = safeColors[rand()];
	var b = safeColors[rand()];
	return "#"+r+g+b;
};

app.directive('colorListing',function(){
	var list_records = [];
	var directive = {};
		directive.restrict = 'E';
		directive.replace = true;
		directive.template = '<div class="container"></div>';
		directive.link = function ($scope,element,attrs){			
			var _divAppend = angular.element(document.querySelector('.container'));			
			$scope.clickGenerate = function(){
				$scope.generatelisting = false;
				$scope.savedContainer = true;		
				_divAppend.find('div').remove();
				for(i=0;i<5;i++){					
					_divAppend.append('<div class="clrPlatte"></div>');
					var _generate = randomColor();
					element.find('div').eq(i).css('background-color',_generate).html('<span class="codeClass">'+_generate+'</span>');					
				}
				$scope.isDisabled = false;
				$scope.isSavedData = false;
			}
			$scope.savePalatte = function(){
				var storeData = element.find('span').text().split(/#/);
				var new_string = storeData.join(' #');
				var _split = new_string.split(' ');							
				myDataRef.push({color_gen_1 : _split[1],color_gen_2 : _split[2],color_gen_3 : _split[3],color_gen_4 : _split[4],color_gen_5 : _split[5]});
				$scope.isDisabled = true;
				$scope.isSavedData = false;
				
			}
			$scope.savedData = function(){
				var _divSaveAppend = angular.element(document.querySelector('.savedContainer'));
				_divSaveAppend.find('div').remove();
				myDataRef.on('child_added', function(snapshot) {
			        var message = snapshot.val();
					list_records = ({'color_gen_1':message.color_gen_1,'color_gen_2':message.color_gen_2,'color_gen_3':message.color_gen_3,'color_gen_4':message.color_gen_4,'color_gen_5':message.color_gen_5});
					$scope.saved = JSON.stringify(list_records);
					$scope.records = JSON.parse($scope.saved);					
					angular.forEach($scope.records,function(key,value){
						_divSaveAppend.append('<div class="clrPlatte" style="background:'+key+'"><span class="codeClass">'+key+'</span></div>');					
					})
				})
				$scope.generatelisting = true;
				$scope.savedContainer = false;
				$scope.isSavedData = true;
			}
		}
	return directive;
})

app.controller('colorGenerateCtrl',function($scope){
	$scope.isDisabled = true;
	$scope.isSavedData = false;
	
})