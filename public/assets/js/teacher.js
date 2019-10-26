
// shows and hides filtered items
$('.filter-simple-button').click(function () {
  const value = $(this).attr('data-filter');
  if (value === 'all') {
    $('.filter-simple-item').show('1000');
  } else {
    $('.filter-simple-item').not('.' + value).hide('3000');
    $('.filter-simple-item').filter('.' + value).show('3000');
  }
});

// changes active class on filter buttons
$('.filter-simple-button').click(function () {
  $(this).siblings().removeClass('is-active');
  $(this).addClass('is-active');
});

$('#teacher-tabs').foundation();
$('#class-roster').foundation();

$('#myClass').hide();
$('#teacher-profile').hide();
$('#teacher-info-updated').hide();

$('#teacherProfile').on('click', function () {
  $('#teacher-profile').show();
  $('#myClass').hide();
  $('#teacher-dashboard').hide();
});

$('#teacherMail').on('click', function () {
  $('#teacher-dashboard').show();
  $('.notAvailable').show();
  setTimeout(function () {
    $('.notAvailable').fadeOut('slow');
  }, 2000);
});

$('.teach').on('click', function () {
    $('#teacher-info-updated').show();
    setTimeout(function () {
        $('#teacher-info-updated').fadeOut('slow');
    }, 2000);
  });

$('#classRoster').on('click', function () {
  $('#myClass').show();
  $('#teacher-profile').hide();
  $('#teacher-dashboard').hide();
});

$('#dashboard').on('click', function () {
  $('#teacher-dashboard').show();
  $('#myClass').hide();
  $('#teacher-profile').hide();
});

/* On click events to prevent duplicate data for add_teacher data table tabs*/

$('#teacher-2').on('click', function (){
    $('#teacher1').removeClass('is-active'); 
    // console.log('is-active class removed successfully');
  })

  $('#new-teacher-main').on('click', function (){
    $('#teacher1').removeClass('is-active'); 
  })
