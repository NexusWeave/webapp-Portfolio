// Updates the view based on the current page

function navigateView(view)
{
    //  Navigate to view
    model.app.currentPage = view;
    updateView();
}

function generateForm(id)
{
    console.log("Generating form for id:", id);
    const form = model.data.forms[id];
    const inputs = form.inputs;

    let html = /*HTML*/ `
        <form onsubmit="handleLogin(event)" method="${form.method}" class="${form.cls}">`;

    for (let i = 0; i < inputs.length; i++)
    {
        const input = inputs[i];

        html += /*HTML*/ `
                <label for="${input.id}">${input.name}</label>
                <input type="${input.type ? input.type : 'text'}" id="${input.id}" name="${input.name}" placeholder="${input.placeholder}" class="${input.cls}" required="${input.required ? 'required' : ''}">`;
                
    }
    html += /*HTML*/ `
    <button type="${form.btn.type}" class="${form.btn.cls}">${form.btn.name}</button>
    </form>`;
    return html;
}

function findCategoryImage(category, images)
{
    let image = null;

    for (let j = 0; j < category.length; j++)
    {
        image = images.find(img => img.category[j] === category[j]) ? images.find(img => img.category[j] === category[j]) : images.find(img => img.category[0] === 'default');
    }
    return image;
}