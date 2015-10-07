$(document).ready(function() {

  function getUpdateHTML(firstName, lastName, email, phoneNumber) {
    return '<tr><td></td>' +
      '<td><input type="text" class="form-control" name="firstName" id="firstName" value="' + firstName + '" /></td>' +
      '<td><input type="text" class="form-control" name="lastName" id="lastName" value="' + lastName + '" /></td>' +
      '<td><input type="text" class="form-control" name="email" id="email" value="' + email + '" /></td>' +
      '<td><input type="text" class="form-control" name="phoneNumber" id="phoneNumber" value="' + phoneNumber + '" /></td>' +
      '<td><button class="update" >Update</button></td>' +
      '</tr>'
  }

  function getRowHTML(id, firstName, lastName, email, phoneNumber) {
    return '<tr><td>' + id + '</td>' +
      '<td>' + firstName + '</td>' +
      '<td>' + lastName + '</td>' +
      '<td>' + email + '</td>' +
      '<td>' + phoneNumber + '</td>' +
      '<td><button class="edit">Edit</button><button class="delete">Delete</button></td>'
      '</tr>'
  }

  $('#addMoreNumbers').on('click', function() {
    $('#phoneInfo').toggle();
  });

  $('button.delete').on('click', function() {
    var row = $(this).closest('tr')
    var id = row.find('td:first').text();
    $.ajax({
        url: '/api/delete/' + id,
        method: 'PUT',
    });
    row.remove();
    
  });

  $('button.edit').on('click', function() {
    var row = $(this).closest('tr');
    var cells = row.find('td');

    var id = cells[0].innerHTML;
    var firstName = cells[1].innerHTML;
    var lastName = cells[2].innerHTML;
    var email = cells[3].innerHTML;
    var phoneNumber = cells[4].innerHTML;

    var updateRow = $(getUpdateHTML(firstName, lastName, email, phoneNumber));

    row.after(updateRow);
    $('button.update').on('click', function() {
      firstName = updateRow.find('#firstName').val();
      lastName = updateRow.find('#lastName').val();
      email = updateRow.find('#email').val();
      phoneNumber = updateRow.find('#phoneNumber').val();
      $.ajax({
        url: '/api/update/' + id,
        method: 'PUT',
        dataType: 'json',
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber
        }
      }).done(function(data){
        cells[1].innerHTML = data.first_name;
        cells[2].innerHTML = data.last_name;
        cells[3].innerHTML = data.email;
      });
      updateRow.remove();         
    });
  });

  $('form').on('submit', function(e) {
    e.preventDefault();
    var firstName, lastName, email, phoneNumber1, phoneNumber2, phoneNumber3;
    firstName = $('#firstName').val();
    lastName = $('#lastName').val();
    email = $('#email').val();

    phoneNumber = $('#phoneNumber1').val();

    if(firstName.length < 1 || lastName.length < 1 || email.length < 1 || phoneNumber.length < 10){
      alert("You must fill out all the fields");
    }else{
      contact = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber
      }

      // Post data to server
      $.post('/api/new_contact', contact, null, 'json').done(function(data) {
        $('.table').append(getRowHTML(data.id, data.first_name, data.last_name, data.email, data.phone_number)); 
        $('form')[0].reset(); 
      });
      
    }
    
  });

});
