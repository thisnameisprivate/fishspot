<template>
	<view>
		<view :class="loadingPage.loadingPageName">
			<u-loading-page loading-text="加载中..." font-size="24" icon-size="58" image="/static/loading.gif" bg-color="#ffffff" :loading="loadingPage.loadingBoolean"></u-loading-page>
		</view>
		<!-- 导航条组件 -->
		<navbar></navbar>
		<!-- 为了禁止ios下拉顶部留白，所以禁止了json文件中的配置选项，但要满足满屏可下拉所以用到以下标签包裹整个页面 -->
		<scroll-view scroll-y="true" class="contentScroll" :enhanced="true" :bounces="false" :show-scrollbar="false" @scrolltolower="touchBottomLoadMoreFish" :lower-threshold="20">
			<view class="back-top">
				<view class="padding-sm padding-sm-userdetail">
				    <view class="bg-gradual-blue padding radius shadow-blur shadow">
						<!-- <view class="text-lg">靛青</view>
						<view class="margin-top-sm text-Abc">#0081ff - #1cbbb4</view> -->
						<view class="fishing-mileage">
							<view class="fishing-mileage-text-left">
								<view class="fishing-mileage-text-left-top">
									<text class="text-white">我的钓鱼历程</text>
								</view>
								<view class="fishing-mileage-text-left-bottom">
									<text class="text-gray">209 km</text>
								</view>
							</view>
							<view class="fishing-mileage-img">
								<u--image :showLoading="true" :src="src" width="320" height="300" :lazy-load="true" :fade="true" duration="800" bgColor="#f5f9ff"></u--image>
							</view>
						</view>
				    </view>
				</view>
				<!-- 按钮组 -->
				<view class="button-container">
					<view class="button-list-item">
						<view class="button-list-item-current">
							<view class="padding-sm">
							   <button class="cu-btn-private-style cu-btn round bg-gradual-blue radius text-center shadow-blur shadow lg" @click="navDamicPublishing">
								   <text class="cuIcon-search text-olive padding-sm"></text>
							       <text class="text-sm">鱼点搜索</text> 
							   </button>
							</view>
						</view>
						<view class="button-list-item-current">
							<view class="padding-sm">
							    <button class="cu-btn-private-style cu-btn round bg-gradual-blue radius text-center shadow-blur shadow lg" @click="navDamicPublishing">
									<text class="cuIcon-location text-olive padding-sm"></text>
							        <text class="text-sm">一键导航</text> 
							    </button>
							</view>
						</view>
					</view>
					<view class="button-list-item">
						<view class="button-list-item-current">
							<view class="padding-sm">
							    <button class="cu-btn-private-style cu-btn round bg-gradual-blue radius text-center shadow-blur shadow lg" @click="navDamicPublishing">
									<text class="cuIcon-footprint text-olive padding-sm"></text>
							        <text class="text-sm">最近去过</text>
							    </button>
							</view>
						</view>
						<view class="button-list-item-current">
							<view class="padding-sm">
							    <button class="cu-btn-private-style cu-btn round bg-gradual-blue radius text-center shadow-blur shadow lg" @click="navDamicPublishing">
									<text class="cuIcon-apps text-olive padding-sm"></text>
							        <text class="text-sm">功能暂定</text>
							    </button>
							</view>
						</view>
					</view>
				</view>
				<!-- 卡片列表 -->
				<view class="cu-list menu card-menu margin-top">
					<view class="cu-item">
						<view class="content">
							<text class="cuIcon-discoverfill text-cyan"></text>
							<text class="text-grey">周边鱼点</text>
						</view>
						<view class="action">
						    <view class="cu-tag round bg-olive light">附近10 km</view>
						</view>
					</view>
				</view>
				<view class="cu-list card-menu margin-top">
					<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
					  <view :class="'cu-item' + [key==TabCur?' text-green cur':'']" :key="key" v-for="(index, key) in category" @click="tabSelect(key)">
					    {{index.name}}
					  </view>
					</scroll-view>
				</view>
				<view class="cu-list menu card-menu margin-top" v-if="TabCur==0">
					<block v-for="(item, index, key) in fishSpotData1" :key="key">
						<view class="text-xs text-left padding-sm">
							<text class="text-gray">{{ item.label }}</text>
							<block v-for="way in item.way">
								<view :class="'cu-tag radius sm ' + [way=='路亚'?'bg-red':'', way=='台钓'?'bg-blue':'', way=='海竿'?'bg-pink':'']">{{way}}</view>
							</block>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="cuIcon-github text-blue"></text>
								<text class="text-gray">{{ item.title }}</text>
							</view>
							<view class="action">
							    <view class="cu-tag round bg-olive light">{{ item.value }}</view>
							</view>
						</view>
					</block>
				</view>
				<view class="cu-list menu card-menu margin-top" v-if="TabCur==1">
					<block v-for="(item, index, key) in fishSpotData2" :key="key">
						<view class="text-xs text-left padding-sm">
							<text class="text-gray">{{ item.label }}</text>
							<block v-for="way in item.way">
								<view :class="'cu-tag radius sm ' + [way=='路亚'?'bg-red':'', way=='台钓'?'bg-blue':'', way=='海竿'?'bg-pink':'']">{{way}}</view>
							</block>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="cuIcon-github text-gray"></text>
								<text class="text-gray">{{ item.title }}</text>
							</view>
							<view class="action">
							    <view class="cu-tag round bg-olive light">{{ item.value }}</view>
							</view>
						</view>
					</block>
				</view>
				<view class="cu-list menu card-menu margin-top" v-if="TabCur==2">
					<block v-for="(item, index, key) in fishSpotData3" :key="key">
						<view class="text-xs text-left padding-sm">
							<text class="text-gray">{{ item.label }}</text>
							<block v-for="way in item.way">
								<view :class="'cu-tag radius sm ' + [way=='路亚'?'bg-red':'', way=='台钓'?'bg-blue':'', way=='海竿'?'bg-pink':'']">{{way}}</view>
							</block>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="cuIcon-github text-green"></text>
								<text class="text-gray">{{ item.title }}</text>
							</view>
							<view class="action">
							    <view class="cu-tag round bg-olive light">{{ item.value }}</view>
							</view>
						</view>
					</block>
				</view>
				<view style="margin-top:10rpx;">
					<u-loading-icon size="36"  text="加载中..." text-size="24" :show="loadStatus"></u-loading-icon>
				</view>
			</view>
		</scroll-view>
		<!-- 底部tabbar -->
		<tabbars :current="0"></tabbars>
	</view>
