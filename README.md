# Chef Sam Nawrocki Private Dining

Premium static website for Chef Sam Nawrocki's private dining brand at `sam.ripcurrentworks.com`.

## Local Run

This is a plain static site. No build step is required.

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

You can also open `index.html` directly in a browser, but a local server is closer to how Cloudflare Pages will serve the site.

## File Structure

```text
index.html   Main site content and sections
styles.css   Editorial design system and responsive styling
script.js    Smooth header behavior, reveal transitions, form validation
README.md    Local and deployment notes
```

## Replacing Images

The current site uses styled placeholder frames. Each placeholder includes a `data-replace` attribute showing the intended future path:

- `assets/hero.jpg`
- `assets/sam-portrait.jpg`
- `assets/partner.jpg`
- `assets/gallery-food.jpg`
- `assets/gallery-table.jpg`
- `assets/gallery-events.jpg`
- `assets/gallery-behind-scenes.jpg`

Create an `assets/` folder, add final images at those paths, then replace the placeholder `div` or `figure` content in `index.html` with normal image markup:

```html
<img src="assets/hero.jpg" alt="Private dining table prepared by Chef Sam Nawrocki" />
```

Keep crops editorial and warm: plated food, intimate table settings, kitchen moments, and portraits with natural light.

## Inquiry Form

The form currently validates client-side and shows a success message without sending data.

Future integration is isolated in `script.js`:

```js
async function submitInquiry(payload) {
  // TODO: Connect FunctionIQ or another backend integration here.
}
```

Future target:

```text
POST /inquiry
```

The payload already includes:

```json
{
  "brand": "sam_nawrocki_private_dining",
  "source": "sam_website"
}
```

## Cloudflare Pages Deployment

Prepare this repository for GitHub to Cloudflare Pages deployment.

1. Push the repository to GitHub.
2. In Cloudflare, go to **Workers & Pages**.
3. Choose **Create application**.
4. Choose **Pages** and connect the GitHub repository.
5. Use these build settings:

```text
Framework preset: None
Build command: None
Output directory: /
Root directory: /
```

6. Deploy the project.
7. In the Pages project, open **Custom domains**.
8. Add:

```text
sam.ripcurrentworks.com
```

9. Follow Cloudflare's DNS prompt to create or confirm the needed DNS record.

Do not modify any existing `ripcurrentworks.com` Workers, Worker routes, or zone-level routing rules for this static Pages site.
