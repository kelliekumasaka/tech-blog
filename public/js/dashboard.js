const delBtn = document.querySelector(".deletePost");
const editBtn = document.querySelector('.editPost');

// TODO: somehow apply this to all buttons (forEach loop?)
delBtn.addEventListener("click", (x) => {
    x.preventDefault();
    const postId = 2;
    // TODO: extract the postId of the specific post
    fetch(`/api/posts/${postId}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.href = "/dashboard"
        } else {
            alert("trumpet sound")
        }
    })
})