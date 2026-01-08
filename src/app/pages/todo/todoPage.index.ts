

import { StatefulWidget } from 'mftsccs-browser';
import { TodoForm } from './components/todoForm.index';
import { TodoList } from './components/todoList.index';
import '../../styles/todo.style.css';

export class TodoPage extends StatefulWidget {

    mount_child() {
        const formContainer = this.getElementById("todo-form-container");
        const listContainer = this.getElementById("todo-list-container");

        const todoForm = new TodoForm();
        const todoList = new TodoList();

        if (formContainer) {
            this.childWidgets.push(todoForm);
            todoForm.mount(formContainer);
        }

        if (listContainer) {
            todoList.dataChange((taskData: any) => {
                this.UpdateChildData(taskData, todoForm);
            });

            this.childWidgets.push(todoList);
            todoList.mount(listContainer);
        }
    }

    getHtml(): string {
        return `
            <div class="todo-app">
                <header class="todo-header">
                    <h1>To-Do List</h1>
                    <p class="subtitle">Manage your tasks efficiently</p>
                </header>

                <div class="todo-content">
                    <section class="todo-section">
                        <div class="section-header">
                            <h2 class="section-title">Add Task</h2>
                        </div>
                        <div id="todo-form-container"></div>
                    </section>

                    <section class="todo-section">
                        <div class="section-header">
                            <h2 class="section-title">Your Tasks</h2>
                        </div>
                        <div id="todo-list-container"></div>
                    </section>
                </div>

                <footer class="todo-footer">
                    <p>Built with FreeSchema Data Fabric</p>
                </footer>
            </div>
        `;
    }
}

export default TodoPage;