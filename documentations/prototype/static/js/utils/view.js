function carouselView(images, carousel)
{

    /*
    * Carousel view for member portal
    * @param {Array} images - Array of image objects for the carousel
    * @param {Object} carousel - Object containing the first image for the carousel
    * @param {Object} content - Object containing the class for the carousel section
    * @returns {string} - HTML string for the carousel view
    */
    const n = images.length ; //  Exclude the first image from the carousel

    let html = /*HTML*/`<section class = "${carousel.cls} flex-wrap-row-justify-center">
    <div id="myCarousel" class="carousel slide" data-ride="carousel">
         <ol class="carousel-indicators">`;

    //  Indicators
    for (let i = 0; i <= n; i++)
    {
        html += /*HTML*/`<li data-target="#myCarousel" data-slide-to="${i}"></li>`;
    }

    html += /*HTML*/`</ol>
    <div class="carousel-inner">
        <div class="item active">
            <img alt="${carousel.alt ? carousel.alt : null}" src="${carousel.src ? carousel.src : null}">
        </div>`;

    //  Carousel images
    for (let i = 0; i < n; i++)
    {

        const image = images[i];

        if (image.src != carousel.src)
        {
            html += `
            <div class="item">
                <img alt="${image.alt ? image.alt : null}" src="${image.src ? image.src : null}">
            </div>`;
        }
        
    }

    html += /*HTML*/`
        </div>
            <a class="left carousel-control" href="#myCarousel" data-slide="prev">
                <span class="glyphicon glyphicon-chevron-left"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="right carousel-control" href="#myCarousel" data-slide="next">
                <span class="glyphicon glyphicon-chevron-right"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>`;

    return html;
}