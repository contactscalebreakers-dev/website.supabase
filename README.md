# Scale Breakers Website - Admin & Developer Guide

## 🚨 CRITICAL SETUP (Do this first!)

To prevent having to redo this setup again, follow these steps exactly.

### 1. Environment Secrets (`.env`)
Create a file named `.env` in the root folder (where this file is). Copy and paste the following content. **You must fill in the KEYS** using your real values from Supabase and Stripe.

```env
# DATABASE (Get this from your Supabase Project Settings -> Database -> Connection String -> URI)
# Format: postgresql://postgres:[YOUR-PASSWORD]@[YOUR-PROJECT-ID].supabase.co:5432/postgres
DATABASE_URL=

# STRIPE PAYMENTS (Get these from Stripe Dashboard -> Developers -> API Keys)
STRIPE_SECRET_KEY=sk_test_...
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...

# ADMIN ACCESS
# This is the password you will use to log in to /admin/login
ADMIN_PASSWORD=mysecurepassword

# APP SETTINGS
NODE_ENV=development
VITE_APP_TITLE="Scale Breakers"
```

### 2. Database Seeding (Fixes "Empty Pages")
If your Workshop or Product pages are empty, run this command in your terminal:
```bash
npm run seed:prod
```
This populates the database with the initial workshops, products, and portfolio items.

### 3. Start the Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## 👑 ADMIN DASHBOARD GUIDE

This website has a built-in admin panel to manage content without touching code.

