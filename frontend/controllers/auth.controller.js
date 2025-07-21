angular
  .module("taskApp")
  .controller("AuthController", function ($scope, AuthService) {
    $scope.isLoginView = true; // default view is login

    $scope.toggleView = function () {
      $scope.isLoginView = !$scope.isLoginView;
    };

    $scope.loginData = {};
    $scope.registerData = {};

    $scope.login = function () {
      AuthService.login($scope.loginData).then(
        function (res) {
          console.log("Full Response:", res);

          const token = res.data.data.token; // ✅ this is where token lives
          AuthService.saveToken(token);

          console.log("Saved Token:", token);
          console.log("Decoded User:", AuthService.getUserInfo());
          location.reload();
        },
        function (err) {
          console.error("Login error:", err);
        }
      );
    };

    $scope.register = function () {
      AuthService.register($scope.registerData).then(function () {
        alert("Registration successful! Please log in.");
        $scope.toggleView(); // switch to login view
      });
    };

    $scope.logout = function () {
      AuthService.removeToken();
      location.reload();
    };

    $scope.isLoggedIn = AuthService.isLoggedIn;
    $scope.getUsername = function () {
      return AuthService.getUserInfo()?.username;
    };
    $scope.getRole = function () {
      return AuthService.getUserInfo()?.role;
    };
  });
