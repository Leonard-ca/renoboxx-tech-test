# Renoboxx – technical interview

Please share your **entire screen** and think out loud. We care more about how you work than about speed.

**Rules:** AI assistants off (Copilot, ChatGPT, Cursor, Claude, ...). Google and documentation are fine.

1. **Questions** – [start here](slides/00-start.md)
2. **Debugging** – below
3. **Code review** – the open [pull request](https://github.com/Leonard-ca/renoboxx-tech-test/pull/1)

---

## Open the project

Pick one:

- **In the browser (nothing to install):** green **Code** button → **Codespaces** → **Create codespace on main**. Then run the commands in the terminal at the bottom.
- **On your laptop:** `git clone` this repo. Needs Node.js 18 or newer, no `npm install` needed.

---

## Task – Debugging (15 minutes)

Craftsmen companies (Betriebe) reported problems with the **day view** of the dashboard. The code behind it is in `src/jobs.mjs`.

### Complaints

1. **Betrieb Schmidt:** "The day total for 20.10. shows `0119.00860.00 €`."
2. **Betrieb Schmidt:** "My all-day job 'Bad fliesen' on 20.10. is missing, and 'Malerarbeiten Flur' – that's on 21.10.! – shows up on 20.10. instead." Our developer can't reproduce this on their laptop.
3. **Betrieb Yilmaz:** "This morning my day view showed jobs from a company I don't know."

### Good to know

- `src/db.mjs` stands in for our Postgres database. It returns rows in exactly the format the `pg` driver does. Treat it like the real database: don't change it.
- All-day jobs are stored at 00:00 German time.

### Run it

```
npm test
node src/show-day.mjs betrieb-schmidt 2026-10-20
```

**Goal:** make the tests pass without changing the tests or `db.mjs`, and explain the cause of each complaint.

---

## Task – Code review (8 minutes)

Open the pull request **"Add invoice creation endpoint"**. A colleague wrote it with an AI assistant: "Works when I click through it."

**Would you merge it?** Say what you would change, most important first. You don't need to run it.
