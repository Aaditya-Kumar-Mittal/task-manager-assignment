angular
  .module("taskApp")
  .controller("UserController", function ($scope, UserService) {
    $scope.users = [];

    function loadUsers() {
      UserService.getUsers().then(function (res) {
        $scope.users = res.data.data;
      });
    }

    $scope.toggleStatus = function (user) {
      if (user.active) {
        UserService.deactivate(user.id).then(loadUsers);
      } else {
        UserService.activate(user.id).then(loadUsers);
      }
    };

    loadUsers();
  });
