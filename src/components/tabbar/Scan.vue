<template>
  <div>
    <div class="scan">
      <header>
            <p @click="back" class="one">返回</p>
            <!-- <span class="two">相册</span> -->
            <div @click="scanImg" class="three">从相册中选择</div>
          </header>
      <div id="bcid">
        <div style="height:40%"></div>
        <p class="tip">...载入中...</p>
      </div>
     <!-- <button @click="back()">返回首页</button> -->
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  var scan = null
  export default {
    data() {
      return {
        // codeUrl: '',
        token: localStorage.getItem('token'),
        scan: null,
      }
    },
    mounted() {
      // if (window.plus) {
      //   let s = plus.navigator.checkPermission("camera");
      //   if (s !== "notdeny") {
      //     plus.nativeUI.alert("相机权限未获取，请往设置应用程序里面开启权限!");
      //   }
      // }
      this.startScan() //`进入页面就调取扫一扫
      console.log(localStorage.getItem('token'))
    },

    methods: {
      // 创建扫描控件
      startRecognize() {
        // let scan = null
        var that = this
        if (!window.plus) return
        this.scan = new plus.barcode.Barcode('bcid')
        this.scan.onmarked = onmarked

//      开始扫码
        function onmarked(type, result, file) {
          switch (type) {
            case plus.barcode.QR:
              type = 'QR'
              break
            case plus.barcode.EAN13:
              type = 'EAN13'
              break
            case plus.barcode.EAN8:
              type = 'EAN8'
              break
            default:
              type = '其它' + type
              break
          }
          result = result.replace(/\n/g, '')
          // this.codeUrl = result

          // alert(this.codeUrl)

          var url = `freeter-api/user/bindCode?token=${that.token}&code=${result}`
          console.log(url)

          that.$http.post(url).then(res => {
            console.log(res)
            if(res.body.code == 0){
            alert(res.body.msg);
            that.closeScan()
            that.cancelScan()
            that.$router.push({path: '/'})
            }else{
              alert(res.body.msg);
              that.closeScan()
              that.cancelScan()
              that.$router.push({path: '/'})
            }
          })

        }
      },
      // 开始扫码
      startScan() {
        if (!window.plus) return
        this.startRecognize()
        setTimeout(() => {
          this.scan.start()
        }, 200)
      },
      //关闭扫描
      cancelScan() {
        if (!window.plus) return
        this.scan.cancel()
      },
// 关闭条码识别控件
      closeScan() {
        if (!window.plus) return
        this.scan.close()
      },
      // 返回首页
      back() {
        this.closeScan()
        this.cancelScan()
        this.$router.push({path: '/'})
        // console.log(scan)
      },
      scanImg() {
        // console.log("jjjjjjjj")
            // 从系统相册选择文件
            var that = this
            if(!window.plus) return;
            		plus.gallery.pick( function(path){
             		// alert(path);
                		plus.barcode.scan( path, function (type,result) {
            				// alert( "Scan success:("+type+")"+result );
                      var result = result
                      var url = `freeter-api/user/bindCode?token=${that.token}&code=${result}`
                          that.$http.post(url).then(res => {
                            console.log(url)
                            console.log(res.body.code)
                            if(res.body.code == 0){
                            alert(res.body.msg);
                            that.closeScan()
                            that.cancelScan()
                            that.$router.push({path: '/'})
                            }else{
                            alert(res.body.msg);
                            that.closeScan()
                            that.cancelScan()
                            that.$router.push({path: '/'})
                            }
                          })
            				this.codeResult.$emit('result',result);
                      		// this.$router.replace('/transferAccounts');
            			}, function (error) {
            				alert( error.message );
            			});
            	    }, function ( e ) {
            	    	console.log( "取消选择图片" );
            	    }, {filter:"image"} );
            },
    },

    beforeDestroy(){
      this.closeScan()
      this.cancelScan()
    },

    // },
  }
</script>

<style scope>
 .one{
   float: left;
   font-size: 16px;
 }
 .three{
   float: right;
   font-size: 16px;
 }
  .scan{
    height: 100%;
  }
        #bcid {
				width: 100%;
				position: absolute;
				/* top: 0px;
				bottom: 44px;
				text-align: center; */
        left: 0;
            right: 0;
            top: 1rem;
            bottom: 0;
            text-align: center;
            color: #fff;
            background: #ccc;
			}
      .tip {
      				color: #FFFFFF;
      				font-weight: bold;
      				text-shadow: 0px -1px #103E5C;
      			}
            header{
              position: absolute;
                  display: flex;
                  justify-content: space-between;
                  font-size: 16px;
                  color:#009DE2;
                  left: 0.3rem;
                  top: 0;
                  right: 0.3rem;
                  height: 1rem;
                  line-height: 1rem;
                  z-index: 2;
            }



</style>
