const translations = {
  en: {
    eyebrow: "TOP-DOWN GUN SURVIVAL",
    title: "Get armed.<br>Get surrounded.<br>Get cooked.",
    intro: "Grab ridiculous guns, mow down ridiculous enemies, and see how long this cooked little lad can survive.",
    coming: "Coming soon",
    privacy: "Privacy Policy →",
    privacyFooter: "Privacy"
  },
  es: {
    eyebrow: "SUPERVIVENCIA CON ARMAS DESDE ARRIBA",
    title: "Ármate.<br>Rodéate de caos.<br>Acaba cocinado.",
    intro: "Consigue armas absurdas, elimina enemigos aún más absurdos y descubre cuánto puede sobrevivir este pobre lad cocinado.",
    coming: "Próximamente",
    privacy: "Política de privacidad →",
    privacyFooter: "Privacidad"
  }
};

let lang = localStorage.getItem("cookedLadLanguage") || "en";

function applyLanguage() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (translations[lang][key]) el.innerHTML = translations[lang][key];
  });
  document.getElementById("langButton").textContent = lang.toUpperCase();
}

document.getElementById("langButton").addEventListener("click", () => {
  lang = lang === "en" ? "es" : "en";
  localStorage.setItem("cookedLadLanguage", lang);
  applyLanguage();
});

applyLanguage();
