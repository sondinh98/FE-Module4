
function like(p) {
    p.likeCount +=1;
    $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: "http://localhost:8080/posts/editPost",
        data: JSON.stringify(p),
        success: function () {
            getAll();
        },
        error: function (err) {
            console.log(err);
        }
    })
}