"use strict";
(function () {
    var todo = {
        description: "todo", //descrição da tarefa
        done: false, //marcação se foi feita ou não
    };
    var reminder = {
        description: "reminder", //descrição da lembrete
        date: "18.05.2024" // data de aviso
    };
    var taskView = {
        render: function (tasks) {
            var tasksList = document.querySelector("#tasksList");
            while (tasksList === null || tasksList === void 0 ? void 0 : tasksList.firstChild) {
                tasksList.removeChild(tasksList.firstChild);
            }
            tasks.forEach(function (task) {
                var LiElement = document.createElement("li");
                var textNode = document.createTextNode(JSON.stringify(task));
                LiElement.appendChild(textNode);
                tasksList === null || tasksList === void 0 ? void 0 : tasksList.appendChild(LiElement);
            });
        }
    };
    var TaskController = function (view) {
        var _a;
        var tasks = [todo, reminder];
        var handleEvent = function (event) {
            event.preventDefault();
            view.render(tasks);
        };
        (_a = document.querySelector("#taskForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", handleEvent);
    };
    TaskController(taskView);
})();
