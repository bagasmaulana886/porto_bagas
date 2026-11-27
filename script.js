// Data detail proyek untuk modal interaktif
const PROJECT_DETAILS = {
  "amikom-event": {
    category: "01 / Web App • Proyek Kampus",
    title: "AmikomEvent — Portal Event & Tiket Kampus",
    description:
      "Aplikasi web publikasi acara dan pemesanan tiket kampus (Tugas Basis Data Sistem Informasi) yang memisahkan area pengunjung dan panel administrasi pengelola event.",
    solution:
      "Merancang skema basis data relasional (events, categories, partners, transactions) beserta alur pengguna dari halaman katalog, detail acara, checkout, hingga halaman My Ticket, ditambah panel admin untuk CRUD event, kategori, partner, dan rekap transaksi.",
    tech: ["PHP 8.3", "Laravel 13", "Blade", "HTML/CSS", "SQL"],
    repoUrl: "https://github.com/bagasmaulana886/24.12.3172_AmikomEvent"
  },
  sembakoku: {
    category: "02 / Web App • Laravel",
    title: "Sembakoku — Sistem Kasir & Inventaris Toko",
    description:
      "Aplikasi web kasir (Point of Sale) dan manajemen stok untuk toko sembako keluarga di Siak. Dirancang agar pencatatan barang masuk, transaksi harian, dan laporan penjualan jauh lebih rapi daripada pembukuan manual.",
    solution:
      "Membangun alur kasir (POS) lengkap dengan checkout dan cetak struk transaksi, pemantauan batas stok minimum beserta riwayat pergerakan stok (restock & penjualan), dashboard ringkasan, serta ekspor data produk dan laporan penjualan ke format CSV.",
    tech: ["PHP 8.3", "Laravel 13", "Blade", "JavaScript", "CSS", "SQL"],
    repoUrl: "https://github.com/bagasmaulana886/sembakoku"
  },
  sawitnusa: {
    category: "03 / UI/UX Design • Figma",
    title: "SawitNusa — Agrotech Design System & UI",
    description:
      "Perancangan UI/UX dan design system modular di Figma untuk platform manajemen perkebunan kelapa sawit berkelanjutan, terdiri dari halaman Design System & Components, Web Dashboard, serta Mobile App.",
    solution:
      "Menyusun token warna semantik agroteknologi (Deep Palm, Emerald Core, Harvest Gold), tipografi Plus Jakarta Sans, serta komponen UI modular (BrandLogo, Button, StatusBadge, NavItem, dan KpiCard) untuk kebutuhan pemantauan panen TBS, rendemen CPO, dan status sertifikasi ISPO/RSPO.",
    tech: ["Figma", "Design System", "Color Tokens", "Web Dashboard UI", "Mobile UI"],
    repoUrl: "https://www.figma.com/design/2NRzlAMEbGJSdR7y1bDzP0",
    repoLabel: "Lihat di Figma ↗"
  },
  "event-ukm": {
    category: "04 / Proyek Kampus • Web App",
    title: "Sistem Informasi Event UKM",
    description:
      "Portal publikasi dan pendaftaran acara kampus seperti seminar teknologi, workshop coding, dan kegiatan unit kegiatan mahasiswa.",
    solution:
      "Mengembangkan formulir registrasi tervalidasi, halaman detail acara dinamis, serta rekap data peserta berbasis MySQL untuk kebutuhan panitia.",
    tech: ["PHP", "Laravel", "MySQL", "Bootstrap"]
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const htmlEl = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".work-card");
  const modal = document.getElementById("projectModal");
  const modalClose = document.getElementById("modalClose");
  const modalContactBtn = document.getElementById("modalContactBtn");
  const copyEmailBtn = document.getElementById("copyEmailBtn");
  const emailText = document.getElementById("emailText");
  const contactForm = document.getElementById("contactForm");
  const toast = document.getElementById("toast");
  const yearEl = document.getElementById("currentYear");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  let toastTimer;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  // Default to editorial light theme unless user switches
  const savedTheme = localStorage.getItem("bagas_portfolio_theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    htmlEl.setAttribute("data-theme", savedTheme);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = htmlEl.getAttribute("data-theme") || "light";
      const next = current === "light" ? "dark" : "light";
      htmlEl.setAttribute("data-theme", next);
      localStorage.setItem("bagas_portfolio_theme", next);
      showToast(next === "light" ? "Tema terang aktif" : "Tema gelap aktif");
    });
  }

  // Mobile menu drawer
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Active nav link on scroll
  const sections = document.querySelectorAll("main section[id]");
  const navItems = document.querySelectorAll(".nav-link");

  function updateActiveNav() {
    const scrollPos = window.scrollY + 120;
    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute("id");
      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();

  // Scroll reveal
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  // Project filtering
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      projectCards.forEach((card) => {
        const categories = (card.dataset.category || "").split(" ");
        const shouldShow = filter === "all" || categories.includes(filter);
        card.classList.toggle("hidden", !shouldShow);
      });
    });
  });

  // Project modal
  function openProjectModal(projectKey) {
    const data = PROJECT_DETAILS[projectKey];
    if (!data || !modal) return;

    document.getElementById("modalCategory").textContent = data.category;
    document.getElementById("modalTitle").textContent = data.title;
    document.getElementById("modalDescription").textContent = data.description;
    document.getElementById("modalSolution").textContent = data.solution;

    const techContainer = document.getElementById("modalTech");
    techContainer.innerHTML = "";
    data.tech.forEach((item) => {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = item;
      techContainer.appendChild(span);
    });

    const modalRepoBtn = document.getElementById("modalRepoBtn");
    if (modalRepoBtn) {
      if (data.repoUrl) {
        modalRepoBtn.href = data.repoUrl;
        modalRepoBtn.textContent = data.repoLabel || "Lihat di GitHub \u2197";
        modalRepoBtn.hidden = false;
      } else {
        modalRepoBtn.hidden = true;
      }
    }

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeProjectModal() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }

  document.querySelectorAll(".open-modal").forEach((btn) => {
    btn.addEventListener("click", () => {
      openProjectModal(btn.dataset.project);
    });
  });

  if (modalClose) {
    modalClose.addEventListener("click", closeProjectModal);
  }
  if (modalContactBtn) {
    modalContactBtn.addEventListener("click", closeProjectModal);
  }
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeProjectModal();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("open")) {
      closeProjectModal();
    }
  });

  // Copy email
  if (copyEmailBtn && emailText) {
    copyEmailBtn.addEventListener("click", async () => {
      const email = emailText.textContent.trim();
      try {
        await navigator.clipboard.writeText(email);
        showToast("Alamat email disalin");
      } catch {
        showToast(`Email: ${email}`);
      }
    });
  }

  // Contact form
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("nameInput").value.trim();
      const email = document.getElementById("emailInput").value.trim();
      const subject = document.getElementById("subjectInput").value.trim();
      const message = document.getElementById("messageInput").value.trim();

      if (!name || !email || !subject || !message) {
        showToast("Lengkapi seluruh kolom formulir");
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast("Format email belum valid");
        return;
      }

      showToast(`Terima kasih ${name}, pesan Anda tercatat.`);
      contactForm.reset();
    });
  }
});
