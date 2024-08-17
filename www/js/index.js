document.addEventListener("DOMContentLoaded",function(){
    binding()
    document.getElementById("loading").style.display = "flex"

    $.ajax({
        url : "http://localhost:3000/",
        type: "GET",

        success : function(data){
            console.log(data)
            var html = ""
            for(var vid of data.data){
                html = html + `<div class="item_video" onclick="watch('${vid.url}')"> +
                <img class="img_vid" src="${vid.thumbnail}">
                <div class="info_vid">
                    <div class="info_left"> 
                        <img class="imgacc" src="${vid.img_acc}"/>
                    </div>
                    <div class="info_right">
                        <p class="title_vid" style="color: white;">${vid.title}</p>
                        <div class="nameacc">${vid.name_acc}</div>
                    </div>
                </div>
            </div>`
            }
            document.getElementById("items_video").innerHTML = html
            document.getElementById("loading").style.display = "none"
        },
        error : function(err){
                    console.log(err)
                    document.getElementById("items_video").innerHTML = "<div class='noti'><p>Error when fetching video!</p></div>"
                    document.getElementById("loading").style.display = "none"

        }
    })
})

function watch(url){
    var html = `<iframe id="video_frame" src="${url}"></iframe>`
    document.getElementById("vid_wrap").innerHTML = document.getElementById("vid_wrap").innerHTML + html
    document.getElementById("cont_blur").style.display = "flex"
}

function binding(){
   

    document.getElementById("search").addEventListener("click",function(){
        var value = document.getElementById("inp_search").value
        console.log(value)
        document.getElementById("loading").style.display = "flex"
        if(value.trim().length !== 0){
            console.log("send")
            $.ajax({
                url : "http://localhost:3000/"+ value,
                type: "GET",
                success : function(data){
                    var html = ""
                    console.log(data.datas)
                    for(var vid of data.datas){
                        html = html + ``
                    }
                    document.getElementById("items_video").innerHTML = html
                    document.getElementById("loading").style.display = "none"
                },
                error : function(err){
                    console.log(err)
                    document.getElementById("items_video").innerHTML = "<div class='noti'><p>Error when fetching video!</p></div>"
                    document.getElementById("loading").style.display = "none"

                }
            })
        }
    })


}
