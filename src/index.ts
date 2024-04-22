(()=> {
    interface Task {
        id: string;
        dataCreated: Date;
        dateUpdated: Date;
        description: string;
        render(): string;
    };

    class Reminder implements Task {
        id: string = "";
        dataCreated: Date = new Date();
        dateUpdated: Date = new Date();
        description: string = "";
        render(): string {
            return JSON.stringify(this);
        }

        date: Date = new Date();
        notification: Array<string> = ["EMAIL"];

        constructor(description: string, date: Date, notification: Array<string>){
            this.description = description;
            this.date = date;
            this.notification = notification;
        }        
    };

    class Todo implements Task {
        id: string = "";
        dataCreated: Date = new Date();
        dateUpdated: Date = new Date();
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
    const reminder = new Reminder("Lembrete criado com classe", new Date(), ["EMAIL"]);

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


