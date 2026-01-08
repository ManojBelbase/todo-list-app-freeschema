
import {
    FreeschemaQuery,
    JUSTDATA,
    SchemaQueryListener,
    StatefulWidget
} from "mftsccs-browser";
import { TodoDelete } from "./todoDelete.index";

export class TodoList extends StatefulWidget {
    tasks: any[] = [];
    private query: FreeschemaQuery | null = null;

    before_render(): void {
        this.setupQuery();
    }

    setupQuery(): void {
        this.query = new FreeschemaQuery();
        this.query.type = "the_task";
        this.query.outputFormat = JUSTDATA;
        this.query.selectors = ["the_task_description", "the_task_completed"];

        const descriptionQuery = new FreeschemaQuery();
        descriptionQuery.typeConnection = "the_task_description";
        descriptionQuery.name = "desc";

        const completedQuery = new FreeschemaQuery();
        completedQuery.typeConnection = "the_task_completed";
        completedQuery.name = "comp";

        this.query.freeschemaQueries = [descriptionQuery, completedQuery];

        SchemaQueryListener(this.query, "").subscribe((data: any) => {
            this.tasks = (data || []).filter((t: any) =>
                t && t.the_task && t.the_task.the_task_description?.the_text?.data
            );
            this.render();
        });
    }

    refreshData(): void {
        window.location.reload();
    }

    after_render() {
        const tableBody = this.getElementById("task-table-body");
        const refreshBtn = this.getElementById("refresh-btn");

        if (refreshBtn) {
            refreshBtn.onclick = () => this.refreshData();
        }

        if (!tableBody) return;

        tableBody.innerHTML = "";

        if (this.tasks.length === 0) {
            tableBody.innerHTML = `
                <tr class="empty-state">
                    <td colspan="4">
                        <div class="empty-message">
                            <span class="empty-icon">No tasks yet!</span>
                            <p>Add your first task above.</p>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }

        this.tasks.forEach((task, index) => {
            const description = task.the_task.the_task_description.the_text.data;
            const isCompleted = task.the_task.the_task_completed?.the_boolean?.data === "true";

            const row = document.createElement("tr");
            row.className = isCompleted ? "task-row completed" : "task-row";

            const numberCell = document.createElement("td");
            numberCell.className = "task-number";
            numberCell.textContent = `${index + 1}`;
            row.appendChild(numberCell);

            const descCell = document.createElement("td");
            descCell.className = "task-description";
            descCell.textContent = description;
            row.appendChild(descCell);

            const statusCell = document.createElement("td");
            statusCell.className = "task-status";
            statusCell.innerHTML = isCompleted
                ? '<span class="status-badge completed">Done</span>'
                : '<span class="status-badge pending"> Pending</span>';
            row.appendChild(statusCell);

            const actionsCell = document.createElement("td");
            actionsCell.className = "task-actions";

            const editButton = document.createElement("button");
            editButton.className = "btn btn-edit";
            editButton.innerHTML = "Edit";

            if (isCompleted) {
                editButton.disabled = true;
                editButton.style.opacity = "0.5";
                editButton.style.cursor = "not-allowed";
                editButton.title = "Cannot edit a completed task";
            } else {
                editButton.onclick = () => {
                    this.data = {
                        id: task.id,
                        description: description,
                        completed: isCompleted
                    };
                    this.notify();
                };
            }
            actionsCell.appendChild(editButton);

            const deleteContainer = document.createElement("span");
            const deleteWidget = new TodoDelete();
            deleteWidget.data = task.id;
            deleteWidget.mount(deleteContainer);
            actionsCell.appendChild(deleteContainer);

            row.appendChild(actionsCell);
            tableBody.appendChild(row);
        });
    }

    getHtml(): string {
        return `
            <div class="todo-list-card">
                <div class="task-count" style="display: flex; justify-content: space-between; align-items: center;">
                    <span>Total: <strong>${this.tasks.length}</strong> tasks</span>
                    <button id="refresh-btn" class="btn-refresh" title="Reload for data consistency">Reload Tasks</button>
                </div>
                
                <table class="task-table">
                    <thead>
                        <tr>
                            <th style="width: 50px;">#</th>
                            <th>Description</th>
                            <th style="width: 100px;">Status</th>
                            <th style="width: 160px;">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="task-table-body"></tbody>
                </table>
            </div>
        `;
    }
}
