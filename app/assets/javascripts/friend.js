$(function() {
	fetchAndRenderFriends(); //job of this function is

	//event listeners delete post
	$('#friends').on('click','.delete', deleteFriend);

	//event listener to add post
	$('.friend-form').on('click', 'button.add', addFriend);
});

	//event listener to edit, whenever edit button is clicked, run the editfriend fxn to remove the 
	//content of the friend dive and replace it with 2 input fields, and an update button
	$('#friends').on('click', 'button.edit', editFriend);

	//function
	$('#friends').on('click', 'button.update', updateFriend);

//index on my application action controller to get all the info i need

function fetchAndRenderFriends() {
	$.get('/friends')
	.done(function(data){  //when i receive response  take that data object
		data.forEach(renderFriend);// inside each data object i am going to render it
	});
	
}

function renderFriend(friendObject) {
	var friendID = friendObject.id;
	var firstName = friendObject.firstName;
	var lastName = friendObject.lastName;
	var email = friendObject.email;

// div tag with everything included
	var friendDiv = $('<div>').addClass('friend').attr('id', friendID);
	var firstNameDisplay = $('<p>').text(firstName).addClass('firstName');
	var lastNameDisplay = $('<p>').text(lastName).addClass('lastName');
	var emailDisplay = $('<p>').text(email).addClass('email');

// each one is going to have two buttons attached to it edit and delete buttons and a data button when we are firing off ajax request
// each time that is pressed we are insuring that what we are putting on the html database the server knows which one. foresight for what informaiton will have to go in
	var editButton = $('<button>').text('edit')
																.addClass('edit')
																.data('id', friendID); //id I assigned to div is added to the button is the id in our database

	var deleteButton = $('<button>').text('remove')
																	.addClass('delete')
																	.data('id', friendID); //id I assigned to div is added to the button

				friendDiv.append(firstNameDisplay)
								.append(lastNameDisplay)
								.append(emailDisplay)
								.append(editButton)
								.append(deleteButton);

	//need to display this on dom somewhere -- if not hidden it can fade in
	//.length if there is nothing inside it wont give you anything
	// if object has something inside, then we know that friend exist and not make a new one. take one exist and update it back in
if ($('#'+ friendID).length) { // this is the case when the friend is being updated
		$('#' + friendID).replaceWith(friendDiv);
	} else{ // this is when the friend is being created
		$('#friends').prepend(friendDiv);
	}

}









/////////////////////////////////////////////////////////////////
//   DELETE arguments -- called when I click delete button     //
////////////////////////////////////////////////////////////////

function deleteFriend() {
	//take a friend ID

	var friendID = $(this).data('id');
		//the button that is clicked is "THIS", taht button has an data attribute on it ID
	var friend = $(this).parent(); //give me the parent dont need to find closest source

// fire off ajax request
	$.ajax({
		url: '/friends/'+ friendID, // with friendID
		type: 'delete' //type of delete button
	})
	.done(function(){ //when done with that it removes it
		friend.remove();
	});
}






/////////////////////////////////////////////////////////////////
//   ADD arguments -- called when I click add button           //
////////////////////////////////////////////////////////////////

//div wrapping our two inputs for adding a friend. grabbing whats inside the two inputs and mock up the structure that rails is expecting to create new objects fire off new ajax request, posting to json. once comes back our new friend has a new id number -- stored in that db and can keep track of it

function addFriend() {
	var firstName = $('input[name="firstName"]').val();
	var lastName = $('input[name="lastName"]').val();
	var email = $('input[name="email"]').val();


//paramaters are stored on our db as a hash -- have to mimic the structure by creating a JS object -- look in params on controller friend will see how it woudl make it on def friend_Params -- mimicing what rails expect back

//structure of what we are sending back since Rails wants a hash


	var newFriend = {
		friend: {
			firstName: firstName,
			lastName: lastName,
			email: email
		}
	};
// post request to 

	$.post('/friends', newFriend)
	 .done(renderFriend);
 //once it is done renders 

 $('input[name="firstName"]').val('');
 $('input[name="lastName"]').val('');
	 $('input[name="email"]').val('');
}







/////////////////////////////////////////////////////////////////
//   EDIT arguments -- called when I click add button           //
////////////////////////////////////////////////////////////////
// remove 4 things and put in two input fields and a button
// we know here that we pressed edit button for friend 6 and what do we have to do


function editFriend() {
	var friendID = $(this).data('id');

	// prepares it to be edited
	var friendDiv = $(this).closest('.friend');
	friendDiv.empty();


	// need to display some type ofform
	// go to controller fill out show action
	// go back to our server and add a new id
	// then call that function

	// fetch the friend's information so we can prepopulate those input fields, after we get friend back, do this thing -- > showEditForm
		$.get('/friends/'+ friendID)
	 	.done(showEditForm);
}

function showEditForm(currentFriend){

	//get it back we going to show edit form to friend, we get data that whole entire friend we start building the form. it has autho, content and button. the value of that author and content tag are author and content, they will have data with an ID number, add everything to our div creating our form,  
	var friend = $('#' + currentFriend.id);
	var editForm = $('<div>').addClass('friend-form');
	var firstName = $('<input>').attr('name', 'edit-firstName');
	var lastName = $('<input>').attr('name', 'edit-lastName');
	var email = $('<input>').attr('name', 'edit-email');
	var button = $('<button>').addClass('update')
														.data('id', currentFriend.id)
														.text('Update Friend');
	firstName.val(currentFriend.firstName);
	lastName.val(currentFriend.lastName);
	email.val(currentFriend.email);

	editForm.hide().append(firstName).append(lastName).append(email).append(button);

	friend.empty().append(editForm);
	editForm.fadeIn(500);


}



function updateFriend() {
	var friendId = $(this).data('id'); //find which one
	var firstName = $('input[name="edit-firstName"]').val();
	var lastName = $('input[name="edit-lastName"]').val();
	var email = $('input[name="edit-email"]').val();

	var updatedFriend = {  // here is some data
		friend: {
			firstName: firstName,
			lastName: lastName,
			email: email
		}
	};
// put it to this ajax the new information
	$.ajax({
		url: '/friends/' + friendID,
		type: 'put',
		data: updatedFriend
	}).done(renderFriend); // when i am done doing that, i want to make sure i put back the information instead of the edit form

}
