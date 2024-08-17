requirejs.config(reqJS)

var App = {
    controller: {
	},
	template: {
		names: {
		}
	},

    const  :{
        VI_HOME  : "HOME_VI"
    },

	data: {
	},
	varname: {
	},
	function: {
	},
	constHTML: {
	},
}

require(["Network","CommonRoute"],function(Network,CommonRoute){
    InitApp(Network, CommonRoute);
    showApp()
})

