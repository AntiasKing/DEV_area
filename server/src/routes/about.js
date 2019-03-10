const C = require('../../config/service');
const Config = C.Config;

module.exports = function (router, usersRef) {
    router.get('/about.json', function (req, res) {
        let about = {
            client: {
                host: req.ip.substr(0, 7) == '::ffff:' ? req.ip.substr(7) : req.ip,
            },
            server: {
                current_time: new Date().getTime(),
                services: Config.services.map(n => {
                    return {
                        name: n.name,
                        actions: n.actions.map(x => {
                            return {
                                name: x.name,
                                description: x.description,
                            }
                        }),
                        reactions: n.reactions.map(x => {
                            return {
                                name: x.name,
                                description: x.description,
                            }
                        })
                    }
                })
            }
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(about);
    })
}