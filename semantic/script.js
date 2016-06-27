function validateForm(){
	$('.ui.form')
	  .form({
		fields: {
		  fname	: ['empty', 'minCount[2]'],
		  lname	: ['empty', 'minCount[2]']
		}
	  });
};

$( ".ui blue submit button" ).click(function() {
	validateForm();
});
