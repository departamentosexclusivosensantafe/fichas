import StorageService from "../components/StorageService.js";

function fillPreview(previewData) {
  const id = previewData.id.trim() || "";
  const title = previewData.title.trim() || "";
  const description = previewData.descriptionOG.trim() || "";
  const image = previewData.imageOG.trim() || "";
  const baseUrl = previewData.urlProject.trim() || "";
  const price = previewData.price.trim() || "";
  const bedrooms = previewData.bedrooms.trim() || "";
  const bathrooms = previewData.bathrooms.trim() || "";
  const parking = previewData.parking.trim() || "";
  const construction = previewData.construction.trim() || "";
  const time = previewData.time.trim() || Date.now().toString();
  const theme = previewData.theme.trim() || "theme-modern";
  const address = previewData.address.trim() || "";
  const amenityIcons = {
    alberca: "pool.svg",
    gym: "gym.svg",
    gimnasio: "gym.svg",
    cine: "clapperboard.svg",
    "sala de proyeccion": "film.svg",
    padel: "padel.svg",
    ludoteca: "playground.svg",
    "area de juegos infantiles": "playground.svg",
    "jardin con juegos infantiles": "playground.svg",
    jacuzzi: "jacuzzi.svg",
    sauna: "sauna.svg",
    vapor: "steam.svg",
    restaurante: "restaurant.svg",
    asadores: "grill.svg",
    asador: "grill.svg",
    jardines: "garden.svg",
    jardin: "garden.svg",
    "areas verdes": "garden.svg",
    "seguridad 24hrs": "security.svg",
    "area de mascotas": "pets.svg",
    "salon de eventos": "salon.svg",
    "salon de fiestas": "salon.svg",
    "business center": "business.svg",
    "salon ingles": "tea.svg",
    "sala de jovenes": "boy.svg",
    "salon de juegos": "games.svg",
    "jogging track": "jogging.svg",
    "sky bar": "bar.svg",
    bar: "bar.svg",
    "social rooms": "social_room.svg",
    fut: "soccer.svg",
    cafeteria: "coffee.svg",
    "cigar room": "cigarette.svg",
    "sala de juntas": "meeting.svg",
    "centro de copiado": "copy.svg",
    lavanderia: "laundry.svg",
    "area de lavado": "laundry.svg",
    cocina: "kitchen.svg",
    "cocina integral": "kitchen.svg",
    terraza: "balcony.svg",
    balcon: "balcony.svg",
    patio: "deck.svg",
    "cuarto TV": "tv-minimal.svg",
    estudio: "library-big.svg",
    closet: "checkroom.svg",
    vestidor: "checkroom.svg",
    bodega: "warehouse.svg",
    yoga: "self_improvement.svg",
  };

  /* CARACTERISTICAS PRINCIPALES */
  let mainFeaturesHtml = "";

  if (Number(construction) > 0) {
    mainFeaturesHtml += `
    <div class="property__detail">
      <img
        class="property__detail-icon"
        src="../images/icons/ruler.svg"
        alt=""
      />
      <span class="property__detail-text">
        ${construction} m²
      </span>
    </div>
  `;
  }

  if (Number(bedrooms) > 0) {
    mainFeaturesHtml += `
    <div class="property__detail">
      <img
        class="property__detail-icon"
        src="../images/icons/bed.svg"
        alt=""
      />
      <span class="property__detail-text">
        ${bedrooms} Recámara(s)
      </span>
    </div>
  `;
  }

  if (Number(bathrooms) > 0) {
    mainFeaturesHtml += `
    <div class="property__detail">
      <img
        class="property__detail-icon"
        src="../images/icons/bath.svg"
        alt=""
      />
      <span class="property__detail-text">
        ${bathrooms} Baño(s)
      </span>
    </div>
  `;
  }

  if (Number(parking) > 0) {
    mainFeaturesHtml += `
    <div class="property__detail">
      <img
        class="property__detail-icon"
        src="../images/icons/car.svg"
        alt=""
      />
      <span class="property__detail-text">
        ${parking} Estacionamiento(s)
      </span>
    </div>
  `;
  }

  const mainFeaturesSection =
    mainFeaturesHtml.trim() !== ""
      ? `
      <h2 class="property__section-title">
        Características principales
      </h2>

      <div class="property__details-grid">
        ${mainFeaturesHtml}
      </div>
    `
      : "";

  /* FEATURES (CARACTERÍSTICAS) */
  let featuresRaw = previewData.features || "";
  let featuresList = [];

  if (Array.isArray(featuresRaw)) {
    featuresList = featuresRaw;
  } else if (typeof featuresRaw === "string") {
    featuresList = featuresRaw.split(/[\n]/);
  }

  /* Lo agregué porque features simpre manda un valor "" */
  if (featuresList.length >= 1 && featuresList[0] === "") {
    featuresList = [];
  }

  const featuresHtml = featuresList
    .map((f) => `<li class="property__feature">${f.trim()}</li>`)
    .join("");

  const featuresSection =
    featuresHtml.trim() !== ""
      ? `
      <div>
        <h2>Características</h2>

        <ul class="property__features-list">
          ${featuresHtml}
        </ul>
      </div>
    `
      : "";

  /* AMENITIES */
  const amenitiesRaw = previewData.amenities || "";
  let amenitiesList = [];

  if (Array.isArray(amenitiesRaw)) {
    amenitiesList = amenitiesRaw;
  } else if (typeof amenitiesRaw === "string") {
    amenitiesList = amenitiesRaw.split(/[\n]/);
  }

  /* Lo agregué porque amenities simpre manda un valor "" */
  if (amenitiesList.length >= 1 && amenitiesList[0] === "") {
    amenitiesList = [];
  }

  const amenitiesHtml = amenitiesList
    .map((amenity) => {
      function removerAcentos(texto) {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      }
      const search = removerAcentos(amenity.trim()).toLowerCase();
      const name = amenity.trim();

      const icon = amenityIcons[search] || "check.svg";

      return `
      <div class="property__amenity">
        <img
          class="property__amenity-icon"
          src="../images/icons/${icon}"
          alt="${name}"
        />
        <span class="property__amenity-text">${name}</span>
      </div>
    `;
    })
    .join("");

  const amenitiesSection =
    amenitiesHtml.trim() !== ""
      ? `
      <div class="property__amenities-section">
        <h2 class="property__section-title">
          Amenidades
        </h2>

        <div class="property__amenities-grid">
          ${amenitiesHtml}
        </div>
      </div>
    `
      : "";

  const descriptionSection =
    description.trim() !== ""
      ? `
      <div>
        <h2 class="property__section-title">
          Descripción
        </h2>

        <p class="property__description">${description}</p>
      </div>
    `
      : "";

  /* GALERIA */
  const gallery = previewData.gallery || [];

  if (!image.startsWith("https://")) {
    alert("La imagen debe ser una URL absoluta que inicie con https://");
    return;
  }

  if (!baseUrl.startsWith("https://")) {
    alert("La URL debe ser absoluta y que inicie con https://");
    return;
  }

  const previewUrl = `${baseUrl}previews/propiedad${id}${time}_preview.html`;

  const absoluteGallery = gallery.map((img) => {
    const absolutePath = baseUrl + img.slice(2);
    return absolutePath;
  });

  /* MAPA */
  function getMapLink() {
    return `"https://www.google.com/maps?q=${encodeURIComponent(address)}"`;
  }
  const mapLink = getMapLink();

  /* AGENTE */
  function getAgentBlock(showAgent) {
    if (!showAgent) return "";

    return `
  <div class="property__cta">
    <a class="property__cta-button" href="https://wa.me/5215522425840?text=${encodeURIComponent(`Hola, estoy interesado en la propiedad "${title}".\n¿Podrías darme más información?`)}" target="_blank  ">
      Contactar por WhatsApp
    </a>
  </div>
  <div class="property__agent">
    <div class="property__agent-broker">&nbsp;Carolina Guerrero</div>
    <div class="property__agent-phone">
      <a class="property__agent-number" href="tel:5522425840">&nbsp;55 2242 5840</a>
    </div>
  </div>
  `;
  }

  function generateHTML(showAgent) {
    return `<!doctype html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<title>${title}</title>

<link rel="stylesheet" href="../blocks/property.css" />

<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:image" content="${image}" />
<meta property="og:url" content="${previewUrl}" />
<meta property="og:type" content="website" />

</head>

<body class="${theme}">
  <main class="property">

    <section class="property__content">

      <div class="property__hero-slider">
        <img class="property__hero-image" src="${absoluteGallery[0] || image}" alt="${title}" />

        <button class="property__btn property__btn-left" id="btnBack">
          <img class="property__btn_image" src="${baseUrl}images/arrow_back.png" alt="Left arrow">
        </button>

        <button class="property__btn property__btn-right" id="btnForward">
          <img class="property__btn_image" src="${baseUrl}images/arrow_forward.png" alt="Right arrow">
        </button>
      </div>

      <div class="property__counter" id="imageCounter">
        1 / ${absoluteGallery.length || 1}
      </div>

      <div>
        <h1 class="property__title">${title}</h1>
        <p class="property__price">${price}</p>
      </div>

      ${mainFeaturesSection}

      ${featuresSection}

      ${amenitiesSection}

      ${descriptionSection}

      ${getAgentBlock(showAgent)}

      <div>
      <p class="property__location-label">${address}</p>
      </div>

      <div class="property__map-section">
        <h2 class="property__section-title">
          Ubicación
        </h2>

        <iframe
          class="property__map"
          src="https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed"
          loading="lazy"
          allowfullscreen>
        </iframe>
      </div>

      <div>
        <a
        href=${mapLink}
        target="_blank"
        class="property__map-link"
        >
          Ir a ubicación &rarr;
        </a>
      </div>
    </section>
  </main>
<script>
  (function () {
    const images = ${JSON.stringify(absoluteGallery)};
    let currentIndex = 0;

    const img = document.querySelector(".property__hero-image");
    const btnBack = document.getElementById("btnBack");
    const btnForward = document.getElementById("btnForward");
    const counter = document.getElementById("imageCounter");

    if (!img || !btnBack || !btnForward || images.length === 0) return;

    function updateSlider() {
        img.src = images[currentIndex];
      if (counter) {
        counter.textContent =
          (currentIndex + 1) + " / " + images.length;
      }
    }

    // 🔹 render inicial
    updateSlider();

    btnForward.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateSlider();
    });

    btnBack.addEventListener("click", () => {
      currentIndex =
        (currentIndex - 1 + images.length) % images.length;
      updateSlider();
    });

    // Swipe support
    let startX = 0;
    let endX = 0;

    img.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    img.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      handleSwipe();
    });

    function handleSwipe() {
      const diff = startX - endX;

      // sensibilidad mínima
      if (Math.abs(diff) < 50) return;

      if (diff > 0) {
        // swipe izquierda → anterior
        currentIndex =
          (currentIndex - 1 + images.length) % images.length;

      } else {
        // swipe derecha → siguiente
        currentIndex = (currentIndex + 1) % images.length;
      }

      updateSlider();
    }

  })();

</script>

</body>
</html>`;
  }

  /*--------- En caso de que estemos editando una propiedad ya publicada ---------*/
  if (Number(id) > StorageService.getMaxPublishedId()) {
    StorageService.setMaxPublishedId(id);
  }
  const htmlWithAgent = generateHTML(true);
  const htmlWithoutAgent = generateHTML(false);

  downloadHTML(`propiedad${id}${time}_preview.html`, htmlWithAgent);
  setTimeout(() => {
    downloadHTML(`propiedad${id}${time}_preview_SNT.html`, htmlWithoutAgent);
  }, 800);
}

function downloadHTML(filename, content) {
  const blob = new Blob([content], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}

export { fillPreview };
