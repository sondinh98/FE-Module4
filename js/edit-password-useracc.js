$(document).ready(function (){
    let userAcc = localStorage.getItem('user');
    let userAccOjb = JSON.parse(userAcc)
    let userAccId = userAccOjb.id
    $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: "http://localhost:8080/userAccDetail/" + userAccId,
        success: function (data) {
            $(".fullName").html(data.fullName);
           avatarUserAcc(data.avatar)

        },
        error: function (err) {
            console.log("loi")
        }
    })
})

function avatarUserAcc(avatar){
    let str = `
    								<img src="${avatar}" alt="">

    `
    $(".userAvatar1").html(str)
}
function back(){
    const userAcc = localStorage.getItem('user');
    let userAccOjb = JSON.parse(userAcc)
    window.location.href = `time-line.html?userAccId=` + userAccOjb.id;
}

function changePass(){
    const userAcc = localStorage.getItem('user');
    let userAccOjb = JSON.parse(userAcc)
    let userAccId = userAccOjb.id
    let passwordOld = $("#passwordOld").val();
    let password = $("#password").val();
    let passwordNew = $("#passwordNew").val();
    var regex = /^[!@#$%^&*][a-zA-Z0-9]+$/;


    if ( passwordNew === "" ||  password === "" ||  passwordOld === "") {

        $("#checkNull").text("Có một hoặc nhiều ô nhập đang để trống").show()
    } else {
        if (!regex.test(passwordNew)) {
            $("#regexNewPass").text("Mật khẩu phải chứa ít nhất một chữ viết hoa, một số và một kí tự đặc biệt.").show()
        } else {
            if (password !== passwordNew){
                $("#checkNewPass").text("Mật khẩu nhập lại chưa đúng").show()
            } else {
                if (passwordNew === passwordOld) {
                    $("#tb").text("Mật khẩu mới trùng với mật khẩu hiện ").show()
                } else {

                    $.ajax({
                        type: "POST",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        },
                        url: "http://localhost:8080/editPassword/" + userAccId + "/" + passwordNew + "/" + passwordOld,

                        success: function () {
                           window.location.href = `landing.html`

                        },
                        error: function (err) {
                            $("#tb").text("Mật khẩu không chính xác")
                        }
                    })
                }
            }
        }
    }



}
function backhome(){
    window.location.href = `index.html`
}


