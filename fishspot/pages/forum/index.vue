<template>
	<view>
		<!-- 导航条组件 -->
		<navbar></navbar>
		<!-- 为了禁止IOS下拉顶部留白， 所以禁止了json文件中的配置选项，但要满足满屏可下拉所以用到以下标签包裹整个页面  -->
		<scroll-view scroll-y="true" class="contentScroll" :enhanced="true" :bounces="false" :show-scrollbar="false" @scrolltolower="touchBottomLoadMoreFish" :lower-threshold='20'>
		<!-- 图文组件 -->
		<view class="container">
		<!-- 点赞成功提示 -->
		<u-notify ref="uNotify"></u-notify>
		<view v-for="(item, key, index) in urls" :key="index">
			<view class="u-page">
			<view class="u-demo-block">
			    <!-- <text class="u-demo-block__title">多图模式</text> -->
			    <view class="u-demo-block__content">
			        <view class="album">
			            <view class="album__avatar">
			                <image
			                        src="/static/logo.png"
			                        mode=""
			                        style="width: 32px;height: 28px;"
			                ></image>
			            </view>
			            <view class="album__content">
			                <u--text
			                        :text="item.userDetail.name"
									color="#293f66;"
			                        bold
			                        size="28"
			                ></u--text>
			                <u--text
			                        margin="0 0 8px 0"
			                        :text="item.userDetail.text"
									size="26"
			                ></u--text>
			                <u-album :urls="item.imageUrls" keyName="image" singleSize="526" multipleSize="172"></u-album>
			            </view>
			        </view>
			    </view>
			</view>
			</view>
			
			<view class="cellStyle">
				<u-cell-group :border="false">
					<u-cell :border="false" titleStyle="color:#293f66;" :label="item.userDetail.date">
						<u-icon :name="item.userDetail.icon" :color="item.userDetail.color" size="40" slot="value" @click="iconLikeButton(key)"></u-icon>
						<text decode slot="value" style="color:#398ade;font-size:24rpx;">{{ item.userDetail.likeCount ? item.userDetail.likeCount : spance }}</text>
						<text decode slot="value">{{ spance }}</text>
						<u-icon name="chat" color="" size="40" slot="value" @click="iconButtonMessage(key)"></u-icon>
						<text decode slot="value">{{ spance }}</text>
					</u-cell>
				</u-cell-group>
			</view>
			<view class="cu-list menu-avatar comment solids-top">
				<view class="cu-item">
			    <!-- <view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);"></view> -->
					<view class="content">
						<view v-for="message in item.messagedatas">
						<view class="radius  text-sm">
						    <view class="flex">
						        <view class="text-grey">{{ message.username }}：</view>
						        <view class="flex-sub">{{ message.message }}</view>
						    </view>
						</view>
						</view>
					</view>
				</view>
			</view>
			<view class="box" v-if="item.messagebox.show">
			  <view class="cu-bar input">
			    <view class="action">
			      <text class="cuIcon-sound text-grey"></text>
			    </view>
			    <input class="solid-bottom" :focus="item.messagebox.focus" maxlength="300" cursor-spacing="10" v-model="messageBoxText"></input>
			    <view class="action">
			      <text class="cuIcon-emojifill text-grey"></text>
			    </view>
			    <button class="cu-btn bg-green shadow-blur" @click="buttonMessage(key)">发送</button>
			  </view>
			</view>
			<!-- <u-gap height="1" bgColor="#F5F9FF" marginTop="10"></u-gap> -->
		</view>
		</view>
		</scroll-view>
		<!-- 底部tabbar -->
		<tabbars></tabbars>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 空格,uniapp中必须这样使用这种方式来展示小程序中的空格
				spance:"&nbsp;&nbsp;",
				// 点赞特效
				likeShow: false,
				albumWidth: 0,
				// input框中的信息
				messageBoxText: '',
				urls:{
					urls1: {
						// 个人信息
						userDetail:{
							name: '迷失的维京人',
							text: '全面的组件和便捷的工具会让您信手拈来，如鱼得水挣脱束缚， 向往自由',
							date: '1 天前',
							icon: 'heart', // heart-fill
							color: '', // #398ade
							likeCount: '' ,// 1118
						},
						// 图片信息
						imageUrls: [
							{image: 'https://cdn.uviewui.com/uview/album/1.jpg'},
							{image: 'https://cdn.uviewui.com/uview/album/2.jpg'},
							{image: 'https://cdn.uviewui.com/uview/album/3.jpg'},
							{image: 'https://cdn.uviewui.com/uview/album/4.jpg'},
							{image: 'https://cdn.uviewui.com/uview/album/5.jpg'},
							{image: 'https://cdn.uviewui.com/uview/album/6.jpg'},
							{image: 'https://cdn.uviewui.com/uview/album/7.jpg'},
							{image: 'https://cdn.uviewui.com/uview/album/8.jpg'},
							{image: 'https://cdn.uviewui.com/uview/album/9.jpg'},
							{image: 'https://cdn.uviewui.com/uview/album/10.jpg'}
						],
						// 评论列表
						messagedatas: [
							{username: '莫甘娜', message: '凯尔，你被自己的光芒变的盲目-'},
							{username: '凯尔', message: '如果不是为了飞翔，我们要这翅膀有何用-'},
							{username: '疾风剑豪', message: '如果真相带来痛苦，那么谎言只会雪上加霜。'},
							{username: '放逐之刃', message: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试？'}
						],
						// 评论操作输入框是否展示
						messagebox: {
							// 是否显示输入框
							show:false,
							focus: false,
							message: ''
						},
					},
					urls2: {
						userDetail:{
							name: '鱼点通官方团队',
							text: '假设一种东西，长得像老鼠，吃着像老鼠，也不会是老鼠，更加可能像是鸭子',
							date: '1 天前',
							icon: 'heart', // heart-fill
							color: '', // #398ade
							likeCount: '' // 1118
						},
						imageUrls: [
							{image: 'https://cdn.uviewui.com/uview/album/1.jpg'}
						],
						messagedatas: [
							{username: '疾风剑豪', message: '世间万般刀刃，唯有过往伤人最深。'},
						],
						// 评论操作输入框是否展示
						messagebox: {
							// 是否显示输入框
							show:false,
							focus: false,
							message: ''
						},
					},
					urls3: {
						userDetail:{
							name: '京维众包网络科技',
							text: '很久很久以后，我才知道，每天捡板栗的日程，他都要在山下的大水库边坐上很久。他在那里默默抽完一根又一根烟，直到这些烟打消了炽热的念头，他才起身离开水库，给我捡板栗。',
							date: '2 天前',
							icon: 'heart', // heart-fill
							color: '', // #398ade
							likeCount: '' // 1118
						},
						imageUrls: [
							{image: 'https://cdn.uviewui.com/uview/album/6.jpg'},
							{image: 'https://cdn.uviewui.com/uview/album/7.jpg'},
							{image: 'https://cdn.uviewui.com/uview/album/8.jpg'},
							{image: 'https://cdn.uviewui.com/uview/album/9.jpg'},
							{image: 'https://cdn.uviewui.com/uview/album/10.jpg'}
						],
						messagedatas: [
							
						],
						// 评论操作输入框是否展示
						messagebox: {
							// 是否显示输入框
							show:false,
							focus: false,
							message: ''
						},
					},
					urls4: {
						userDetail:{
							name: '京维众包网络科技',
							text: '很久很久以后，我才知道，每天捡板栗的日程，他都要在山下的大水库边坐上很久。他在那里默默抽完一根又一根烟，直到这些烟打消了炽热的念头，他才起身离开水库，给我捡板栗。',
							date: '2 天前',
							icon: 'heart', // heart-fill
							color: '', // #398ade
							likeCount: '' // 1118
						},
						imageUrls: [
							// {image: 'https://cdn.uviewui.com/uview/album/6.jpg'},
							// {image: 'https://cdn.uviewui.com/uview/album/7.jpg'},
							// {image: 'https://cdn.uviewui.com/uview/album/8.jpg'},
							// {image: 'https://cdn.uviewui.com/uview/album/9.jpg'},
							// {image: 'https://cdn.uviewui.com/uview/album/10.jpg'}
						],
						messagedatas: [
							{username: '凯尔', message: '如果不是为了飞翔，我们要这翅膀有何用-'}
						],
						// 评论操作输入框是否展示
						messagebox: {
							// 是否显示输入框
							show:false,
							focus: false,
							message: ''
						},
					}
				},
			}
		},
		methods: {
			/**
			 * @param {Object} key
			 * 点赞行为
			 */
			iconLikeButton: function (key) {
				// 通过判断当前的 color 颜色是否已经点赞
				if (this.urls[key].userDetail.color == '') {
					// 调用点赞提示
					this.notifySuccess('点赞成功')
					// 为空则没有被点赞过，是默认样式, 则将icon，color改为点赞后的样式，likeCount后期需要读取后端展示真的点赞数
					this.urls[key].userDetail.color = '#398ade'
					this.urls[key].userDetail.icon = 'heart-fill'
					// 随机生成一个点赞的数量
					this.urls[key].userDetail.likeCount = Math.ceil(Math.random() * 100)
				} else {
					this.notifyCancel('取消点赞')
					this.urls[key].userDetail.color = ''
					this.urls[key].userDetail.icon = 'heart'
					this.urls[key].userDetail.likeCount = ''
				}
			},
			/**
			 * 评论键盘弹出操作
			 */
			iconButtonMessage: function (key) {
				var that = this;
				// 读取用户上次未发送的内容
				this.messageBoxText = this.urls[key].messagebox.message
				this.urls[key].messagebox.show = true
				this.urls[key].messagebox.focus = true
				// 设置为键盘弹出250之后再开始监听键盘高度, 防止第一次弹出键盘失败
				setTimeout(() => {
					// 调取键盘是否收起监听事件
					wx.onKeyboardHeightChange((res) => {
						// 当键盘高度=0时
						if (res.height == 0) {
							that.urls[key].messagebox.show = false
							that.urls[key].messagebox.focus = false
							// 储存用户上次未发送的内容
							that.urls[key].messagebox.message = that.messageBoxText
						}
					})
				}, 100)
			},
			/**
			 * 发送留言
			 */
			buttonMessage: function (key) {
				if (this.messageBoxText.length == 0) {
					this.notifyCancel('评论不能为空')
					return;
				}
				this.urls[key].messagedatas.push({username: '微信用户', message: this.messageBoxText})
				// 用户发送完成弹出评论成功notify, 并清空当前的输入框内容(messageBoxText)，和对应的urls.messagebox.message
				this.urls[key].messagebox.message = ''
				this.messageBoxText = ''
				// 弹出评论成功notify提示（演示，后期结合后端提示）
				this.notifySuccess('评论成功')
			},
			
			/**
			 * 点赞成功顶部notify消息提示
			 */
			notifySuccess: function (message) {
				this.$refs.uNotify.show({
				    top: 180,
				    type: 'success',
				    message: message,
				    duration: 1500,
				    fontSize: 20,
					icon: 'heart-fill'
				})
			},
			/**
			 * 点赞失败顶部notify消息提示
			 */
			notifyCancel: function (message) {
				this.$refs.uNotify.show({
					top: 180,
					type: 'warning',
					message: message,
					duration: 1500,
					fontSize: 20,
					icon: 'heart'
				})
			}
		}
	}
</script>

<style lang="scss">
	// colorUI 卡片上方的线条隐藏
	.solids-top::after {
		border-top:0px !important;
	}
	// coloUI 卡片评论样式修改
	
	.transition {
		width: 100%;
		height: 100%;
		position:fixed !important;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 999;
	}
	.contentScroll {
		// 可视高度， 需要在多大的盒子中进行滑动
		height:79vh; // 这里本来是100vh的， 但是可能是由于uni-app的自定义底部导航条占了20vh，如果写100vh的话整个页面依旧无法上拉滚动；
		width:100%;
		background-color:#fff;
	}
	.u-page {
		width:97%;
		margin:0 auto;
		margin-top:25rpx;
	}
	.album {
	        @include flex;
	        align-items: flex-start;
	
	        &__avatar {
	             background-color: $u-bg-color;
	             padding: 5px;
	             border-radius: 3px;
	         }
	    
	        &__content {
	             margin-left: 10px;
	             flex: 1;
	         }
	    }
	.cellStyle {
		width:90%;
		margin:0 0 0 40px;
	}
</style>
