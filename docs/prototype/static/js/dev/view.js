function devView(page) 
{
    html = /*HTML*/`
        ${headerView()}
        ${backendProfile()}
        ${frontendProfile()}
        ${technicalSkills()}
    ${footerView()}`;
    return html
}

function backendProfile()
{
    html = /*HTML*/`
        <div class="backend-profile">
            <h2>Backend Profil</h2>
            <p>Denne seksjonen gir informasjon om backend utviklingsprofilen.</p>
            <p>Lær mer om teknologiene og rammeverkene som brukes i backend utvikling.</p>
        </div>
    `;
    return html
}
function frontendProfile()
{
    html = /*HTML*/`
        <div class="frontend-profile">
            <h2>Frontend Profil</h2>
            <p>Denne seksjonen gir informasjon om frontend utviklingsprofilen.</p>
            <p>Oppdag de nyeste trendene og teknologiene innen frontend utvikling.</p>
        </div>
    `;
    return html
}
function technicalSkills()
{
    html = /*HTML*/`
        <div class="technical-skills">
            <h2>Min TechStack</h2>
            <p>Denne seksjonen fremhever mine tekniske ferdigheter og ekspertise innen ulike programmeringsspråk og verktøy.</p>
            <p>Utforsk ferdighetene mine og se hvordan jeg kan bidra til prosjektene deres!</p>
        </div>
    `;
    return html
}