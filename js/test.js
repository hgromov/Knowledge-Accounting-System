$(()=>{
  const 
    contentReports = $('#reports'),
    rform = $('#test_range'),
    nform = $('#test_num');
  let user = checkUser();

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
        lay = e.target[0],
        js = e.target[1],
        php = e.target[2],
        sharp = e.target[3],
        java = e.target[4],
        date = Number(new Date),
        inputs = [lay,js,php,sharp,java];

        // validation
        let checkErr = inputs.length;
        inputs.forEach((elem)=>{
          if(elem.value != '' && /^([0-9]|10)$/.test(elem.value)) {
            elem.style.border = '1px solid #90ee90';
            elem.style.background = '#fff'
            --checkErr;
          } else {
            elem.style.border = '1px solid red';
            elem.style.background = '#ffcccb'
          }
        })
        
        if(checkErr == 0) {
          const report = {
            'lay': lay.value,
            'js': js.value,
            'php': php.value,
            'sharp': sharp.value,
            'java': java.value,
            'date': date
          }
          localStorage.setItem(`report${checkUser().login}`, JSON.stringify(report));
          $('.finView #pick').replaceWith(reportLayout());
          removeForm();
          window.location.hash = 'reload';
          location.reload();
        }
        
      })
    }
    
    if(window.location.hash == "#reload"){
      $('#profilePage').prop('checked', true)
    }

    if(Object.keys(currentReport()).length !== 0) {
      $('.finView #pick').replaceWith(reportLayout());
      removeForm();
    }

    if(userId == undefined || userId == 1) {
      $('.finView').css('display', 'none');
    }

    // pass again (show form and hide massage)
    $('#pass').click(()=>{
      adaptiveform();
      $('.finView').css('display', 'none');
    })
    
    // admin panel
    if(userId == 1) {
      const reportsTable = $('#reports table tbody'),
      usernameTd = document.querySelector('#reports table thead tr td'),
      thRow = document.querySelector('#reports table thead tr'),
      usernameSpan = document.querySelector('#reports table thead tr td span'),
      uSearch = document.getElementById('uSearch'),
      magnifier = usernameTd.querySelector('.fa-search'),
      clsBtn = usernameTd.querySelector('.fa-times');
      $('#test_range').css('display', 'none');
      $('#test_num').css('display', 'none');
      contentReports.css('display', 'block');
      $('label[for=profilePage]').text('Reports');

      const allReps = allReports();

      if(allReps.length == 0) {
        contentReports.html('Not yet any reports.');
      }

      usernameTd.addEventListener('click',(e)=>{
        if (uSearch.style.display == 'none' || e.target == magnifier) {
          uSearch.style.display = 'inline-block';
          magnifier.style.display = 'none';
          clsBtn.style.display = 'inline'
          usernameSpan.style.display = 'none';
        } else if (e.target != uSearch || e.target == clsBtn) {
          clsBtn.style.display = 'none';
          uSearch.style.display = 'none';
          magnifier.style.display = 'inline';
          uSearch.value = '';
          usernameSpan.style.display = 'inline-block';
          pagination()
        }
      }, false)

      // sorts
      uSearch.addEventListener('keyup', filterNames);

      function filterNames() {
        let table = document.querySelector('#reports table tbody');
        let tr = table.querySelectorAll('tr');
        let fliterValue = uSearch.value.toUpperCase();
  
          for(let i = 0; i < tr.length; i++) {
            let td = tr[i].getElementsByTagName('td')[0];
            if(td.innerText.toUpperCase().indexOf(fliterValue) > -1) {
              tr[i].style.display = '';
            } else {
              tr[i].style.display = 'none';
            }
          }
      }

      function compare(arg, msign) {
        return  function(a, b) {
          let param = arg,
          sign = msign;
          if(sign == 'tosmall') {
            return b[param] - a[param];
          } else if(sign == 'tobig') {
            return a[param] - b[param];
          }
        }
      }

      thRow.addEventListener('click', sortValues)
      function sortValues(e) {
        let tagr = e.target.dataset.cat;
        const targs = ['lay','js','php','sharp','java'];
        targs.forEach((elem)=>{
          let arrow = document.querySelectorAll(`#reports table thead tr td[data-cat=${elem}] i`);
          if(arrow.length > 1) {
            arrow[0].className ='fas fa-sort-up';
            arrow[0].style.transform = 'rotate(90deg)';
            arrow[1].style.transform = 'rotate(90deg)';
            arrow[1].className ='fas fa-sort-up';
          } else {
            arrow[0].className ='fas fa-sort-up';
            arrow[0].style.transform = 'rotate(90deg)'
          }
        })

        if(tagr == 'lay') {
          layI = document.querySelectorAll('#reports table thead tr td[data-cat=lay] i');
          if(layI[0].className == 'fas fa-sort-up' || layI[0].className == 'fas fa-sort-up arrowUp') {
            allReps.sort(compare('lay', 'tosmall'));
            layI[0].className = 'fas fa-sort-up arrowDown';
            layI[1].className = 'fas fa-sort-up arrowDown';
            tableRender()
            console.log(layI[0].className)
          } else if (layI[0].className == 'fas fa-sort-up arrowDown') {
            allReps.sort(compare('lay', 'tobig'));
            layI[0].className = 'fas fa-sort-up arrowUp';
            layI[1].className = 'fas fa-sort-up arrowUp';
            tableRender()
          }
        }
        if(tagr == 'js') {
          jsI = document.querySelectorAll('#reports table thead tr td[data-cat=js] i');
          if(jsI[0].className == 'fas fa-sort-up' || jsI[0].className == 'fas fa-sort-up arrowUp') {
            allReps.sort(compare('js', 'tosmall'));
            jsI[0].className = 'fas fa-sort-up arrowDown';
            jsI[1].className = 'fas fa-sort-up arrowDown';
            tableRender()
          } else if (jsI[0].className == 'fas fa-sort-up arrowDown') {
            allReps.sort(compare('js', 'tobig'));
            jsI[0].className = 'fas fa-sort-up arrowUp';
            jsI[1].className = 'fas fa-sort-up arrowUp';
            tableRender()
          }
        }
        if(tagr == 'php') {
          phpI = document.querySelectorAll('#reports table thead tr td[data-cat=php] i');
          if(phpI[0].className == 'fas fa-sort-up' || phpI[0].className == 'fas fa-sort-up arrowUp') {
            allReps.sort(compare('php', 'tosmall'));
            phpI[0].className = 'fas fa-sort-up arrowDown';
            tableRender()
          } else if (phpI[0].className == 'fas fa-sort-up arrowDown') {
            allReps.sort(compare('php', 'tobig'));
            phpI[0].className = 'fas fa-sort-up arrowUp';
            tableRender()
          }
        }
        if(tagr == 'sharp') {
          sharpI = document.querySelectorAll('#reports table thead tr td[data-cat=sharp] i');
          if(sharpI[0].className == 'fas fa-sort-up' || sharpI[0].className == 'fas fa-sort-up arrowUp') {
            allReps.sort(compare('sharp', 'tosmall'));
            sharpI[0].className = 'fas fa-sort-up arrowDown';
            tableRender()
          } else if (sharpI[0].className == 'fas fa-sort-up arrowDown') {
            allReps.sort(compare('sharp', 'tobig'));
            sharpI[0].className = 'fas fa-sort-up arrowUp';
            tableRender()
          }
        }
        if(tagr == 'java') {
          javaI = document.querySelectorAll('#reports table thead tr td[data-cat=java] i');
          if(javaI[0].className == 'fas fa-sort-up' || javaI[0].className == 'fas fa-sort-up arrowUp') {
            allReps.sort(compare('java', 'tosmall'));
            javaI[0].className = 'fas fa-sort-up arrowDown';
            tableRender()
          } else if (javaI[0].className == 'fas fa-sort-up arrowDown') {
            allReps.sort(compare('java', 'tobig'));
            javaI[0].className = 'fas fa-sort-up arrowUp';
            tableRender()
          }
        }
      }

      function tableRender() {
        reportsTable.empty();
        allReps.forEach((elem) => {
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
        pagination()
      }
      tableRender()
      
      // pagination
      function pagination() {
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
    }
})