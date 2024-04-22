"use strict";
(function () {
    var NotificationMethods;
    (function (NotificationMethods) {
        NotificationMethods["SMS"] = "SMS";
        NotificationMethods["EMAIL"] = "EMAIL";
        NotificationMethods["WHATSAPP"] = "WHATSAPP";
        NotificationMethods["PUSH_NOTIFICATION"] = "PUSH_NOTIFICATION";
    })(NotificationMethods || (NotificationMethods = {}));
    ;
    var UUID = function () {
        return Math.random().toString(32).substr(2, 9);
    };
    var DateUtils = {
        DateFormat: function (date) {
            return "".concat(date.getDate() < 10 ? "0" + date.getDate() : date.getDate(), "/").concat(date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1, "/").concat(date.getFullYear());
        },
        today: function () {
            return new Date();
        },
        tomorrow: function () {
            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return tomorrow;
        }
    };
    ;
    var Reminder = /** @class */ (function () {
        function Reminder(description, date, notification) {
            this.id = UUID();
            this.dataCreated = DateUtils.today();
            this.dateUpdated = DateUtils.today();
            this.description = "";
            this.date = new Date();
            this.notification = [NotificationMethods.EMAIL];
            this.description = description;
            this.date = date;
            this.notification = notification;
        }
        Reminder.prototype.render = function () {
            return "\n                ------> Reminder <------\n                description: ".concat(this.description, "\n                date: ").concat(DateUtils.DateFormat(this.date), "\n                platform: ").concat(this.notification.join(", "), "\n            ");
        };
        return Reminder;
    }());
    ;
    var Todo = /** @class */ (function () {
        function Todo(description) {
            this.id = UUID();
            this.dataCreated = DateUtils.today();
            this.dateUpdated = DateUtils.today();
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
    var reminder = new Reminder("Lembrete criado com classe", new Date(2024, 9, 10), [NotificationMethods.EMAIL]);
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
