const newPost = document.querySelector("#new-post");

newPost.addEventListener("submit",(e)=>{
    e.preventDefault();
    const blogPost={
        title:document.querySelector("#title").value,
        description:document.querySelector("#description").value,
    }
    fetch("/api/posts",{
        method:"POST",
        body:JSON.stringify(blogPost),
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
