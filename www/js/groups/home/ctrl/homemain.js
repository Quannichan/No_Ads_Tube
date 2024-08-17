define([
    "jquery",
    "text!groups/home/tmpl/home.html",
    "groups/home/ctrl/homeheader",
    "groups/home/ctrl/homevideolist",
    "groups/home/ctrl/homewatch"
    ], 
    function(
        $,
        wrap_home_content,
        header,
        videolist,
        watch
    ) {
    
        const HomeMain = function(){
            const NAME_VIEW     = "HOME_VI"
            const Appversion    = APPVER  || ""
            const Appname       = APPNAME || ""

            var Header          = null
            var VideoList       = null
            if(Appversion && Appname){
                
                const tmpl_main     = App.constHTML.id.HOME_VIEW

                this.initview = function(){
                    App.controller.Header      = new header()
                    App.controller.VideoList   = new videolist()
                    App.controller.WatchVideo  = new watch()

                    Header                     = App.controller.Header;
                    VideoList                  = App.controller.VideoList;

                    $(tmpl_main).html("")
                    $(tmpl_main).hide()
                    $(tmpl_main).html(wrap_home_content)

                    Header            .initview()
                    VideoList         .initview()
                }

                this.showview = function(){
                    Header            .showview()
                    VideoList         .showview()
                    $(tmpl_main).show()
                }
            }
        }

        return HomeMain
});