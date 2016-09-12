Form Validation with jQuery and Semantic UI
=
Jaken Herman, Sam Houston State University

This documentation will serve as a walkthrough of the basics of form validation with jQuery Form Validator and Semantic UI. Setup, Initialization, and common errors or useful things to note will all be outlined. Reusable code blocks are at the back of this document.

Setup
-
The form validator that will be used is found at http://www.formvalidator.net, and semantic UI can be found at http://www.semantic-ui.com. The form validator is available in the /scripts folder at https://www.shsu.edu/scripts/jquery-form-validator.js. Import this to a web page in the <head> portion of the HTML file with `<script type=text/javascript' src='https://www.shsu.edu/scripts/jquery-form-validator.js'></script>`

Fields
-

Semantic UI allows you to create fields with multiple input fields within them. For example, if you want 4 input fields inline, you can create a `div` with a class that specifies you will have four fields, as such:

`<div class="four fields">`

Inside this dive, you would create your other four input fields, as displayed below:

    <div class="four fields"> 
        <div class="field"></div> 
        <div class="field"></div> 
        <div class="field"></div> 
        <div class="field"></div> 
    </div>

_Note: You can do this with less, or more fields, depending on whatever is appropriate for the task at hand._

Inside of these divs of class `field`, you would create your inputs, labels, and any buttons that you may need.

Inputs & Labels
-
For each input, you should have a label, not just an input placeholder. Give your input an id, as well as a name. When creating the label, create the label _for_ that input id and name. _Note: The id and name of the id should be the same._ For example, for an input field of First Name:

    <label for="first-name">First Name</label>
    <input placeholder="Jane" name="first-name" id="first-name" type="text" />

As you can see, I still used a placeholder in this example. In most cases, you would create a label describing what the input field will be for, and in the placeholder of the input field, you will give an example. In the case above, my example in the placeholder for a first name field was "Jane".

Clear & Reset Buttons
-
To give the user the ability to clear data from a form quickly in order to start over, they need to be given a "Clear" or "Reset" button as an option. To do this, use the Semantic UI Reset Button in HTML:

`<div class="ui reset button" id="clear">Clear</div>`

Ideally, the form would be inside a div, and for the purposes of this documentation, we will assume we have a form inside a div with class `container`, as such:

    <div class="container">
        <form class="ui form" action="" id="registration-form">

Now, to make the clear/reset button have functionality, we can use jQuery's `reset()` function within a `click()` function:

    $('#clear').click(function() {
        $('.container form').get(0).reset();
    });
    
