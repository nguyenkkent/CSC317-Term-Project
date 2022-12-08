document.getElementById("comment-button")
    .addEventListener("click", function(ev){
        let commentTextElement = document.getElementById("comment-text");
        let commentText = commentTextElement.value;
        let postId = ev.currentTarget.dataset.postid;

        if (commentText === ""){return}    
        fetch("/comments/create", {
            method : "post",
            headers : {
                "Content-Type" : "Application/json",
            },
            body : JSON.stringify({
                comment : commentText,
                postId: postId
            })  
        })
        .then(response => response.json())
        .then(res_json => {
            location.reload();
            // console.log(res_json);
        })
        setTimeout( window.scrollTo(-10, document.body.scrollHeight), 2000);
    })