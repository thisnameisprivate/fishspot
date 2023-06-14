<template>
	<view>
		<!-- 导航条组件 -->
		<navbar></navbar>
		<!-- 为了禁止IOS下拉顶部留白， 所以禁止了json文件中的配置选项，但要满足满屏可下拉所以用到以下标签包裹整个页面  -->
		<scroll-view scroll-y="true" class="contentScroll" :enhanced="true" :bounces="false" :show-scrollbar="false" @scrolltolower="touchBottomLoadMoreFish" :lower-threshold='20'>
		<view class="back-top">
			<view class="fishing-mileage">
				<view class="fishing-mileage-text">
					<view class="fishing-mileage-text-top">我的钓鱼历程</view>
					<!-- <view class="fishing-mileage-text-center">
						去过88个鱼点
					</view> -->
					<view class="fishing-mileage-text-bottom">
						<h2>209 km</h2>
					</view>
				</view>
				<view class="fishing-mileage-img">
					<u--image :showLoading="true" :src="src" width="320" height="300" :lazy-load="true" :fade="true" duration="800" bgColor="#f5f9ff"></u--image>
				</view>
			</view>
			<view class="flex-4-container flex-4-container-top">
				<view class="flex-item-container flex-item-container-left">
					<u-button color="linear-gradient(to bottom, rgb(255, 255, 255), rgb(255, 255, 255), rgb(255, 255, 255),rgb(245, 249, 255), rgb(245, 249, 255), rgb(245, 249, 255), rgb(160, 207, 255))" size="large">
						<u-icon name="/static/search.png" color="#293f66" size="64"></u-icon>
						<text class="flex-item-container-text">鱼点搜索</text>
					</u-button>
				</view>
				<view class="flex-item-container flex-item-container-right">
					<u-button color="linear-gradient(to bottom, rgb(255, 255, 255), rgb(255, 255, 255), rgb(255, 255, 255),rgb(245, 249, 255), rgb(245, 249, 255), rgb(245, 249, 255), rgb(160, 207, 255))" size="large">
						<u-icon name="/static/gotomap.png" color="#293f66" size="56"></u-icon>
						<text class="flex-item-container-text">一键导航</text>
					</u-button>
				</view>
			</view>
			<view class="flex-4-container">
				<view class="flex-item-container flex-item-container-left">
					<u-button color="linear-gradient(to bottom, rgb(255, 255, 255), rgb(255, 255, 255), rgb(255, 255, 255),rgb(245, 249, 255), rgb(245, 249, 255), rgb(245, 249, 255), rgb(160, 207, 255))" size="large">
						<u-icon name="/static/fixmark.png" color="#293f66" size="56"></u-icon>
						<text class="flex-item-container-text">最近去过</text>
					</u-button>
				</view>
				<view class="flex-item-container flex-item-container-right">
					<u-button color="linear-gradient(to bottom, rgb(255, 255, 255), rgb(255, 255, 255), rgb(255, 255, 255),rgb(245, 249, 255), rgb(245, 249, 255), rgb(245, 249, 255), rgb(160, 207, 255))" size="large">
						<u-icon name="/static/more.png" color="#293f66" size="56"></u-icon>
						<text class="flex-item-container-text">功能暂定</text>
					</u-button>
				</view>
			</view>
			<view class="title-1">
				<u-cell-group :border="false">
					<u-cell
					    size="large"
					    title="周边鱼点"
					    value="10km 内"
					    isLink
						:border="false"
						:disabled="true"
						titleStyle="color:#293f66;"
						rightIcon="/static/nearby.png"
						rightIconStyle="height:38rpx;width:38rpx;"
					></u-cell>
				</u-cell-group>
			</view>
			<!-- 鱼点分类tabs开始 -->
			<view class="tabsCategory">
				<u-tabs
				@change="tabsListItemChange"
				:list="category"
				lineWidth="30"
				lineColor="#293f66"
				lineHeight="5"
				:activeStyle="{
					color: '#293f66',
					fontWeight: 'bold',
					transform: 'scale(1.05)'
				}"
				:inactiveStyle="{
					color: '#606266',
					transform: 'scale(1)'
				}"
				itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;"
				>
			</u-tabs>
			<view class="categoryCurrent" v-if="categoryCurrent == 0">
				<u-cell-group :border="false">
					<!-- 循环输出所有野钓鱼点 -->
					<view v-for="(item, key, index) in fishSpotData1" :key="index">
						<u-cell
							    size="mini"
								rightIconStyle="font-size:24rpx;"
								titleStyle="color:#293f66;"
								icon="/static/nearby.png"
								iconStyle="height:68rpx; width:68rpx;"
								:title="item.title + key"
								:value="item.value"
								:label="item.label"
								isLink
						>
						</u-cell>
					</view>
					<view style="margin-top:10rpx;">
						<u-loading-icon size="36"  text="加载中..." text-size="24" :show="loadStatus"></u-loading-icon>
					</view>
				</u-cell-group>
			</view>
			<view class="categoryCurrent" v-if="categoryCurrent == 1">
				<u-cell-group :border="false">
					<view v-for="(item, key, index) in fishSpotData2" :key="index">
						<u-cell
							    size="mini"
								rightIconStyle="font-size:24rpx;"
								titleStyle="color:#293f66;"
								icon="/static/nearby.png"
								iconStyle="height:68rpx; width:68rpx;"
								:title="item.title + key"
								:value="item.value"
								:label="item.label"
								isLink
						>
						</u-cell>
					</view>
					<view style="margin-top:10rpx;">
						<u-loading-icon size="36"  text="加载中..." text-size="24" :show="loadStatus"></u-loading-icon>
					</view>
				</u-cell-group>
			</view>
			<view class="categoryCurrent" v-if="categoryCurrent == 2">
				<u-cell-group :border="false">
					<view v-for="(item, key, index) in fishSpotData3" :key="index">
						<u-cell
								size="mini"
								rightIconStyle="font-size:24rpx;"
								titleStyle="color:#293f66;"
								icon="/static/nearby.png"
								iconStyle="height:68rpx; width:68rpx;"
								:title="item.title + key"
								:value="item.value"
								:label="item.label"
								isLink
						>
						</u-cell>
					</view>
					<view style="margin-top:10rpx;">
						<u-loading-icon size="36"  text="加载中..." text-size="24" :show="loadStatus"></u-loading-icon>
					</view>
				</u-cell-group>
			</view>
			</view>
		</view>
		</scroll-view>
		<!-- 轮播图， 开发过程中暂时隐藏，以免出现错误的视觉效果 -->
		<!-- <view class="wrap">
			<u-swiper :list="list" keyName="image"></u-swiper>
		</view> -->
		<!-- 底部tabbar -->
		<tabbars></tabbars>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					{ image: 'https://cdn.uviewui.com/uview/swiper/swiper1.png' , title: '昨夜星辰昨夜风，画楼西畔桂堂东'},
					{ image: 'https://cdn.uviewui.com/uview/swiper/swiper2.png' , title: '身无彩凤双飞翼，心有灵犀一点通'},
					{ image: 'https://cdn.uviewui.com/uview/swiper/swiper3.png' , title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'}
				],
				src: '/static/mark.png',
				category: [
					{name:'野钓'},
					{name:'黑坑'},
					{name:'江边'}
				],
				// tabs 当前的下标
				categoryCurrent:0,
				// 鱼点数据
				// 野钓
				fishSpotData1: [
					{ title: '鱼点', value: '距离3km', label: '挣脱束缚， 向往自由'},
					{ title: '鱼点', value: '距离3.2km', label: '挣脱束缚， 向往自由'},
					{ title: '鱼点', value: '距离3.2km', label: '挣脱束缚， 向往自由'},
					{ title: '鱼点', value: '距离3.3km', label: '挣脱束缚， 向往自由'},
					{ title: '鱼点', value: '距离3.2km', label: '挣脱束缚， 向往自由'},
					{ title: '鱼点', value: '距离3.3km', label: '挣脱束缚， 向往自由'}
				],
				// 黑坑
				fishSpotData2: [
					{ title: '鱼点', value: '距离3km', label: '挣脱束缚， 向往自由'},
					{ title: '鱼点', value: '距离3.2km', label: '挣脱束缚， 向往自由'},
					{ title: '鱼点', value: '距离3.3km', label: '挣脱束缚， 向往自由'},
					{ title: '鱼点', value: '距离3.2km', label: '挣脱束缚， 向往自由'},
					{ title: '鱼点', value: '距离3.3km', label: '挣脱束缚， 向往自由'}
				],
				// 江边
				fishSpotData3: [
					{ title: '鱼点', value: '距离3km', label: '挣脱束缚， 向往自由'},
					{ title: '鱼点', value: '距离3.3km', label: '挣脱束缚， 向往自由'},
					{ title: '鱼点', value: '距离3.2km', label: '挣脱束缚， 向往自由'},
					{ title: '鱼点', value: '距离3.3km', label: '挣脱束缚， 向往自由'}
				],
				// 判断触底操作是否正在Loading中
				touchBottomLoadMoreBoolean: false,
				// 加载状态
				loadStatus: false,
			}
		},
		onLoad() {

		},
		methods: {
			/**
			 * category 点击切换 @click函数
			 */
			tabsListItemChange: function (item) {
				this.categoryCurrent = item.index
				console.log("当前下标为:", this.categoryCurrent)
			},
			/**
			 * 界面上拉手势触底新增鱼点数据
			 */
			touchBottomLoadMoreFish: function (res) {
				// 添加 touchBottomLoadMoreBoolean 禁止小程序内部bug, 同一次动作触发多次加载操作（防抖功能）
				if (this.touchBottomLoadMoreBoolean === false) {
					var that = this
					/** 这个代码这里有问题， 设置touchBOttomLoadMoreBoolean为True时，
					有时候会卡顿在加载状态---但如果去掉这个限制有时候会发送多次请求到后端，
					暂时没想到什么好的办法，考虑后期Ajax获取数据状态使用该标识符来限制前端展示页面- 
					**/
					this.touchBottomLoadMoreBoolean = true
					this.loadStatus = true
					// 模拟上拉加载更多数据打入对应的 fishSpotData
					// 根据categoryCurrent的数值来判断当前的tabs下标
					if (this.categoryCurrent == 0) {
						// 模拟请求时间
						setTimeout(function () {
							that.loadStatus = false
						},1000)
						this.fishSpotData1.push(
							{ title: '野钓鱼点', value: '距离3km', label: '挣脱束缚， 向往自由'},
							{ title: '野钓鱼点', value: '距离3.2km', label: '挣脱束缚， 向往自由'}
						)
					} else if (this.categoryCurrent == 1) {
						// 模拟请求时间
						setTimeout(function () {
							that.loadStatus = false
						},1000)
						this.fishSpotData2.push(
							{ title: '黑坑鱼点', value: '距离3km', label: '挣脱束缚， 向往自由'},
							{ title: '黑坑鱼点', value: '距离3.2km', label: '挣脱束缚， 向往自由'}
						)
					} else if (this.categoryCurrent == 2) {
						// 模拟请求时间
						setTimeout(function () {
							that.loadStatus = false
						},1000)
						this.fishSpotData3.push(
							{ title: '江边鱼点', value: '距离3km', label: '挣脱束缚， 向往自由'},
							{ title: '江边鱼点', value: '距离3.2km', label: '挣脱束缚， 向往自由'}
						)
					}
				} else {
					this.touchBottomLoadMoreBoolean = false
					return;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contentScroll {
		// 可视高度， 需要在多大的盒子中进行滑动
		height:79vh; // 这里本来是100vh的， 但是可能是由于uni-app的自定义底部导航条占了20vh，如果写100vh的话整个页面依旧无法上拉滚动；
		width:100%;
		background-color:#fff;
	}
	.u-tabs__wrapper__nav__line {
		width:45rpx;
	}
	.back-top {
		// background-color: $u-primary-light;
		height:1000rpx;
		margin-top:0;
		background: -webkit-linear-gradient(top, rgb(236, 245, 255), rgb(43, 133, 228),  rgb(160, 207, 255),  rgb(160, 207, 255), rgb(236, 245, 255), rgb(236, 245, 255), rgb(255, 255, 255));
		padding-top:120rpx;
	}
	.wrap {
		padding-top:0rpx;
	}
	.hr-border {
		height:40rpx;
	}
	.u-row {
		margin:40rpx 0;
	}
	.demo-layout {
		height:80rpx;
		border-radius:8rpx;
	}
	.bg-purple {
		background: #d3dce6;
	}
	.bg-purple-light {
		background: #e5e9f2;
	}
	.bg-purple-dark {
		background: #99a9bf;
	}
	.fishing-mileage {
		width:90%;
		height:220rpx;
		margin:0 auto;
		border-radius: 20rpx;
		background: -webkit-linear-gradient(top, rgb(160, 207, 255), rgb(255, 255, 255), rgb(255, 255, 255), rgb(245, 249, 255), rgb(245, 249, 255), rgb(160, 207, 255));
		display:flex;
		flex-direction:row;
	}
	.fishing-mileage-text {
		flex: 6;
		display:flex;
		flex-direction:column;
	}
	.fishing-mileage-text-top {
		flex:3;
		padding-left:40rpx;
		display:flex;
		align-items:flex-end;
		font-size:24rpx;
		font-family: "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
		font-weight: 800;
		color: $u-info-disabled;
	}
	.fishing-mileage-text-center {
		flex:2;
		padding-left:40rpx;
		display:flex;
		align-items:center;
		font-size:24rpx;
		font-weight: 800;
		font-family: "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
		color:$u-info-disabled;
	}
	.fishing-mileage-text-bottom {
		flex:5;
		padding-left:40rpx;
		font-size:58rpx;
		font-family: "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
		font-weight: 800;
		color:#293f66;
	}
	.fishing-mileage-img {
		flex: 4;
		display:flex;
		align-items: flex-end;
		justify-content: center;
	}
	.flex-4-container {
		height:120rpx;
		width:90%;
		margin:0 auto;
		display: flex;
		flex-direction:row;
	}
	.flex-4-container-top {
		margin-top:15rpx;
	}
	.flex-item-container {
		flex:1;
		text-align:center;
		display:flex;
		align-items:center;
		justify-content: center;
	}
	.flex-item-container-left {
		padding: 0 30rpx 0 0;
	}
	.flex-item-container-right {
		padding:0 0 0 30rpx;
	}
	.flex-item-container-text {
		color:#293f66;
		font-family: "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
		font-weight: 800;
		font-size:26rpx;
	}
	.title-1 {
		width:98%;
		margin:0 auto;
		color:#293f66;
		font-weight: 800;
		font-family: "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
	}
	.tabsCategory {
		width:97%;
		margin:0 auto;
	}
	.categoryCurrent {
		// height:200rpx;
		width:100%;
		margin:0 auto;
		margin-top:15rpx;
	}
</style>
