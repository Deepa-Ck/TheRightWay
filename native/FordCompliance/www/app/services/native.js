'use strict';

angular.module('fcApp.services').factory('NativeService', ['ENV', '$http',
function(ENV, $http) {
	return {

		alert : function(message, alertCallback, title) {
			if(navigator.notification) {
				navigator.notification.alert(message, alertCallback, title, 'OK');
			} else {
				alert(message);
				alertCallback();
			}
		},

		fetchJsonBundle : function(url, selectedLanguage, successCb, errorCb) {
			if(navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
				cordova.exec(function(result) {
					localStorage.setItem('bundle-url', result);
					$http.get(result + "app.json").success(successCb);
				}, function(error) {
					errorCb();
				}.bind(this), "DownloadZip", "DownloadFile", [url, selectedLanguage.code, selectedLanguage.version]);
			} else {
				$http.get(url).success(successCb);
			}
		
	};
}]);
