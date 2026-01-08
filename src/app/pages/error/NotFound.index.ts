import { StatefulWidget } from "mftsccs-browser";
import { updateContent } from "../../routes/renderRoute.service";

export class NotFound extends StatefulWidget {

    after_render(): void {
        const goHomeBtn = this.getElementById("go-home");
        if (goHomeBtn) {
            goHomeBtn.onclick = () => {
                updateContent("/");
            };
        }
    }

    getHtml(): string {
        return `
            <div class="no-page">
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>The page you are looking for doesn't exist or has been moved.</p>
                <button id="go-home" class="btn btn-primary">Go to Homepage</button>
            </div>
        `;
    }
}

export default NotFound;
