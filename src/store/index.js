import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const localDataKey = 'localDataKey'

let state = {
  // 当前登录人信息的信息
  userInfo:null,

  token:''
}


//初始化状态数据
let initState = function(){
  if(!sessionStorage[localDataKey])return state;
	const tempData = JSON.parse(sessionStorage[localDataKey])
	for(var i in tempData){
		state[i] = tempData[i];
	}
  sessionStorage[localDataKey] = '';
	return state;
}

//存储状态数据到本地 每次刷新调用
let saveState = function(state){
	sessionStorage[localDataKey] = JSON.stringify(state);
}




const store = new Vuex.Store({
  state:initState(),

  mutations: {
    // 更新数据到saveState
    updateState(state){
      saveState(state);
    },

    setUserInfo(state,data){
      state.userInfo = data
    },

    setToken(state,data){
      state.token = data;
      console.log('state.token',state.token);
    }

  }
})

export default store
