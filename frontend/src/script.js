const button = document.getElementById("time-button");
const text = document.getElementById("time-text");

button.addEventListener("mousedown", async () => {
  const response = await fetch(`${process.env.BACKEND_API}/time`);
  if (!response.ok) {
    console.error("An unexpected error occured. The response was not ok");
    return;
  }

  const data = await response.json();
  text.textContent = data.time;
});
