import Axios from 'axios'


function fetch(url,data){
  return new Promise((resolve,reject)=>{
    Axios.post(url,data)
      .then((res)=>{
        let status = res.data.code
        if(status === 200){
          resolve(res)
        }

        // 未登录
        if(status === 300){
          location.href = 'login.html'
          resolve(res)
        }

        reject(res)
      }).catch(error =>{
        reject(res)
      })

  })

}

export default fetch