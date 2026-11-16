/*
 * Contenido del CV como "pasajes" al estilo Twine.
 * - [[texto->id]] crea un enlace dentro del párrafo.
 * - **texto** pone negrita.
 * - Párrafos separados por línea en blanco.
 * - `choices` son las opciones al pie de cada pasaje.
 * - `pos` es la posición del pasaje en el mapa (x, y).
 *
 * Para editar el CV solo hay que tocar este archivo.
 */

const CONTACT = {
  email: "javiermaldonadoreig@gmail.com",
  phone: "+34 655 286 930",
  pdf: "assets/Javier_Maldonado_Reig_CV.pdf",
};

const MAP_POS = {
  start: [390, 20],
  profile: [130, 110],
  experience: [390, 110],
  education: [670, 110],
  consulting: [30, 200],
  oxford: [250, 200],
  tressis: [390, 200],
  club: [530, 200],
  comillas: [670, 200],
  skills: [130, 290],
  teaching: [250, 290],
  ireland: [390, 290],
  redcross: [530, 290],
  penalba: [780, 290],
  lancaster: [670, 380],
  contact: [390, 400],
};

const STORY = {
  en: {
    start: {
      title: "Javier Maldonado Reig",
      meta: "Madrid · Valladolid · Lancaster",
      photo: true,
      body: `Business Administration and Management student at [[ICAI-ICADE->comillas]], Madrid. So far I've worked on [[investment analysis->tressis]], [[financial modelling->club]] and an [[ongoing research project with Oxford->oxford]].

Right now I'm looking for a **Summer 2027 internship in strategy consulting**.

This CV works like a story: every passage ends in a choice. Pick a thread.`,
      choices: [
        { to: "profile", label: "Start with who I am" },
        { to: "experience", label: "Go straight to the experience" },
        { to: "education", label: "See where I studied" },
        { to: "contact", label: "Skip to contact" },
      ],
    },

    profile: {
      title: "Profile",
      meta: "Penultimate year · Comillas",
      body: `Penultimate-year Business Administration and Management student at ICAI-ICADE (Universidad Pontificia Comillas, Madrid).

Hands-on experience in **investment analysis, financial modelling and market research**, gained at [[Tressis (Morabanc)->tressis]] and the [[Comillas Private Equity & Venture Capital Club->club]].`,
      choices: [
        { to: "consulting", label: "Why strategy consulting?" },
        { to: "skills", label: "Languages and tools" },
        { to: "experience", label: "Show me the experience" },
      ],
    },

    consulting: {
      title: "Why consulting",
      meta: "Summer 2027",
      body: `I'm looking for a Summer 2027 internship in strategy consulting, with a particular interest in **technology, AI and digital transformation** projects.

I come from the numbers side — financial statements, valuation, market research — and from [[research->oxford]] on how fast-growing ventures are led and organised.`,
      choices: [
        { to: "oxford", label: "Tell me about the research" },
        { to: "club", label: "The valuation work" },
        { to: "contact", label: "Let's talk" },
      ],
    },

    experience: {
      title: "Experience",
      meta: "Six stops, most recent first",
      body: `Finance, research, teaching and volunteering. Each one opens its own thread.`,
      choices: [
        { to: "oxford", label: "Research project — University of Oxford", note: "Present" },
        { to: "tressis", label: "Investment Analysis & Private Banking — Tressis", note: "2025" },
        { to: "club", label: "Deal analyst — Comillas PE & VC Club", note: "2024" },
        { to: "teaching", label: "Spanish teacher — Lancaster Royal Grammar School", note: "2024" },
        { to: "ireland", label: "English teacher — summer camp in Ireland", note: "2023" },
        { to: "redcross", label: "Volunteer — Red Cross", note: "2022–24" },
      ],
    },

    oxford: {
      title: "Ongoing research project",
      meta: "University of Oxford · Present",
      body: `**“Leadership in Private-Banking Start-ups”**, supervised by Dr Pegram Harrison, Senior Fellow in Entrepreneurship at Saïd Business School, University of Oxford.`,
      bullets: [
        "Entrepreneurial leadership",
        "Strategy and organisational behaviour",
        "Fast-growing financial-services ventures",
      ],
      choices: [
        { to: "tressis", label: "Private banking from the inside" },
        { to: "consulting", label: "How this connects to consulting" },
        { to: "experience", label: "Back to all experience" },
      ],
    },

    tressis: {
      title: "Investment Analysis & Private Banking",
      meta: "Tressis (Morabanc) · Jul–Aug 2025",
      body: `Summer internship.`,
      bullets: [
        "Financial statement analysis and market research to support investment decisions",
        "Portfolio monitoring and risk reporting",
        "Performance monitoring across multiple investment funds",
      ],
      choices: [
        { to: "club", label: "Where I learned valuation" },
        { to: "oxford", label: "Researching private-banking start-ups" },
        { to: "experience", label: "Back to all experience" },
      ],
    },

    club: {
      title: "Deal analyst",
      meta: "Comillas Private Equity & VC Club · 2024",
      body: `Transaction analysis as part of the university's PE & VC club.`,
      bullets: [
        "Financial modelling and valuation: DCF, comparable companies and precedent transactions",
        "FactSet for evaluating financial statements, industry trends, financing and transaction risks",
      ],
      choices: [
        { to: "tressis", label: "Putting it to work at Tressis" },
        { to: "comillas", label: "The university behind the club" },
        { to: "experience", label: "Back to all experience" },
      ],
    },

    teaching: {
      title: "Spanish teacher",
      meta: "Lancaster Royal Grammar School · Summer 2024",
      body: `Taught Spanish to students from beginner to advanced level, in a high-performance academic environment. Prepared and delivered lessons on grammar, vocabulary, pronunciation and conversation.

Five years earlier I had been a pupil at the same school. [[That chapter->lancaster]].`,
      choices: [
        { to: "ireland", label: "Another classroom: Ireland" },
        { to: "lancaster", label: "Back to 2019, as a student" },
        { to: "experience", label: "Back to all experience" },
      ],
    },

    ireland: {
      title: "English teacher",
      meta: "Summer camp, Ireland · 2023",
      body: `Taught English to Spanish students of various levels.`,
      bullets: [
        "Periodic assessments and individual feedback",
        "Developed empathy and patience",
      ],
      choices: [
        { to: "teaching", label: "Teaching Spanish in Lancaster" },
        { to: "redcross", label: "Volunteering at the Red Cross" },
        { to: "experience", label: "Back to all experience" },
      ],
    },

    redcross: {
      title: "Volunteer",
      meta: "Red Cross · 2022–2024",
      body: `A variety of responsibilities, from the logistics of children's toys to social interaction and physical work.`,
      bullets: [
        "Improved emotional intelligence and adaptability",
        "Worked with many different kinds of people",
      ],
      choices: [
        { to: "skills", label: "Languages and tools" },
        { to: "experience", label: "Back to all experience" },
        { to: "contact", label: "Get in touch" },
      ],
    },

    education: {
      title: "Education",
      meta: "Three schools, two countries",
      body: `From Valladolid to Lancaster to Madrid.`,
      choices: [
        { to: "comillas", label: "Universidad Pontificia Comillas (ICAI-ICADE)", note: "2024–" },
        { to: "lancaster", label: "Lancaster Royal Grammar School", note: "2019–20" },
        { to: "penalba", label: "Colegio de Fomento Peñalba", note: "A-Levels" },
      ],
    },

    comillas: {
      title: "ICAI-ICADE",
      meta: "Universidad Pontificia Comillas · 2024–Present",
      body: `**Business Administration and Management**, Madrid. Currently in my penultimate year.

Outside the classroom: [[the Private Equity & Venture Capital Club->club]].`,
      choices: [
        { to: "club", label: "The PE & VC Club" },
        { to: "penalba", label: "Before university" },
        { to: "education", label: "Back to education" },
      ],
    },

    penalba: {
      title: "Colegio de Fomento Peñalba",
      meta: "Valladolid, Spain",
      body: `Secondary school and A-Levels.

With a year in between spent in England.`,
      choices: [
        { to: "lancaster", label: "The year in England" },
        { to: "comillas", label: "Then, university" },
        { to: "education", label: "Back to education" },
      ],
    },

    lancaster: {
      title: "Lancaster Royal Grammar School",
      meta: "Lancaster, UK · 2019–2020",
      body: `Year 8. Part of the rugby team.

I came back in the summer of 2024 — this time [[to teach->teaching]].`,
      choices: [
        { to: "teaching", label: "Back in 2024, as a teacher" },
        { to: "penalba", label: "Home again: Valladolid" },
        { to: "education", label: "Back to education" },
      ],
    },

    skills: {
      title: "Languages & tools",
      meta: "Additional information",
      body: ``,
      bullets: [
        "English — accredited native level",
        "MS Excel, Word and PowerPoint",
        "FactSet",
        "UK pre-settled status holder",
      ],
      choices: [
        { to: "contact", label: "Get in touch" },
        { to: "experience", label: "Show me the experience" },
        { to: "start", label: "Start over" },
      ],
    },

    contact: {
      title: "Contact",
      meta: "The end — or the start of a conversation",
      contact: true,
      body: `If something here caught your attention, I'd be glad to talk.`,
      choices: [
        { to: "start", label: "Start the story again" },
        { to: "@map", label: "See the paths you didn't take" },
      ],
    },
  },

  es: {
    start: {
      title: "Javier Maldonado Reig",
      meta: "Madrid · Valladolid · Lancaster",
      photo: true,
      body: `Estudiante de Administración y Dirección de Empresas en [[ICAI-ICADE->comillas]], Madrid. He trabajado en [[análisis de inversiones->tressis]], [[modelización financiera->club]] y en un [[proyecto de investigación con Oxford->oxford]].

Ahora busco unas **prácticas de verano 2027 en consultoría estratégica**.

Este CV funciona como una historia: cada pasaje termina en una decisión. Elige un hilo.`,
      choices: [
        { to: "profile", label: "Empezar por quién soy" },
        { to: "experience", label: "Ir directo a la experiencia" },
        { to: "education", label: "Ver dónde he estudiado" },
        { to: "contact", label: "Saltar al contacto" },
      ],
    },

    profile: {
      title: "Perfil",
      meta: "Penúltimo curso · Comillas",
      body: `Estudiante de penúltimo curso de Administración y Dirección de Empresas en ICAI-ICADE (Universidad Pontificia Comillas, Madrid).

Experiencia práctica en **análisis de inversiones, modelización financiera e investigación de mercados**, adquirida en [[Tressis (Morabanc)->tressis]] y en el [[Club de Private Equity & Venture Capital de Comillas->club]].`,
      choices: [
        { to: "consulting", label: "¿Por qué consultoría estratégica?" },
        { to: "skills", label: "Idiomas y herramientas" },
        { to: "experience", label: "Ver la experiencia" },
      ],
    },

    consulting: {
      title: "Por qué consultoría",
      meta: "Verano 2027",
      body: `Busco unas prácticas de verano 2027 en consultoría estratégica, con especial interés en proyectos de **tecnología, IA y transformación digital**.

Vengo del lado de los números — estados financieros, valoración, investigación de mercados — y de la [[investigación->oxford]] sobre cómo se lideran y organizan las empresas de rápido crecimiento.`,
      choices: [
        { to: "oxford", label: "Háblame de la investigación" },
        { to: "club", label: "El trabajo de valoración" },
        { to: "contact", label: "Hablemos" },
      ],
    },

    experience: {
      title: "Experiencia",
      meta: "Seis paradas, de la más reciente a la más antigua",
      body: `Finanzas, investigación, docencia y voluntariado. Cada una abre su propio hilo.`,
      choices: [
        { to: "oxford", label: "Proyecto de investigación — Universidad de Oxford", note: "Actual" },
        { to: "tressis", label: "Análisis de Inversiones y Banca Privada — Tressis", note: "2025" },
        { to: "club", label: "Deal analyst — Club PE & VC de Comillas", note: "2024" },
        { to: "teaching", label: "Profesor de español — Lancaster Royal Grammar School", note: "2024" },
        { to: "ireland", label: "Profesor de inglés — campamento en Irlanda", note: "2023" },
        { to: "redcross", label: "Voluntario — Cruz Roja", note: "2022–24" },
      ],
    },

    oxford: {
      title: "Proyecto de investigación en curso",
      meta: "Universidad de Oxford · Actual",
      body: `**“Leadership in Private-Banking Start-ups”**, supervisado por el Dr Pegram Harrison, Senior Fellow in Entrepreneurship en la Saïd Business School de la Universidad de Oxford.`,
      bullets: [
        "Liderazgo emprendedor",
        "Estrategia y comportamiento organizativo",
        "Empresas de servicios financieros de rápido crecimiento",
      ],
      choices: [
        { to: "tressis", label: "La banca privada desde dentro" },
        { to: "consulting", label: "Cómo conecta con la consultoría" },
        { to: "experience", label: "Volver a la experiencia" },
      ],
    },

    tressis: {
      title: "Análisis de Inversiones y Banca Privada",
      meta: "Tressis (Morabanc) · jul–ago 2025",
      body: `Prácticas de verano.`,
      bullets: [
        "Análisis de estados financieros e investigación de mercados para apoyar decisiones de inversión",
        "Seguimiento de carteras e informes de riesgo",
        "Seguimiento de la rentabilidad de varios fondos de inversión",
      ],
      choices: [
        { to: "club", label: "Dónde aprendí a valorar" },
        { to: "oxford", label: "Investigando start-ups de banca privada" },
        { to: "experience", label: "Volver a la experiencia" },
      ],
    },

    club: {
      title: "Deal analyst",
      meta: "Club de Private Equity & VC de Comillas · 2024",
      body: `Análisis de operaciones dentro del club de PE & VC de la universidad.`,
      bullets: [
        "Modelización financiera y valoración: DCF, compañías comparables y transacciones precedentes",
        "FactSet para evaluar estados financieros, tendencias sectoriales, financiación y riesgos de las operaciones",
      ],
      choices: [
        { to: "tressis", label: "Ponerlo en práctica en Tressis" },
        { to: "comillas", label: "La universidad detrás del club" },
        { to: "experience", label: "Volver a la experiencia" },
      ],
    },

    teaching: {
      title: "Profesor de español",
      meta: "Lancaster Royal Grammar School · verano 2024",
      body: `Enseñé español a alumnos de nivel inicial a avanzado, en un entorno académico de alto rendimiento. Preparé e impartí clases de gramática, vocabulario, pronunciación y conversación.

Cinco años antes había sido alumno de ese mismo colegio. [[Ese capítulo->lancaster]].`,
      choices: [
        { to: "ireland", label: "Otra aula: Irlanda" },
        { to: "lancaster", label: "Volver a 2019, como alumno" },
        { to: "experience", label: "Volver a la experiencia" },
      ],
    },

    ireland: {
      title: "Profesor de inglés",
      meta: "Campamento de verano, Irlanda · 2023",
      body: `Enseñé inglés a estudiantes españoles de distintos niveles.`,
      bullets: [
        "Evaluaciones periódicas y feedback individualizado",
        "Desarrollo de empatía y paciencia",
      ],
      choices: [
        { to: "teaching", label: "Enseñando español en Lancaster" },
        { to: "redcross", label: "Voluntariado en Cruz Roja" },
        { to: "experience", label: "Volver a la experiencia" },
      ],
    },

    redcross: {
      title: "Voluntario",
      meta: "Cruz Roja · 2022–2024",
      body: `Tareas muy variadas: desde la logística de juguetes infantiles hasta la atención a personas y el trabajo físico.`,
      bullets: [
        "Mejora de la inteligencia emocional y la adaptabilidad",
        "Trato con perfiles de personas muy distintos",
      ],
      choices: [
        { to: "skills", label: "Idiomas y herramientas" },
        { to: "experience", label: "Volver a la experiencia" },
        { to: "contact", label: "Contactar" },
      ],
    },

    education: {
      title: "Formación",
      meta: "Tres centros, dos países",
      body: `De Valladolid a Lancaster y a Madrid.`,
      choices: [
        { to: "comillas", label: "Universidad Pontificia Comillas (ICAI-ICADE)", note: "2024–" },
        { to: "lancaster", label: "Lancaster Royal Grammar School", note: "2019–20" },
        { to: "penalba", label: "Colegio de Fomento Peñalba", note: "A-Levels" },
      ],
    },

    comillas: {
      title: "ICAI-ICADE",
      meta: "Universidad Pontificia Comillas · 2024–actualidad",
      body: `**Administración y Dirección de Empresas**, Madrid. Actualmente en penúltimo curso.

Fuera del aula: [[el Club de Private Equity & Venture Capital->club]].`,
      choices: [
        { to: "club", label: "El Club de PE & VC" },
        { to: "penalba", label: "Antes de la universidad" },
        { to: "education", label: "Volver a formación" },
      ],
    },

    penalba: {
      title: "Colegio de Fomento Peñalba",
      meta: "Valladolid, España",
      body: `Secundaria y A-Levels.

Con un año intermedio en Inglaterra.`,
      choices: [
        { to: "lancaster", label: "El año en Inglaterra" },
        { to: "comillas", label: "Después, la universidad" },
        { to: "education", label: "Volver a formación" },
      ],
    },

    lancaster: {
      title: "Lancaster Royal Grammar School",
      meta: "Lancaster, Reino Unido · 2019–2020",
      body: `Year 8. Miembro del equipo de rugby.

Volví en el verano de 2024 — esta vez [[para enseñar->teaching]].`,
      choices: [
        { to: "teaching", label: "De vuelta en 2024, como profesor" },
        { to: "penalba", label: "De nuevo en casa: Valladolid" },
        { to: "education", label: "Volver a formación" },
      ],
    },

    skills: {
      title: "Idiomas y herramientas",
      meta: "Información adicional",
      body: ``,
      bullets: [
        "Inglés — nivel nativo acreditado",
        "MS Excel, Word y PowerPoint",
        "FactSet",
        "Titular de UK pre-settled status",
      ],
      choices: [
        { to: "contact", label: "Contactar" },
        { to: "experience", label: "Ver la experiencia" },
        { to: "start", label: "Volver al inicio" },
      ],
    },

    contact: {
      title: "Contacto",
      meta: "El final — o el comienzo de una conversación",
      contact: true,
      body: `Si algo de lo que has leído te ha interesado, encantado de hablar.`,
      choices: [
        { to: "start", label: "Empezar la historia otra vez" },
        { to: "@map", label: "Ver los caminos que no tomaste" },
      ],
    },
  },
};

const UI = {
  en: {
    map: "Map", back: "Back", hint: "1–9 to choose · M for the map",
    mapTitle: "Story map", close: "Close", visited: "visited", here: "you are here",
    unvisited: "not yet", email: "Email", phone: "Phone", download: "Download PDF CV",
    copy: "Copy", copied: "Copied", photoAlt: "Photo of Javier Maldonado Reig",
  },
  es: {
    map: "Mapa", back: "Atrás", hint: "1–9 para elegir · M para el mapa",
    mapTitle: "Mapa de la historia", close: "Cerrar", visited: "visitado", here: "estás aquí",
    unvisited: "pendiente", email: "Email", phone: "Teléfono", download: "Descargar CV en PDF",
    copy: "Copiar", copied: "Copiado", photoAlt: "Foto de Javier Maldonado Reig",
  },
};
