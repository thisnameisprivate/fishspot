/**
			 * 点赞成功顶部notify消息提示
			 */
			function notifySuccess () {
				this.$refs.uNotify.show({
				    top: 180,
				    type: 'success',
				    message: '已赞同',
				    duration: 1500,
				    fontSize: 20,
					icon: 'heart-fill'
				})
			}
			/**
			 * 点赞失败顶部notify消息提示
			 */
			function notifyCancel () {
				this.$refs.uNotify.show({
					top: 180,
					type: 'warning',
					message: '点赞已取消',
					duration: 1500,
					fontSize: 20,
					icon: 'heart'
				})
			}
			export {
				notifySuccess,
				notifyCancel,
			}