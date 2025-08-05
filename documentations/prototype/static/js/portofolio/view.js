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
            <p>This section showcases my achievements and milestones in various projects.</p>
            <p>Feel free to explore and see what I've accomplished!</p>
        </div>
    `;
    return html
}

function AcademicSection()
{
    html = /*HTML*/`
        <div class="academic">
            <h2>Academic Projects</h2>
            <p>This section highlights my academic projects and research work.</p>
            <p>Discover the academic side of my portfolio!</p>
        </div>
    `;
    return html
}
function portfolio() {
    html = /*HTML*/`
        <div class="portfolio">
            <h2>My Portfolio</h2>
            <p>Here you can find a selection of my work and projects.</p>
        </div>
    `;
    return html
}