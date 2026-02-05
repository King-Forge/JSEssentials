//new XHR object, URL points to local file
let xhr = new XMLHttpRequest();
const url = './news_article.json';

//this is where the data is going to end up
const articlesDiv = document.getElementById('newsArticles');

//prepare GET request, from URL, asynchronously(true)
xhr.open('GET', url, true);

//expecting response in JSON format
xhr.responseType = 'json';

xhr.onload = function() {
    //first check if response was good. If not, do nothing
    if (xhr.status >= 200 && xhr.status < 300) {
        //parse the response, format, and append to articlesDiv
        const articles = xhr.response.news;
        articles.forEach(function(article) {
            let articleDiv = document.createElement('div');
            articleDiv.classList.add('article');

            let title = document.createElement('h2');
            title.textContent = article.title;

            let summary = document.createElement('p');
            summary.textContent = article.summary;

            let storyHeader = document.createElement('h3');
            storyHeader.textContent = 'Story:';

            let storyList = document.createElement('ul');
            article.story.forEach(function(story) {
                let listItem = document.createElement('li');
                listItem.textContent = story;
                storyList.appendChild(listItem);
            });

            let edHeader = document.createElement('h3');
            edHeader.textContent = 'Editorial Comments';

            let edList = document.createElement('ul');
            article.editorial_comments.forEach(function(ed) {
                let listItem = document.createElement('li');
                listItem.textContent = ed;
                edList.appendChild(listItem);
            });

            articleDiv.appendChild(title);
            articleDiv.appendChild(summary);
            articleDiv.appendChild(storyHeader);
            articleDiv.appendChild(storyList);
            articleDiv.appendChild(edHeader);
            articleDiv.appendChild(edList);

            articlesDiv.appendChild(articleDiv);
        });
    }
}

//xhr is all set up now, just need to send and wait for the response
xhr.send();