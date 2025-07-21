angular.module("taskApp").factory("TaskService", function ($http, AuthService) {
  var baseUrl = "http://localhost:3000";

  function getHeaders() {
    return {
      headers: {
        Authorization: "Bearer " + AuthService.getToken(),
      },
    };
  }

  return {
    getTasks: () => $http.get(baseUrl + "/api/tasks", getHeaders()),
    createTask: (task) => $http.post(baseUrl + "/api/tasks", task, getHeaders()),
    deleteTask: (id) => $http.put(baseUrl + `/api/tasks/${id}/delete`, {}, getHeaders()),
    updateTask: (id, task) => $http.put(baseUrl + `/api/tasks/${id}`, task, getHeaders()),
  };
});
