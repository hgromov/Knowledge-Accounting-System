$(()=>{
  const 
    contentReports = $('#reports'),
    rform = $('#test_range'),
    nform = $('#test_num');
  let user = checkUser(),
      currentReport = 
        `<table>
            <thead>
              <tr>
                <td>Layout making</td>
                <td>JavaScript</td>
                <td>php</td>
                <td>C#</td>
                <td>Java</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${userReport.lay}</td>
                <td>${userReport.js}</td>
                <td>${userReport.php}</td>
                <td>${userReport.sharp}</td>
                <td>${userReport.java}</td>
              </tr>
            </tbody>
        </table>
        `;

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

    if (user.login !== undefined) {
      adaptiveform().on('submit', e=>{
        e.preventDefault();
        const
        lay = e.target[0].value,
        js = e.target[1].value,
        php = e.target[2].value,
        sharp = e.target[3].value,
        java = e.target[4].value,
        date = Number(new Date);
        
        const report = {
          'lay': lay,
          'js': js,
          'php': php,
          'sharp': sharp,
          'java': java,
          'date': date
        }
        localStorage.setItem(`report${checkUser().login}`, JSON.stringify(report));
        $('.finView #pick').replaceWith(currentReport);
        removeForm();
        window.location.hash = 'reload';
        location.reload();
      })
    }
    
    if(window.location.hash == "#reload"){
      $('#profilePage').prop('checked', true)
    }

    if(isUserHasReport) {
      $('.finView #pick').empty().append(currentReport);
      removeForm();
    }

    // pass again (show form and hide massage)
    $('#pass').click(()=>{
      adaptiveform();
      $('.finView').css('display', 'none');
    })
    
    // admin panel
    if(sessionStorage.getItem('activeSession') == 1) {
      const reportsTable = $('table tbody');
      $('#test_range').css('display', 'none');
      $('#test_num').css('display', 'none');
      contentReports.css('display', 'block');
      $('label[for=profilePage]').text('Reports');

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
      const rowsShown = 10;
      let rowsTotal = $('table tbody tr').length;
      let totalPagesAmount = Math.ceil(rowsTotal / rowsShown);

      for(i = 0;i < totalPagesAmount;i++) {
        var pageNum = i + 1;
        $('#nav').append('<a href="#" rel="'+i+'">'+pageNum+'</a> ');
      }
      $('table tbody tr').hide();
      $('table tbody tr').slice(0, rowsShown).show();
      $('#nav a:first').addClass('active');

      $('#nav a').click(function(){
        $('#nav a').removeClass('active');
        $(this).addClass('active');
        let currPage = $(this).attr('rel');
        let startItem = currPage * rowsShown;
        let endItem = startItem + rowsShown;
        $('table tbody tr').css('opacity','0.0').hide().slice(startItem, endItem).
        css('display','table-row').animate({opacity:1}, 300);
      });
    }
})