require('babel-polyfill');

(function (angular) {
    angular.module("demoApp", [])
        .controller("myController", myControllerConstrut);

    myControllerConstrut.$inject = ['$q', '$scope', '$http'];
    function myControllerConstrut($q, $scope, $http) {

        $scope.greetings = 'hello world!';
        $scope.query = async () => {
            $scope.greetings = 'query...';
            let response = await $http.get('/api');
            $scope.greetings = response.data;
            // $scope.$digest();
            $scope.$apply();
        }
    }

})(angular);