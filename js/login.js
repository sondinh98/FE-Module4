function login() {
    let username = $("#username").val();
    let password = $("#password").val();
    let useracc = {username, password};

    $.ajax({
        type: "Post",
        contentType: "application/json",
        url: "http://localhost:8080/login",
        data: JSON.stringify(useracc),
        success: function (data) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data));
            location.href = "index.html";
        },
        error: function (err) {
            console.log(err);
            $("#error").text("Nhập sai tên tài khoản hoặc mật khẩu").show();
        }
    })

}