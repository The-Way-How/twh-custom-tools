# The Way How: Launch Overlay SOP

## Overview
This guide details how to deploy the **TWH Launch Overlay** to a new client's HubSpot account. We do not use the local CLI for this. The source of truth is our master company HubSpot account ("The Way How").

---

## Phase 1: HubDB Setup (The Database)
*Perform this in the Client's HubSpot Account.*

1. Navigate to **HubDB**.
2. Create a **new table**.
3. Add a **Checkbox** column.
4. Set the **Internal Name** to exactly `is_live`.
5. Add **one single row** (leave the box unchecked).
6. Click **Publish** in the top right.
7. Save these two numbers for later: 
    * **Table ID** (Found in the URL or table settings)
    * **Row ID** (Found on the far left side of the row you just created)

---

## Phase 2: Private App Setup (The Security Token)
*Perform this in the Client's HubSpot Account.*

1. Go to **Settings > Integrations > Private Apps**.
2. Click **Create a private app** and name it `TWH Launcher`.
3. Go to the **Scopes** tab and search for `hubdb`.
4. Check both the **Read** and **Write** boxes.
5. Click **Create app** and copy the resulting token. (It will look like `pat-na1-xxxx...`).

---

## Phase 3: The Backend (Serverless Function)
*Transferring from "The Way How" to the Client Account.*

1. Using **hubspot multi-portal copy tool**, copy the entire folder named `twh.functions` from "The Way How" Design Manager to the client's Design Manager.
2. In the client's Design Manager, open `twh.functions/launch.js`.
3. Update the top three variables with the client's specific IDs and the Token you generated in Phase 2:
    ```javascript
    const TABLE_ID = 'PASTE_CLIENT_TABLE_ID'; 
    const ROW_ID = 'PASTE_CLIENT_ROW_ID'; 
    const token = 'PASTE_CLIENT_PRIVATE_APP_TOKEN_HERE'; 
    ```
4. Click **Publish Changes**.

---

## Phase 4: The Frontend (Custom Module)
*Transferring from "The Way How" to the Client Account.*

1. Copy the module named **Agency Launch Overlay** from "The Way How" Design Manager to the client's Design Manager.
2. Open the module in the client's portal and click on the **HTML + HubL** section.
3. **Crucial:** Update the very first line of the HTML to match the client's HubDB Table ID and Row ID:
    ```hubl
    {% set is_live = hubdb_table_row(CLIENT_TABLE_ID, CLIENT_ROW_ID).is_live %}
    ```
4. Leave the CSS and JS exactly as they are.
5. Click **Publish Changes**.

---

## Phase 5: Global Application
1. Open the client's **Global Header** or **Global Footer** in the drag-and-drop theme editor.
2. Drop the **Agency Launch Overlay** module anywhere into the header/footer. 
    * *Note: Because the CSS uses `position: fixed`, it will automatically cover the entire screen.*
3. **Publish** the global changes. The "Launching Soon" screen is now live across the entire site.

---

## Phase 6: The Launch Page & Execution
To actually trigger the launch, we need a hidden page that contains the button.

1. Go to **Content > Website > Website Pages**.
2. Create a **new blank page**.
3. **Important:** In the page settings, set the page slug to exactly: `/launch-with-twh`
4. **Publish** the page.
5. Navigate to `www.client-domain.com/launch-with-twh`.
6. Click **"LET'S DO THIS THING!"**.
7. Watch the confetti fly, the database update, and the new website smoothly reveal itself to the world.
