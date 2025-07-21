angular
  .module("taskApp")
  .controller("TaskController", function ($scope, TaskService) {
    $scope.tasks = [];
    $scope.newTask = {
      title: "",
      description: "",
      due_date: "",
      status: "pending",
    };

    function loadTasks() {
      TaskService.getTasks().then(function (res) {
        $scope.tasks = res.data.data;
      });
    }

    $scope.createTask = function () {
      TaskService.createTask($scope.newTask).then(() => {
        $scope.newTask = {
          title: "",
          description: "",
          due_date: "",
          status: "pending",
        };
        loadTasks();
      });
    };

    $scope.deleteTask = function (id) {
      TaskService.deleteTask(id).then(loadTasks);
    };

    loadTasks();
  });
