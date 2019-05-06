$(()=>{
  const 
    barbtn = $('#barbtn'),
    header = $('header'),
    nav = $('nav'),
    fireFont = $('#fireFont'),
    navUl = $('nav ul'),
    slickSlider = $('.slick-slider'),
    trigger = $('.trigger'),
    closemodal = $('.sign-in i'),
    modal = $('#modal'),
    popup = $('.popup'),
    allButPopup = $('main'),
    card = $('.sign-in'),
    services = $('.services'),
    bigPic = document.querySelector('.bigPic'),
    lilPics = document.querySelectorAll('.gallery-item'),
    gallery = $('#gallery'),
    contacts = $('#contacts'),
    profile = $('#profile'),
    test = $('#test'),
    userId = sessionStorage.getItem('activeSession');

  // боковое меню
  nav.attr('state','hiden');
  barbtn.click(()=>{
    barbtn.toggleClass('open');
    if(nav.attr('state') == 'hiden') {
      nav.animate({
        'width': '20vw'
      }, 300)
      fireFont.css('display', 'block');
      navUl.css('display', 'block');
      $('#map').animate({
        'width': '80vw',
        'left': '20vw'
      }, 300)
      header.animate({
        'width': '80vw',
        'left': '20vw'
      }, 300)
      slickSlider.animate({
        'width': '80vw',
        'left': '20vw'
      }, 300)
      slickSlider.slick('refresh');
      services.animate({
        'width': '80vw',
        'left': '20vw'
      }, 300)
      gallery.animate({
        'width': '80vw',
        'left': '20vw'
      }, 300)
      contacts.animate({
        'width': '80vw',
        'left': '20vw'
      }, 300)
      profile.animate({
        'width': '80vw',
        'left': '20vw'
      }, 300)
      nav.attr('state','shown');
    } else {
      nav.animate({
        'width': '0'
      }, 300)
      header.animate({
        'width': '100vw',
        'left': '0'
      }, 300)
      fireFont.css('display', 'none');
      slickSlider.animate({
        'width': '100vw',
        'left': '0'
      }, 300)
      $('#map').animate({
        'width': '100vw',
        'left': '0'
      }, 300)
      services.animate({
        'width': '100vw',
        'left': '0'
      }, 300)
      gallery.animate({
        'width': '100vw',
        'left': '0'
      }, 300)
      contacts.animate({
        'width': '100vw',
        'left': '0'
      }, 300)
      profile.animate({
        'width': '100vw',
        'left': '0'
      }, 300)
      navUl.css('display', 'none');
      nav.attr('state','hiden');
      slickSlider.slick('refresh');
    }
  })
  
  // слайдер
  slickSlider.slick({
    dots: true
  });

  // модальное переворачивающееся окно регистрации и входа
  modal.click(()=>{
    popup.fadeToggle();
    popup.css('display','flex');
    allButPopup.css('filter', 'blur(2px)');
  })
  closemodal.click(()=>{
    popup.hide(300);
    allButPopup.css('filter', 'none');
  })

  trigger.click(()=>{
    card.toggleClass('flipped');
  })

  // фото-галерея
  lilPics.forEach((pic)=>{
    pic.addEventListener('mouseover', (e)=>{
      let selected = pic.src;      
      bigPic.style.background = `url(${selected})`;
      lilPics.forEach((pict) => {
        pict.classList.remove('active');
      })
      pic.classList.add('active')
    })
  })
  
  if(userId == null) {
    test.css('display', 'none')
  }

  //map api
  const map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    target: document.getElementById('map'),
    view: new ol.View({
      center: [0, 0],
      zoom: 2
    })
  });
  $('#map').css('display', 'none');

  // костыли
  document.addEventListener('click',()=>{
    if($('input#contactsPage:checked').length == 1) {
      $('#map').css('height', '65vh');
      $('#map').css('display', 'block');
    } else {
      $('#map').css('display', 'none');
    }
    if(window.location.hash == "#reload") {
      window.location.hash = '';
    }
  })

})

