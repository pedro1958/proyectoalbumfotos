const messages = document.querySelectorAll(".messages");
const btnMsgs = document.querySelectorAll(".btnMsg");
messages.forEach((message) => {
	btnMsgs.forEach((btnMsg) => {
		btnMsg.addEventListener("click", (e) => {
			e.preventDefault();
			message.classList.toggle("visible");
		});
	});
});
