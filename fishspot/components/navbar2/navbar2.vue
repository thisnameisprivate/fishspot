<template>
	<view class="navbar">
			<view class="navbar-fixed">
				<!-- 状态栏 -->
				<view :style="{height:statusBarHeight + 'px'}"></view>
				<view class="navbar-content" :style="{height:navBarHeight+'px',width:windowWidth+'px'}">
					<button class="cu-btn bg-green round shadow" @click="navDamicPublishing">
					    <text class="cuIcon-writefill lg"></text> 发布
					</button>
				</view>
			</view>
			<view :style="{height: statusBarHeight+navBarHeight+'px'}"></view>
	</view>
		
</template>

<script>
	name: 'navbar'
	export default {
		data() {
			return {
				statusBarHeight: 20,
				navBarHeight: 45,
				windowWidth: 375
			};
		},
		created() {
			//获取手机系统信息
			const info = uni.getSystemInfoSync();
			//设置状态栏高度
			this.statusBarHeight = info.statusBarHeight;
			this.windowWidth = info.windowWidth;
			// h5 app mp-alipay没有胶囊按钮
			// #ifndef H5 || APP-PLUS || MP-ALIPAY
			// 获取胶囊的位置
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			// (胶囊底部高度 - 状态栏的高度) + (胶囊顶部高度 - 状态栏内的高度) = 导航栏的高度
			this.navBarHeight = (menuButtonInfo.bottom - info.statusBarHeight) + (menuButtonInfo.top - info
				.statusBarHeight)
			this.windowWidth = menuButtonInfo.left
			// #endif
		},
		methods: {
			// 页面跳转
			navDamicPublishing: function () {
				uni.navigateTo({
					url: '/pages/DamicPublishing/DamicPublishing'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.navbar {
		.navbar-fixed {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;
			width: 100%;
			background-color: $u-primary-light;
 
		.navbar-content {
			padding: 0 15px 0 10px;
			box-sizing: border-box;
			display: flex;
			justify-content: start;
			align-items: center;
			height: 45px;
			width:200rpx !important;
		}
	}
}
</style>
