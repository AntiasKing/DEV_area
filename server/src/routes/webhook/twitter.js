module.exports = function (router, usersRef) {

	router.get('/webhooks/twitter', function(req, res) {
		var crc_token = req.query.crc_token
		if (crc_token) {
			var hash = crypto.createHmac('sha256', 'P4kwpMLWumpxlzlAMtMFRtTBh25VVyjGElHoJrjBkNQgUDFHey').update(crc_token).digest('base64')
			res.status(200);
			res.send({
				response_token: 'sha256=' + hash
			})
		} else {
			res.status(400);
			res.send('Error: crc_token missing from request.')
		}
	})

	router.post('/webhooks/twitter', function(req, res) {
		console.log(req.body)
		res.status(200).send();
	})

}
