// 获取用户当前位置
function CommGetLocation () {
	uni.getLocation({
		type: 'wgs84',
		success: res => {
			// 将获取到的经度，维度打入到本地储存
			uni.setStorage({
				key: 'location',
				data: {
					latitude: res.latitude,
					longitude: res.longitude
				}
			})
			console.log(res)
		},fail: res => {
			// 用户拒绝了显示位置
			console.log(res)
			return
		}
	})
}

export {
	CommGetLocation,
}