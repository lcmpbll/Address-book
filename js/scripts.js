// business logic for AddressBook
function AddressBook() {
	this.contacts = {};
	this.currentId = 0;
}
AddressBook.prototype.addContact = function (contact) {
	contact.id = this.assignId();
	this.contacts[contact.id] = contact;
};
AddressBook.prototype.assignId = function () {
	this.currentId += 1;
	return this.currentId;
}
AddressBook.prototype.findContact = function (id) {
	if (this.contacts[id] != undefined) {
		return this.contacts[id];
	}
	return false;
}
AddressBook.prototype.deleteContact = function (id) {
	if (this.contacts[id] === undefined) {
		return false;
	}
	delete this.contacts[id];
	return true;
};
AddressBook.prototype.updateContact = function (newPhoneNumber) {
	this.phoneNumber = newPhoneNumber;
	return this.phoneNumber + " " + "this is their new phone number";
}

//Business logic for Contacts
function Contact(firstName, lastName, phoneNumber, emailAddress, homeAddress) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.phoneNumber = phoneNumber;
	this.emailAddress = emailAddress;
	this.homeAddress = homeAddress;
}
Contact.prototype.fullName = function () {
	return this.firstName + " " + this.lastName;
};

// Addresses
function Addresses(emailAddress, homeAddress, workAddress) {
	this.emailAddress = emailAddress;
	this.homeAddress = homeAddress;
	this.workAddress = workAddress;
}


//User Interface Logic
let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
	let contactsList = $("ul#contacts");
	let htmlForContactInfo = "";
	Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
		const contact = addressBookToDisplay.findContact(key);
		htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
	});
	contactsList.html(htmlForContactInfo);
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
	$("#buttons").on("click", ".deleteButton", function(){
		addressBook.deleteContact(this.id);
		$("#show-contact").hide();
		displayContactDetails(addressBook);
	});
}

function showContact(contactId) {
	const contact = addressBook.findContact(contactId);
	$("#show-contact").show();
	$(".first-name").html(contact.firstName);
	$(".last-name").html(contact.lastName);
	$(".phone-number").html(contact.phoneNumber);
	$(".email-address").html(contact.emailAddress);
	$(".home-address").html(contact.homeAddress);
	let buttons = $("#buttons");
	buttons.empty();
	buttons.append("<button class='deleteButton' id=" + + contact.id + ">Delete</button>");
}

$(document).ready(function () {
	attachContactListeners();
	$("form#new-contact").submit(function (event) {
		event.preventDefault();
		const inputtedFirstName = $("input#new-first-name").val();
		const inputtedLastName = $("input#new-last-name").val();
		const inputtedPhoneNumber = $("input#new-phone-number").val();
		const inputtedEmailAddress = $("input#new-email-address").val();
		const inputtedHomeAddress = $("input#new-home-address").val();

		$("input#new-first-name").val("");
		$("input#new-last-name").val("");
		$("input#new-phone-number").val("");
		$("input#new-email-address").val("");
		$("input#new-home-address").val("");
		
		let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmailAddress, inputtedHomeAddress);
		addressBook.addContact(newContact);
		displayContactDetails(addressBook);
	});
});

