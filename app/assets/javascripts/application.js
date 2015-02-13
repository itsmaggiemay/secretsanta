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
		};

/* Methods
*************************************************/
	var randomizedParticipantsListIsUniqueAndValid = function (participants, poolOfPossibleParticipants) {
		if (participants.length !== poolOfPossibleParticipants.length ) {
			return false;
		}
			
		for (var ii = 0, max = participants.length; ii < max; ii++) {
			if ( participants[ii].name === poolOfPossibleParticipants[ii].name ) {
				console.log( participants[ii].name, poolOfPossibleParticipants[ii].name );
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


$(function() {
	$("div.row_containers").on("click", "a.add_name", function(event) {
		var rowElement = $('div.row:eq(0)').clone();
		rowElement.find("input").val("");
		$('div.row_containers').append(rowElement);
		event.preventDefault();
	});

	$('#submitNames').on("click", function (event) {
		var participants = [];
		var party = [];

			$('input.participant_name').each(function(index) {
				var participant_hash = {};
				participant_hash.name = $(this).val();
				participants.push(participant_hash);
			});

			$('input.participant_email').each(function(index){
				var participant_email = $(this).val();
				participants[index].email = participant_email;
			});

			$('input.organizer_name').each(function(index){
				var party_hash = {};
				party_hash.organizer_name = $(this).val();
				party.push(party_hash);
			});

			$('input.party_name').each(function(index){
				var party_name = $(this).val();
				party[index].party_name = party_name;
			});

			$('input.party_date').each(function(index){
				var party_date = $(this).val();
				party[index].date_of_party = party_date;
			});

			$('input.budget').each(function(index){
				var budget = $(this).val();
				party[index].budget = budget;
			});

			$('textarea.message').each(function(index){
				var message = $(this).val();
				party[index].special_message = message;
			});


var poolOfPossibleParticipants = randomizePoolOfPossibleParticpants(participants);
var partnersList = matchUpPeopleAndPartners(participants, poolOfPossibleParticipants);
var partyInformation = party;
var output = JSON.stringify(partnersList);
				
for (var ii = 0, max = participants.length; ii < max; ii++) {
	$.ajax({
			type: "POST",
			url: "https://mandrillapp.com/api/1.0/messages/send.json",
			data: {
		
						'key': "QUFDz9T0ZBirEBv2YOIjFA",
						'message': {
						'from_email': 'mmh332@nyu.edu',
						"from_name": "ELFST.R",
						'to': [
							{
								'email': partnersList[ii].person.email,
								'name':  partnersList[1].person.name,
								'type': 'to'
							}
							],
							
						'autotext': 'true',
						'subject': 'The ' + partyInformation[0].party_name + ' Exchange',
						'html': "<img src='http://i.imgur.com/EIvQUjK.jpg' width='800' height='376'><p style='font-family:courier; font-size: 15px'><br><br> Dear <strong>" +  partnersList[ii].person.name + ",<br></strong><br> The reindeer have caught the dancing bug and will not be able to deliver presents this year.<br> Will you please help me out?<br><br> My elves told me you will be going to a Christmas Party titled <strong>'" + partyInformation[0].party_name + "'</strong> on <strong>" + partyInformation[0].date_of_party	+ "</strong> . <br>Could you please buy a present for <strong>"	+ partnersList[ii].partner.name + "</strong>? The maximum amount of money to spend is <strong> " + partyInformation[0].budget + "</strong>. <br><br> The party's organizer <strong>" + partyInformation[0].organizer_name + "</strong>, also left you a special note: <br>" + partyInformation[0].special_message + "<br><Br> I will be very grateful if you could be <strong>" + partnersList[ii].partner.name + "'s</strong> secret Santa this year. <br><br> Thanks!!!<br><Br> <img src='http://i.imgur.com/SEOnTiw.png'></p>"
						}
					}
					}).done(function(response) {
					console.log(response); // if you're into that sorta thing
				});
				}
			});
			});
