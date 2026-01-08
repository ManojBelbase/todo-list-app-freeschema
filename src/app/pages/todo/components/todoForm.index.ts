
import {
    CreateTheConnectionLocal, DeleteConnectionByType, MakeTheInstanceConceptLocal, MakeTheTypeConceptLocal, PRIVATE, LocalSyncData, StatefulWidget
} from "mftsccs-browser";
import { getLocalUserId } from "../../user/login.service";

export class TodoForm extends StatefulWidget {

    before_render(): void {
        this.render();
    }

    after_render() {
        const userId = getLocalUserId();

        const descriptionInput = this.getElementById("description") as HTMLInputElement;
        const completedCheckbox = this.getElementById("completed") as HTMLInputElement;
        const taskIdInput = this.getElementById("taskId") as HTMLInputElement;
        const submitButton = this.getElementById("submit") as HTMLButtonElement;
        const formTitle = this.getElementById("form-title") as HTMLHeadingElement;

        if (this.data) {
            descriptionInput.value = this.data.description || "";
            completedCheckbox.checked = this.data.completed || false;
            taskIdInput.value = this.data.id || "";
            if (formTitle) formTitle.textContent = "Edit Task";
        }

        if (submitButton) {
            submitButton.onclick = (ev: Event) => {
                ev.preventDefault();

                const errorDisplay = this.getElementById("form-error");
                if (!descriptionInput.value.trim()) {
                    if (errorDisplay) errorDisplay.textContent = "Please enter a task description!";
                    return;
                }
                if (errorDisplay) errorDisplay.textContent = "";

                const taskId = taskIdInput.value;

                if (taskId) {
                    const numericTaskId = Number(taskId);
                    this.saveTask(
                        numericTaskId,
                        descriptionInput.value.trim(),
                        completedCheckbox.checked,
                        userId,
                        true
                    ).then(() => {
                        this.clearForm();
                        setTimeout(() => window.location.reload(), 500);
                    });
                } else {
                    MakeTheInstanceConceptLocal("the_task", "", true, userId, PRIVATE).then((mainConcept) => {
                        this.saveTask(
                            mainConcept.id,
                            descriptionInput.value.trim(),
                            completedCheckbox.checked,
                            userId
                        ).then(() => {
                            this.clearForm();
                        });
                    });
                }
            };
        }
    }


    async saveTask(mainId: number, description: string, completed: boolean, userId: number, isUpdate: boolean = false) {

        const descType = await MakeTheTypeConceptLocal("the_task_description", 999, 999, userId);
        const compType = await MakeTheTypeConceptLocal("the_task_completed", 999, 999, userId);

        // Create instance concepts for the actual data
        const descConcept = await MakeTheInstanceConceptLocal("the_text", description, false, userId, PRIVATE);
        const compConcept = await MakeTheInstanceConceptLocal("the_boolean", completed ? "true" : "false", false, userId, PRIVATE);

        if (isUpdate) {
            await DeleteConnectionByType(mainId, "the_task_description");
            await DeleteConnectionByType(mainId, "the_task_completed");
        }

        await CreateTheConnectionLocal(mainId, descConcept.id, descType.id, 1000, "", userId);
        await CreateTheConnectionLocal(mainId, compConcept.id, compType.id, 1000, "", userId);

        LocalSyncData.SyncDataOnline();
    }

    clearForm() {
        const descriptionInput = this.getElementById("description") as HTMLInputElement;
        const completedCheckbox = this.getElementById("completed") as HTMLInputElement;
        const taskIdInput = this.getElementById("taskId") as HTMLInputElement;
        const formTitle = this.getElementById("form-title") as HTMLHeadingElement;

        if (descriptionInput) descriptionInput.value = "";
        if (completedCheckbox) completedCheckbox.checked = false;
        if (taskIdInput) taskIdInput.value = "";
        if (formTitle) formTitle.textContent = "Add New Task";
    }

    getHtml(): string {
        return `
            <div class="todo-form-card">
                <form class="todo-form">
                    <input type="hidden" id="taskId">
                    
                    <div class="form-group">
                        <label for="description" id="form-title"> Add New Task</label>
                        <input 
                            type="text" 
                            id="description" 
                            placeholder="Enter task description"
                            class="form-input"
                            autocomplete="off"
                        >
                    </div>
                    
                    <div class="form-group checkbox-group">
                        <input type="checkbox" id="completed" class="form-checkbox">
                        <label for="completed">Mark as completed</label>
                    </div>
                    
                    <button type="submit" id="submit" class="btn btn-primary">
                        Save Task
                    </button>
                    <div id="form-error" style="color: #d9534f; font-size: 13px; margin-top: 10px; min-height: 18px;"></div>
                </form>
            </div>
        `;
    }
}

export { TodoForm as TodoCreate };
