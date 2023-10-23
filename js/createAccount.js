function showFormRegister(){
    let form = "";
    form +=`
    <h2 class="log-title">Register</h2>
<p>
Don’t use Winku Yet? <a href="#" title="">Take the tour</a> or <a href="#" title="">Join now</a>
</p>
<div>
<div class="form-group">
 <input type="text" id="fullname1" required="required"/>
  <label class="control-label" for="input">Full Name</label><i class="mtrl-select"></i>
</div>
<div class="form-group">
  <input type="text" id="username1" required="required"/>
 <label class="control-label" for="input">User Name</label><i class="mtrl-select"></i>
</div>
<div class="form-group">
  <input type="password" id="password1" required="required"/>
 <label class="control-label" for="input">Password</label><i class="mtrl-select"></i>
</div>
<div class="form-group">
  <input type="email" id="email1"  required="required"/>
 <label class="control-label" for="input">Email</label><i class="mtrl-select"></i>
</div>
<div class="checkbox">
  <label>
<input type="checkbox" checked="checked"/><i class="check-box"></i>Accept Terms & Conditions ?
 </label>
</div>
<a href="#" title="" class="already-have">Already have an account</a>
<div class="submit-btns">
<button class="mtr-btn signup" type="button" onclick="showFormLogin()"><span>Back</span></button>

<button class="mtr-btn signup" type="button" onclick="register()"><span>Register</span></button>
<!--<button class="mtr-btn signup" type="button" onclick="showFormLogin()"><span>login</span></button>-->
</div>
</div>
    `
    document.getElementById("displayFormRegister").innerHTML = form;
}
function register(){
    let username = $('#username1').val();
    let pass = $('#password1').val();
    let email = $('#email1').val();
    let fullname = $('#fullname1').val();
    console.log(username)
    console.log(pass)
    console.log(email)
    console.log(fullname)
    let acc = {};
    // Kiểm tra các trường dữ liệu nhập
    if (username !== '' && pass !== '' && email !== '' && fullname !== '') {
        acc = {
            username: username,
            password: pass,
            email: email,
            fullName: fullname
        };
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            type: "POST",
            data: JSON.stringify(acc),
            url: "http://localhost:8080/register",
            success: function (data) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Thành công',
                    showConfirmButton: false,
                    timer: 1500
                });
                // window.location.reload();
                location.href = "landing.html";
            },
            error: function () {
                alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
            }
        });
    } else {
        alert("Hãy nhập đầy đủ thông tin.");
    }
}
function showFormLogin(){
    let form= "";
    form+=`
    <h2 class="log-title">Login</h2>
<p>
Don’t use Winku Yet? <a href="#" title="">Take the tour</a> or <a href="#" title="">Join now</a>
</p>
<div>
<div class="form-group">\t
  <input type="text" id="username" required="required"/>
 <label class="control-label" for="input">Username</label><i class="mtrl-select"></i>
</div>
<div class="form-group">\t
  <input type="password" id="password" required="required"/>
 <label class="control-label" for="input">Password</label><i class="mtrl-select"></i>
 <p id="error" style="color: red"></p>
</div>
<div class="checkbox">
  <label>
<input type="checkbox" checked="checked"/><i class="check-box"></i>Always Remember Me.
 </label>
</div>
<a href="forgot-password.html" title="" class="forgot-pwd">Forgot Password?</a>
<div class="submit-btns">
<button class="mtr-btn signin" type="button" onclick="login()"><span>Login</span></button>
<button class="mtr-btn signup" type="button" onclick="showFormRegister()"><span>Register</span></button>

</div>
</div>`
    document.getElementById("loginFormContainer").innerHTML = form;
}
showFormLogin()

