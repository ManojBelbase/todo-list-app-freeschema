import { Signup, SignupModel, StatefulWidget } from "mftsccs-browser";
import { updateContent } from "../../routes/renderRoute.service";
import '../../styles/todo.style.css';

export class Register extends StatefulWidget {

    after_render(): void {
        let email = this.getElementById("email") as HTMLInputElement;
        let password = this.getElementById("password") as HTMLInputElement;
        let verifyPassword = this.getElementById("verify-password") as HTMLInputElement;
        let submitButton = this.getElementById("submit");
        let loginLink = this.getElementById("go-to-login");

        if (submitButton) {
            submitButton.onclick = (ev: Event) => {
                ev.preventDefault();

                if (password.value !== verifyPassword.value) {
                    let error = this.getElementById("error");
                    if (error) error.textContent = "Passwords do not match!";
                    return;
                }

                let signupData: SignupModel = {
                    email: email.value,
                    password: password.value
                }

                Signup(signupData).then(() => {
                    updateContent('/');
                }).catch((err) => {
                    let error = this.getElementById("error");
                    if (error) {
                        error.innerHTML = err.message;
                    }
                });
            }
        }

        if (loginLink) {
            loginLink.onclick = (ev: Event) => {
                ev.preventDefault();
                updateContent('/');
            }
        }
    }

    getHtml(): string {
        return `
            <div class="todo-app" style="max-width: 450px; margin-top: 60px;">
                <header class="todo-header" style="text-align: center;">
                    <h1>Register</h1>
                    <p class="subtitle">Create a new account</p>
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
                        <div class="form-group">
                            <label for="verify-password">Confirm Password</label>
                            <input type="password" id="verify-password" placeholder="Verify your password" class="form-input">
                        </div>
                        <button type="submit" id="submit" class="btn btn-primary" style="width: 100%;">Register</button>
                        <div style="color: #d9534f; font-size: 13px; margin-top: 10px; text-align: center;" id="error"></div>
                    </form>
                    
                    <div style="margin-top: 20px; text-align: center; font-size: 14px; color: #666;">
                        Already have an account? <a href="#" id="go-to-login" style="color: #4a90e2; text-decoration: none;">Login here</a>
                    </div>
                </div>
            </div>
        `;
    }
}