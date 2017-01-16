angular.module('NewsApp', [])
    .controller('MockCtrl', function ($scope, $http) {

        $scope.commentsservice = {};
        $scope.commentsservice.newsId = 'news-schnee';
    });
