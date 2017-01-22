angular.module('NewsApp')
    .controller('CommentsCtrl', function ($scope, $http) {

        //erhalte die newsId aus dem übergeordneten Controller
        $scope.newsId = $scope.commentsservice.newsId;

        $scope.getComments = function() {

            $http({
                method: 'GET',
                url: 'api/comments/' + $scope.newsId

            }).then(function successCallback(response) {

                $scope.comments = response.data;
                console.log(response);

            }, function errorCallback(response) {
                console.log(response);
            });
        }


    });
