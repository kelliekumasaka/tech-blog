const newComment = document.querySelector("#new-comment");
const id = document.querySelector("#postId").textContent;

newComment.addEventListener("submit",(e)=>{
    e.preventDefault();
    const postComment={
        comment:document.querySelector("#comment").value,
    }
    fetch('/api/comments/'+id,{
        method:"POST",
        body:JSON.stringify(postComment),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.reload();
        } else {
            alert("trumpet sound")
        }
    })
})