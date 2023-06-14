<template>
	<view>
		<view class="cu-form-group margin-top">
				<textarea maxlength="-1" :disabled="modalName!=null" bindinput="textareaAInput" placeholder="与钓友分享你的知识和见解..."></textarea>
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
				<view class="bg-img" v-for="(item, index, key) in imgList" @click="ViewImage(item)">
					<image :src="item" mode='aspectFill'></image>
					<view class="cu-tag bg-red" @click.stop="DelImg(key)">
						<text class="cuIcon-close"></text>
					</view>
				</view>
				<view class="solids" @click="ChooseImage" v-if="imgList.length<4">
					<text class="cuIcon-cameraadd"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalName: null,
				imgList: [],
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
							console.log(this.imgList)
						} else {
							that.imgList = res.tempFilePaths
						}
					}
				})
			},
			// 图片预览
			ViewImage: function (current) {
				var that = this
				uni.previewImage({
					urls: that.imgList,
					current: current
				})
			},
			// 删除图片
			DelImg: function (key) {
				this.imgList.splice(key, 1)
			}
		}
	}
</script>

<style lang="scss">

</style>
