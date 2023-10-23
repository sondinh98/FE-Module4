function getAll() {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: "http://localhost:8080/posts",
        success: function (data) {
            let user = localStorage.getItem("user");
            let userOj = JSON.parse(user)
            imgUser(userOj)

            showPost(data);
        },
        error: function (err) {
            console.log(err);
        }
    })
}

function imgUser(userOj) {
    let str = `<a href="time-line.html?userAccId=${userOj.id}" ><img width="50" height="10" src="${userOj.avatar}" alt=""></a>`
    $("#imgUser").html(str)

}

function showPost(arr) {
    let str = "";
    for (const post of arr) {
        str += `
<div class="central-meta item" >
<div class="user-post" >
        <div class="friend-info">
												<figure>
													<a  href="time-line.html?userAccId=${post.userAcc.id}"> <img src="${post.userAcc.avatar}" alt=""></a>
													
												</figure>
												<div class="friend-name">
													<ins><a  href="time-line.html?userAccId=${post.userAcc.id}">${post.userAcc.fullName}</a></ins>
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
    document.getElementById("post").innerHTML = str;
    for (const p of arr) {
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

getAll();

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
                showPost(posts)
                form.reset();
            },
            error: function (err) {
                console.log("Create post error:", err);
            }
        });
    });
});


