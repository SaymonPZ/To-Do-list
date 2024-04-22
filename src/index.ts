(()=> {
    enum NotificationMethods{
        SMS = "SMS",
        EMAIL = "EMAIL",
        WHATSAPP = "WHATSAPP",
        PUSH_NOTIFICATION = "PUSH_NOTIFICATION"
    };

    const UUID = (): string =>{
        return Math.random().toString(32).substr(2,9);
    };

    const DateUtils = {
        DateFormat(date: Date): string {
            return `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}/${date.getMonth()  < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1}/${date.getFullYear()}`;
        },
        today(): Date {
            return new Date();
        },
        tomorrow(): Date {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return tomorrow;
        }
    };

    interface Task {
        id: string;
        dataCreated: Date;
        dateUpdated: Date;
        description: string;
        render(): string;
    };

    class Reminder implements Task {
        id: string = UUID();
        dataCreated: Date = DateUtils.today();
        dateUpdated: Date = DateUtils.today();
        description: string = "";
        render(): string {
            return `
                ------> Reminder <------
                description: ${this.description}
                date: ${DateUtils.DateFormat(this.date)}
                platform: ${this.notification.join(", ")}
            `;
        }

        date: Date = new Date();
        notification: Array<NotificationMethods> = [NotificationMethods.EMAIL];

        constructor(description: string, date: Date, notification: Array<NotificationMethods>){
            this.description = description;
            this.date = date;
            this.notification = notification;
        }        
    };

    class Todo implements Task {
        id: string = UUID();
        dataCreated: Date = DateUtils.today();
        dateUpdated: Date = DateUtils.today();
        description: string = "";
        render(): string {
            return JSON.stringify(this);
        }

        done: boolean = false;

        constructor(description: string){
            this.description = description;
        }
    };

    const todo = new Todo("To do criado com classe");
    const reminder = new Reminder("Lembrete criado com classe", new Date(2024,9,10), [NotificationMethods.EMAIL]);

    const taskView ={
        render(tasks: Array<Task>):void{  //função que gera texto conforme 
            const tasksList = document.querySelector("#tasksList");
            while(tasksList?.firstChild){
                tasksList.removeChild(tasksList.firstChild);
            }
            tasks.forEach(task => {
                const LiElement = document.createElement("li");
                const textNode = document.createTextNode(task.render());
                LiElement.appendChild(textNode);
                tasksList?.appendChild(LiElement);
            });
        }
    };

    const TaskController = (view: typeof taskView) =>{
        const tasks: Array<Task> = [todo, reminder];

        const handleEvent = (event: Event)=>{
            event.preventDefault();
            view.render(tasks);
        }

        document.querySelector("#taskForm")?.addEventListener("submit", handleEvent);
    };

    TaskController(taskView);
})();


