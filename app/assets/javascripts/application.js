// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

		/* Native
		*************************************************/
		Array.prototype.randomize = function () {
			
			for (var i = this.length - 1; i > 0; i--) {
							
				var random_index = Math.floor(Math.random() * (i + 1)),
					tmp = this[i];
				
				this[i] = this[random_index];
				this[random_index] = tmp;
			}

			return this;
		}

		/* Methods
		*************************************************/
		var randomizedParticipantsListIsUniqueAndValid = function (participants, poolOfPossibleParticipants) {
			if (participants.length !== poolOfPossibleParticipants.length ) {
				return false;
			}
			
			for (var ii = 0, max = participants.length; ii < max; ii++) {
				if ( participants[ii] === poolOfPossibleParticipants[ii] ) {
					console.log( participants[ii], poolOfPossibleParticipants[ii] );
					return false;
				}
			}

			return true;
		};

		var matchUpPeopleAndPartners = function (participants, poolOfPossibleParticipants) {
			var currentPersonToHaveAPartner;
			var partnersList = [];

			for (var ii = 0, max = participants.length; ii < max; ii++) {
				var partnership = {};
				currentPersonToHaveAPartner = participants[ii];
				
				partnership.person = currentPersonToHaveAPartner;
				partnership.partner = poolOfPossibleParticipants[0];
				poolOfPossibleParticipants.shift();

				partnersList.push(partnership);
			}

			return partnersList;
		};

		var randomizePoolOfPossibleParticpants = function(participants) {
			var shuffledListOfParticipants = participants.slice(0).randomize();

			while (!randomizedParticipantsListIsUniqueAndValid(participants, shuffledListOfParticipants)) {
				shuffledListOfParticipants = participants.slice(0).randomize();
			}

			return shuffledListOfParticipants;
		};

// for slider
function outputUpdate(vol) {
document.querySelector('#price').value = vol;
}


		$(function() {
			$("div.row_containers").on("click", "a.add_name", function(event) {
				var rowElement = $('div.row:eq(0)').clone();
				rowElement.find("input").val("");
				$('div.row_containers').append(rowElement);
				event.preventDefault();
			});

			$('#submitNames').on("click", function (event) {
				var participants = [];

				$('input.participant_name').each(function() {
					var participant_name = $(this).val();
					participants.push(participant_name);
			});
				var poolOfPossibleParticipants = randomizePoolOfPossibleParticpants(participants);
				var partnersList = matchUpPeopleAndPartners(participants, poolOfPossibleParticipants);
				var output = JSON.stringify(partnersList);
				console.log( output );
				

				$.ajax({
					type: "POST",
					url: "https://mandrillapp.com/api/1.0/messages/send.json",
					data: {
						'key': 'apikey',
						'message': {
						'from_email': 'mmh332@nyu.edu',
						'to': [
							{
								'email': 'mmh332nyu@gmail.com',
								'name': 'margaret',
								'type': 'to'
							},
							{
								'email': 'cesar.estelar@gmail.com',
								'name': 'Cesar',
								'type': 'to'
							}
							],
						'autotext': 'true',
						'subject': 'DOES THIS WORK?????',
						'html': '<img src="http://3.bp.blogspot.com/-QBRuVpI-KyM/UNRFO0oZJBI/AAAAAAAAA5k/cbl8BRF01UM/s640/christomise.png"><br><h1>Happy Holidays! </h1>'
						}
					}
					}).done(function(response) {
					console.log(response); // if you're into that sorta thing
				});
			});
			});
