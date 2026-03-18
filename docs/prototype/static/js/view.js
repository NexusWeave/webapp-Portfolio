//  Prototype | View.js
function navigationMenu()
{
    const nav = model.nav;

    html = /*HTML*/`<nav class = "${nav.cls}">`;

    for (let i = 0; i < nav.pages.length; i++)
    {
        const page = nav.pages[i];
        if (page.type === "button")
        {
            html += /*HTML*/ `<button class='nav-item bg-brown' onclick="navigateView('${nav.pages[i].name}')">${nav.pages[i].title}</button>`;
        }
        else if (page.type === "link")
        {
            html += /*HTML*/ `<a href="${nav.pages[i].href}" target="_blank" rel="external"><div class="${page.cls}">${nav.pages[i].title}</div></a>`;
        }
    }
    html += /*HTML*/ `</nav>`;

    return html;
}

function headerView()
{
    const logo = model.data.media.images.logo[0];

    let html = /*HTML*/`
        <header class="${model.header.cls}">
            <div class="flex-row-align-items-center">
                <div class="flex-wrap-row-justify-flex-start ">
                    <img class="${logo.cls}" alt="${logo.alt}" src="${logo.src}" />
                </div>
            </div>
        
        ${navigationMenu()}
        
        <div class="flex-column-align-items-center">
                    <h1 class="h1">${model.header.title}</h1>
                </div>
        <div> Announcements of today : </div>
    </header>`;

    return html;
}

function footerView()
{
    const footer = model.footer;
    const nav = footer.nav;

    let html = /*HTML*/ `
    <footer class="${footer.cls}">
    </footer>`;

    return html;
}
