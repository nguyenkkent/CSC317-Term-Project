function addNewComment(data){
};
// document.getElementById("comment-button").addEventListener("click", function(ev){
//     console.log(ev);
//     console.log("inside event clicker");
// });

document.getElementById("comment-button")
    .addEventListener("click", function(event){
        let commentTextElement = document.getElementById("comment-text");
        let commentText = commentTextElement.value;
        let postId = ev.currentTarget.dataset.postid;

        fetch("/comments/create", {

            method : "post",
            headers : {
                 "Content-Type" : "Application/json";
            }

        })//end of fetch

    });