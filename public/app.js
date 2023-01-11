




const vue = new Vue({

el:'#app',
data:{

    isActive:true,
    query:'альфа липоевая кислота',
    brand:'NUTRAWAY',
    massiv:[]
},
methods:{
  
  async reloadMassiv(){  

    this.massiv=[]
    let resultM=[];
    const urlB = "http://localhost:3000/ResApiBrand"
    
      
  
    await fetch(urlB,{
      method:"GET",
    }).then((res)=>{
     res.json().then(res=>{
      for(let item in res){
       resultM.push(res[item])
      }
     })
    })


  
  this.massiv=resultM


    



  },

  async start(data){


    const url = "http://localhost:3000/ReqApi"
    let result = {"query":data}
    console.log(result)
    await fetch(url,{
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },body: JSON.stringify(result),
    })
      
 
    return 
     
  },
  
}


})








setInterval(()=>{vue.reloadMassiv()},3000)