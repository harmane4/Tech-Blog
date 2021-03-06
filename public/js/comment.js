const commentHandler = async (event) => {
  event.preventDefault();

  // Need a const for the comment_content
  const comment_content = document.querySelector(
    "input[name='newPostTitle']"
  ).value;

  const response = await fetch("/api/post", {
    method: "POST",
    body: JSON.stringify({ comment_content }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Please try add your comment again");
  }
};

document
  .querySelector(".newComment-form")
  .addEventListener("submit", commentHandler);
