import { LoginToBackend, StatefulWidget } from "mftsccs-browser";
import { saveTolocalStorage } from "./login.service";
import { updateContent } from "../../routes/renderRoute.service";
import '../../styles/todo.style.css';

export class Login extends StatefulWidget {

    after_render(): void {
        let email = this.getElementById("email") as HTMLInputElement;
        let password = this.getElementById("password") as HTMLInputElement;
        let submitButton = this.getElementById("submit");
        let registerLink = this.getElementById("go-to-register");

        if (submitButton) {
            submitButton.onclick = (ev: Event) => {
                ev.preventDefault();
                LoginToBackend(email.value, password.value).then((output: any) => {
                    saveTolocalStorage(output);
                    updateContent('/');
                }).catch((err) => {
                    let error = this.getElementById("error");
                    if (error) {
                        error.innerHTML = err.message;
                    }
                });
            }
        }

        if (registerLink) {
            registerLink.onclick = (ev: Event) => {
                ev.preventDefault();
                updateContent('/register');
            }
        }
    }

    getHtml(): string {
        return `
            <div class="todo-app" style="max-width: 450px; margin-top: 60px;">
                <header class="todo-header" style="text-align: center;">
                    <h1>Login</h1>
                    <p class="subtitle">Enter your credentials to continue</p>
                </header>

                <div class="todo-section">
                    <form class="todo-form">
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="text" id="email" placeholder="Enter your email" class="form-input">
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" id="password" placeholder="Enter your password" class="form-input">
                        </div>
                        <button type="submit" id="submit" class="btn btn-primary" style="width: 100%;">Login</button>
                        <div style="color: #d9534f; font-size: 13px; margin-top: 10px; text-align: center;" id="error"></div>
                    </form>
                    
                    <div style="margin-top: 20px; text-align: center; font-size: 14px; color: #666;">
                        Don't have an account? <a href="#" id="go-to-register" style="color: #4a90e2; text-decoration: none;">Register here</a>
                    </div>
                </div>
            </div>
        `;
    }
}