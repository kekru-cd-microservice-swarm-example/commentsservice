angular.module('CommentsApp', [])
    .controller('CommentsCtrl', function ($scope, $http, $location) {
        

        $scope.getComments = function() {

            var newsId = $scope.getULRParameters().newsid;

            $http({
                method: 'GET',
                url: 'api/comments/' + newsId

            }).then(function successCallback(response) {

                $scope.comments = response.data;
                console.log(response);

            }, function errorCallback(response) {
                console.log(response);
            });
        }


        $scope.getULRParameters = function(){
             
            var query_string = {};
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (typeof query_string[pair[0]] === "undefined") {
                    query_string[pair[0]] = decodeURIComponent(pair[1]);
                } else if (typeof query_string[pair[0]] === "string") {
                    var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
                    query_string[pair[0]] = arr;
                } else {
                    query_string[pair[0]].push(decodeURIComponent(pair[1]));
                }
            }
            return query_string;        
        }


    });
