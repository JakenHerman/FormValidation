function CustomValidation() {  
    this.invalidities = [];
    this.validityChecks = [];
}

CustomValidation.prototype = {  
    addInvalidity: function(message) {
        this.invalidities.push(message);
    },
    getInvalidities: function() {
        return this.invalidities.join('. \n');
    },
    checkValidity: function(input) {
        for ( var i = 0; i < this.validityChecks.length; i++ ) {

            var isInvalid = this.validityChecks[i].isInvalid(input);
            if (isInvalid) {
                this.addInvalidity(this.validityChecks[i].invalidityMessage);
            } 

            var requirementElement = this.validityChecks[i].element;
            if (requirementElement) {
                if (isInvalid) {
                    requirementElement.classList.add('invalid');
                    requirementElement.classList.remove('valid');
                } else {
                    requirementElement.classList.remove('invalid');
                    requirementElement.classList.add('valid');
                }

            } // end if requirementElement
        } // end for
    }
};


var firstnameValidityChecks = [  
    {
        isInvalid: function(input) {
            return input.value.length < 2;
        },
        invalidityMessage: 'This input needs to be at least 2 characters',
        element: document.querySelector('label[for="firstname"] .input-requirements li:nth-child(1)')
    },
    {
        isInvalid: function(input) {
            var illegalCharacters = input.value.match(/[^a-zA-Z]/g);
            return illegalCharacters ? true : false;
        },
        invalidityMessage: 'Only letters and numbers are allowed',
        element: document.querySelector('label[for="firstname"] .input-requirements li:nth-child(2)')
    }
];

var lastnameValidityChecks = [  
    {
        isInvalid: function(input) {
            return input.value.length < 2;
        },
        invalidityMessage: 'This input needs to be at least 2 characters',
        element: document.querySelector('label[for="lastname"] .input-requirements li:nth-child(1)')
    },
    {
        isInvalid: function(input) {
            var illegalCharacters = input.value.match(/[^a-zA-Z]/g);
            return illegalCharacters ? true : false;
        },
        invalidityMessage: 'Only letters and numbers are allowed',
        element: document.querySelector('label[for="lastname"] .input-requirements li:nth-child(2)')
    }
];

var dateValidityChecks = [
  {
    isInvalid: function(input) {
      return input.value == "";
    },
    invalidityMessage: 'This input must be filled properly',
    element: document.querySelector('label[for="date"] .input-requirements li:nth-child(1)')
  }
];

function checkInput(input) {

    input.CustomValidation.invalidities = [];
    input.CustomValidation.checkValidity(input);

    if ( input.CustomValidation.invalidities.length == 0 && input.value != '' ) {
        input.setCustomValidity('');
    } else {
        var message = input.CustomValidation.getInvalidities();
        input.setCustomValidity(message);
    }
}


var firstnameInput = document.getElementById('firstname');  
var lastnameInput = document.getElementById('lastname');  
var dateInput = document.getElementById('date');

dateInput.CustomValidation = new CustomValidation();
dateInput.CustomValidation.validityChecks = dateValidityChecks;

firstnameInput.CustomValidation = new CustomValidation();  
firstnameInput.CustomValidation.validityChecks = firstnameValidityChecks;

lastnameInput.CustomValidation = new CustomValidation();  
lastnameInput.CustomValidation.validityChecks = lastnameValidityChecks;




/* ----------------------------

    Event Listeners

---------------------------- */

var inputs = document.querySelectorAll('input:not([type="submit"])');  
var submit = document.querySelector('input[type="submit"');

for (var i = 0; i < inputs.length; i++) {  
    inputs[i].addEventListener('keyup', function() {
        checkInput(this);
    });
}

submit.addEventListener('click', function() {  
    for (var i = 0; i < inputs.length; i++) {
        checkInput(inputs[i]);
    }
});
