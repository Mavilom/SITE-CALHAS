  // ====== LISTA DE FOTOS DO CATÁLOGO ======
  // Troque estes caminhos pelas suas imagens
  const photos = [
    {
      src: "https://images.pexels.com/photos/91224/pexels-photo-91224.jpeg",
      alt: "Exemplo 1 - Produto em destaque"
    },
    {
      src: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg",
      alt: "Exemplo 2 - Produto em ambiente"
    },
    {
      src: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
      alt: "Exemplo 3 - Detalhe do produto"
    },
    {
      src: "https://images.pexels.com/photos/264537/pexels-photo-264537.jpeg",
      alt: "Exemplo 4 - Vitrine de produtos"
    }
  ];

  // ====== ELEMENTOS ======
  const bookEl = document.getElementById("catalogBook");
  const prevBtn = document.getElementById("prevPage");
  const nextBtn = document.getElementById("nextPage");
  const pageIndicator = document.getElementById("pageIndicator");

  let currentPageIndex = 0; // começa na primeira página

  // ====== CRIA AS PÁGINAS DINAMICAMENTE ======
  function createPages() {
    bookEl.innerHTML = ""; // limpa se precisar recriar

    photos.forEach((photo, index) => {
      const page = document.createElement("div");
      page.classList.add("catalog-page");
      page.dataset.index = index;

      // z-index invertido pra primeira página ficar em cima
      page.style.zIndex = photos.length - index;

      page.innerHTML = `
        <img src="${photo.src}" alt="${photo.alt}">
      `;

      bookEl.appendChild(page);
    });

    updatePages();
  }

  // ====== ATUALIZA ESTADO DAS PÁGINAS (viradas ou não) ======
  function updatePages() {
    const pages = document.querySelectorAll(".catalog-page");

    pages.forEach(page => {
      const index = parseInt(page.dataset.index, 10);
      if (index < currentPageIndex) {
        // páginas anteriores ficam viradas
        page.classList.add("turned");
      } else {
        // página atual e próximas ficam “em pé”
        page.classList.remove("turned");
      }
    });

    // Atualiza indicador de página
    pageIndicator.textContent = `Página ${currentPageIndex + 1} de ${photos.length}`;

    // Desabilita botões se não tiver pra onde ir
    prevBtn.disabled = currentPageIndex === 0;
    nextBtn.disabled = currentPageIndex === photos.length - 1;
  }

  // ====== NAVEGAÇÃO ======
  prevBtn.addEventListener("click", () => {
    if (currentPageIndex > 0) {
      currentPageIndex--;
      updatePages();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentPageIndex < photos.length - 1) {
      currentPageIndex++;
      updatePages();
    }
  });

  // Opcional: virar página clicando no "livro"
  bookEl.addEventListener("click", () => {
    if (currentPageIndex < photos.length - 1) {
      currentPageIndex++;
    } else {
      currentPageIndex = 0; // volta pro início
    }
    updatePages();
  });

  // Inicializa
  createPages();

