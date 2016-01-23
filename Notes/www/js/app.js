// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.services', 'angular-cache', 'ui.router'])

.run(function($ionicPlatform, CacheFactory) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    if(true)
      window.location

       
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })


  .state('app.addNote', {
      url: '/addNote',
      views: {
        'menuContent': {
          templateUrl: 'templates/addNote.html',
          controller: 'AddNoteCtrl'
        }
      }
  })
    
  .state('app.notes', {
      url: '/notes',
      views: {
        'menuContent': {
          templateUrl: 'templates/notes.html',
          controller: 'NotesCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/notesDetails/:noteId',
    views: {
      'menuContent': {
        templateUrl: 'templates/noteDetails.html',
        controller: 'NotesCtrl2'
      }
    }
  })


  .state('auth', {
    url: '/auth',
    abstract: true,
    templateUrl: 'templates/authLayout.html',
    controller: 'AuthCtrl'
  })

  .state('auth.login', {
    url: '/login',
    views: {
      'authContent': {
        templateUrl: 'templates/authLogin.html'
      }
    }
  })

  .state('auth.register', {
    url: '/register',
    views: {
      'authContent': {
        templateUrl: 'templates/authRegister.html'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/auth/login');
});
