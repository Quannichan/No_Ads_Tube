define([
    "jquery",
    "handlebars",
    "text!groups/home/tmpl/video.html"
], function($, hbs ,videolist) {
    
    const HomeVideoList = function(){

        var tmp     = null;

        this.initview   = function(){
           tmp =  hbs.compile(videolist);
           $(App.constHTML.id.VIDEOS_WRAP).hide();
        }

        this.showview   = function(){
            initdata();
        }

        var initdata    = function(){  
            App.function.loading(true)          
            App.network.send_ajax_get(App.routes.BE_HOME,bindDatatoView,Ferror)
        }

        var bindDatatoView = function(data){
            var vids = data.res_data
            var t = tmp({vids})
            $(App.constHTML.id.VIDEOS_WRAP).html(t)
            $(App.constHTML.id.VIDEOS_WRAP).show();
            do_bind_event_to_video();
            App.function.loading(false)
        }

        var do_bind_event_to_video  = function(){
            $(".item_video").on("click", function(){
                var id   = this.id.replace("video_", "");
                App.controller.WatchVideo   .initView(id);
                App.controller.WatchVideo   .showView();
            });

            $("#search").on("click", function(){
                var s = $("#inp_search").val();
                if(s.trim().length > 0){
                    console.log(s)
                    search_query(s);
                }
            })
        }

        var search_query        = function(s){
            App.function.loading(true);
            App.network.send_ajax_params_get(App.routes.BE_HOME + App.routes.BE_SEARCH, [`q=${s}`], bindDatatoView,Ferror)
        }

        var Ferror = function(){
            console.log("error")
            console.log("-- refresh --")
        }

    }

    return HomeVideoList
    
});