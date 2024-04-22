"use strict";
(function () {
    ;
    var Reminder = /** @class */ (function () {
        function Reminder(description, date, notification) {
            this.id = "";
            this.dataCreated = new Date();
            this.dateUpdated = new Date();
            this.description = "";
            this.date = new Date();
            this.notification = ["EMAIL"];
            this.description = description;
            this.date = date;
            this.notification = notification;
        }
        Reminder.prototype.render = function () {
            return JSON.stringify(this);
        };
        return Reminder;
    }());
    ;
    var Todo = /** @class */ (function () {
        function Todo(description) {
            this.id = "";
            this.dataCreated = new Date();
            this.dateUpdated = new Date();
            this.description = "";
            this.done = false;
            this.description = description;
        }
        Todo.prototype.render = function () {
            return JSON.stringify(this);
        };
        return Todo;
    }());
    ;
    var todo = new Todo("To do criado com classe");
    var reminder = new Reminder("Lembrete criado com classe", new Date(), ["EMAIL"]);
    var taskView = {
        render: function (tasks) {
            var tasksList = document.querySelector("#tasksList");
            while (tasksList === null || tasksList === void 0 ? void 0 : tasksList.firstChild) {
                tasksList.removeChild(tasksList.firstChild);
            }
            tasks.forEach(function (task) {
                var LiElement = document.createElement("li");
                var textNode = document.createTextNode(task.render());
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
