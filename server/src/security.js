crypto = require('crypto')

var security = {}

security.get_challenge_response = function(crc_token, consumer_secret) {

  hmac = crypto.createHmac('sha256', consumer_secret).update(crc_token).digest('base64')

  return hmac
}