**Login URL:** `/admin/login` (e.g., http://localhost:3000/admin/login)
**Password:** The one you set in `.env` (default is `mysecurepassword` if you copied above).

### 🛍️ Managing Products (Shop)
1.  Click **"Products"** on the dashboard.
2.  **Add Product**: Click the "Add Product" button.
    *   **Image URL**: Use a path like `/portfolio-character.webp` or an external URL.
    *   **Category**: Choose "3d-model", "canvas", etc.
    *   **Price**: Enter the number (e.g., `350`).
3.  **Edit/Delete**: Use the icons next to each item in the list.

### 📅 Managing Workshops
1.  Click **"Workshops"** on the dashboard.
2.  **Add Workshop**:
    *   **Date**: Select from the calendar.
    *   **Capacity**: Standard is `23`.
    *   **Location**: Default is "B.Y.O. - 2-4 Edmundstone Street".
3.  **Note**: Adding a workshop here automatically makes it available for booking.

### 🎨 Managing Portfolio
1.  Click **"Portfolio"** on the dashboard.
2.  Add items here to show them on the `/portfolio` page.
3.  **Categories**: "murals", "3d-models", etc.

### 📝 Viewing Bookings
1.  Click **"Bookings"** on the dashboard.
2.  See who has paid and signed up for workshops.
3.  Filter by **Confirmed** (paid) or **Pending**.

---

## 🛠️ TROUBLESHOOTING

*   **"Database connection error"**: Check your `DATABASE_URL` in `.env`. Ensure your password has no special characters that break the URL (or encode them).
*   **"Stripe checkout fails"**: Check your `STRIPE_SECRET_KEY` in `.env`.
*   **"Changes aren't showing"**: Refresh the page. If running locally, check the terminal for errors.
*   **"GitHub rejected verify"**: Ensure `.env` is listed in your `.gitignore` file.

## 📦 DEPLOYMENT

When ready to go live (e.g. on Render or Vercel):
1.  Add all the Environment Variables from your `.env` to the hosting provider's "Environment Variables" section.
2.  Run the build command: `npm run build`.
3.  Start command: `npm run start`.


## Supabase Admin OAuth (Render)

Set these environment variables on Render:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- VITE_ADMIN_EMAIL_ALLOWLIST (comma-separated emails allowed to access admin)
- ADMIN_EMAIL_ALLOWLIST (same list for server-side checks)
- VITE_ADMIN_OAUTH_PROVIDER (default: google)

In Supabase Auth settings, add Redirect URLs:
- https://YOUR-RENDER-DOMAIN/admin/dashboard
- http://localhost:5173/admin/dashboard


Below is a detailed overview of AI‑driven “web control” tools—programs that let you automate or control websites with natural language or scripts.  I’ve grouped them by typical use‑case (no‑code extensions, developer platforms, desktop‑level agents, and open‑source frameworks), highlighted key features and limitations, and then provided a structured plan for selecting and using them.

## 1. Recommended AI Web‑Control Programs

### A. No‑Code Browser Extensions (Easy for non‑developers)

| Tool            | Key Features & Usage                                                                                                                                                                                                                                                                                                          | Considerations                                                                                                                |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Axiom.ai**    | A Chrome extension that builds browser bots without code.  It automates clicking, typing, scraping and data entry on any website.  Built‑in steps include visual web scraping, spreadsheet integration and ChatGPT connectors.  Free plan offers a few hours of automation.                                                   | Good for repetitive tasks (form filling, data scraping).  Requires Chrome.                                                    |
| **HARPA AI**    | Acts like a side‑panel assistant that summarises YouTube videos, emails and pages; it also includes a “browser automation/AI engine” that navigates sites, extracts data, clicks buttons and fills forms.  Integrates with Zapier, Make.com and n8n for multi‑step workflows.                                                 | Useful when you need both research/summarisation and automation.  Runs as a browser extension; limited to supported browsers. |
| **FillApp**     | Chrome extension focused on form filling and multi‑tab workflows.  It runs inside your logged‑in session (no credential sharing), shows every cursor movement, and allows pauses or confirmations.  Modes include **Fill** (quick form completion), **Agent** (multi‑step workflows) and **Assist** (page/PDF summarisation). | Designed for tasks like job applications or CRM data entry.  Paid plans offer more credits.                                   |
| **Browser MCP** | Connects AI apps like VS Code, Cursor or Claude to your real browser.  The extension uses your existing profile, so automations run locally and stay logged in.  Promises speed (no network latency), privacy and “stealth” by using your real fingerprint.  Use cases include automated testing and repeated web tasks.      | Requires local setup of an MCP server; meant for developers comfortable with configuration.                                   |
| **Nanobrowser** | Open‑source alternative to OpenAI’s Operator.  Runs as a Chrome extension and supports multiple large‑language models.                                                                                                                                                                                                        | Community‑driven; capabilities depend on chosen model and local hardware.                                                     |

### B. Developer‑Focused Platforms

| Tool                                  | Key Features & Usage                                                                                                                                                                                                                                                     | Considerations                                                                                                 |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| **Browser‑Use / Browser‑Use Cloud**   | Open‑source library plus managed cloud that provides a “stealth browser” infrastructure.  It bypasses CAPTCHAs, stays authenticated and handles proxies, cookies and downloads.  SDKs in Python and TypeScript allow you to send tasks to a serverless browser.          | More flexible than browser extensions but requires coding.  Cloud plans cost money.                            |
| **Browserbase**                       | Serverless browser infrastructure that integrates with Playwright, Puppeteer or Selenium.  Features include spinning up thousands of isolated browser instances in milliseconds, managed captcha solving, residential proxies, and live session recording for debugging. | Suitable when you need to scale browser automation or embed AI agents in your own applications.  Paid service. |
| **LaVague**                           | Open‑source “large action model” framework that converts natural‑language instructions (e.g., “click the green button”) into browser actions.  Its Action Engine uses Selenium to generate code, execute it, and log results.                                            | Ideal for developers wanting to build custom agents; requires Python and hosting.                              |
| **Playwright / Puppeteer / Selenium** | Traditional code‑based automation frameworks.  They allow you to control browsers programmatically and are used by many AI tools (e.g., Stagehand, Browserbase).                                                                                                         | No built‑in LLM integration; you’ll need to wire them to an LLM yourself (via LangChain or other frameworks).  |

### C. Desktop‑Level or Local Agents

| Tool                                     | Key Features & Usage                                                                                                                                                                                                                                                                                                                                                                                                                          | Considerations                                                                                                            |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **OpenAI Operator (ChatGPT Agent Mode)** | A research‑preview agent integrated into ChatGPT that uses its own browser to interact with websites.  It can type, click and scroll to complete tasks like filling forms, ordering groceries or creating memes.  It uses a **Computer‑Using Agent** model that combines vision and reasoning to see screenshots and interact with GUIs.  Operator asks for user confirmation before sensitive actions and hands back control when necessary. | Available to ChatGPT Pro users (U.S. as of Jan 2025) and still in research mode.  Safety rules may limit some operations. |
| **UI‑TARS**                              | Open‑source AI model from ByteDance for both browser and full desktop automation.  It has a vision model that interprets screen content and automates complex workflows.  Three sizes (2B, 7B, 72B) allow trade‑off between performance and hardware requirements.  Key features include browser automation, desktop control and multiple model sizes.                                                                                        | Requires local installation and significant hardware for larger models.                                                   |
| **Open Interpreter**                     | Local agent that lets LLMs run code and control a browser through a ChatGPT‑like terminal.  It runs locally for privacy, summarises PDFs, visualises data and automates browser tasks.  Pros include local execution and full access to packages; cons include the need to install and manage Python dependencies.                                                                                                                            | Best for technical users comfortable with CLI and code.                                                                   |

### D. Open‑Source Autonomous Agents & Frameworks

| Tool                                            | Description                                                                                                                                                                                                                                                   | Notes |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **AgenticSeek** (GitHub 91k stars)              | Runs locally, handles web browsing, form completion and data extraction; alternative to Manus AI.                                                                                                                                                             |       |
| **Auto‑GPT / AgentGPT / SuperAGI**              | Python‑based frameworks for creating autonomous agents that break tasks into steps.  Auto‑GPT executes browser and file operations; AgentGPT offers a self‑hosted browser interface; SuperAGI provides modular agents.  Useful for complex, multi‑step goals. |       |
| **Nanobrowser (Nanobrowser.ai)**                | Chrome extension executing multi‑agent workflows.  Handles tasks like spreadsheet extraction, form filling and navigation.                                                                                                                                    |       |
| **OpenManus**                                   | Local alternative to the commercial Manus service; executes long‑running browser tasks.                                                                                                                                                                       |       |
| **OpenInterpreter / UI‑TARS** (discussed above) | Provide CLI or desktop-level control.                                                                                                                                                                                                                         |       |
| **LaVague**                                     | Natural-language to browser actions; covered above.                                                                                                                                                                                                           |       |
| **PulsarRPA / VimGPT**                          | RPA extensions that use LLMs to automate clicking and typing; e.g., PulsarRPA for data extraction and VimGPT uses vision to control the browser via the Vimium extension.                                                                                     |       |
| **Web control and automation libraries**        | Traditional automation frameworks like Playwright (multi-language, cross‑browser), Selenium and Puppeteer can be used with LLM frameworks like LangChain to build custom agents.                                                                              |       |

## 2. Step‑by‑Step Research Process

1. **Identify the goal** – interpret “AI web control program” as software that lets an AI agent browse and interact with websites for tasks like form filling, data extraction or ordering products.
2. **Gather primary sources** – search the web for up‑to‑date information on AI browser agents, focusing on official documentation or reputable tech articles.
3. **Review extension‑based tools** – open Axiom.ai and note features (visual web scraping, data entry, ChatGPT integration); open HARPA.ai and extract lines describing its hybrid automation engine; examine FillApp for its session‑based operation and multi‑mode workflows.
4. **Check developer‑oriented platforms** – inspect Browserbase for its serverless browser infrastructure and features like scalability and stealth; look at Browser MCP for local, private automation.
5. **Look at desktop‑level agents** – read OpenAI’s Operator announcement to understand how it uses its own browser to handle tasks; review UI‑TARS for open‑source computer and browser control; read about Open Interpreter’s local execution and browser control.
6. **Consult open‑source compilations** – use a curated article on 30+ open‑source web agents to list names like AgenticSeek, Auto‑GPT, AgentGPT and frameworks like LaVague; extract details about natural language tools and automation libraries.

## 3. Alternative Perspectives or Solutions

* **No‑code vs. code‑based**: If you’re not comfortable with programming, choose extensions like Axiom.ai, HARPA or FillApp that work via a graphical interface.  Developers can harness Browser Use or Browserbase with Python/JavaScript, or build custom agents using frameworks like Auto‑GPT or LaVague.
* **Local vs. cloud**: Tools like Open Interpreter and UI‑TARS run locally for privacy and control but require hardware setup.  Cloud‑based options like Browserbase or OpenAI Operator outsource the compute, offering convenience but subjecting data to remote processing.
* **Breadth vs. depth**: General‑purpose agents (Auto‑GPT, Operator) can handle a variety of tasks but may be slower or less precise.  Specialized tools like FillApp or Axiom.ai focus on web forms and workflows and may perform those tasks more reliably.
* **DIY frameworks**: If you need maximum customization, use Playwright, Selenium or Puppeteer with your own LLM integration.  This allows fine‑grained control but requires significant coding effort.

## 4. Practical Action Plan

1. **Assess your needs**

   * Identify the tasks you want to automate (form filling, data scraping, ordering items, etc.) and your technical comfort level.
   * If you need quick wins without coding, focus on browser extensions like Axiom.ai or FillApp.
   * For full customization or large workflows, consider Browser Use/Browserbase or open‑source agents.

2. **Start with a no‑code extension**

   * Install **Axiom.ai** or **FillApp** in Chrome.
   * Follow tutorials to build a simple bot (e.g., auto‑fill a product listing or scrape data from a competitor site).
   * Use the free tier to evaluate performance; upgrade if necessary.

3. **Experiment with AI assistants**

   * Try **HARPA AI** for summarising pages and automating simple tasks from within your workflow.
   * If you have ChatGPT Pro (U.S.), test **Operator** for more dynamic tasks; note its safety limitations.

4. **Consider local agents for privacy**

   * If you’re comfortable with command‑line tools and want to avoid sending data to the cloud, install **Open Interpreter**.  Use it to run code and automate browser actions in a controlled environment.
   * For complex desktop workflows (e.g., controlling Photoshop or CAD software as well as the browser), explore **UI‑TARS**, choosing the model size that suits your hardware.

5. **Scale and customize**

   * If your tasks grow in complexity (e.g., automating thousands of operations or building features into your own product), look into **Browserbase** for scalable serverless browsers or **Browser‑Use** for stealth automation across multiple proxies.
   * For developer frameworks, start with **Playwright** or **Puppeteer** and integrate with LLMs via LangChain or similar libraries.

6. **Stay safe and compliant**

   * When using any automation, especially those that interact with accounts or payments, ensure you review actions before finalizing.  Tools like Operator and FillApp include confirmation prompts for sensitive steps.
   * Respect website terms of service and avoid scraping protected content.
   * Keep your tools up to date and monitor for new releases, since AI browser agents evolve rapidly.

By choosing the right program for your skill level and needs—and following a structured approach—you can harness AI to automate web tasks effectively and safely.
