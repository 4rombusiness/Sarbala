//Get the button:
mybutton = document.getElementById("scrollUp");

function scrollFunction() {
  if (
    document.body.scrollTop > sticky ||
    document.documentElement.scrollTop > sticky
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// Functional Sticky Navbar
window.onscroll = function () {
  myFunction();
  scrollFunction();
};

var navbar = document.querySelector("nav");
var services = document.querySelector("#features");
var sticky = services.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

$(document).ready(function () {
  // Preloader
  document.querySelector(".preloader").classList.add("opacity-0");
  setTimeout(function () {
    document.querySelector(".preloader").style.display = "none";
  }, 1000);

  //   Nice Select Initialization
  // $("select").niceSelect();
});

// Navbar Open Function on Mobile Menu
function openNav() {
  $("#myNav").css("width", "100%");
}

// Navbar Close Function on Mobile Menu
function closeNav() {
  $("#myNav").css("width", "0");
}

function changelangfrombutt(){
  var x = document.getElementsByClassName("lang-en")[0];
  if (x.style.display === "none") {
    changeLanguage('en');
  } else {
    changeLanguage('fa');
  }
}
function changeLanguage(languageCode) {
  Array.from(document.getElementsByClassName('lang')).forEach(function (elem) {
      if (elem.classList.contains('lang-' + languageCode)) {
           elem.style.display  = 'inherit';
      }
      else {
           elem.style.display = 'none';
      }
  });
}

// select handler
const selector = document.getElementById('langSelector');
selector.addEventListener('change', function (evt) {
  changeLanguage(this.value);
});

// detect initial browser language
const lang = navigator.userLanguage || navigator.language || 'fa-FA';
const startLang = 'fa';//Array.from(selector.options).map(opt => opt.value).find(val => lang.includes(val)) || 'fa';
changeLanguage(startLang);

// updating select with start value
// selector.selectedIndex = Array.from(selector.options).map(opt => opt.value).indexOf(startLang)

// fill "The selected language is:"
// document.getElementById('browserLang').innerText = lang;
// document.getElementById('startLang').innerText = startLang;