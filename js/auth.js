$(()=>{
  const
    regForm = $('#registerForm'),
    loginForm = $('#loginForm'),
    logoutbtn = $('#logout'),
    modalbtn = $('#modal'),
    greetWarn = $('#greetWarn');

  // user count
  if (!localStorage.length) {
    let counter = localStorage.setItem('counter', 1);
  }
  
  /* 
    change of view depending on whether there is an active session 
    (if user is logged, else sessionStorage is empty) 
   */
  if (sessionStorage.length != 0) {
    modalbtn.css('display', 'none');
    logoutbtn.css('display', 'block');
    $('#warnlogin').css('display', 'none');
    greetWarn.append(checkUser().login + '!');
  } else {
    greetWarn.css('display', 'none');
    $('#test_range').css('display', 'none');
    $('#test_num').css('display', 'none');
  }

  // create admin
  const admin = JSON.stringify({'login': 'admin', 'pwd': '123', 'id': 1});
  localStorage.setItem('user', admin);
  
  // регистрация
    regForm.on('submit', function(e){
      e.preventDefault();
      const 
        date = new Date,
        login = e.target[0].value,
        pwd = e.target[1].value,
        id = date.toString(),
        user = {login, pwd, id},
        serialUser = JSON.stringify(user),
        errors = 0;
        
      for(item in localStorage) {
        if(userRegExp.test(item)) {
          let parsedItem = JSON.parse(localStorage[item]);
          if (parsedItem.login == login) {
            ++errors
            alert('user already exists')
          }
        }
      }

      if(errors == 0) {
        let count = localStorage.getItem('counter')
        localStorage.setItem('user'+count, serialUser);
        localStorage.setItem('counter', ++count);
        $('.sign-in').toggleClass('flipped');
        e.target[0].value = ''; e.target[1].value = '';
      }

    })
  // авторизация
    loginForm.on('submit', function(e){
      e.preventDefault();
      let 
        login = e.target[0].value,
        pwd = e.target[1].value;
    
      for(item in localStorage) {
        if(userRegExp.test(item)) {
          let parsedItem = JSON.parse(localStorage[item]);
          if (parsedItem.login == login && parsedItem.pwd == pwd) {
            console.log('authorized');
            $('.popup').hide(300);
            $('main').css('filter', 'none');
            sessionStorage.setItem('activeSession', parsedItem.id);
            e.target[0].value = ''; e.target[1].value = '';
            location.reload();
          } else if (item.slice(4) == 1 && userRegExp.test(item) == false) {
            alert('something went wrong');
          }
        }
      }

    })

    logoutbtn.click((e)=>{
      sessionStorage.clear();
      location.reload();
    })
})