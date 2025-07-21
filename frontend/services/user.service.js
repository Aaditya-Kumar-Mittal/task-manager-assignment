angular.module("taskApp").factory("UserService", function ($http, AuthService) {
  var baseUrl = "http://localhost:3000";

  function getHeaders() {
    return {
      headers: {
        Authorization: "Bearer " + AuthService.getToken(),
      },
    };
  }

  return {
    getUsers: function () {
      return $http.get(baseUrl + "/api/users", getHeaders());
    },
    activate: function (id) {
      return $http.put(
        baseUrl + "/api/users/" + id + "/activate",
        {},
        getHeaders()
      );
    },
    deactivate: function (id) {
      return $http.put(
        baseUrl + "/api/users/" + id + "/deactivate",
        {},
        getHeaders()
      );
    },
  };
});
