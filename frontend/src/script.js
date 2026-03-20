const getTimeBtn = document.getElementById("get-time");
const getCookieBtn = document.getElementById("get-cookie");
const sendCookieBtn = document.getElementById("send-cookie");

getTimeBtn.addEventListener("click", async () => {
  const response = await fetch(`${process.env.BACKEND_API}/get-time`, {
    credentials: "include",
  });

  const data = await response.json();
  if (!response.ok) {
    console.error(data.message || "An unexpected error occured.");
  } else {
    console.log(data.time);
  }
});

getCookieBtn.addEventListener("click", async () => {
  const response = await fetch(`${process.env.BACKEND_API}/get-cookie`, {
    credentials: "include",
  });

  const data = await response.json();
  if (!response.ok) {
    console.error(data.message || "An unexpected error occured.");
  } else {
    console.log("Cookies received");
  }
});

sendCookieBtn.addEventListener("click", async () => {
  const response = await fetch(`${process.env.BACKEND_API}/send-cookie`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();
  if (!response.ok) {
    console.error(data.message || "An unexpected error occured.");
  } else {
    console.log(data.message);
  }
});
