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
    mapa = $('#map'),
    userId = sessionStorage.getItem('activeSession'),
    inp = document.querySelectorAll('input[placeholder="login"]')[0],
    inp1 = document.querySelectorAll('input[placeholder="login"]')[1],
    homeCheckbox = $('#homePage'),
    profileCheckbox = $('#profilePage'),
    galleryCheckbox = $('#galleryPage'),
    contactsCheckbox = $('#contactsPage'),
    labelForHome = $('label[for=homePage]'),
    labelForProfile = $('label[for=profilePage]'),
    labelForGallery = $('label[for=galleryPage]'),
    labelForContacts = $('label[for=contactsPage]'),
    labelsCollection = [labelForHome,labelForProfile,labelForGallery,labelForContacts];

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
      mapa.css({
        'width': '80vw',
        'left': '20vw'
      })
      header.animate({
        'width': '80vw',
        'left': '20vw'
      }, 300)
      slickSlider.animate({
        'width': '80vw',
        'left': '20vw'
      }, 300)
      slickSlider.slick('refresh');
      services.css({
        'width': '80vw',
        'left': '20vw'
      })
      gallery.css({
        'width': '80vw',
        'left': '20vw'
      })
      contacts.css({
        'width': '80vw',
        'left': '20vw'
      })
      profile.css({
        'width': '80vw',
        'left': '20vw'
      })
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
      slickSlider.css({
        'width': '100vw',
        'left': '0'
      })
      mapa.css({
        'width': '100vw',
        'left': '0'
      })
      services.css({
        'width': '100vw',
        'left': '0'
      })
      gallery.css({
        'width': '100vw',
        'left': '0'
      })
      contacts.css({
        'width': '100vw',
        'left': '0'
      })
      profile.css({
        'width': '100vw',
        'left': '0'
      })
      navUl.css('display', 'none');
      nav.attr('state','hiden');
      slickSlider.slick('refresh');
    }
  })

  // label checked mark
  homeCheckbox.click(()=>{
    labelsCollection.forEach((el)=>{
      el.css({
        'color': '#eee',
        'background': 'inherit',
        'fontWeight': 'normal',
      })
    })
    labelForHome.css({
      'color': '#222',
      'background': '#ccc',
      'fontWeight': 'bold',
    })
  })
  profileCheckbox.click(()=>{
    labelsCollection.forEach((el)=>{
      el.css({
        'color': '#eee',
        'background': 'inherit',
        'fontWeight': 'normal',
      })
    })
    labelForProfile.css({
      'color': '#222',
      'background': '#ccc',
      'fontWeight': 'bold',
    })
  })
  galleryCheckbox.click(()=>{
    labelsCollection.forEach((el)=>{
      el.css({
        'color': '#eee',
        'background': 'inherit',
        'fontWeight': 'normal',
      })
    })
    labelForGallery.css({
      'color': '#222',
      'background': '#ccc',
      'fontWeight': 'bold',
    })
  })
  contactsCheckbox.click(()=>{
    labelsCollection.forEach((el)=>{
      el.css({
        'color': '#eee',
        'background': 'inherit',
        'fontWeight': 'normal',
      })
    })
    labelForContacts.css({
      'color': '#222',
      'background': '#ccc',
      'fontWeight': 'bold',
    })
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
    inp.focus();
  })
  closemodal.click(()=>{
    popup.hide(300);
    allButPopup.css('filter', 'none');
  })

  trigger.click(()=>{
    card.toggleClass('flipped');
    inp1.focus();
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
  mapa.css('display', 'none');

  Share = {
    facebook: function() {
      url  = 'http://www.facebook.com/sharer.php?s=100';
      url += '&p[title]='     + encodeURIComponent(stringReportLayout());
      Share.popup(url);
    },
    twitter: function() {
      url  = 'http://twitter.com/share?';
      url += 'text='      + encodeURIComponent(stringReportLayout());
      Share.popup(url);
    },
    mailru: function() {
      url  = 'http://connect.mail.ru/share?';
      url += '&description=' + encodeURIComponent(stringReportLayout());
      Share.popup(url)
    },
    vkontakte: function() {
      url  = 'http://vkontakte.ru/share.php?';
      url += '&description=' + encodeURIComponent(stringReportLayout());
      url += '&noparse=true';
      Share.popup(url);
    },
    odnoklassniki: function() {
      url  = 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1';
      url += '&st.comments=' + encodeURIComponent(stringReportLayout());
      Share.popup(url);
    },
    popup: function(url) {
      window.open(url,'','toolbar=0,status=0,width=626,height=436');
    }
  };

  // костыли
  document.addEventListener('click',(e)=>{
    if($('input#contactsPage:checked').length == 1) {
      mapa.css('height', '65vh');
      mapa.css('display', 'block');
    } else {
      mapa.css('display', 'none');
    }
    if(window.location.hash == "#reload") {
      window.location.hash = '';
    }
    if (e.target.className == 'hop') {
      slickSlider.slick('refresh');
    }
  })

})