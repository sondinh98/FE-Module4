$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
     const id = urlParams.get("userAccId");
    $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: "http://localhost:8080/userAccDetail/" + id,
        success: function (data) {
            $(".userAccFullName").html(data.fullName);
            avatarUserAcc(data.avatar)
            getAllPostOneUserAcc(id)
            $("#idUser").val(id);


        },
        error: function (err) {
            console.log("loi")
        }
    })
});
function avatarUserAcc(avatar){
    let str = `
    								<img src="${avatar}" alt="">

    `
    $(".userAvatar1").html(str)
}

function getAllPostOneUserAcc(id) {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: "http://localhost:8080/posts/user/" +id,
        success: function (data) {
            showPostUserAcc(data,id);
        },
        error: function (err) {
            console.log(err)
        }
    })
}
function showPostUserAcc(data,id){
    let str = ``
    for (const post of data) {
        str += `
<div class="central-meta item" >
<div class="user-post" >
        <div class="friend-info">
												<figure>
													<img src="${post.userAcc.avatar}" alt="">
													
												</figure>
												<div class="friend-name">
													<ins><a class="userAccFullName">${post.userAcc.fullName}</a></ins>
													<span>${post.createDate}</span>
												</div>
												<div class="description">
														
														<p>
														${post.content}
														</p>
													</div>
											
												<div class="post-meta">
													<div id="imageContainer${post.id}"></div>
													<div class="we-video-info">
											

													</div>		
													<div class="we-video-info">
														<ul>
															
							
															<li onclick="showComment(${post.id})">
															<span class="comment" data-toggle="tooltip" title="Comments">
																<i class="fa fa-comments-o"></i>
																<ins>${post.commentCount}</ins>
															</span>
															</li>
															<li>
																<span class="like" data-toggle="tooltip" title="like">
																	<i class="ti-heart"></i>
																	<ins>${post.likeCount}</ins>
																</span>
															</li>
															<li>
																<span class="dislike" data-toggle="tooltip" title="dislike">
																	<i class="ti-heart-broken"></i>
																	<ins>200</ins>
																</span>
															</li>
															<div hidden="hidden" class="hiddenED">
															<li><a  class="btn btn-warning" href="edit-post.html?postId=${post.id}">Edit</a></li>
															<li><a  class="btn btn-danger"  data-id="${post.id}">Delete</a></li>
															</div>
															<li class="social-media">
																<div class="menu">
																  <div class="btn trigger"><i class="fa fa-share-alt"></i></div>
																  <div class="rotater">
																	<div class="btn btn-icon"><a href="#" title=""><i class="fa fa-html5"></i></a></div>
																  </div>
																  <div class="rotater">
																	<div class="btn btn-icon"><a href="#" title=""><i class="fa fa-facebook"></i></a></div>
																  </div>
																  <div class="rotater">
																	<div class="btn btn-icon"><a href="#" title=""><i class="fa fa-google-plus"></i></a></div>
																  </div>
																  <div class="rotater">
																	<div class="btn btn-icon"><a href="#" title=""><i class="fa fa-twitter"></i></a></div>
																  </div>
																  <div class="rotater">
																	<div class="btn btn-icon"><a href="#" title=""><i class="fa fa-css3"></i></a></div>
																  </div>
																  <div class="rotater">
																	<div class="btn btn-icon"><a href="#" title=""><i class="fa fa-instagram"></i></a>
																	</div>
																  </div>
																	<div class="rotater">
																	<div class="btn btn-icon"><a href="#" title=""><i class="fa fa-dribbble"></i></a>
																	</div>
																  </div>
																  <div class="rotater">
																	<div class="btn btn-icon"><a href="#" title=""><i class="fa fa-pinterest"></i></a>
																	</div>
																  </div>

																</div>
															</li>
															

														</ul>
														<div class="coment-area">
                                                        <div id="commentP${post.id}"></div>
                                                        </div>
													</div>
												</div>
											</div>
											</div>
											</div>  
											
     `
    }
        $("#postDetail").html(str)
    const userAcc = localStorage.getItem('user');
    let userAccOjb = JSON.parse(userAcc);
    let userAccId = userAccOjb.id;
    if (id == userAccId){
        let elements = document.getElementsByClassName("hiddenED");
        for (var i = 0; i < elements.length; i++) {
            elements[i].hidden = false;
        }
    }
    for (const p of data) {
        let imageContainer = document.getElementById(`imageContainer` + p.id);

        if (p.img != null) {
            let image = document.createElement("img");

            // Chuyển đổi mảng byte thành chuỗi base64
            const binaryString = atob(p.img);
            const length = binaryString.length;
            const uint8Array = new Uint8Array(length);
            for (let i = 0; i < length; i++) {
                uint8Array[i] = binaryString.charCodeAt(i);
            }
            let base64String = btoa(String.fromCharCode.apply(null, uint8Array));
            image.src = `data:image/png;base64,${base64String}`;
            imageContainer.appendChild(image);
        }

    }

}

$(document).on("click", "#deleteUserAcc", function() {
    const postId = $(this).data("id");
    if (confirm("Bạn có chắc chắn muốn xoá bài viết này?")) {
        $.ajax({
            type: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            url: "http://localhost:8080/posts/deletePost/" + postId,
            success: function () {
                alert("Đã xoá bài viết thành công!");
                window.location.reload();
            },
            error: function (err) {
                console.log(err)
            }
        });
    }
});
function backhome(){
    window.location.href = `index.html`
}

$(document).ready(function () {
    $('#createPostForm').submit(function (event) {
        event.preventDefault();
        let form = document.getElementById("createPostForm");
        let formData = new FormData(form);
        console.log(formData.get("file"))
        $.ajax({
            type: "POST",
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            url: "http://localhost:8080/posts/createPost",
            data: formData,
            contentType: false,
            processData: false,
            success: function (posts) {
                console.log("Create post successful!");
                new URLSearchParams(window.location.search).set("userAccId" , posts.id)
                form.reset();
            },
            error: function (err) {
                console.log("Create post error:", err);
            }
        });
    });
});

