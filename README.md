# Oskar's Hedge Brief
Static GitHub Pages site (main, root). Black/yellow theme. No build step. Sources: SOURCES.md.

## Add a brief
1. Copy `template.html` to `briefs/YYYY-MM-DD.html`; fill `{{DATE}}`, `{{DATE_LONG}}`, `{{HEADLINE}}`.
2. Hero: 4 story cards (copy the S1 article). Classes/chips: `us` US, `eu` Europe, `hk` HK, `jp` Tokyo, `ls` L/S, `reg` Reg.
3. Fill each `{{..._ITEMS}}` / `{{REG_*}}` with 2-4 `<li>` bullets, source links inline. Empty: `<li class="empty">Quiet.</li>`. `{{NOTES}}`: holidays, unavailable sources, unconfirmed items.
4. In `index.html` add under `<!-- ARCHIVE: newest first -->`:
   `<a class="bcard" href="briefs/YYYY-MM-DD.html"><div class="d">DATE_LONG</div><div class="h">HEADLINE</div></a>`
5. No em-dashes. Never invent facts; flag unconfirmed. `git commit` and `git push` to main; check the page returns 200.
