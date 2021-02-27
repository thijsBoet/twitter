$("#postTextarea").keyup(event => {
  const textbox = $(event.target);
  let value = textbox.val().trim();
  
  const submitButton = $("#submitPostButton");

  if (submitButton.length === 0) return alert("no submit Btn found")

  if (value === "") {
    submitButton.prop("disabled", true);
    return
  }

  submitButton.prop("disabled", false);
})

