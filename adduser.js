
var obj = {name:"", fname:"", dob:"", email:"", cred:{uname:"", pass:"", repass:""}, perm:{role:"", dept:""}};

$(document).ready(function() {
    // body...
    var name, fname, dob, email, username, password, admin, baseText = null, x, z, y, e, s, t, u, v, details, userObj, ids,divs, geninput, retvalue = 1;
    var isValidateGeneral = true, isValidateCredential;
    $('#creddiv').hide();
    $('#permdiv').hide();
    $('#radiodiv').hide();
    $('#checkdiv').hide();
    $('#detaildiv').hide();
    $('#errorc8').hide();
    $('#errorc9').hide();
    $('#mainerror').hide();
    $('#prevpermission').hide();
    $('.popupcontent').hide();
    $('#prevgeneral').prop('disabled', true).css("cursor", "default");
    $("#okgeneral").prop('disabled', true).css("cursor", "default");
    $("#permission").prop('disabled', true).css("cursor", "default");
    $("#credgeneral").prop('disabled', true).css("cursor", "default");
    document.getElementById('general').style.background = "#66cc66";
    document.getElementById('credgeneral').style.background = "#4E4E4E";
    document.getElementById('permission').style.background = "#4E4E4E";

    $("#dob").datepicker({
        yearRange: "2016:2020",
        minDate: '0',
        changeMonth: true,
        changeYear: true,
    });

    function addUser(){
        $(location).attr('href','general.html');
    }

    $('#addbutton').click(function(){
        addUser();
    });

    function saveDataGeneral(){
        x = document.getElementById("gname").value;
        obj.name = x;
        y = document.getElementById("fname").value;
        obj.fname = y;
        z = document.getElementById("dob").value;
        obj.dob = z;
        e = document.getElementById("email").value;
        obj.email = e;
    }
    
    var validateGeneral = function(){
        $('#permdiv').hide();
        var ck_name = /^[A-Za-z. ]{3,20}$/;
        var ck_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        var ck_dob = /^[0-9/]/;
        name = document.getElementById("gname").value;
        fname = document.getElementById("fname").value;
        dob = document.getElementById("dob").value;
        email = document.getElementById("email").value;
        if(!ck_name.test(name)) {
            $("#error1").text("*Please enter a name");
        }else if(!ck_name.test(fname)){
            $("#error1").hide();
            $("#error2").text("*Please enter a father name");
        }else if(!ck_dob.test(dob)) {
            $("#error2").hide();
            $("#error3").text("*Please enter a dob");
        }else if(!ck_email.test(email)) {
            $("#error3").hide();
            $("#error4").text("*Please enter a email");
        }else{
            saveDataGeneral();
            $('#genrightdiv').hide();
            $('#creddiv').show();
            $('#prevgeneral').prop('disabled', false).css("cursor", "pointer");
            $('#cancelgeneral').prop('disabled', false).css("cursor", "pointer");
            $("#credgeneral").prop('disabled', false).css("cursor", "pointer");
            document.getElementById('general').style.background = "#f2f2f2";
            document.getElementById('credgeneral').style.background = "#66cc66";
            isValidateGeneral = false;
            isValidateCredential = true;
            return true;
        }
    }
    
    var validateGeneralForCredentialButton = function(){
        $("#credgeneral").prop('disabled', true).css("cursor", "default");
        document.getElementById('credgeneral').style.background = "#4E4E4E";
        var ck_name = /^[A-Za-z. ]{3,20}$/;
        var ck_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        var ck_dob = /^[0-9/]/;
        name = document.getElementById("gname").value;
        fname = document.getElementById("fname").value;
        dob = document.getElementById("dob").value;
        email = document.getElementById("email").value;
        if(!ck_name.test(name)) {
            $("#error1").text("*Please enter a name");
        }else if(!ck_name.test(fname)){
            $("#error1").hide();
            $("#error2").text("*Please enter a father name");
        }else if(!ck_dob.test(dob)) {
            $("#error2").hide();
            $("#error3").text("*Please enter a dob");
        }else if(!ck_email.test(email)) {
            $("#error3").hide();
            $("#error4").text("*Please enter a email");
        }else{
            saveDataGeneral();
            $('#genrightdiv').hide();
            $('#creddiv').show();
            $('#prevgeneral').prop('disabled', false).css("cursor", "pointer");
            $('#cancelgeneral').prop('disabled', false).css("cursor", "pointer");
            $("#credgeneral").prop('disabled', false).css("cursor", "pointer");
            $("#general").prop('disabled', false).css("cursor", "pointer");
            $("#okgeneral").prop('disabled', true).css("cursor", "default");
            $("#nextgeneral").prop('disabled', false).css("cursor", "pointer");
            $("#prevpermission").prop('disabled', false).css("cursor", "pointer");
            $("#permdiv").hide();
            document.getElementById('general').style.background = "#f2f2f2";
            document.getElementById('permission').style.background = "#f2f2f2";
            document.getElementById('credgeneral').style.background = "#66cc66";
            return true;
        }
    }
    
    $('#credgeneral').click(function(){
        validateGeneralForCredentialButton();
    });

    function saveDataCredential(){
        x = document.getElementById("userName").value;
        obj.cred.uname = x;
        y = document.getElementById("password").value;
        obj.cred.pass = y;
        z = document.getElementById("repassword").value;
        obj.cred.repass = z;
    }

    var validateCredential = function(){
        $('#permdiv').hide();
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
            $("#errorc1").show();
        }else if(password == ""){
            $("#errorc1").hide();
            $('#mainerror').show();
        }else if(!lpass.test(password)){
            $("#mainerror").hide();
            $("#errorc3").show();
        }else if(!upass.test(password)){
            $("#errorc2").hide();
            $("#errorc3").hide();
            $("#errorc4").show();
        }else if(!npass.test(password)){
            $("#errorc4").hide();
            $("#errorc5").show();
        }else if (!spass.test(password)){
            $("#errorc5").hide();
            $("#errorc6").show();
        }else if (!ltpass.test(password)){
            $("#errorc6").hide();
            $("#errorc7").show();
        }else if (repassword == "") {
            $("#errorc7").hide();
            $("#errorc8").show();
        } else if(password !== repassword){
            $("#errorc8").hide();
            $("#errorc9").show();
        } else {
            $('#mainerror').hide();
            saveDataCredential();
            $('#prevgeneral').hide();
            $('#creddiv').hide();
            $('#permdiv').show();
            $("#okgeneral").prop('disabled', false).css("cursor", "pointer");
            $("#nextgeneral").prop('disabled', true).css("cursor", "default");
            $("#prevpermission").prop('disabled', false).css("cursor", "pointer");
            $("#permission").prop('disabled', false).css("cursor", "pointer");
            $("#general").prop('disabled', false).css("cursor", "pointer");
            document.getElementById('permission').style.background = "#66cc66";
            document.getElementById('credgeneral').style.background = "#f2f2f2";
            $('#prevpermission').show();
            isValidateCredential = false;
            isValidateGeneral = true;
            return true
        }
    }

    var validateCredentialForPermissionButton = function(){
        $("#permission").prop('disabled', true).css("cursor", "default");
        document.getElementById('permission').style.background = "#4E4E4E";
        $('#permdiv').hide();
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
            $("#errorc1").show();
        }else if(password == ""){
            $("#errorc1").hide();
            $('#mainerror').show();
        }else if(!lpass.test(password)){
            $("#mainerror").hide();
            $("#errorc3").show();
        }else if(!upass.test(password)){
            $("#errorc2").hide();
            $("#errorc3").hide();
            $("#errorc4").show();
        }else if(!npass.test(password)){
            $("#errorc4").hide();
            $("#errorc5").show();
        }else if (!spass.test(password)){
            $("#errorc5").hide();
            $("#errorc6").show();
        }else if (!ltpass.test(password)){
            $("#errorc6").hide();
            $("#errorc7").show();
        }else if (repassword == "") {
            $("#errorc7").hide();
            $("#errorc8").show();
        } else if(password !== repassword){
            $("#errorc8").hide();
            $("#errorc9").show();
        } else {
            $('#mainerror').hide();
            saveDataCredential();
            $('#prevgeneral').hide();
            $('#creddiv').hide();
            $('#permdiv').show();
            $('#genrightdiv').hide();
            $("#okgeneral").prop('disabled', false).css("cursor", "pointer");
            $("#nextgeneral").prop('disabled', true).css("cursor", "default");
            $("#prevpermission").prop('disabled', false).css("cursor", "pointer");
            $("#permission").prop('disabled', false).css("cursor", "pointer");
            $("#general").prop('disabled', false).css("cursor", "pointer");
            document.getElementById('permission').style.background = "#66cc66";
            document.getElementById('credgeneral').style.background = "#f2f2f2";
            document.getElementById('general').style.background = "#f2f2f2";
            $('#prevpermission').show();
            return true;
        }
    }

    function forpermission(){
        if (validateGeneralForCredentialButton() == true && validateCredentialForPermissionButton() == true) {
            $('#creddiv').hide();
            $('#permdiv').show();
            $('#genrightdiv').hide();
            $("#okgeneral").prop('disabled', false).css("cursor", "pointer");
            $("#nextgeneral").prop('disabled', true).css("cursor", "default");
            $("#prevpermission").prop('disabled', false).css("cursor", "pointer");
            $("#permission").prop('disabled', false).css("cursor", "pointer");
            $("#general").prop('disabled', false).css("cursor", "pointer");
            document.getElementById('permission').style.background = "#66cc66";
            document.getElementById('credgeneral').style.background = "#f2f2f2";
            document.getElementById('general').style.background = "#f2f2f2";

        } else {
            $("#permission").prop('disabled', true).css("cursor", "default");
            document.getElementById('permission').style.background = "#4E4E4E";
        }
    }

    $('#permission').click(function(){
        $('#prevgeneral').show();
        $('#prevpermission').hide();
        forpermission();
    });

    $('#prevgeneral').click(function(){
        $('#creddiv').hide();
        $('#permdiv').hide();
        $('#genrightdiv').show();
        document.getElementById('credgeneral').style.background = "#f2f2f2";
        document.getElementById('general').style.background = "#66cc66";
        $("#nextgeneral").prop('disabled', false).css("cursor", "pointer");
        $("#prevgeneral").prop('disabled', true).css("cursor", "default");
        $("#okgeneral").prop('disabled', true).css("cursor", "default");
    });

    $('#general').click(function(){
        document.getElementById('permission').style.background = "#f2f2f2";
        document.getElementById('general').style.background = "#66cc66";
        document.getElementById('credgeneral').style.background = "#f2f2f2";
        $('#permdiv').hide();
        $("#prevgeneral").prop('disabled', true).css("cursor", "default");
        $('#creddiv').hide();
        $('#genrightdiv').show();
        $("#okgeneral").prop('disabled', true).css("cursor", "default");
        $("#nextgeneral").prop('disabled', false).css("cursor", "pointer");
        $("#prevpermission").prop('disabled', true).css("cursor", "default");
    });

    function saveDataPermission(){
        x = document.getElementById("admin").value;
        obj.perm.role = x;
        y = document.getElementById("employee").value;
        obj.perm.role = y;
        s = document.getElementById("health").value;
        obj.perm.dept = s;
        t = document.getElementById("garments").value;
        obj.perm.dept = t;
        u = document.getElementById("food").value;
        obj.perm.dept = u;
        v = document.getElementById("electronics").value;
        obj.perm.dept = v;
    }

    function validatePermission(){
        admin = document.getElementsByName("role");
        department = document.getElementsByName("dept");
        var result = false;
        for (var i = 0; i < admin.length; i++){
            if (admin[i].checked == true){
                result = true;
                break;
            }
        }
        if (!result) {
            $("#radiodiv").show();
        }else{
            $("#radiodiv").hide();
        }
        result = false;
        for (var j = 0; j < department.length; j++){
            if (department[j].checked == true){
                result = true;
                saveDataPermission();
                showDetail();
                $("#permdiv").hide();
                $("#detaildiv").show();
                break;    
            }
        }
        if (result == false) {
            $("#checkdiv").show();    
        }
    }

    $('#okgeneral').click(function(){
        validatePermission();
    });

    $('#prevpermission').click(function(){
        $('#permdiv').hide();
        $('#creddiv').show();
        $('#prevpermission').hide();
        $('#prevgeneral').show();
        $('#nextgeneral').prop('disabled', false).css("cursor", "pointer");
        document.getElementById("permission").style.background = "#f2f2f2";
        document.getElementById("credgeneral").style.background = "#66cc66";
        $('#general').prop('disabled', false).css("cursor", "pointer");
        $('#permission').prop('disabled', false).css("cursor", "pointer");
        $("#okgeneral").prop('disabled', true).css("cursor", "default");
    });
    
    $('.hidecancel').click(function(){
        $('.popupcontent').hide();
        $('#okpermission').prop('disabled', false).css("cursor", "pointer");
        $('#prevpermission').prop('disabled', false).css("cursor", "pointer");
        $('#nextcredential').prop('disabled', false).css("cursor", "pointer");
        $('#prevcredential').prop('disabled', false).css("cursor", "pointer");
        $('#nextgeneral').prop('disabled', false).css("cursor", "pointer");
    });

    $('.okcancel').click(function(){
        $(location).attr('href','general.html');
    });

    $('#cancelgeneral').click(function(){
        geninput = document.getElementById("gname").value;
        fname = document.getElementById("fname").value;
        dob = document.getElementById("dob").value;
        email = document.getElementById("email").value;
        if (geninput == "" && fname == "" && dob == "" && email == "") {
            $("#detaildiv").show();
            $("#content").hide();
            $('#genrightdiv').hide();
        } else {
            $('.popupcontent').show();
        }
        $('#okgeneral').prop('disabled', true).css("cursor", "default");
        $('#nextgeneral').prop('disabled', true).css("cursor", "default");
    });

    function showDetail(){
        $('.topdiv').text("User successfully created!");
        document.getElementById("topdiv").style.background = "#99ffcc";
        document.getElementById("leftdiv").style.background = "#99ffcc";
        document.getElementById("topdiv").style.textAlign = "center";
        $('#okgeneral').hide();
        $('#prevgeneral').hide();
        $('#nextgeneral').hide();
        $('.pdiv').hide();
        $('#dname').text(obj.name);
        $('#dfname').text(obj.fname);
        $('#ddob').text(obj.dob);
        $('#demail').text(obj.email);
        $('#dusername').text(obj.cred.uname);
        $('#dpass').text(obj.cred.pass);
        $('#drepass').text(obj.cred.repass);
        $('#drole').text(obj.perm.role);
        $('#ddept').text(obj.perm.dept);
    }
    
    function nextButtonHandler() {
        if(isValidateGeneral) {
            validateGeneral();
            $('#permdiv').hide();
        }else if(isValidateCredential) {
            document.getElementById('general').style.background = "#f2f2f2";
            validateCredential();
            //document.getElementById('credgeneral').style.background = "#66cc66";    
        }
    }

    $('#nextgeneral').click(function(){
        nextButtonHandler();
    });

});