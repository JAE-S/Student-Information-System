/* eslint-disable no-var */
/* eslint-disable prefer-const */

// This function will be used later to randomly select an image for new student additions
function addImage () {
  var imageSelection = [
    'abby.jpeg',
    'big_bird.png',
    'cookie_monster.png',
    'count.jpeg',
    'daniel_tiger.jpeg',
    'eeyore.png',
    'elaina.jpeg',
    'elmo.png',
    'grover.png',
    'kitty.jpeg',
    'owl.jpeg',
    'owl2.jpeg',
    'piglet.jpeg',
    'prince.jpeg',
    'sesame_street_2.jpeg',
    'sesame_street_3.jpeg',
    'sesame_street_4.png',
    'sesame_street_5.jpeg',
    'tigger.jpeg',
    'winnie.jpeg'
  ];

  var randomSelection = Math.floor(Math.random() * imageSelection.length);
  var newImageLink = imageSelection[randomSelection];

  return newImageLink;
}

$('#add-user').on('click', function (event) {
  event.preventDefault();

  const newAccount = {
    firstName: $('#inputFirst').val().trim(),
    lastName: $('#inputLast').val().trim(),
    parentTeacher: window.parentOrTeacher,
    email: $('#inputEmail').val().trim(),
    password: $('#inputPassword').val().trim()
  };
  console.log(newAccount);

  if (newAccount.password.length > 0 && newAccount.email.length > 0 && newAccount.password.length > 0 && newAccount.lastName.length > 0 && newAccount.firstName.length > 0) {
    $.ajax({
      type: 'POST',
      url: '/api/register',
      data: newAccount
    }).then(() => {
      if (window.parentOrTeacher === 'parent') {
        window.location.href = '/parent';
      } else if (window.parentOrTeacher === 'teacher') {
        window.location.href = '/teacher';
      } else {
        alert('Please enter either parent or teacher!');
      }
    });
  } else {
    console.log('**Please fill out entire form**');
    $('#create-err-msg').empty('').text('**Please fill out entire form**');
  }
});

$('#update-user').on('click', function (event) {
  event.preventDefault();

  const id = $(this).data('id');

  // capture All changes
  const changeUser = {
    firstName: $('#inputFirst').val().trim(),
    lastName: $('#inputLast').val().trim(),
    email: $('#inputEmail').val().trim(),
    password: $('#inputPassword').val().trim()
  };
  $('#err-msg').empty('');
  // $('#change-user-modal').modal('show');
  console.log(changeUser);

  if (changeUser.password.length > 0 && changeUser.email.length > 0 && changeUser.password.length > 0 && changeUser.lastName.length > 0 && changeUser.firstName.length > 0) {
    $.ajax({
      type: 'PUT',
      url: `/api/user/${id}`,
      data: changeUser
    }).then((result) => {
      console.log('Updated user:', result);
      // Reload the page to get the updated list
      window.location.href = '/logout';
    });
  } else {
    console.log('**Please fill out entire form**');
    $('#update-err-msg').empty('').text('**Please fill out entire form**');
  }
});

// DELETE   ***************************************************
$('#delete-user').on('click', function (event) {
  event.preventDefault();
  $('#err-msg').empty('');
  $('#delete-user-modal').modal('show');
});

$('#confirm-delete').on('click', function (event) {
  event.preventDefault();

  const id = $(this).data('id');

  const deleteUser = {
    email: $('#userEmail').val().trim(),
    password: $('#userPassword').val().trim()
  };

  if (deleteUser.email.length > 0 && deleteUser.password.length > 0) {
    $.ajax({
      type: 'POST',
      url: '/api/user/confirm',
      data: deleteUser
    }).then((result) => {
      if (result) {
        $.ajax(`/api/user/${id}`, {
          type: 'DELETE'
        }).then(() => {
          console.log('Deleted user', deleteUser);
          // Reload the page to get the updated list
          window.location.href = '/logout';
        });
      } else {
        $('#err-msg').empty('').text('Wrong credentials!');
      }
    });
  } else {
    console.log('fill out entire form');
    $('#err-msg').empty('').text('fill out entire form');
  }
});

$('#register').on('click', function (event) {
  event.preventDefault();
  window.location.href = '/register';
});

$('#login-modal').on('click', function (event) {
  window.location.href = '/login';
  event.preventDefault();
  // $('#user-info').modal('show');
});

$('#go-home').on('click', function (event) {
  event.preventDefault();
  window.location.href = '/';
});

$('#login').on('click', function (event) {
  event.preventDefault();

  const user = {
    email: $('#email').val().trim(),
    password: $('#user_password').val().trim()
  };

  $.post('/api/login', user, (result) => {
    console.log(result);
    if (result.loggedIn) {
      if (result.parentTeacher === 'parent') {
        $(document.location).attr('href', '/parent');
      } else if (result.parentTeacher === 'teacher') {
        $(document.location).attr('href', '/teacher');
      }
    } else {
      $('#login-err-msg').empty('').text(result.error);
      // $('#user-info').modal('hide');
    }
  });
});

