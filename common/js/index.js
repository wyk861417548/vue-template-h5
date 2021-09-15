import Dialog from  "@components/common/dialog/dialog.vue";
import nodata from  "@components/common/nodata/nodata.vue";
import Scroll from  "@components/common/scroll/scroll.vue";
import Picker from  "@components/common/picker/picker.vue";

const component = {
  install:function(Vue){
    Vue.component("Dialog",Dialog);
    Vue.component("nodata",nodata);
    Vue.component("Scroll",Scroll);
    Vue.component("Picker",Picker);
  }
}


export default component;