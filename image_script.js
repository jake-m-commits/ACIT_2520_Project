document.getElementById("file").addEventListener("change", (ev) => {
  console.log("image_script running...");
  ev.preventDefault();
  const formdata = new FormData();
  formdata.append("image", ev.target.files[0]);
  fetch("http://localhost:3001/reminders/uploads/", {
    method: "POST",
    body: formdata,
  })
    .then((data) => data.json())
    .then((data) => console.log(data));
});
