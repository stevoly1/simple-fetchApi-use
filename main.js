
const loadBtn = document.getElementById('loadBtn');
const postsContainer = document.getElementById('postsContainer');

loadBtn.addEventListener('click', (event) => {
    event.preventDefault();
    loadBtn.disabled = true;
    loadBtn.textContent = "Loading Posts.......";
    postsContainer.innerHTML = "";
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        postsContainer.innerHTML = ""; 
        data.forEach((post) => {
          const postElement = document.createElement("div");
          postElement.classList.add("post");
          postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.body}</p>
                `;
          postsContainer.appendChild(postElement);
          loadBtn.disabled = false;
          loadBtn.textContent = "Posts Loaded: click to reload";
        });
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        postsContainer.innerHTML = `<p class="error">Failed to load posts: ${error.message}</p>`;
      });
  });