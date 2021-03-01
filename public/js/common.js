$("#postTextarea").keyup((event) => {
  const textbox = $(event.target);
  let value = textbox.val().trim();

  const submitButton = $("#submitPostButton");

  if (submitButton.length === 0) return alert("no submit Btn found");

  if (value === "") {
    submitButton.prop("disabled", true);
    return;
  }

  submitButton.prop("disabled", false);
});

$("#submitPostButton").click((event) => {
  const button = $(event.target);
  const textbox = $("#postTextarea");

  const data = {
    content: textbox.val(),
  };

  $.post("/api/posts", data, (postData) => {
    const html = createPostHtml(postData);
    $(".postsContainer").prepend(html);
    textbox.val("");
    button.prop("disabled", true);
    textbox.focus();
  });
});

$(document).on("click", ".likeButton", (event) => {
  const button = $(event.target);
  const postId = getPostIdFromElement(button);

  if (postId === undefined) return;
  
  $.ajax({
    type: "PUT",
    url: `/api/posts/${postId}/like`,
    success: (postData) => {
      
      button.find("span").text(postData.likes.length || "")
      
      if (postData.likes.includes(userLoggedIn._id)) {
        button.addClass("active");
      } else {
        button.removeClass("active");
      }
    }
  });
});

getPostIdFromElement = (element) => {
  const isRoot = element.hasClass("post");
  const rootElement = isRoot ? element : element.closest(".post");
  postId = rootElement.data().id;

  if (postId === undefined) return alert("Post id undefined");

  return postId;
}

createPostHtml = (postData) => {
  const { profilePic, username, firstName, lastName } = postData.postedBy;
  const { content, createdAt, _id, likes } = postData;

  if (_id === undefined) {
    console.log("User object not populated");
    return;
  }

  const timestamp = timeDifference(new Date(), new Date(createdAt));
  const likeButtonActiveClass = likes.includes(userLoggedIn._id) ? "active" : "";


  return `<div class='post' data-id='${_id}'>
                <div class='mainContentContainer'>
                    <div class='userImageContainer'>
                        <img src='${profilePic}'>
                    </div>
                    <div class='postContentContainer'>
                        <div class='header'>
                            <a href='/profile/${username}' class='displayName'>${firstName} ${lastName}</a>
                            <span class='username'>@${username}</span>
                            <span class='date'>${timestamp}</span>
                        </div>
                        <div class='postBody'>
                            <span>${content}</span>
                        </div>
                        <div class='postFooter'>
                            <div class='postButtonContainer'>
                                <button>
                                    <i class='far fa-comment'></i>
                                </button>
                            </div>
                            <div class='postButtonContainer green'>
                                <button class="retweetButton">
                                    <i class='fas fa-retweet'></i>
                                </button>
                            </div>
                            <div class='postButtonContainer red'>
                                <button class="likeButton ${likeButtonActiveClass}">
                                    <i class='far fa-heart'></i>
                                    <span class=''>${likes.length || ""}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
}

timeDifference = (current, previous) => {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = current - previous;

  if (elapsed < msPerMinute) {
    if (elapsed / 1000 < 30) return "Just now";
    return Math.round(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + " months ago";
  } else {
    return Math.round(elapsed / msPerYear) + " years ago";
  }
};

