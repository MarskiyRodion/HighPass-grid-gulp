(function () {

  ymaps.ready(init);
  function init(){
        // Создание карты.
    var myMap = new ymaps.Map("map", {
            // Координаты центра карты.
            // Порядок по умолчанию: «широта, долгота».
            // Чтобы не определять координаты центра карты вручную,
            // воспользуйтесь инструментом Определение координат.
      center: [55.765, 37.635],
      controls: [],
      loop: false,
      // Уровень масштабирования. Допустимые значения:
      // от 0 (весь мир) до 19.
      zoom: 14
    });
    myMap.behaviors.disable('scrollZoom');

    var myPlacemark = new ymaps.Placemark([55.77, 37.64], {}, {
      iconLayout: 'default#image',
      iconImageHref: 'img/map-marker.svg',
      iconImageSize: [12, 12],
      iconImageOffset: [10, 10]
    });

    myMap.geoObjects.add(myPlacemark);
  }


  function setBurger() {

    let btn = document.querySelector('.header__burger-btn');
    let menu = document.querySelector('.header__nav');
    let closeBtn = document.querySelector('.header__menu-close-btn');
    let link = document.querySelectorAll('.header__link');

    menu.addEventListener("animationend", function () {
      if(this.classList.contains('hidden')){
      this.classList.remove('open');
      this.classList.remove('hidden');
      }
    })

    btn.addEventListener("click", function(){
      menu.classList.add('open');
      document.body.style.overflow = 'hidden';

    })

    closeBtn.addEventListener("click", function(){
      menu.classList.add('hidden');
      document.body.removeAttribute('style');
    })

    link.forEach(function(e) {
      e.addEventListener("click", function() {
        menu.classList.add('hidden');
      document.body.removeAttribute('style');
      })
    })
  }

  setBurger();


  function setSearch() {
    let openBtn = document.querySelector('.header__search-btn');
    let searchWindow = document.querySelector('.header__search-window');
    let closeBtn = document.querySelector('.header__close-btn');

    searchWindow.addEventListener("animationend", function () {
      if(this.classList.contains('hidden')){
      this.classList.remove('open');
      this.classList.remove('hidden');
      }
    })

    openBtn.addEventListener("click", function() {
      searchWindow.classList.add('open');
    })

    closeBtn.addEventListener("click", function() {
      searchWindow.classList.add('hidden');
    })

  };

  setSearch();



  var close = document.querySelector(".contacts__close-btn");
  var open = document.querySelector(".contacts__open-btn");
  let address = document.querySelector('.contacts__address-block')

  var timeLine = gsap.timeline({ paused: true });

  timeLine.to(".contacts__name", { duration: 0.3, opacity: 0, ease: "power1.out"})
          .to(".contacts__address", { duration: 0.3, opacity: 0, ease: "power1.out"})
          .to(".contacts__tel", { duration: 0.3, opacity: 0, ease: "power1.out"})
          .to(".contacts__address-block", { duration: 0.3, ease: "power1.out", opacity: 0, onComplete: addClass})
          .fromTo(".contacts__open-btn", { opacity: 0, yPercent: 20 }, { duration: 0.3, opacity: 1, onReverseComplete: addNewClass});

  close.onclick = function () {
    timeLine.play();
    open.classList.remove('closed');
  }

  open.onclick = function () {
    timeLine.reverse();
    address.classList.remove('closed');
  }

  function addClass() {
    address.classList.add("closed");
  }

  function addNewClass() {
    open.classList.add("closed");
  }

  new window.JustValidate('.js-form');
  new JustValidate('.js-form', {
    rules: {
      email: {
        required: true,
        email: true
      },
    },
    colorWrong: '#FF3030',
    messages: {
      email: {
        email:'Неверный формат',
        required: 'Введите Ваш email'
      },
    }

  })

new window.JustValidate('.js-form1');
  new JustValidate('.js-form1', {
    rules: {
      email: {
        required: true,
        email: true
      },
      name: {
        required: true,
        minLength: 2,
        maxLength: 30,
      },
      text: {
        required: true,
        minLength: 2,
        maxLength: 300,
      }

    },
    colorWrong: '#FF3030',
    messages: {
      name: {
        required: 'Введите Ваше имя',
        minLength: 'Введите более двух символов',
        maxLength: 'Введите не более десяти символов',
      },
      email: {
        email:'Неверный формат',
        required: 'Введите Ваш email'
      },
      text: {
        required:  'Введите Ваше сообщение',
        minLength: 'Введите более двух символов',
        maxLength: 'Введите не более трехсот символов'

      }

    }

  });

  document.querySelectorAll('.js-scroll-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        const href = this.getAttribute('href').substring(1);
        const scrollTarget = document.getElementById(href);
        const elementPosition = scrollTarget.getBoundingClientRect().top;

        window.scrollBy({
            top: elementPosition,
            behavior: 'smooth'
        });
    });
  })


})()

