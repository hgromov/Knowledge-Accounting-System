$(()=>{
  const 
    contentReports = $('#reports'),
    rform = $('#test_range'),
    nform = $('#test_num');


    function adaptiveform() {
      if(isMobile()) {
        rform.css('display', 'none');
        nform.css('display', 'block');
        return nform
      } else {
        rform.css('display', 'block');
        nform.css('display', 'none');
        return rform
      }
    }

    function removeForm() {
      isMobile() ? nform.css('display', 'none') : rform.css('display', 'none');
      $('.finView').css('display', 'block');
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
          localStorage.setItem(`report${checkUser().login}`, JSON.stringify(report));
          removeForm();
        }
      })
    }

    if(isUserHasReport) {
      removeForm()
    }

    // pass again (show form and hide massage)
    $('#pass').click(()=>{
      adaptiveform();
      $('.finView').css('display', 'none');
    })
    
    // admin permissions
    if(sessionStorage.getItem('activeSession') == 1) {
      const reportsTable = $('table tbody');
      $('#test_range').css('display', 'none');
      $('#test_num').css('display', 'none');
      contentReports.css('display', 'block');
      $('label[for=profilePage]').text('Reports');

      // search for reports
      const reports = [];
      for (let item in localStorage) {
        if(reportsQuery.test(item)) {
          let parsedItem = JSON.parse(localStorage[item]);
          parsedItem.username = item.slice(6);
          reports.push(parsedItem)
        }
      }

      if(reports.length == 0) {
        contentReports.html('Not yet any reports.');
      }

      reports.forEach((elem) => {
        reportsTable.append(
            `<tr>
                <td>${elem.username}</td>
                <td>${elem.lay}</td>
                <td>${elem.js}</td>
                <td>${elem.php}</td>
                <td>${elem.sharp}</td>
                <td>${elem.java}</td>
            </tr>`
        )
      })
      
      // pagination
      
      reportsTable.after('<div id="nav"></div>');
      var rowsShown = 10;
      var rowsTotal = $('table tbody tr').length;
      var numPages = rowsTotal/rowsShown;
      for(i = 0;i < numPages;i++) {
          var pageNum = i + 1;
          $('#nav').append('<a href="#" rel="'+i+'">'+pageNum+'</a> ');
      }
      $('table tbody tr').hide();
      $('table tbody tr').slice(0, rowsShown).show();
      $('#nav a:first').addClass('active');
      $('#nav a').bind('click', function(){
  
          $('#nav a').removeClass('active');
          $(this).addClass('active');
          var currPage = $(this).attr('rel');
          var startItem = currPage * rowsShown;
          var endItem = startItem + rowsShown;
          $('table tbody tr').css('opacity','0.0').hide().slice(startItem, endItem).
          css('display','table-row').animate({opacity:1}, 300);
      });
    }
})