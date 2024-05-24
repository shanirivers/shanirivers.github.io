fetch('https://gql.hashnode.com', {
  method: 'POST',
  body: JSON.stringify({
    query: `{
        publication(host: "shanirivers.hashnode.dev") {
            posts(first: 3) {
            edges {
                node {
                title
                brief
                url
                coverImage {
                    url
                }
                }
            }
            }
        } 
    }`
  }),
  headers: {'content-type': 'application/json' }
}) 
.then(response => response.json())
.then(data => {
    // Access the posts data
    const posts = data.data.publication.posts.edges;
    // console.log('Posts:', posts);

    // try to do the creat html thing 
    const blogPostHTML = posts.map(post => {
        return `
        <div id="project_item" class="column">
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img
                src="${post.node.coverImage.url}" alt="${post.node.title}"
              />
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">${post.node.title}</p>
              
              </div>
            </div>
        
            <div class="content">
              ${post.node.brief} 
            </div>
          </div>
          <footer class="card-footer">
            <p class="card-footer-item">
              <span>
                <a href="${post.node.url}" target="_blank">Read more</a>
              </span>
            </p>
          </footer>
        </div>
      </div>
        `;
    });

    postsContainer.innerHTML = blogPostHTML.join('');  
    
});
