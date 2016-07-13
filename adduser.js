
$(document).ready(function() {
    // body...
    var name, fname, dob, email, username, password, admin;

    $('#errorc2').hide();
    $('#errorc3').hide();
    $('#errorc4').hide();
    $('#errorc5').hide();
    $('#errorc6').hide();
    $('#errorc7').hide();
    $('#errorc8').hide();
    $('#errorc9').hide();
    $('#prev').prop('disabled', true);
    $("#ok").prop('disabled', true);
    
    $('#addbutton').click(function(){
        addUser();
    });

    $('#next').click(function(){
        validateGeneral();
    });

    $('#nextcredential').click(function(){
        validateCredential();
    });

    $('#okpermission').click(function(){
        validatePermission();
    });
});

function addUser(){
    $(location).attr('href','general.html');
}

function validateGeneral(){
    var ck_name = /^[A-Za-z ]{3,20}$/;
    var ck_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    var ck_dob = /^[0-9/]{10}$/;
    name = document.getElementById("name").value;
    fname = document.getElementById("fname").value;
    dob = document.getElementById("dob").value;
    email = document.getElementById("email").value;
    if(!ck_name.test(name)) {
        $("#error1").text("*Please enter a name");
    }else if(!ck_name.test(fname)){
        $("#error2").text("*Please enter a father name");
    }else if(!ck_dob.test(dob)) {
        $("#error3").text("*Please enter a dob");
    }else if(!ck_email.test(email)) {
        $("#error4").text("*Please enter a email");
    }else{
        $(location).attr('href','credential.html');
    }
}

function validateCredential(){
    var u_name = /^[a-z0-9_-]{3,15}$/;
    var lpass = /(?=.*[a-z])/;
    var upass = /(?=.*[A-Z])/;
    var npass = /(?=.*[0-9])/;
    var spass = /(?=.*[!@#\$%\^&\*])/;
    var ltpass = /(?=.{8,})/;
    uname = document.getElementById("userName").value;
    password = document.getElementById("password").value;
    repassword = document.getElementById("repassword").value;
    if (!u_name.test(uname)) {
        $("#errorc1").text("*Please enter a username");
    }else if(password == ""){
        $("#errorc2").show();
    }else if(!lpass.test(password)){
        $("#errorc3").show();
    }else if(!upass.test(password)){
        $("#errorc4").show();
    }else if(!npass.test(password)){
        $("#errorc5").show();
    }else if (!spass.test(password)) {
        $("#errorc6").show();
    }else if (!ltpass.test(password)) {
        $("#errorc7").show();
    }else if (repassword == "") {
        $("#errorc8").show();
    } else if(password !== repassword){
        $("#errorc9").show();
    } else {
        $(location).attr('href','permission.html'); 
    }
}

function validatePermission(){
    admin = document.getElementsByName("role");
    for (var i = 0; i < admin.length; i++){
        if (admin[i].checked == false){
            $("#radiodiv").text("Please choose your Role: Admin or Employee");  
        }
    }
}