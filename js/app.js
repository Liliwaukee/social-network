function loadPage() {
	splash();

	// Initialize Firebase
	var config = {
	apiKey: "AIzaSyCr8LE3tNU_HSJ4ntj8Dqpbc13Q_nDIC9U",
	authDomain: "healthy-food-7f4d3.firebaseapp.com",
	databaseURL: "https://healthy-food-7f4d3.firebaseio.com",
	projectId: "healthy-food-7f4d3",
	storageBucket: "healthy-food-7f4d3.appspot.com",
	messagingSenderId: "1060724454978"
};
firebase.initializeApp(config);

	var $btnGoogle = $("#btn-google")
	$btnGoogle.click(function(){
		authGoogle();
		//views/network.html
	});

	function authGoogle() {
		var provider = new firebase.auth.GoogleAuthProvider();
		authentification(provider);
	}

	function authentification(provider) {
		firebase.auth()
			.signInWithPopup(provider)
			.then(function(result) {

			window.location.href = "views/principal.html";
			saveDataUser(result.user);

		}).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// The email of the user's account used.
			var email = error.email;
			// The firebase.auth.AuthCredential type that was used.
			var credential = error.credential;
		});
	}

	$("#btn-signup-network").click(signupWithMail); //Botón que llama a la función de registrar usuario con email y contraseña
	$("#btn-mail-access").click(loginWithMail); //Botón que llama a la función de accesar con mail
	$('.collapsible').collapsible(); //Agregamos la funcionalidad a los collapse


}

//FUNCIÓN PARA GUARDAR LOS DATOS DE USUARIOS QUE SE REGISTRAN CON GOOGLE
function saveDataUser(user) {
	var userHealthy = {
		uid: user.uid,
		nombre: user.displayName,
		email: user.email,
		foto: user.photoURL
	}
	firabase.database().ref("user-healthy/" + user.uid)
	.set(userHealthy)
}


//FUNCIÓN PARA REGISTRAR UN USUARIO NUEVO CON EMAIL Y CONTRASEÑA
function signupWithMail() {
	var $signupEmail = $("#signup-email").val();
	var $signupPassword = $("#signup-password").val();


	firebase.auth()
	.createUserWithEmailAndPassword($signupEmail, $signupPassword)
	.then(function(result){
		window.location.href = "views/principal.html";
	})
	.catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});



}


//FUNCIÓN PARA INGRESAR CON EMAIL Y CONSTRASEÑA
function loginWithMail() {
	var $loginEmail = $("#user-email-login").val();
	var $loginPassword = $("#user-password-login").val();

		firebase.auth().signInWithEmailAndPassword($loginEmail, $loginPassword)
		.then(function(result){
			window.location.href = "views/principal.html";
		})
		.catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // ...
	});

}

/*
//FUNCIÓN PARA GUARDAR LA INFORMACIÓN DE LOS USUARIOS REGISTRADOS CON EMAIL
function dataUserHealthy() {
		firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	    // User is signed in.
	    var displayName = user.displayName;
	    var email = user.email;
	    var emailVerified = user.emailVerified;
	    var photoURL = user.photoURL;
	    var isAnonymous = user.isAnonymous;
	    var uid = user.uid;
	    var providerData = user.providerData;
	    // ...
	  } else {
	    // User is signed out.
	    // ...
	  }
	});
}
dataUserHealthy(); //Llamamos a la función
*/



// FUNCIÓN PARA LA VISTA SPLASH AL CARGAR LA APP
function splash() {
	setInterval(function() {
				$("#splash").hide();
        $("#main").removeClass("hide");
	 }, 3000);
}


function showPost() {  //post-container
	var $postContent = $("#post-text").val();
	var $postSection = $("#show-post-section");
	var $post = $("<div />").addClass("card-panel card-panel-post");
	var $postText = $("<p />").addClass("borderP");
	var $post2 = $("<div />").addClass("icons-post");
	var $iconLove = $("<i />").addClass("material-icons icon");
	var $iconLike = $("<i />").addClass("material-icons icon");
	var $iconDislike = $("<i />").addClass("material-icons icon");

	$postText.text($postContent);
	$iconDislike.text("thumb_down");
	$iconLike.text("thumb_up");
	$iconLove.text("favorite");

	$post.append($postText);
	$post2.append($iconDislike);
	$post2.append($iconLike);
	$post2.append($iconLove);
	$postSection.append($post);
	$post.append($post2);

	$("#post-text").val(" "); //limpiamos el textarea

	//los iconos se colorean cuando le das click
	$(".icon").on("click",function(){
		$(this).toggleClass("clicked");
		$(this).siblings().removeClass("clicked");
	});

}

