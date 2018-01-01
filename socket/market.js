module.exports = function(io) {
    const axios = require('axios')
    io.sockets.on('connection', function(socket) {
        console.log('socket is connected')
        // emit axios every 10 sec
        setInterval(function(){
            axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=0').then(data => {
                socket.emit('all market respond', data.data);
            }).catch(err => {
                console.log(err)
            })
        }, 10000);

        socket.on('all market request', () => {
            axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=0').then(data => {
                socket.emit('all market respond', data.data);
            }).catch(err => {
                console.log(err)
            })
        })

        socket.on('coin id request', function(data) {
            axios.get('https://api.coinmarketcap.com/v1/ticker/' + data.id).then(data => {
                socket.emit('coin id respond', data.data)
            }).catch(err => {
                console.log(err)
            })
        })
    })
}