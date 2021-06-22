const commentHandler = async (event) => {
  event.preventDefault();

  const comment_content = document.querySelector(
    "input[name='newPostTitle']"
  ).value;
  console.log("title", title);
  const content = document.querySelector('input[name="newPostContent"]').value;

  const response = await fetch("/api/posts", {
    method: "POST",
    body: JSON.stringify({ title, content }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Please try add your post again");
  }
};

document
  .querySelector(".newPost-form")
  .addEventListener("submit", commentHandler);
