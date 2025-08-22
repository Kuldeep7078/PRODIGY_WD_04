(function() {
	"use strict";

	const header = document.getElementById("site-header");
	const nav = document.getElementById("primary-nav");
	const toggle = document.querySelector(".nav-toggle");
	const navList = document.getElementById("nav-list");
	const year = document.getElementById("year");
	const links = Array.from(document.querySelectorAll(".nav-link"));

	function updateHeaderOnScroll() {
		const scrolled = window.scrollY > 10;
		header.classList.toggle("scrolled", scrolled);
	}

	function closeMobileMenu() {
		nav.classList.remove("open");
		if (toggle) toggle.setAttribute("aria-expanded", "false");
	}

	function setActiveLink(hash) {
		links.forEach(link => {
			const isActive = link.getAttribute("href") === hash;
			link.classList.toggle("active", isActive);
		});
	}

	// Update active link on scroll using IntersectionObserver
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				setActiveLink(`#${entry.target.id}`);
			}
		});
	}, { rootMargin: "-50% 0px -50% 0px", threshold: 0 });

	document.querySelectorAll("section[id]").forEach(section => observer.observe(section));

	if (year) year.textContent = String(new Date().getFullYear());

	updateHeaderOnScroll();
	window.addEventListener("scroll", updateHeaderOnScroll, { passive: true });

	if (toggle && nav) {
		toggle.addEventListener("click", function() {
			const isOpen = nav.classList.toggle("open");
			toggle.setAttribute("aria-expanded", String(isOpen));
		});
	}

	if (navList) {
		navList.addEventListener("click", function(event) {
			const target = event.target;
			if (target && target.matches && target.matches("a.nav-link")) {
				closeMobileMenu();
			}
		});
	}

	document.addEventListener("keydown", function(event) {
		if (event.key === "Escape") closeMobileMenu();
	});
})(); 