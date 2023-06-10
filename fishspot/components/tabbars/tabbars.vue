<template>
	<view>
		<u-tabbar
			:value="initActive"
			@change="tabsPageClick"
			:fixed="true"
			:placeholder="true"
			:safeAreaInsetBottom="true" 
			activeColor="#293f66"
			inactiveColor="#606266"
			:border="false"
		>
		<!-- // 给尊贵的苹果XR用户留个能看到的按钮---如果不考虑可以将safeAreaInsetBottom改为 false---- -->
			<u-tabbar-item text="首页" @click="tabsPageClick" >
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
			<u-tabbar-item text="晒场" @click="tabsPageClick" >
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
			<u-tabbar-item text="我的" @click="tabsPageClick" >
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
		data() {
			return {
				initActive:0,
				name:0,
			};
		},
		methods:{
			// 底部导航栏点击
			tabsPageClick(e) {
				console.log('click', e);
				if (e == 0) {
					uni.switchTab({
						url:"/pages/index/index",
					})
					this.name = 0;
				} else if (e == 1) {
					uni.switchTab({
						url:"/pages/forum/index",
					})
					this.name = 1;
				} else if (e == 2) {
					uni.switchTab({
						url:"/pages/user/index",
					})
					this.name = 2;
				}
			},
			
		},
		created () {
			// 隐藏原生tabbar
			uni.hideTabBar()
		}
	}
</script>

<style>
	.u-page__item__slot-icon  {
		height:40rpx;
		width:40rpx;
	}
</style>