# KMJ Dynamics website — setup guide

Your site is built. Follow these steps to get it live at **kmjdynamics.com**.

---

## What you have

```
kmjdynamics/
├── index.html      ← the web page (edit your story/photos here)
├── styles.css      ← colors & layout
├── CNAME           ← tells GitHub your domain (don't rename)
├── robots.txt      ← lets Google index the site
├── sitemap.xml     ← helps Google find the page
└── images/         ← put your photos here
```

**Preview it right now:** double-click `index.html` — it opens in your browser. No internet needed to preview.

---

## Step 1 — Put it on GitHub Pages (free hosting)

1. Go to https://github.com/new and create a repo named **`kmjdynamics`** (Public).
2. Upload these files. Easiest way: on the new repo page click **"uploading an existing file"**, then drag in `index.html`, `styles.css`, `CNAME`, `robots.txt`, `sitemap.xml`, and the `images` folder. Commit.
   - *(Or, if you prefer the command line, I can push it for you — just say so.)*
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**, branch **`main`**, folder **`/ (root)`**. Save.
5. Wait ~1 minute. The site will be live at `https://<your-username>.github.io/kmjdynamics/`.

---

## Step 2 — Connect kmjdynamics.com (Squarespace DNS)

Your domain is at Squarespace (it took over Google Domains). Point it at GitHub:

1. Log in at **account.squarespace.com** → **Domains** → click **kmjdynamics.com** → **DNS / DNS Settings**.
2. Add these **four A records** (Host `@`, these are GitHub's IP addresses):

   | Type | Host | Value |
   |------|------|-----------------|
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |

3. Add **one CNAME record** so `www` works too:

   | Type | Host | Value |
   |------|------|--------------------------|
   | CNAME | www | `<your-username>.github.io` |

   *(Replace `<your-username>` with your actual GitHub username. Note the trailing part is `.github.io`, not the repo name.)*

4. Back in GitHub **Settings → Pages → Custom domain**, type `kmjdynamics.com` and Save. Check **"Enforce HTTPS"** once it's available (may take a few minutes to an hour).

DNS changes can take anywhere from a few minutes to 24 hours to fully kick in. After that, typing **kmjdynamics.com** goes straight to your site.

---

## Step 3 — Show up in Google search

1. Once the site is live, go to **Google Search Console** (search.google.com/search-console).
2. Add **kmjdynamics.com** as a property and verify it (Squarespace DNS makes this easy — it gives you a TXT record to add).
3. Submit `https://kmjdynamics.com/sitemap.xml`.

Google usually indexes a new small site within a few days to a couple of weeks. Searching "kmjdynamics" will then bring up your page. (Typing the address directly works as soon as Step 2's DNS finishes.)

---

## Editing your content

- **Your story:** open `index.html`, find the section marked `<!-- REPLACE THIS with your own story -->` and edit the text.
- **Photos:** drop images into the `images/` folder and follow `images/README.txt`.
- **Colors:** open `styles.css` — the palette is at the very top under `:root`.
- **Contact email:** in `index.html`, change `hello@kmjdynamics.com` to whatever address you want (you can set up that email in Squarespace, or just use your Gmail).

After any edit, re-upload the changed file to the GitHub repo and the live site updates within a minute.
