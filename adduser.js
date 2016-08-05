
var obj = {name:"", fname:"", dob:"", email:"", cred:{uname:"", pass:"", repass:""}, perm:{role:"", dept:""}};

$(document).ready(function() {
    var currentPages, currentPagee, name, fname, dob, email, username, password, admin, baseText = null, textfield1, textfield2, textfield3, textfield4, textfield5, textfield6, textfield7, textfield8, details, userObj, ids,divs, geninput, retvalue = 1;
    
    var validateGeneral = function(){
        $('#permission').hide();
        $(".inputerror").show();
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
            $(".inputerror").hide();
            saveDataGeneral();
            $('#general').hide();
            $('#credential').show();
            $('#cancelgeneral').addClass("enableleftpanel");
            $('.credential').removeClass("disableleftpanel").addClass("selectorleftpanel enableleftpanel").attr("disabled",false);
            $('.general').addClass("enableleftpanel").removeClass("selectorleftpanel");
            $('#prevbutton').removeClass("disableleftpanel").removeAttr("disabled",true);
            pageProps[currentPages].isFirstTime = false;
            pageProps.currentPage = pageProps[currentPages].nextPage;
            pageProps.credential.isValidate = true;
            pageProps[currentPages].isEnabled = true;
            console.log("validateGeneral currentPage:",pageProps.currentPage);
            return true;
        }
        $("#credentialbutton").removeClass("enableleftpanel").addClass("disableleftpanel").attr("disabled",true);
        $("#permissionbutton").removeClass("enableleftpanel").addClass("disableleftpanel").attr("disabled",true);
    }

    var passwordVerification = function(){
        var lpass = /(?=.*[a-z])/;
        var upass = /(?=.*[A-Z])/;
        var npass = /(?=.*[0-9])/;
        var spass = /(?=.*[!@#\$%\^&\*])/;
        var ltpass = /(?=.{8,})/;
        if(!lpass.test(password)){
            $("#mainerror").show();
            $("#errorc3").show();
        }else if(!upass.test(password)){
            $("#mainerror").show();
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
        }else{
            return true;
        }
        $('#mainerror').show();
    }

    var validateCredential = function(){
        console.log('In validateGeneral fn:: ');
        $('#permission').hide();
        var u_name = /^[a-z0-9_-]{3,15}$/;
        uname = document.getElementById("userName").value;
        password = document.getElementById("password").value;
        repassword = document.getElementById("repassword").value;
        if (!u_name.test(uname)) {
            $("#errorc1").text("*Please enter a username");
            $("#errorc1").show();
        }else if(password == ""){
            $("#errorc1").hide();
            $('#mainerror').show();
        } else if (passwordVerification()) {
            $("#errorc1").hide();
            $('#mainerror').hide();
            saveDataCredential();
            $('#credential').hide();
            $('#permission').show();
            $("#okbutton").removeClass("disableleftpanel").attr("disabled",false);
            $("#nextbutton").addClass("disableleftpanel").attr("disabled",true);
            $("#permissionbutton").removeClass("disableleftpanel").addClass("selectorleftpanel").removeAttr("disabled");
            $("#generalbutton").removeClass("disableleftpanel");
            $("#credentialbutton").removeClass("disableleftpanel selectorleftpanel").removeAttr("disabled");
            pageProps[currentPages].isPrevAvailable = true;
            pageProps[currentPages].isFirstTime = false;
            pageProps[currentPages].isValidate = true;
            pageProps[currentPages].isEnabled = true;
            pageProps[currentPages].isOnPermission = true;
            console.log("validateCredential currentPage:",pageProps.currentPage);
            return true;
        }
    }

    var validatePermission = function(){
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
                $("#permission").hide();
                $("#detaildiv").show();
                break;    
            }
        }
        if (result == false) {
            $("#checkdiv").show();    
        }
    }

    var clickOnPrev = function(){
        var currentPG = pageProps.currentPage;
        if (pageProps[currentPG].isOnPermission) {
            $('#permission').hide();
            $('#general').hide();
            $('#credential').show();
            $('#nextbutton').removeClass("disableleftpanel").attr("disabled",false);
            $("#okbutton").addClass("disableleftpanel").attr("disabled",true);
            $("#permissionbutton").removeClass("disableleftpanel selectorleftpanel").addClass("enableleftpanel");
            $('.credential').addClass("selectorleftpanel enableleftpanel").removeClass("disableleftpanel").removeAttr("disabled");
            pageProps[currentPG].isOnPermission = false;
        }else{
            $("#"+pageProps[currentPages].prevPage).show();
            $("#"+pageProps.currentPage).hide();
            pageProps.currentPage = pageProps[currentPG].prevPage;
            $('#prevbutton').addClass("disableleftpanel").attr("disabled",true);
            $("#credentialbutton").removeClass("disableleftpanel selectorleftpanel").addClass("enableleftpanel").removeAttr("disabled");
            $("#generalbutton").addClass("selectorleftpanel enableleftpanel").removeClass("disableleftpanel");
        }
    }

    var nextButtonHandler = function(){
        currentPages = pageProps.currentPage;
        if (pageProps[currentPages].isNextAvailable){
            if (pageProps[currentPages].isValidate){
                pageProps[currentPages].validFn();
            }
        }
        console.log("nextButtonHandler isNextAvailable:",pageProps[currentPages].isNextAvailable); 
        console.log("nextButtonHandler isValidate:",pageProps[currentPages].isValidate);
        console.log("nextButtonHandler currentPages:",currentPages);    
    }

    var prevButtonHandler = function(){
        var currentPages = pageProps.currentPage;
        if (pageProps[currentPages].isPrevAvailable){
            clickOnPrev();
        }
        console.log("prevButtonHandler isPrevAvailable:",pageProps[currentPages].isPrevAvailable); 
        console.log("prevButtonHandler currentPage:",currentPages);
    }

    var checkStatusForgeneral = function(){   
        if (currentPagee == "credential") {
            $('#permission').hide();
            $('#credential').hide();
            $('#general').show();
            $("#generalbutton").addClass("selectorleftpanel");
            $("#permissionbutton").removeClass("selectorleftpanel");
            $('#prevbutton').addClass("disableleftpanel").attr("disabled",true);
            $("#credentialbutton").removeClass("selectorleftpanel disableleftpanel").addClass("enableleftpanel").removeAttr("disabled");
            $("#okbutton").addClass("disableleftpanel").attr("disabled",true);
            $('#nextbutton').removeClass("disableleftpanel").attr("disabled",false);
        }
    }

    var clickOnGeneral = function(){
        currentPagee = pageProps.currentPage;
        if (currentPagee == "credential") {
            pageProps.currentPage = pageProps[currentPagee].prevPage;
            checkStatusForgeneral();
            console.log("clickOnGeneral page credential:", pageProps.currentPage);
        } 
        console.log("clickOnGeneral:",currentPagee);
    }

    var reValidationGeneral = function(){
        rename = document.getElementById("gname").value;
        refname = document.getElementById("fname").value;
        redob = document.getElementById("dob").value;
        reemail = document.getElementById("email").value;
        if(rename == "" && refname == "" && redob == "" && reemail == ""){
            validateGeneral();    
        }else{
            $('.credential').removeClass("disableleftpanel").addClass("selectorleftpanel enableleftpanel").removeAttr("disabled");
            $('#nextbutton').removeClass("disableleftpanel").attr("disabled",false);
            $("#okbutton").addClass("disableleftpanel").attr("disabled",true);
        }
    }

    var validationForCredentialButton = function(){
        var currentPageOnBack = pageProps.currentPage;
        console.log("validationForCredentialButton currentPageOnBack:",currentPageOnBack);
        if (!pageProps[currentPageOnBack].isFirstTime) {
            validateGeneral();
            pageProps.credential.isOnPermission = false;
            $('#nextbutton').removeClass("disableleftpanel").attr("disabled",false);
            $("#okbutton").addClass("disableleftpanel").attr("disabled",true);
            console.log("validationForCredentialButton:",pageProps.currentPage);
        }else if (pageProps.currentPageOnBack == "general") {
            pageProps.credential.isOnPermission = false;
            pageProps.currentPage = pageProps[currentPageOnBack].nextPage;
        }else{
            pageProps.credential.isOnPermission = false;
            reValidationGeneral();
            console.log("else");
        }
    }
    
    $('#credentialbutton').click(function(){
        validationForCredentialButton();
        $("#permissionbutton").removeClass("selectorleftpanel");
    });

    var pageProps = {
        currentPage: "general",
        general:{
            isValidate:true,
            isEnabled:true,
            isNextAvailable:true,
            isPrevAvailable:false,
            nextPage:"credential",
            prevPage:"general",
            isFirstTime:true,
            isOnPermission:false,
            validFn: validateGeneral
        },
        credential:{
            isValidate:false,
            isEnabled:false,
            isNextAvailable:true,
            isPrevAvailable:true,
            nextPage:"credential",
            prevPage:"general",
            isFirstTime:true,
            isOnPermission:false,
            validFn: validateCredential
        }
    };

    $('#credential').hide();
    $('#permission').hide();
    $('#radiodiv').hide();
    $('#checkdiv').hide();
    $('#detaildiv').hide();
    $('#errorc8').hide();
    $('#errorc9').hide();
    $('#mainerror').hide();
    $('.popupcontent').hide();
    $('#prevbutton').addClass("disableleftpanel").attr("disabled",true);
    $("#okbutton").addClass("disableleftpanel").attr("disabled",true);
    $("#permissionbutton").addClass("disableleftpanel").attr("disabled",true);
    $("#credentialbutton").addClass("disableleftpanel").attr("disabled",true);
    $("#generalbutton").addClass("selectorleftpanel");

    $("#dob").datepicker({
        yearRange: "1980:2000",
        changeMonth: true,
        changeYear: true,
    });

    var addUser = function(){
        $(location).attr('href','general.html');
    }

    $('#addbutton').click(function(){
        addUser();
    });

    var saveDataGeneral = function(){
        textfield1 = document.getElementById("gname").value;
        obj.name = textfield1;
        textfield2 = document.getElementById("fname").value;
        obj.fname = textfield2;
        textfield3 = document.getElementById("dob").value;
        obj.dob = textfield3;
        textfield4 = document.getElementById("email").value;
        obj.email = textfield4;
    }

    var saveDataCredential = function(){
        textfield1 = document.getElementById("userName").value;
        obj.cred.uname = textfield1;
        textfield2 = document.getElementById("password").value;
        obj.cred.pass = textfield2;
        textfield3 = document.getElementById("repassword").value;
        obj.cred.repass = textfield3;
    }

    var validationForPermissionButton = function(){
        
        if (validateGeneral()&&validateCredential()) {
            $('#credential').hide();
            $('#permission').show();
            $('#general').hide();
            $("#okbutton").removeClass("disableleftpanel").attr("disabled",false);
            $("#nextbutton").addClass("disableleftpanel").attr("disabled",true);
            $("#permissionbutton").removeClass("disableleftpanel").addClass("selectorleftpanel").removeAttr("disabled");
            $("#credentialbutton").removeClass("disableleftpanel").addClass("enableleftpanel").removeAttr("disabled");
            $("#generalbutton").prop('disabled', false).css("cursor", "pointer");
            pageProps[currentPages].isNextAvailable = true;
            pageProps[currentPages].isValidate = true;
            console.log("validationForPermissionButton if both are true:");

        }else if(!validateCredential()) {
            pageProps.credential.isOnPermission = false;
            pageProps.currentPage = "credential";
            $('#nextbutton').removeClass("disableleftpanel").attr("disabled",false);
            $("#permissionbutton").addClass("disableleftpanel").removeClass("selectorleftpanel").attr("disabled",true);
        }else{
            $('#permission').hide();
            $("#okbutton").addClass("disableleftpanel").attr("disabled",true);
            $('#nextbutton').removeClass("disableleftpanel").attr("disabled",false);
            $("#credentialbutton").addClass("disableleftpanel").removeClass("selectorleftpanel").attr("disabled",true);
            $("#permissionbutton").addClass("disableleftpanel").removeClass("selectorleftpanel").attr("disabled",true);
        }
        console.log("click on permission button::",pageProps.currentPage);
    }

    $('#permissionbutton').click(function(){
        validationForPermissionButton();
    });

    $('#generalbutton').click(function(){
        clickOnGeneral();
    });

    var saveDataPermission = function(){
        textfield1 = document.getElementById("admin").value;
        obj.perm.role = textfield1;
        textfield2 = document.getElementById("employee").value;
        obj.perm.role = textfield2;
        textfield5 = document.getElementById("health").value;
        obj.perm.dept = textfield5;
        textfield6 = document.getElementById("garments").value;
        obj.perm.dept = textfield6;
        textfield7 = document.getElementById("food").value;
        obj.perm.dept = textfield7;
        textfield8 = document.getElementById("electronics").value;
        obj.perm.dept = textfield8;
    }

    $('#okbutton').click(function(){
        validatePermission();
    });
    
    $('.hidecancel').click(function(){
        $('.popupcontent').hide();
        $('#okpermission').prop('disabled', false).css("cursor", "pointer");
        $('#nextcredential').prop('disabled', false).css("cursor", "pointer");
        $('#nextbutton').prop('disabled', false).css("cursor", "pointer");
    });

    $('.hidecancelpermission').click(function(){
        $('.popupcontent').hide();
        $("#nextbutton").addClass("disableleftpanel").attr("disabled",true);
        $('#okpermission').prop('disabled', false).css("cursor", "pointer");
        $('#okbutton').prop('disabled', false).css("cursor", "pointer");
    });

    $('.okcancel').click(function(){
        $(location).attr('href','general.html');
    });

    $('#cancelbutton').click(function(){
        geninput = document.getElementById("gname").value;
        fname = document.getElementById("fname").value;
        dob = document.getElementById("dob").value;
        email = document.getElementById("email").value;
        if (geninput == "" && fname == "" && dob == "" && email == "") {
            $("#detaildiv").show();
            $("#content").hide();
            $('#general').hide();
        } else {
            $('.popupcontent').show();
        }
        $('#okbutton').prop('disabled', true).css("cursor", "default");
        $('#nextbutton').prop('disabled', true).css("cursor", "default");
    });

    var showDetail = function(){
        $('.topdiv').text("User successfully created!");
        document.getElementById("topdiv").style.background = "#99ffcc";
        document.getElementById("leftdiv").style.background = "#99ffcc";
        document.getElementById("topdiv").style.textAlign = "center";
        $('#okbutton').hide();
        $('#nextbutton').hide();
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

    $('#nextbutton').click(function(){
        nextButtonHandler();
    });

    $('#prevbutton').click(function(){
        prevButtonHandler();
    });

});