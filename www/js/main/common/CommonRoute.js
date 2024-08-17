define([
    'jquery',
    'groups/home/ctrl/homemain',
], function($, HomeMain) {
    
    var CommonRoute = function(){

        var main_view        = null
        
        this.iniview = function(view){
            switch(view){
                case App.const.VI_HOME :
                    App.template.homectrl          = new HomeMain()

                    main_view                           = App.template.homectrl 
                    main_view                           .initview()
                    break
                
                default:
                    App.function.loading(false)
                    console.log("---- INVALID ----")
                    break;
            }
        }

        this.showview = function(){
            main_view            .showview()
            App.function.loading(false)
        }

        
    }

    return CommonRoute
    
});