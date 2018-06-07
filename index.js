const WebSocket = require('ws');

const wss = new WebSocket.Server({port: 8000});

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        let action = JSON.parse(message);
        switch (action.event){
            case 'message':
                wss.clients.forEach(function (client) {
                    if(ws !== client){
                        client.send(message);
                        console.log("sending message");
                    }
                });
                break;
        }
    });

    console.log('Connected');
    ws.send(JSON.stringify({"event": "Connected"}));
});