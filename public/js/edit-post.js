// Click on an exsisting blog post and presented with title, contents, creator's name, date created and option to edit.
// Can edit the blog post

async function editPostFormHandler(event) {
  event.preventDefault();
  const title = document.querySelector("input[name='newPostTitle']").value;
  const content = document.querySelector('input[name="newPostContent"]').value;

  // window.location gives us access to the URL. We then use the .split() method to access the number at the end of the URL and set that equal to id.
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, content }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to edit post");
  }
}

document
  .querySelector(".edit-post-form")
  .addEventListener("submit", editPostFormHandler);
