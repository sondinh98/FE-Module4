showFormListFriends()
function showFormListFriends() {
    $.ajax({
        url: 'http://localhost:8080/api/getAllUsers', // Địa chỉ URL của API
        type: 'get',
        dataType: 'json',
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        success: function (data) {
            console.log(1)
            // Xử lý phản hồi từ máy chủ
            // Lấy thông tin về tài khoản đang đăng nhập từ local storage
            const currentUser = JSON.parse(localStorage.getItem('user'));
            if (!currentUser) {
                console.log("Không tìm thấy thông tin tài khoản đăng nhập.");
                return;
            }
            // Lọc bỏ tài khoản đang đăng nhập khỏi danh sách người dùng
            const filteredUsers = data.filter(user => user.id !== currentUser.id);

            let form = "";
            for (let i = 0; i < filteredUsers.length; i++) {
                form += `
                    <li>
                        <div class="nearly-pepls">
                            <figure>
                                <a href="" title=""><img src="${filteredUsers[i].avatar}" alt=""></a>
                            </figure>
                         <div class="pepl-info">
    <h4><a href="#" title="">${filteredUsers[i].fullName}</a></h4>
    <span>${filteredUsers[i].description}</span>
    <a href="#" title="" type="button" class="add-butn more-action" data-ripple="" onclick="unfriend(${filteredUsers[i].id}); return false;">unfriend</a>
<a href="#" title="" type="button" class="add-butn" data-ripple="" onclick="sendAddFriend(JSON.parse(localStorage.getItem('user')).id, parseInt('${filteredUsers[i].id}')); return false;">add friend</a>
</div>
                        </div>
                    </li>
                `;
            }
            document.getElementById("listMyFriends").innerHTML = form;
        },
        error: function (xhr, status, error) {
            // Xử lý lỗi nếu có
            console.log(error);
        }
    });
}



function sendAddFriend(currentUser, targetUser) {
    var data = {
        senderId: currentUser,
        receiverId: targetUser,
        status: 0
    };
    $.ajax({
        url: 'http://localhost:8080/api/sendAddFriend', // Địa chỉ URL của API
        type: 'POST',
        dataType: 'text',
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        data: JSON.stringify(data),
        success: function (response) {
            // Xử lý phản hồi từ máy chủ
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: response,
                showConfirmButton: false,
                timer: 1500
            });

        },

        error: function (xhr, status, error) {
            // Xử lý lỗi nếu có
            console.log(error);
        }
    });
}

function showFormFriendsRequets() {
    // Lấy thông tin người dùng từ localStorage
    let user = JSON.parse(localStorage.getItem('user'));
    let loggedInUserId = user.id;
    $.ajax({
        url: 'http://localhost:8080/api/friendRequests', // Địa chỉ URL của API
        type: 'get',
        dataType: 'json',
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        data: JSON.stringify(loggedInUserId),
        success: function (response) {
            console.log(response)
            let forms = "";
            for (let i = 0; i < response.length; i++) {
                forms+= `
                    <li>
                        <div class="nearly-pepls">
                        
                            <figure>
                                <a href="#" title=""><img src="${response[i].userAcc.avata}" alt=""></a>
                            </figure>
                            <div class="pepl-info">
                                <h4><a href="#" title="">${response[i].userAcc.fullName}</a></h4>
                                <span>${response[i].userAcc.description}</span>
                               <!-- Truyền id của tài khoản đang đăng nhập vào hàm unfriend -->
                               <a href="#" type="button" class="add-butn more-action" data-ripple=""
                        onclick="deleteFriendRequest(${response[i].friend.id}, ${response[i].userAcc.id});">
                         delete Request</a>

                                <a href="#"  type="button" class="add-butn" data-ripple=""
                                 onclick="confirmFrienRequest(${response[i].friend.id},
                                ${response[i].userAcc.id})">Confirm</a>
                            </div>
                        </div>
                    </li>
         `
                document.getElementById("listFriendRequest").innerHTML = forms
            }
        },
        error: function (xhr, status, error) {
            // Xử lý lỗi nếu có
            console.log(error);
        }
    });
}
showFormFriendsRequets()
function unfriend(userAccId){
    let user = JSON.parse(localStorage.getItem('user'));
    let idFriend = user.id;
    let data = {
        senderId: userAccId,
        receiverId: idFriend
    }


         $.ajax({
                             url: 'http://localhost:8080/api/unfriend', // Địa chỉ URL của API
                             type: 'POST',
                             dataType: 'text',
                             contentType: 'application/json',
             headers: {
                 'Authorization': 'Bearer ' + localStorage.getItem('token')
             },

             data: JSON.stringify(data),
                             success: function (response) {
                                 // Xử lý phản hồi từ máy chủ
                                 Swal.fire({
                                     position: 'center',
                                     icon: 'success',
                                     title: response,
                                     showConfirmButton: false,
                                     timer: 1500
                                 });
                             },
                             error: function (xhr, status, error) {
                                 // Xử lý lỗi nếu có
                                 console.log(error);
                             }
                         });
}

function confirmFrienRequest(friendId,userAccId){
    let data = {
        senderId: userAccId,
        receiverId:  friendId
    }

         $.ajax({
             url: 'http://localhost:8080/api/acceptFriendRequest', // Địa chỉ URL của API
                             type: 'POST',
                             dataType: 'json',
                             contentType: 'application/json',
             headers: {
                 'Authorization': 'Bearer ' + localStorage.getItem('token')
             },
                             data: JSON.stringify(data),
                             success: function () {
                                 // Xử lý phản hồi từ máy chủ
                                 // $("#result").text(response.message);
                                 Swal.fire({
                                     position: 'center',
                                     icon: 'success',
                                     title: 'các bạn đã thành bạn bè',
                                     showConfirmButton: false,
                                     timer: 1500
                                 });
                             },
                             error: function (xhr, status, error) {
                                 // Xử lý lỗi nếu có
                                 console.log(error);
                             }
                         });
}

function deleteFriendRequest(friendId,userAccId) {

    let data = {
        senderId: userAccId,
        receiverId:  friendId
    }

    console.log(data)

    $.ajax({
        url: 'http://localhost:8080/api/delFriendRequests', // Địa chỉ URL của API
        type: 'post', // Sử dụng phương thức DELETE để xóa lời mời
        dataType: 'json',
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        data: JSON.stringify(data),
        success: function () {
            console.log(1)
            // Xử lý phản hồi từ máy chủ (trong trường hợp này là thông báo "Đã xóa lời mời kết bạn thành công.")
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: "xóa lời mời kết bạn thành công",
                showConfirmButton: false,
                timer: 1500
            });
        },
        error: function (xhr, status, error) {
            // Xử lý lỗi nếu có
            console.log(error);
        }
    });
}
