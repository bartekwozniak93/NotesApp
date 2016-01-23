angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, $localUser, $state) {


$scope.logout = function() {
    $state.go('auth.login'); 
};


  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
  $timeout(function(){
              $http.get('https://noteapppw.herokuapp.com/api/users', {
                headers: { 'Authorization': 'Basic '+$scope.data }
              }).success(function(data, status) { 
                  console.log(data);
              })
              .error(function(){
                console.log('blas');
              });


            }, 1000);  };
})

.controller('NotesCtrl', function($scope, $state, $http, $localUser) {
  $scope.checkNote= function(id){
    $state.go('app.single', {noteId : id}); 
  };

     $http({
            method: 'GET',
            url: 'https://noteapppw.herokuapp.com/api/notes',
             headers: {
          'Authorization': 'Basic '+$localUser.getObject('user').password}
        }).success(function(data) {
            var bartek =[];
            for(i=0; i< data.length; i++)
            { 
              bartek.push({title: data[i].title, id: data[i]._id}); 

            }
            $scope.notes = bartek;
        });


})

.controller('NotesCtrl2', function($scope, $state, $stateParams, $localUser, $http) {
        $scope.note = {};
        var url = 'https://noteapppw.herokuapp.com/api/notes/'+$stateParams.noteId;
        $http({
            method: 'GET',
            url: url,
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            headers: {
          'Authorization': 'Basic '+$localUser.getObject('user').password }
        }).success(function(data) {
             $scope.note.title = data[0].title;
             $scope.note.creationDate = data[0].creationDate;
              $scope.note.content = data[0].content;
        });

        $scope.updateNote = function(){
          $http({
            method: 'PUT',
            url: 'https://noteapppw.herokuapp.com/api/notes/'+$stateParams.noteId,
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: {content: $scope.note.content},
            headers: {'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic '+$localUser.getObject('user').password }
        }).success(function() {
          $state.go('app.notes');
        });
        };


        $scope.deleteNote = function(){
            $http({
            method: 'DELETE',
            url: 'https://noteapppw.herokuapp.com/api/notes/'+$stateParams.noteId,
            headers: {'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic '+$localUser.getObject('user').password }
        }).success(function() {
          $state.go('app.notes');
        });
        };


})

.controller('AddNoteCtrl', function($scope, $localUser, $http, $state) {
      $scope.data = {};
      $scope.addNote = function(){

        console.log($scope.data.text);

        var url = 'https://noteapppw.herokuapp.com/api/notes';

        $http({
            method: 'POST',
            url: url,
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: {content: $scope.data.text, title: $scope.data.title},
            headers: {'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic '+$localUser.getObject('user').password }
        }).success(function() {
          console.log('super!!');
        });


    }
})

.controller('AuthCtrl', function($scope, $localUser, $http, $state, $ionicPopup) {
    $scope.data = {};
 
    $scope.login = function() {
        var url = 'https://noteapppw.herokuapp.com/api/user';

        $http({
            method: 'POST',
            url: url,
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: {username: $scope.data.username, password: $scope.data.password},
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data, status) {
          if(data.message == 'true'){
            $localUser.setObject('user', {
              username: $scope.data.username,
              password: btoa($scope.data.username+':'+$scope.data.password) 
            });
            $state.go('app.notes'); 
            console.log('a');
          }
          else
          {
               var alertPopup = $ionicPopup.alert({
     title: 'Ups..',
     template: 'Try again.'
   });
          }
        });
    }

    $scope.gotosignup = function(){

    }
    $scope.signup = function() {
        var url = 'https://noteapppw.herokuapp.com/api/users';

        $http({
            method: 'POST',
            url: url,
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: {username: $scope.data.reg_username, password: $scope.data.reg_password},
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data, status) {
          if(data.message == 'true'){
            $localUser.setObject('user', {
              username: $scope.data.username,
              password: btoa($scope.data.username+':'+$scope.data.password) 
            });
                        $state.go('app.addNote'); 
          }
          else
          {
                          var alertPopup = $ionicPopup.alert({
     title: 'Ups..',
     template: 'Try again.'
   });
          }
        });
    }


});


