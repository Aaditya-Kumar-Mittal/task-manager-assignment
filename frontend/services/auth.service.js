angular.module("taskApp").factory("AuthService", function ($http, $window) {
  var tokenKey = "auth-token";
  var baseUrl = "http://localhost:3000";

  return {
    login: function (loginData) {
      return $http.post(baseUrl + "/api/auth/login", loginData);
    },
    register: function (data) {
      return $http.post(baseUrl + "/api/auth/register", data);
    },
    saveToken: function (token) {
      $window.localStorage.setItem(tokenKey, token);
    },
    getToken: function () {
      return $window.localStorage.getItem(tokenKey);
    },
    removeToken: function () {
      $window.localStorage.removeItem(tokenKey);
    },
    isLoggedIn: function () {
      return !!$window.localStorage.getItem(tokenKey);
    },
    getUserInfo: function () {
      var token = $window.localStorage.getItem(tokenKey);
      if (!token) return null;
      try {
        var payload = token.split(".")[1];
        return JSON.parse(atob(payload));
      } catch (e) {
        return null;
      }
    },
  };
});