Overview of Data Validators
-
Using the jQuery Form Validator plugin, you will specify the validation within your `<input>` tags. Below are a few common validation methods. If you need something different, check the jQuery Form Validator plugin [documentation](http://www.formvalidator.net/index.html) to see if it is supported. If it is not, see how to make [custom validators](http://www.formvalidator.net/index.html#custom-validators).

**Data Types**
A full list of default validators can be found in the [documentation](http://www.formvalidator.net/index.html), but common validators are listed below.

*For required inputs with no length*: For inputs that require a number, or some text with no specific length or character set, you can simply use the input property `data-validation="required"`.

*For required length inputs*: If these are required inputs validating based on length, before the validation type, you must specify `length` before it. For example, if you use `data-validation="number"`, this will not validate length properly, as there is no length property. You must specify `data-validation="length number"`, then specify a length.
  - Numbers : To validate numbers, just use `data-validation="number"` within the `<input>` tag, as such: `<input type="text" data-validation="number">`. Alternatively, you can use regex by doing: `<input type="text" data-validation="custom" data-validation-regexp="^([0-9]+)$">`
  - Text with no numbers : To validate things like names that typically don't have numbers, yet still occasionally has special characters, we can use `data-validation="alphanumeric"`. If you want to allow certain special characters like `'` or `-`, add `data-validation-allowing="'-"`. For example, if you are creating an input with alphabetic characters, but would also like to allow astersks with the input value, use `<input type="text" data-validation="alphanumeric" data-validation-allowing="*" />`
  - Date : To validate that all sections of a date input are filled out, use `data-validation="date"`.
  - Email : To validate that an email is a proper email, use `data-validation="email"`.
  - 
**Length Requirements**
For length requirements, use the `data-validation-length` function in your `<input>`. For example: `<input type="text" data-validation-length="2-100">` will insure that your accepted input is between 2 to 100 characters.

If you only want to set a minimum length with no maximum, use `data-validation-length="min2"`, replacing "2" with your minimum value.

If you only want to set a maximum length with no minimum, use `data-validation-length="max100"`, replacing "100" with your maximum value.

**Input Hints**
For certain inputs, a hint may be helpful to the user. For example, not everyone knows what their Sam ID is or where they can find it. For this, we can use `data-validation-help` in order to give our user a helpful hint once they select the Sam ID input field, as such:

    <input type="text" data-validation="number" data-validation-length="9" data-validation-help="Your Sam ID begins with 000 and can be found on mysam.shsu.edu" />

**Error Messages**
When our user types something incorrectly, such as a Sam ID of length 2, we need to let them know why this input is incorrect. We do this with `data-validation-error-msg` if we want to set a custom message. By default, the error message would be

>The input value must be 9 characters

To make this more descriptive, we would change it by calling `data-validation-error-msg` like so:

    <input type="text" data-validation="length number" data-validation-length="9" data-validation-help="Your Sam ID begins with 000 and can be found on mysam.shsu.edu" data-validation-error-msg="Your Sam ID should be 9 numbers in length." />

**Errors on Submit Error Message**
If our user presses "submit" before having all of the required fields filled out, we will have an error text box that will show all of the problems with the form. The default message is

>Form submission failed!

In order to make this more user friendly, in the jQuery portion of your page, create a JavaScript object called `friendlyError` and set `errorTitle` to whatever you'd like the title of the error box to say. For example:

    var friendlyError = {
                            errorTitle : 'Please correct the following: '
                        };

Once you've created this object, in the `validate` function (next section), set `language` to the `friendlyError` object, like so:

    $.validate({
        language : friendlyError
    });

Begin Validation
-

To start validation, in jQuery, use `$.validate();`. That is all that is necessary. You can also run this method on submit as well to double-check your validation. If you have two forms on one page, you can specify which form to validate by calling it's id, as displayed below:

    $.validate({
        form : '#form-id'
    });
    
Additional configuration options are available in the form validator documentation.

------------------------

Common Fields to Copy/Paste
=

*First Name*

    <div class="field"> <label for="first-name">First Name</label> <input id="first-na me" placeholder="John" name="fname" type="text" data-validation="length alphanumeric" data-validation-allowing="'" data-validation-length="2-100" /> </div> 

*Last Name*

    <div class="field"> <label for="last-name">Last Name</label> <input id="last-name" placeholder="Last Name" name="lname" type="text" data-validation="length alphanumeric" data-validation-allowing="'-" data-validation-length="2-100" /> </div> 

*Sam ID*

    <div class="field"> <label for="sam-id">Sam ID</label> <input placeholder="0001234 56" name="sid" id="sam-id" type="text" data-validation="length custom" data-valida tion-regexp="^([0-9]+)$" data-validation-length="9" data-validation-error-msg="Sam ID must be 9 numbers in length." data-validation-help="Your Sam ID typically begins with 000 and can be found on MySam.Shsu.edu "> </div> 

*Address*

    <div class="field"> <label for="address">Address</label> <input id="address" place holder="Address" name="address" type="text" data-validation="length" data-validation-length="5-100"> </div> 

*City*

    <div class="field"> <label for="city">City</label> <input id="city" placeholder="C ity" name="city" type="text" data-validation="custom" data-validation-regexp="^([a -zA-Z]+)$" data-validation-allowing="'-" data-validation-length="1-100" data-valid ation-error-msg="City name must be between 1-100 alphabetic characters only with the exception of the characters ' and -"> </div> 

*State*

    <div class="field"> <label for="state">State</label> <select id="state" class="ui search dropdown" data-validation="required"> <option value="">State</option> <option value="AL">Alabama</option> <option value="AK">Alaska</option> <option value="AZ">Arizona</option> <option value="AR">Arkansas</option> <option value="CA">California</op tion> <option value="CO">Colorado</option> <option value="CT">Connecticut</option> <option value="DE">Delaware</option> <option value="DC">District Of Columbia</opti on> <option value="FL">Florida</option> <option value="GA">Georgia</option> <optio n value="HI">Hawaii</option> <option value="ID">Idaho</option> <option value="IL"> Illinois</option> <option value="IN">Indiana</option> <option value="IA">Iowa</opt ion> <option value="KS">Kansas</option> <option value="KY">Kentucky</option> <opti on value="LA">Louisiana</option> <option value="ME">Maine</option> <option value="MD">Maryland</option> <option value="MA">Massachusetts</option> <option value="MI">Michigan</option> <option value="MN">Minnesota</option> <option value="MS">Missis sippi</option> <option value="MO">Missouri</option> <option value="MT">Montana</op tion> <option value="NE">Nebraska</option> <option value="NV">Nevada</option> <opt ion value="NH">New Hampshire</option> <option value="NJ">New Jersey</option> <opti on value="NM">New Mexico</option> <option value="NY">New York</option> <option val ue="NC">North Carolina</option> <option value="ND">North Dakota</option> <option v alue="OH">Ohio</option> <option value="OK">Oklahoma</option> <option value="OR">Or egon</option> <option value="PA">Pennsylvania</option> <option value="RI">Rhode Is land</option> <option value="SC">South Carolina</option> <option value="SD">South Dakota</option> <option value="TN">Tennessee</option> <option value="TX">Texas</op tion> <option value="UT">Utah</option> <option value="VT">Vermont</option> <option value="VA">Virginia</option> <option value="WA">Washington</option> <option value= "WV">West Virginia</option> <option value="WI">Wisconsin</option> <option value="WY">Wyoming</option> </select> </div> 

*Zip Code*

    <div class="field"> <label for="zip-code">Zip Code</label> <input placeholder="Zip Code" name="zip-code" id="zip-code" type="text" data-validation="length custom" da ta-validation-regexp="^([0-9]+)$" data-validation-length="7-9" data-validation-error-msg="Must be exactly 5 numbers in length."> </div> 

*Social Security Number*

    <div class="field"> <label for="social-security-number">Social Security Number</la bel> <input name="ssn" id="social-security-number" type="text" data-validation="le ngth custom" data-validation-regexp="^([0-9]+)$" data-validation-length="9" data-v alidation-error-msg="Must be exactly 9 numbers in length."> </div> 

*Date*

    <div class="field"> <label for="date">Date</label> <input placeholder="Date " id="date" name="date" type="date" data-validation="date"> </div> 

*Phone*

    <div class="field"> <label for="phone-num">Phone</label> <input placeholder="(555) -555-5555" id="phone-num" name="phone-num" type="tel" data-validation="length cust om" data-validation-regexp="^([0-9]+)$" data-validation-length="10" data-validation-error-msg="Must be exactly 10 numbers in length."/> </div> 

