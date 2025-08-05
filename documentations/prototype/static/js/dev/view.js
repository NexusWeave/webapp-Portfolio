function devView(page) 
{
    html = /*HTML*/`
        ${headerView()}
        <div class="dev-page">
            <h1>Developer Portal</h1>
            <p>Welcome to the developer portal. Here you can find resources and tools for development.</p>
            <p>Explore our documentation and get started with your projects.</p>
        </div>
    ${footerView()}`;
    return html
}

function backendProfile()
{
    html = /*HTML*/`
        <div class="backend-profile">
            <h2>Backend Profile</h2>
            <p>This section provides information about the backend development profile.</p>
            <p>Learn more about the technologies and frameworks used in backend development.</p>
        </div>
    `;
    return html
}
function technicalSkills()
{
    html = /*HTML*/`
        <div class="technical-skills">
            <h2>Technical Skills</h2>
            <p>This section highlights my technical skills and expertise in various programming languages and tools.</p>
            <p>Explore my skill set and see how I can contribute to your projects!</p>
        </div>
    `;
    return html
}