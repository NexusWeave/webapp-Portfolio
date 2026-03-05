function portfolioView(pageID) {
    // This function returns the HTML content for the "Portofolio" page

    html = /*HTML*/`
    ${headerView()}
    ${archivementsSection()}
    ${AcademicSection()}
    ${portfolio()}
        ${footerView()}
    `;
    return html
}

function archivementsSection()
{
    html = /*HTML*/`
        <div class="archivements">
            <h2>My Achievements</h2>
            <p>Denne seksjonen viser frem mine prestasjoner og milepæler i ulike prosjekter.</p>
            <p>Føl deg fri til å utforske og se hva jeg har oppnådd!</p>
        </div>
    `;
    return html
}

function AcademicSection()
{
    html = /*HTML*/`
        <div class="academic">
            <h2>Academic Journey</h2>
            <p>Denne seksjonen fremhever mine akademiske prestasjoner.</p>
            <p>Oppdag den akademiske siden av porteføljen min!</p>
        </div>
    `;
    return html
}
function portfolio() {
    html = /*HTML*/`
        <div class="portfolio">
            <h2>My Portfolio</h2>
            <p>Her finner du alt av arbeidet mitt og prosjektene jeg har vært involvert i.</p>
        </div>`;
    return html
}