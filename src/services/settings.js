export const settings = {
    data () {
        var initialValue = false;
        if(localStorage.getItem("setting:showMedia") != null) {
            initialValue = true;
        }
        console.log("Initial value is " + initialValue);
        return {
            showMedia: initialValue
        }
    },
    watch: {
        showMedia: function (val) {
            if (val == null || val == false) {
                console.log("Removing showMedia");
                localStorage.removeItem("setting:showMedia");
            } else {
                console.log("Setting showMedia to " + val);
                localStorage.setItem("setting:showMedia", val);
            }
        }
    }
    // created: function() {
    //     this.showMedia = false;
    //     if(localStorage.getItem("setting:showMedia") != null) {
    //         this.showMedia = localStorage.getItem("setting:showMedia");
    //     }
    //     if(localStorage.getItem("setting:showMedia") != null) {
    //         this.showMedia = localStorage.getItem("setting:showMedia");
    //         console.log("Fetching showMedia setting " + this.showMedia);
    //         this.showMedia = false;
    //     }
     //  }
    // computed: {
    //     showMedia: {
    //       get () {
    //         if(localStorage.getItem("setting:showMedia") != null) {
    //             return true;
    //         }
    //         return false;
    //       },
    //       set (value) {
    //         console.log("Set " + value);
    //         localStorage.setItem("setting:showMedia", value);
    //       }
    //     }
    // }
  };