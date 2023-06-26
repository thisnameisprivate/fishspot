<template>
	<view style="background-color:#fff;">
		<u-tabbar
			:value="current?current:0"
			@change="tabbarChange"
			:fixed="true"
			:placeholder="true"
			:safeAreaInsetBottom="true" 
			activeColor="green"
			inactiveColor="#606266"
			:border="false"
		>
		<!-- // 给尊贵的苹果XR用户留个能看到的按钮---如果不考虑可以将safeAreaInsetBottom改为 false---- -->
			<u-tabbar-item text="首页">
				<image
							class="u-page__item__slot-icon"
							slot="active-icon"
							src="/static/home-selected.png"
						></image>
						<image
							class="u-page__item__slot-icon"
							slot="inactive-icon"
							src="/static/home.png"
						></image>
			</u-tabbar-item>
			<u-tabbar-item text="晒场">
				<image
							class="u-page__item__slot-icon"
							slot="active-icon"
							src="/static/sun-selected.png"
						></image>
						<image
							class="u-page__item__slot-icon"
							slot="inactive-icon"
							src="/static/sun.png"
						></image>
			</u-tabbar-item>
			<u-tabbar-item text="我的">
				<image
							class="u-page__item__slot-icon"
							slot="active-icon"
							src="/static/user-selected.png"
						></image>
						<image
							class="u-page__item__slot-icon"
							slot="inactive-icon"
							src="/static/user.png"
						></image>
			</u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
	export default {
		name:"tabbars",
		props:{
			current:Number,
		},
		data() {
			return {
				listUrl: [
					{path: "pages/home/home"},
					{path: "pages/forum/index"},
					{path: "pages/user/index"}
				]
			};
		},
		methods:{
			tabbarChange: function (e) {
				uni.switchTab({
					url: '/' + this.listUrl[e].path
				})
			}
			
		},
		created () {
			// 隐藏原生tabbar
			uni.hideTabBar()
		},
		onShow: function () {
			console.log("tabbar渲染了")
		}
	}
</script>

<style>
	.u-page__item__slot-icon  {
		height:60rpx;
		width:60rpx;
	}
</style>