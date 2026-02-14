//  Helper functions 
function next()
{
    /*
    -   Function to swap through the images
    -   The function is called when the next button is clicked
    -   The function updates the src, alt text and caption
    */

    //  fetch the images
    const sources = model.data.carosel;
    const Carosel = model.app.currentCarosel;

    //  Get the length of the array
    const length = sources.length;

    //  Swap through the images
    for (let i = 0; i < length; i++)
    { 
        //  Ensure the path points to the image
        if (sources[i].src === Carosel.src)
        {
             //  Update the index
            const n = (i + 1) % length;

            //  Update variables with next media
            Carosel.alt = sources[n].alt;
            Carosel.src = sources[n].src;
            Carosel.caption = sources[n].caption;
            
            //  Update the view
            updateView("vedtekter");
            break;
        }
    }
};

function prev()
{
    /*
    -   Function to swap through the images
    -   The function is called when the prev button is clicked
    -   The function updates the src, alt text and caption
    */
    //  fetch the images
    const sources = model.data.carosel;
    const Carosel = model.app.currentCarosel;

    //  Get the length of the array
    const length = sources.length;

    //  Swap through the images
    for (let i = 0; i < sources.length; i++)
    { 

        //  Ensure the path points to the image
        if (sources[i].src === Carosel.src)
        {
            //  Update the index
            const n = (i - 1 < 0) ? length - 1 : i - 1;

            //  Update variables with next media
            Carosel.alt = sources[n].alt;
            Carosel.src = sources[n].src;
            Carosel.caption = sources[n].caption;
            
            //  Update the view
            updateView("vedtekter");
            break;
        }
    } 
};