// Functionality to add a new student
$('#add-new-student').on('click', function () {
  // Need to convert the allergies option to boolean
  if ($('#confirm-allergies') === 'yes') {
    var allergies = true;
  } else {
    // eslint-disable-next-line no-redeclare
    var allergies = false;
  };

  // Need to convert the allergy severity based on user selection
  if ($('#allergies') === 'Life-Threatening') {
    var allergySeverity = 'Life-Threatening';
  } else if ($('#allergies') === 'Severe') {
    // eslint-disable-next-line no-redeclare
    var allergySeverity = 'Severe';
  } else {
    // eslint-disable-next-line no-redeclare
    var allergySeverity = 'Moderate';
  };

  // Create an object with all of the new student data that will be exported to database
  var newStudentData = {
    firstName: $('#firstName').val().trim(),
    lastName: $('#lastName').val().trim(),
    birthDate: $('#birthDate').val().trim(),
    gender: $('#gender').val().trim(),
    ethnicity: $('#ethnicity').val().trim(),
    primaryLanguage: $('#language').val().trim(),
    emergencyContactName: $('#emergencyContactName').val().trim(),
    emergencyContactPhone: $('#emergencyContactPhone').val().trim(),
    emergencyContactRelation: $('#emergencyContactRelation').val().trim(),
    doctorName: $('#doctorName').val().trim(),
    doctorPhone: $('#doctorPhone').val().trim(),
    dentistName: $('#dentistName').val().trim(),
    dentistPhone: $('#dentistPhone').val().trim(),
    allergies: allergies,
    allergyDescription: $('#allergyDescription').val().trim(),
    allergySeverity: allergySeverity,
    notes: $('#notes').val().trim(),
    imageLink: addImage(),
    TeacherId: Math.floor(Math.random() * 15) + 1
  };

  var newPickupData = {
    firstName: $('#pickupFirstName').val().trim(),
    lastName: $('#pickupLastName').val().trim(),
    phoneNumber: $('#pickupPhoneNumber').val().trim(),
    relation: $('#pickupRelation').val().trim()
  };

  // For testing purposes:
  console.log(newStudentData);
  console.log(newPickupData);

  // POST request to add new student data to the database
  $.ajax({
    type: 'POST',
    url: '/api/newStudent',
    data: newStudentData
  }).then(function () {
    console.log('New Student Added');
    $.ajax({
      type: 'POST',
      url: '/api/newPickup',
      data: newPickupData
    }).then(function () {
      console.log('New Pickup Added');
    });
  });
});

// Functionality to add a new parent
$('#add-new-parent').on('click', function () {
  // Need to convert the living with option to boolean
  if ($('#livingWith') === 'yes') {
    var livingWith = true;
  } else {
    // eslint-disable-next-line no-redeclare
    var livingWith = false;
  };

  // Create an object with all of the new student data that will be exported to database
  var newParentData = {
    firstName: $('#parentFirstName').val().trim(),
    lastName: $('#parentLastName').val().trim(),
    email: $('#email').val().trim(),
    phoneNumber: $('#parentPhoneNumber').val().trim(),
    streetAddress: $('#streetAddress').val().trim(),
    city: $('#city').val().trim(),
    state: $('#state').val().trim(),
    zipcode: $('#zipcode').val().trim(),
    custodyRelation: $('#custodyRelation').val().trim(),
    livingWith: livingWith
  };
  // For testing purposes:
  console.log(newParentData);

  // POST request to add new student data to the database
  $.ajax({
    type: 'POST',
    url: '/api/newParent',
    data: newParentData
  }).then(function () {
    console.log('New Parent Added');
  });
});

// Functionality to add a new teacher
$('#add-new-teacher').on('click', function () {
  // Create an object with all of the new teacher data that will be exported to database
  var newTeacherData = {
    firstName: $('#firstName').val().trim(),
    lastName: $('#lastName').val().trim(),
    employeeId: $('#employeeId').val().trim(),
    roomNumber: $('#roomNumber').val().trim(),
    email: $('#email').val().trim(),
    phoneNumber: $('#phoneNumber').val().trim(),
    streetAddress: $('#streetAddress').val().trim(),
    city: $('#city').val().trim(),
    state: $('#state').val().trim(),
    zipcode: $('#zipcode').val().trim()
  };
  // For testing purposes:
  console.log(newTeacherData);

  // POST request to add new student data to the database
  $.ajax({
    type: 'POST',
    url: '/api/newTeacher',
    data: newTeacherData
  }).then(function () {
    console.log('New Teacher Added');
  });
});

// ******** THIS WAS AN ERROR IN MERGING... SAVED THIS AND THE NEXT ONE
/* SIDE NAVIGATION */
$('[data-open-details]').click(function (e) {
  e.preventDefault();
  $(this).next().toggleClass('is-active');
  $(this).toggleClass('is-active');
});

// ******** THIS WAS AN ERROR IN MERGING... SAVED THIS AND THE PREVIOUS ONE
/* SIDE NAVIGATION */
$('[data-menu-underline-from-center] a').addClass('underline-from-center');
$('#offCanvasLeft1').foundation();
// $('#children').on('click', function () {
//   console.log('Inside click event - children tab');
//   $.ajax({
//     type: 'GET',
//     url: '/api/existingStudent'
//   }).then(function (data) {
//     console.log(data);
//   });
// });

$('.sticky-topbar').foundation();
