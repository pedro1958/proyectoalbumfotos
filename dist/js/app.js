// Comments
const btnComment = document.getElementById("btnComment");
const form = document.getElementById("form");
// Modal
const albums = document.querySelectorAll(".album");
const modal = document.querySelector(".modal");
const btnClose = document.querySelector(".modal__close");
const title = document.querySelector(".modal__heading");
const photo = document.querySelector(".modal__image");

document.addEventListener("DOMContentLoaded", () => {
	document.oncontextmenu = () => false;

	if (btnComment) {
		btnComment.addEventListener("click", (e) => {
			e.preventDefault();
			form.classList.toggle("visible");
		});
	}

	// Modal
	if (albums) {
		albums.forEach((album) => {
			album.addEventListener("click", (e) => {
				e.preventDefault();
				modal.classList.add("modal--show");
				const src = album.children[0].children[0].getAttribute("src");
				const alt = album.children[0].children[0].getAttribute("alt");
				const id = album.children[0].children[0].getAttribute("data-id");
				createModal(src, alt, id);
			});
		});
	}

	if (btnClose) {
		btnClose.addEventListener("click", (e) => {
			e.preventDefault();
			modal.classList.remove("modal--show");
		});
	}
});

const createModal = (src, alt, id) => {
	photo.src = src;
	title.innerHTML = `${alt} - ${id}`;
};
