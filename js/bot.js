var questionNum = 0;													// keep count of question, used for IF condition.
var question = '<h3>Bienvenid@ ¿Cómo te llamas?</h3>';				  // first question

var output = document.getElementById('output');				// store id="output" in output variable
output.innerHTML = question;													// ouput first question

function bot() {
    var input = document.getElementById("input").value;
    

    if (questionNum == 0) {
    output.innerHTML = '<h3>Hola ' + input + '</h3>';// output response
    document.getElementById("input").value = "";   		// clear text box
    question = '<h3>¿Cuántos años tienes?</h3>';			    	// load next question
    setTimeout(timedQuestion, 2000);									// output next question after 2sec delay
    }

    else if (questionNum == 1) {
    output.innerHTML = '<h3>Eso significa que naciste en ' + (2018 - input) + '</h3>';
    document.getElementById("input").value = "";
    question = '<h3>¿De dónde eres?</h3>';
    setTimeout(timedQuestion, 2000);
    }
}

function timedQuestion() {
    output.innerHTML = question;
}

//push enter key (using jquery), to run bot function.
$(document).keypress(function(e) {
  if (e.which == 13) {
    bot();																						// run bot function when enter key pressed
    questionNum++;																		// increase questionNum count by 1
  }
});
