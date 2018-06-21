require('babel-polyfill');

(function (angular) {
    angular.module("demoApp", [])
        .controller("myController", myControllerConstrut);

    myControllerConstrut.$inject = ['$q', '$scope', '$http'];
    function myControllerConstrut($q, $scope, $http) {
        var ctrl = this;
        ctrl.hello = 'hello';
        $scope.greetings = 'hello world!';

        $scope.query = async () => {
            $scope.greetings = 'query...';
            let response = await $http.get('/api');
            $scope.greetings = response.data;
            // $scope.$digest();
            $scope.$apply();
        };

        async function queryAlot() {
            let response = await $http.get('/api');
            let response2 = await $http.get('/api2');
            let val = response2.data + "-" + response.data;
            ctrl.hello = val;
        }

        $scope.query2 = () => {
            ctrl.hello = 'query2...';
            queryAlot().finally(() => {
                $scope.$digest();
                // $scope.$apply();
            });
        }

        $scope.query3 = () => {
            ctrl.hello = 'query3...';
            $q.when(0).then(queryAlot).finally(() => {
                $scope.greetings = "3 done";
            });
        }
    }
})(angular);