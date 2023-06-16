<template>
	<view>
		<view class="cu-form-group margin-top">
				<textarea maxlength="-1" :disabled="modalName!=null" :value="textAreaValue" bindinput="textareaAInput" placeholder="与钓友分享你的知识和见解..."></textarea>
		</view>
		<view class="cu-bar bg-white margin-top">
			<view class="action">
				图片上传
			</view>
			<view class="action">
				{{imgList.length}}/9
			</view>
		</view>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" v-for="(item, index, key) in base64ImgList" @click="ViewImage(item)">
					<image :src="item" mode='aspectFill'></image>
					<view class="cu-tag bg-red" @click.stop="DelImg(index)">
						<text class="cuIcon-close"></text>
					</view>
				</view>
				<view class="solids" @click="ChooseImage" v-if="imgList.length<10">
					<text class="cuIcon-cameraadd"></text>
				</view>
			</view>
		</view>
		<view class="solid-bottom text-xl padding" @click="chooseLocation">
			<u--text prefixIcon="map-fill" iconStyle="font-size: 30rpx; color:#39b54a; margin-right:20rpx;" type="success" :text="currentLocation.name == null ? '位置分享' : currentLocation.name" lineHeight="25px" size="24rpx"></u--text>
		</view>
		<view class="padding flex flex-direction">
		  <button class="cu-btn round bg-green margin-tb-sm lg shadow" @click="buttomFormData">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				textAreaValue: '',
				modalName: null,
				imgList: [],
				// 当前位置信息
				currentLocation: {},
				// base64格式url
				base64ImgList: [],
			}
		},
		methods: {
			// 图片上传按钮
			ChooseImage: function () {
				var that = this
				uni.chooseImage({
					count: 9,
					sizeType:['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType:['album'], // 从相册中选择
					success: res => {
						if (that.imgList.length != 0) {
							that.imgList = that.imgList.concat(res.tempFilePaths)
						} else {
							that.imgList = res.tempFilePaths
						}
						that.imageBase64(res.tempFilePaths)
					}
				})
			},
			// 图片预览
			ViewImage: function (current) {
				var that = this
				uni.previewImage({
					urls: that.base64ImgList,
					current: current
				})
			},
			// 删除图片
			DelImg: function (key) {
				this.imgList.splice(key, 1)
				this.base64ImgList.splice(key, 1)
				console.log(this.imgList)
				console.log(this.base64ImgList)
			},
			// 打开地图控件
			chooseLocation: function () {
				// 获取localstorage
				var location = uni.getStorageSync('location')
				uni.chooseLocation({
					latitude: location.latitude,
					longitude: location.longitude,
					success: res =>{
						console.log(res)
						this.currentLocation = res
						console.log(this.currentLocation)
					}, fail: err => {
						console.log(err)
					}
				})
			},
			// 表单提交校验
			buttomFormData: function () {
				if (this.textAreaValue.length < 3 && this.imgList.length == 0) {
					console.log('发布内容不能为空')
					return;
				}
				var formData = {
					'address': '',
					'textAreaValue': this.textAreaValue,
					'urls': this.base64ImgList
				}
				console.log(formData)
				console.log('base64长度为：' + this.base64ImgList.length)
			},
			// 将图片转换为base64
			imageBase64: function (tempFilePaths) {
				var that = this
				new Promise((resolve, reject) => {
					console.log('tempFilePaths长度为:' + that.imgList.length)
					for (var i = 0; i < tempFilePaths.length; i ++) {
						// uni.request({
						// 	url: tempFilePaths[i],
						// 	method: 'GET',
						// 	responseType: 'arraybuffer',
						// 	success: res => {
						// 		console.log(res.data)
						// 		resolve(res.data)
						// 	},fail: err => {
						// 		reject(err)
						// 	}
						// })
						uni.getFileSystemManager().readFile({
							filePath:tempFilePaths[i],
							encoding:'base64',
							success: res => {
								var base64 = 'data:image/png;base64,' + res.data
								that.base64ImgList.push(base64)
								resolve(res.data)
							}, fail: err => {
								reject(err)
							}
						})
					}
				}).then(data => {
					// var base64 = wx.arrayBufferToBase64(data)
					// base64 = 'data:image/png;base64,' + base64
					// that.base64ImgList.push(base64)
					console.log('转换成功，已打入数组base64ImgList')
					console.log(that.base64ImgList)
				}).catch(errlog => {
					console.log("转为base64格式失败：" + errlog)
				})
			}
		}
	}
</script>

<style lang="scss">
	.u-text__value {
		font-size:24px;
	}
</style>
