define([
    "jquery",
    "handlebars",
    "text!groups/home/tmpl/watching.html",
    "text!groups/home/tmpl/watchingRecomend.html"
], function($, hbs ,watch, recommend) {

    var HomeVideoWatch          = function(){

        var id_                 = null;
        var tmp                 = null;
        var tmp_recom           = null;
        var next_vid            = null;
        var seen_id             = [];

        this.initView           = function(id){
            id_                 = id;
            tmp                 = hbs.compile(watch);
            tmp_recom           = hbs.compile(recommend);
            $(App.constHTML.id.WRAP_WATCH).hide();
        }

        this.showView         = function(){
            App.function.loading(true)          
            initData();
        }

        const bind_data_to_view = function(response){
            const data          = response.data;
            console.log(data);
            data.isSave = init_save_stat_vid(data.id);
            var   view          = tmp({data})
            $(App.constHTML.id.WRAP_WATCH).html(view)
            bind_recom_data(response.data.recom);
            init_next_id(response.data.recom)
        }

        const initData          = function(){
            App.network.send_ajax_params_get(App.routes.BE_HOME + App.routes.BE_GET, [`i=${id_}`], bind_data_to_view,Ferror);
        }

        const bind_recom_data   = function(data){
            console.log(data)
            var view            = tmp_recom({lst : data})
            $(".recom_vid_lst").html(view);
            App.function.loading(false);
            do_bind_event();
            $(App.constHTML.id.WRAP_WATCH).show();        
        }

        const init_next_id      = function(data){
            for(var d of data){
                if(!seen_id.includes(d.videoId)){
                    seen_id.push(d.videoId);
                    next_vid    = d.videoId;
                    break;
                }
            }
        }

        const do_bind_event      = function(){
            $(".btn_back").on("click", function(){
                $(App.constHTML.id.WRAP_WATCH).hide();
                $(App.constHTML.id.WRAP_WATCH).html("");
                seen_id          = [];
            })

            $(".btn_scroll_down").on("click", function(){
                document.getElementById("vid_wrap").scrollTop = 500;
            })

            $(".item_video_recom").on("click", function(){
                var id = this.id.split("_")[1];
                $(App.constHTML.id.WRAP_WATCH).html("");
                App.controller.WatchVideo   .initView(id);
                App.controller.WatchVideo   .showView();
            })

            document.getElementById("video_frame").addEventListener('canplay', () => {
                
            });

            document.getElementById("video_frame").addEventListener('ended', () => {
                App.controller.WatchVideo   .initView(next_vid);
                App.controller.WatchVideo   .showView();
            });
           
            document.getElementById("video_frame").addEventListener('error', () => {
                $("#vid_wrap #video_frame").remove()
                $("#vid_wrap").html(`<iframe class='video_frame' id='video_frame' src='https://iv.ggtyler.dev/embed/${id_}' playsinline='playsinline'  controls></iframe>` + $("#vid_wrap").html());
            });

            $(".unsave_btn").on("click", function(){
                var id_s            = this.id.replace("save_", "");
                save_id_video(id_s)
                $(".save_btn").css("display", "flex")
                $(".unsave_btn").css("display", "none")
            });

            $(".save_btn").on("click", function(){
                var id_us            = this.id.replace("save_", "");
                unsave_id_video(id_us)
                $(".save_btn").css("display", "none")
                $(".unsave_btn").css("display", "flex")
            })
        }

        var init_save_stat_vid      = function(id){
            if(localStorage.getItem('is')){
                var si      = JSON.parse(localStorage.getItem('is'));
                if(si.includes(id)){
                    return true;
                }else{
                    return false;
                }
            }else{
                return false
            }
        }

        var Ferror = function(){
            console.log("error")
            console.log("-- refresh --")
        }

        var save_id_video   = function(id){
            if(localStorage.getItem('is')){
                var si      = JSON.parse(localStorage.getItem('is'));
                if(!si.includes(id)){
                    localStorage.setItem('is', JSON.stringify(si));
                }
            }else{
                var si      = [];
                si.push(id) 
                localStorage.setItem('is', JSON.stringify(si));
            }
        }

        var unsave_id_video   = function(id){
            if(localStorage.getItem('is')){
                var si      = JSON.parse(localStorage.getItem('is'));
                if(si.includes(id)){
                    for(var i = 0 ; i < si.length; i++){
                        if(si[i] === id){
                            si.slice(i, 1);
                            break;
                        }
                    }
                    localStorage.setItem('is', JSON.stringify(si));
                }
            }
        }

    }

    return HomeVideoWatch;

})