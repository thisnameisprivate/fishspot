<template>
	<view>
		<view :class="loadingPage.loadingPageName">
			<u-loading-page loading-text="加载中..." font-size="24" icon-size="58" image="/static/loading.gif" bg-color="#ffffff" :loading="loadingPage.loadingBoolean"></u-loading-page>
		</view>
		<!-- 导航条组件 -->
		<navbar></navbar>
		<view class="back-top">
			<view class="userDetail">
				<view class="padding-sm padding-sm-userdetail">
					<view class="bg-gradual-blue padding radius text-center shadow-blur shadow">
					  <view class="user-detail-data">
						  <view class="user-detail-left">
							  <view class="padding">
								  <view class="cu-avatar xl round " style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg);"></view>
							  </view>
							  <view class="">
								  
							  </view>
						  </view>
						  <view class="user-detail-center">
							  <view class="user-detail-center-name solid-bottom text-lg padding text-shadow text-black">
								  <text class="text-white">微信用户</text>
							  </view>
							  <view class="user-detail-center-account solid-bottom text-sm padding text-shadow text-black">
								  <text class="text-gray">Give me Redemption.</text>
							  </view>
						  </view>
						  <view class="user-detail-right">
							  <button :class="sign.btnColor" @click="changeBtnSign">
							  <text :class="sign.signIcon">
							  </text>
									签到
							  </button>
						  </view>
					  </view>
					</view>
				</view>
			</view>
			<!-- 个人主页宫格布局  -->
			<view class="cu-list grid col-3 no-border card-menu margin-top">
			    <view class="cu-item" v-for="(item, index) in iconList" v-if="index<gridCol*2">
					<view :class="'cuIcon-' + item.icon + ' text-' + item.color">
						<view class="cu-tag badge" v-if="item.badge!=0">
							<block v-if="item.badge!=1">{{item.badge>99?"99+":item.badge}}</block>
						</view>
					</view>
			      <text>{{item.name}}</text>
			    </view>
			</view>
			<!-- 卡片列表 -->
			<view class="cu-list menu card-menu margin-top">
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-moreandroid text-cyan"></text>
						<text class="text-grey">我的动态</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-addressbook text-cyan"></text>
						<text class="text-grey">个人信息</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-friend text-cyan"></text>
						<text class="text-grey">关于我们</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-creative text-red"></text>
						<text class="text-grey">我要举报/建议</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-recharge text-green"></text>
						<text class="text-grey">赞助我们</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部tabbar -->
		<tabbars :current="2"></tabbars>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 整个页面加载是否完成
				loadingPage: {
					loadingBoolean: true,
					loadingPageName: ''
				},
				// 宫格布局信息
				iconList: [{
				      icon: 'noticefill',
				      color: 'olive',
				      badge: 118,
				      name: '通知'
				    }, {
				      icon: 'commentfill',
				      color: 'cyan',
				      badge: 1,
				      name: '评论'
				    }, {
				      icon: 'footprint',
				      color: 'blue',
				      badge: 0,
				      name: '足迹'
				    }],
				    gridCol:3,
				    skin: false,
				// 签到按钮状态
				sign: {
					btnColor: 'bg-grey cu-btn round shadow sm',
					signIcon: 'cuIcon-creative lg'
				}
			}
		},
		methods: {
			/**
			 * 签到按钮颜色切换
			 */
			changeBtnSign: function () {
				if (this.sign.btnColor == 'bg-green') {
					return;
				} else {
					this.sign.btnColor = 'bg-green cu-btn round shadow sm'
					this.sign.signIcon = 'cuIcon-creativefill lg'
				}
			},
			/**
			 * 宫格单位点击
			 */
			cellItemClick: function (itemName) {
				console.log(itemName)
				// this.$refs.uToast.success('点击了第${itemName}个')
			}
		},
		onShow: function () {
			this.loadingPage.loadingBoolean = false
			this.loadingPage.loadingPageName = ''
		}
	}
</script>

<style lang="scss" scoped>
	.back-top {
		// background-color: $u-primary-light;
		height:79vh;
		margin-top:0;
		background: -webkit-linear-gradient(top, rgb(236, 245, 255), rgb(43, 133, 228),  rgb(160, 207, 255),  rgb(160, 207, 255), rgb(236, 245, 255), rgb(236, 245, 255), rgb(255, 255, 255));
		padding-top:120rpx;
	}
	// 顶部头像高度
	.padding-sm-userdetail {
		height: 300rpx;
	}
	.padding-sm-userdetail > view {
		height:100%;
	}
	// 顶部个人信息框分区
	.user-detail-data {
		display:flex;
		flex-direction:row;
	}
	.user-detail-left {
		flex: 1.5;
		display:flex;
		justify-items: center;
		align-items: center;
	}
	.user-detail-center {
		flex: 3;
		display:flex;
		flex-direction: column;
	}
	.user-detail-center-name {
		flex:1;
		display:flex;
		align-items:flex-end;
	}
	.user-detail-center-account {
		flex:1;
		display:flex;
		align-items:flex-start;
	}
	.user-detail-right {
		flex: 1;
		display:flex;
		justify-items:center;
		align-items:center;
	}
	// 页面加载中的样式
	.loadingPageName{
		position:absolute; 
		width:100%; 
		height:79vh; 
		z-index: 1;
	}
</style>
