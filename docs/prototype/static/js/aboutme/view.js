function aboutView(page) {
    html = /*HTML*/`
        ${headerView()}
        ${aboutMeSection()}
        ${exerciseLogSection()}
        ${blogLogSection()}
        ${personalBackgroundSection()}
    ${footerView()}`;
    return html
}

function aboutMeSection()
{
    html = /*HTML*/`
        <div class="about-me">
            <h2>About Me</h2>
            <p>Denne seksjonen er en introduksjon til hvem jeg er.</p>
            <p>Føl deg fri til å utforske og lære mer om min bakgrunn og interesser.</p>
        </div>
    `;
    return html
}

function exerciseLogSection()
{
    html = /*HTML*/`
        <div class="exercise-log">
            <h2>Exercise Log</h2>
            <p>Here, I keep track of my exercise routines and fitness goals.</p>
            <p>Stay motivated and join me on my fitness journey!</p>
        </div>
    `;
    return html
}

function blogLogSection()
{
    html = /*HTML*/`
        <div class="blog-log">
            <h2>Blog Log</h2>
            <p>Denne seksjonen inneholder mine blogginnlegg hvor jeg deler mine tanker og innsikter om ulike emner.</p>
            <p>Føl deg fri til å lese og engasjere deg med innholdet mitt!</p>
        </div>
    `;
    return html
}

function personalBackgroundSection()
{
    html = /*HTML*/`
        <div class="personal-background">
            <h2>Personal Background</h2>
            <p>Denne seksjonen gir deg en grundigere innsikt i min personlige bakgrunn.</p>
            <p>Oppdag hvordan min reise har formet hvem jeg er i dag.</p>
        </div>
    `;
    return html
}