//new XHR object, URL points to local file
let xhr = new XMLHttpRequest();
const url = './health_article.json';

//this is where the data is going to end up
const articlesDiv = document.getElementById('healthArticles');

//prepare GET request, from URL, asynchronously(true)
xhr.open('GET', url, true);

//expecting response in JSON format
xhr.responseType = 'json';

xhr.onload = function() {
    //first check if response was good. If not, do nothing
    if (xhr.status >= 200 && xhr.status < 300) {
        //parse the response, format, and append to articlesDiv
        const articles = xhr.response.articles;
        articles.forEach(function(article) {
            let articleDiv = document.createElement('div');
            articleDiv.classList.add('article');

            let title = document.createElement('h2');
            title.textContent = article.title;

            let description = document.createElement('p');
            description.textContent = article.description;

            let waysHeader = document.createElement('h3');
            waysHeader.textContent = 'Ways to Achieve:';

            let waysList = document.createElement('ul');
            article.ways_to_achieve.forEach(function(way) {
                let listItem = document.createElement('li');
                listItem.textContent = way;
                waysList.appendChild(listItem);
            });

            let benefitsHeader = document.createElement('h3');
            benefitsHeader.textContent = 'Benefits:';

            let benefitsList = document.createElement('ul');
            article.benefits.forEach(function(benefit) {
                let listItem = document.createElement('li');
                listItem.textContent = benefit;
                benefitsList.appendChild(listItem);
            });

            articleDiv.appendChild(title);
            articleDiv.appendChild(description);
            articleDiv.appendChild(waysHeader);
            articleDiv.appendChild(waysList);
            articleDiv.appendChild(benefitsHeader);
            articleDiv.appendChild(benefitsList);

            articlesDiv.appendChild(articleDiv);
        });
    }
}

//xhr is all set up now, just need to send and wait for the response
xhr.send();