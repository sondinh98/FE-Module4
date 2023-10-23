function commentP(comments, idPost) {
    let str = '';
    for (const c of comments) {

        str += `
											<div class="coment-area">
												<ul class="we-comet">
													<li>
														<div class="comet-avatar">
															<img src=${c.avatar} alt="avata">
														</div>
														<div class="we-comment">
															<div class="coment-head">
																<h5><a  href="${c.avatar}"  >${c.username}</a></h5>
																<span>${c.createDate}</span>
																<a class="we-reply" href="#" title="Reply"><i class="fa fa-reply"></i></a>
															</div>
															<p>${c.content}</p>
														</div>
										
													</li>
										
													
													
												</ul>
											</div>
											
        
        `

    }
    str += `<li class="post-comment">
														<div class="comet-avatar">
															<img src="images/resources/comet-1.jpg" alt="">
														</div>
														<div class="post-comt-box">
														
															
														
																<textarea placeholder="Post your comment" id="contentCmt"></textarea>
																
																<div class="add-smiles">
																	<span ></span>
																</div>
																
																<button style="color: #0b2e13" type="submit" onclick="createCmt(${idPost})">Gửi</button>
															
														</div>
													</li>`
    $("#commentP" + idPost).html(str)
}

function showComment(idPost) {
    $.ajax({
        type: "Get",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: "http://localhost:8080/comment/" + idPost,
        success: function (comments) {
            commentP(comments, idPost)
        },
        error: function (err) {
            console.log(err);
        }
    })
}


//createComment
function createCmt(idPost){
    const userAcc = localStorage.getItem('user');
    let userAccOjb = JSON.parse(userAcc);
    var userAccId = userAccOjb.id;
    let contentCmt = $("#contentCmt").val()
    let comment = {
        content: contentCmt,
        createDate: Date.now(),
        userAcc: {
            id: userAccId
        },
        post: {
            id: idPost
        }
    };
    $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: "http://localhost:8080/comment/save",
        data:JSON.stringify(comment),
        success: function () {
            showComment(idPost)
        },
        error: function (err) {
            console.log(err);
        }
    });


}