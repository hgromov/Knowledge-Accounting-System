$(()=>{
  const 
    rform = $('#test_range'),
    nform = $('#test_num');

    function adaptiveform() {
      if(isMobile() == true) {
        rform.css('display', 'none');
        nform.css('display', 'block');
        return nform
      } else {
        rform.css('display', 'block');
        nform.css('display', 'none');
        return rform
      }
    }

    if (sessionStorage.length != 0) {
      adaptiveform().on('submit', e=>{
        e.preventDefault();
        const
        lay = e.target[0].value,
        js = e.target[1].value,
        php = e.target[2].value,
        sharp = e.target[3].value,
        java = e.target[4].value;
    
        if(checkUser() != undefined) {
          const report = {
            'lay': lay,
            'js': js,
            'php': php,
            'sharp': sharp,
            'java': java
          }
          localStorage.setItem(`report${user.login}`, JSON.stringify(report))
        }
      })
    }

    // admin permissions
    if(sessionStorage.getItem('activeSession') == 1) {
      const contentReports = $('#reports');
      $('#test_range').css('display', 'none');
      $('#test_num').css('display', 'none');
      contentReports.css('display', 'block');
      $('label[for=profilePage]').text('Reports');

      //search for reports
      const 
        reports = [],
        reportsQuery = new RegExp('^report');
      for (let item in localStorage) {
        if(reportsQuery.test(item)) {
          let parsedItem = JSON.parse(localStorage[item]);
          parsedItem.username = item.slice(6);
          reports.push(parsedItem)
        }
      }

      let totalPagesAmount = Math.ceil(reports.length / 10);

      // todo pagination and sorts

      reports.forEach((elem) => {
        contentReports.append(
            `<div>username: ${elem.username} -- layout(html, css): ${elem.lay}, js: ${elem.js}, php: ${elem.php}, c#: ${elem.sharp}, java: ${elem.java}</div>`
        )
      })
      
    }
})