function aboutView(page) {
    html = /*HTML*/`
        ${headerView()}
        ${exerciseLogSection()}
        ${blogLogSection()}
        ${aboutMeSection()}
        ${personalBackgroundSection()}
    ${footerView()}`;
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
            <p>This section features my blog posts where I share my thoughts and insights on various topics.</p>
            <p>Feel free to read and engage with my content!</p>
        </div>
    `;
    return html
}

function aboutMeSection()
{
    html = /*HTML*/`
        <div class="about-me">
            <h2>About Me</h2>
            <p>This is the about me section where I share my story and experiences.</p>
            <p>Feel free to explore and learn more about my background and interests.</p>
        </div>
    `;
    return html
}

function personalBackgroundSection()
{
    html = /*HTML*/`
        <div class="personal-background">
            <h2>Personal Background</h2>
            <p>This section provides insights into my personal background, including my education and work experience.</p>
            <p>Discover how my journey has shaped who I am today.</p>
        </div>
    `;
    return html
}