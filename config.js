exports.dev = {
    port: 3000,
    client_port: 3000,
    mongoose_auth: 'mongodb://mongodb@localhost/subway'
}

exports.prod = {
    port: 14858, // Nodester port
    client_port: 80, // Websockets talk on port 80 on Nodester, regardless of listen port
    mongoose_auth: 'mongodb://nodejitsu_yolk:2ol46qip04agri14gstbgr0at@ds039267.mongolab.com:39267/nodejitsu_yolk_nodejitsudb8499178618'
}

exports.misc = {
  max_log_size: 32000
}
