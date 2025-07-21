angular.module("taskApp").factory("AuthInterceptor", function ($window) {
  return {
    request: function (config) {
      var token = $window.localStorage.getItem("auth-token");
      if (token) {
        config.headers.Authorization = "Bearer " + token;
      }
      return config;
    }
  };
});