$(".icon").on("click",function(){
	$(this).toggleClass("clicked");
	$(this).siblings().removeClass("clicked");
});

$("#btn-send-post").click(showPost); //Llama a la función que muestra los post


function showImage(image) {  //post-container
	var $postContent = $("#post-text").val();
	var $postSection = $("#show-post-section");
	var $post = $("<div />").addClass("card-panel card-panel-post");
	var $postText = $("<p />").addClass("borderP");
	var $post2 = $("<div />").addClass("icons-post");
	var $iconLove = $("<i />").addClass("material-icons icon");
	var $iconLike = $("<i />").addClass("material-icons icon");
	var $iconDislike = $("<i />").addClass("material-icons icon");

	$postText.html(image);
	$iconDislike.text("thumb_down");
	$iconLike.text("thumb_up");
	$iconLove.text("favorite");

	$post.append($postText);
	$post2.append($iconDislike);
	$post2.append($iconLike);
	$post2.append($iconLove);
	$postSection.append($post);
	$post.append($post2);

	$("#post-text").val(" "); //limpiamos el textarea

	//los iconos se colorean cuando le das click
	$(".icon").on("click",function(){
		$(this).toggleClass("clicked");
		$(this).siblings().removeClass("clicked");
	});

}

function calculateIMC() {
	var $userHeight = $("#height-user").val();
	var $userWeight = $("#weight-user").val();
 	var $userIMC = ($userWeight*10000) / (Math.pow($userHeight, 2));
	$userIMC = $userIMC.toFixed(2);

	if($userIMC <= 18.49) {
		$("#user-imc").html($userIMC + " Delgadez");
	} else if ($userIMC >= 18.5 || $userIMC <= 24.99) {
		$("#user-imc").html($userIMC + " Peso normal");
	} else if ($userIMC >= 25 || $userIMC <= 29.99) {
		$("#user-imc").html($userIMC + " Sobrepeso");
	} else if ($userIMC >= 30) {
		$("#user-imc").html($userIMC + " Obesidad");
	}

}


function calculateWeight() {
	var $userHeight = $("#height-user").val();
	var $userWeight = $("#weight-user").val();

	if ( $("#user-woman") === true ){
		var $womanWeight = 0.67 * $userHeight - 52;
		  $("#user-ideal-weight").text($womanWeight + "kg");
	} else {
		var $manWeight = (0.75 * $userHeight) - 62.5;
		  $("#user-ideal-weight").text($manWeight + "kg");
	}

}



function clearCalculate() {
	$(".collapsible-header").removeClass("active");
	$("li").removeClass("active");
	$(".collapsible-body").hide();
	$("#height-user").val("");
	$("#weight-user").val("");
}


$("#btn-calculate-imc").click(calculateIMC);
$("#btn-calculate-imc").click(calculateWeight);
$("#btn-calculate-imc").click(clearCalculate);


function closeSession() {
		firebase.auth().signOut()
		.then(function(result) {
	window.location.href = "index.html";
	})


		.catch()
}
$("#close-session").click(closeSession);

function archivo(evt) {
    var files = evt.target.files; // FileList object

      //Obtenemos la imagen del campo "file".
    for (var i = 0, f; f = files[i]; i++) {
         //Solo admitimos imágenes.
         if (!f.type.match('image.*')) {
              continue;
         }

         var reader = new FileReader();

         reader.onload = (function(theFile) {
             return function(e) {
             // Creamos la imagen.

						 showImage(
						 ['<img class="thumb responsive-img" src="', e.target.result,'" title="', escape(theFile.name), '"/>'].join(''));
             };
         })(f);
         reader.readAsDataURL(f);
     }
}

//document.getElementById('files').addEventListener('change', archivo, false);






$(document).ready(loadPage);
