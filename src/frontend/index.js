Pusher.logToConsole = true;

const pusher = new Pusher(
  "", // Add your API key
  {
    cluster: "", // Add your cluster
  }
);

const channel = pusher.subscribe("my-channel");
channel.bind("my-event", (data) => {
  if (data) {
    renderMessage(typeof data === "string" ? data : data?.message);
  }
});

function renderMessage(message) {
  const container = document.querySelector(".messages");
  const eventElement = createElement("div", "event", message);
  container.appendChild(eventElement);
}

function createElement(type, className, html) {
  const element = document.createElement(type);
  element.className = className;
  element.innerHTML = html;

  return element;
}
