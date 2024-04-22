(()=> {
    const todo = {
        description: "todo", //descrição da tarefa
        done: false, //marcação se foi feita ou não
    };
    const reminder = {
        description: "reminder", //descrição da lembrete
        date: "18.05.2024" // data de aviso
    };

    const taskView ={
        render(tasks: Array<Object>):void{  //função que gera texto conforme 
            const tasksList = document.querySelector("#tasksList");
            while(tasksList?.firstChild){
                tasksList.removeChild(tasksList.firstChild);
            }
            tasks.forEach(task => {
                const LiElement = document.createElement("li");
                const textNode = document.createTextNode(JSON.stringify(task));
                LiElement.appendChild(textNode);
                tasksList?.appendChild(LiElement);
            });
        }
    };

    const TaskController = (view: typeof taskView) =>{
        const tasks: Array<Object> = [todo, reminder];

        const handleEvent = (event: Event)=>{
            event.preventDefault();
            view.render(tasks);
        }

        document.querySelector("#taskForm")?.addEventListener("submit", handleEvent);
    };

    TaskController(taskView);
})();

