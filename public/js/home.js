$(document).ready(() => {
  $.get("/api/posts", (results) => {
    outputPosts(results, $(".postsContainer"));
  });
});

outputPosts = (results, container) => {
  container.html("");

  if (results.length === 0) {
    container.append("<span class='noResults' >Nothing to show</span>");
  }

  results.forEach((result) => {
    var html = createPostHtml(result);
    container.append(html);
  });
};