</template>

<script>
	// 获取用户信息储存到localStorage
	import {CommGetLocation} from '@/common/uNotify'
	export default {
		data() {
			return {
				// 整个页面是否加载完成
				loadingPage: {
					loadingBoolean: true,
					loadingPageName: '',
				},
				src: '/static/mark.png',
				TabCur: 0,
				scrollLeft: 0,
				category: [
					{name:'野钓'},
					{name:'黑坑'},
					{name:'江边'}
				],
				// 鱼点数据
				// 野钓
				fishSpotData1: [
					{ title: '鱼点', value: '距离3km', label: '翘嘴，白条，鲢鱼，草鱼', way:['路亚', '台钓']},
					{ title: '鱼点', value: '距离3.2km', label: '白条，鲢鱼，草鱼', way:['海竿']},
					{ title: '鱼点', value: '距离3.2km', label: '白条，鲢鱼，草鱼，小龙虾', way:['路亚']},
					{ title: '鱼点', value: '距离3.3km', label: '小龙虾，鲫鱼，河虾', way:['路亚', '台钓']},
					{ title: '鱼点', value: '距离3.2km', label: '鲤鱼，鲫鱼，草鱼', way:['路亚']},
					{ title: '鱼点', value: '距离3.3km', label: '翘嘴，鲤鱼，鲫鱼，小龙虾', way:['路亚', '台钓']}
				],
				// 黑坑
				fishSpotData2: [
					{ title: '鱼点', value: '距离3km', label: '翘嘴，白条，鲢鱼，草鱼', way:['路亚', '台钓']},
					{ title: '鱼点', value: '距离3.2km', label: '小龙虾，鲫鱼，河虾', way:['海竿']},
					{ title: '鱼点', value: '距离3.3km', label: '翘嘴，鲤鱼，鲫鱼，小龙虾', way:['路亚', '台钓']},
					{ title: '鱼点', value: '距离3.2km', label: '鲤鱼，鲫鱼，草鱼', way:['路亚', '台钓']},
					{ title: '鱼点', value: '距离3.3km', label: '翘嘴，鲤鱼，鲫鱼，小龙虾', way:['路亚', '台钓']}
				],
				// 江边
				fishSpotData3: [
					{ title: '鱼点', value: '距离3km', label: '白条，鲢鱼，草鱼', way:['路亚', '台钓']},
					{ title: '鱼点', value: '距离3.3km', label: '翘嘴，白条，鲢鱼，草鱼', way:['海竿']},
					{ title: '鱼点', value: '距离3.2km', label: '鲤鱼，鲫鱼，草鱼', way:['路亚', '台钓']},
					{ title: '鱼点', value: '距离3.3km', label: '翘嘴，鲤鱼，鲫鱼，小龙虾', way:['路亚', '台钓']}
				],
				// 判断触底操作是否正在Loading中
				touchBottomLoadMoreBoolean: false,
				// 加载状态
				loadStatus: false,
			}
		},
		methods: {
			// tabs切换
			tabSelect: function (key) {
				this.TabCur = key
				this.scrollLeft = key - 1 * 60
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
					// 根据TabCur的数值来判断当前的tabs下标
					if (this.TabCur == 0) {
						// 模拟请求时间
						setTimeout(function () {
							that.loadStatus = false
						},1000)
						this.fishSpotData1.push(
							{ title: '野钓鱼点', value: '距离3km', label: '翘嘴，鲤鱼，鲫鱼，小龙虾', way:['路亚']},
							{ title: '野钓鱼点', value: '距离3.2km', label: '鲤鱼，鲫鱼，鲢鱼', way:['路亚', '台钓']}
						)
					} else if (this.TabCur == 1) {
						// 模拟请求时间
						setTimeout(function () {
							that.loadStatus = false
						},1000)
						this.fishSpotData2.push(
							{ title: '黑坑鱼点', value: '距离3km', label: '鲤鱼，鲫鱼，鲢鱼', way:['路亚', '台钓']},
							{ title: '黑坑鱼点', value: '距离3.2km', label: '翘嘴，鲤鱼，鲫鱼，小龙虾', way:['路亚', '台钓']}
						)
					} else if (this.TabCur == 2) {
						// 模拟请求时间
						setTimeout(function () {
							that.loadStatus = false
						},1000)
						this.fishSpotData3.push(
							{ title: '江边鱼点', value: '距离3km', label: '小龙虾，白条', way:['台钓']},
							{ title: '江边鱼点', value: '距离3.2km', label: '鲨鱼', way:['路亚', '台钓', '海竿']}
						)
					}
				} else {
					this.touchBottomLoadMoreBoolean = false
					return;
				}
			}
		},
		onLoad: function () {
			console.log('初次加载进入页面')
			// 调用外部公共方法，申请获取用户当前位置权限
			CommGetLocation()
		},
		onShow: function () {
			this.loadingPage.loadingBoolean = false
			this.loadingPage.loadingPageName = ''
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
	.back-top {
		// background-color: $u-primary-light;
		height:1000rpx;
		margin-top:0;
		background: -webkit-linear-gradient(top, rgb(236, 245, 255), rgb(43, 133, 228),  rgb(160, 207, 255),  rgb(160, 207, 255), rgb(236, 245, 255), rgb(236, 245, 255), rgb(255, 255, 255));
		padding-top:120rpx;
	}
	// 页面加载中的样式
	.loadingPageName{
		position:absolute; 
		width:100%; 
		height:79vh; 
		z-index: 1;
	}
	.padding-sm-userdetail {
		height:300rpx;
	}
	.padding-sm-userdetail > view {
		height:100%;
	}
	.fishing-mileage {
		display:flex;
		flex-direction:row;
		height:100%;
	}
	.fishing-mileage-text-left {
		flex:2;
		display:flex;
		flex-direction:column;
	}
	.fishing-mileage-text-left-top {
		flex:1;
		padding-left:40rpx;
		display:flex;
		align-items:flex-end;
		font-weight:600;
	}
	.fishing-mileage-text-left-bottom {
		flex:1;
		padding-left:40rpx;
		display:flex;
		align-items:center;
		font-size:24rp;
		font-weight:600;
	}
	.fishing-mileage-img {
		flex:1;
		display:flex;
		align-items: flex-end;
		justify-content: center;
	}
	// 按钮组
	.button-container {
		height:300rpx;
		width:100%;
		margin: 0 auto;
		margin-top:15rpx;
		display:flex;
		flex-direction:row;
	}
	.button-list-item {
		flex:1;
		display:flex;
		flex-direction:column;
	}
	.button-list-item-current {
		flex:1;
	}
	.cu-btn-private-style {
		width:100%;
		height:100rpx;
	}
</style>
