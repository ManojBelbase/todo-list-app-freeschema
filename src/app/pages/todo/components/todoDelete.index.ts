import { DeleteConceptById, LocalSyncData, StatefulWidget } from "mftsccs-browser";

export class TodoDelete extends StatefulWidget {
    data: number = 0; // Task ID to delete

    after_render() {
        const deleteButton = this.getElementById("delbtn") as HTMLElement;
        const modal = this.getElementById("delete-modal") as HTMLElement;
        const confirmBtn = this.getElementById("confirm-delete") as HTMLElement;
        const cancelBtn = this.getElementById("cancel-delete") as HTMLElement;

        if (deleteButton && modal) {
            deleteButton.onclick = (e) => {
                e.stopPropagation();
                modal.classList.add("active");
            };
        }

        if (confirmBtn && modal) {
            confirmBtn.onclick = () => {
                if (this.data) {
                    DeleteConceptById(this.data);
                    LocalSyncData.SyncDataOnline();
                    setTimeout(() => window.location.reload(), 800);
                }
                modal.classList.remove("active");
            };
        }

        if (cancelBtn && modal) {
            cancelBtn.onclick = () => {
                modal.classList.remove("active");
            };

            modal.onclick = (e) => {
                if (e.target === modal) {
                    modal.classList.remove("active");
                }
            };
        }
    }

    getHtml(): string {
        return `
            <button id="delbtn" class="btn btn-danger">Delete</button>
            
            <div id="delete-modal" class="modal-overlay">
                <div class="modal-container">
                    <div class="modal-title">Confirm Delete</div>
                    <div class="modal-body">
                        Are you sure you want to delete this task? This action cannot be undone.
                    </div>
                    <div class="modal-footer">
                        <button id="cancel-delete" class="btn">Cancel</button>
                        <button id="confirm-delete" class="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        `;
    }
}
