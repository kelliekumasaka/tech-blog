const cards = document.querySelector(".card");

cards.addEventListener("click", () => {
    const postId = 2;
    console.log(postId);
    fetch('/api/posts/2',{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            res.json(res)
            location.href = "/comment"
        } else {
            alert("trumpet sound")
        }
    })
})