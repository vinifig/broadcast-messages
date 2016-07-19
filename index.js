#!/usr/bin/env node

'use strict';
const dgram = require('dgram');
const client = dgram.createSocket('udp4');
const network = require('./lib/network.js');

// Escolhe a porta
const PORT              = 6666;
const BROADCAST_ADDRESS = network.getBroadcastAddress()
const USER_ADDRESS      = network.getUserAddress();

// Callback falando que enviou resposta
var sendCallback = function(){ // CHAMADO QUANDO A MENSAGEM FOR ENVIADA
    // Colocar aqui, tarefa para quando enviar uma mensagem
    // console.log("Mensagem disparada");
}

var sendBroadcastMessage = function(mensagem){ // FUNÇÃO PARA ENVIAR A MENSAGEM
    var message = new Buffer(JSON.stringify(mensagem)); // CRIAÇÃO DA MENSAGEM
    client.send(message, 0, message.length, PORT, BROADCAST_ADDRESS, sendCallback); // ENVIA A MENSAGEM E CHAMA "sendCallback"
    console.log('Mensagem enviada' + ':' + '\n' + mensagem + "\n"); // Mostra sua mensagem na tela
}

// Setando o cliente
client.on('listening', function(){
    client.setBroadcast(true); // Definique que o cliente vai enviar msg broadcast
    // Pegando o proprio endereco (IP, porta e tudo mais relacionado a escuta na rede) com client.address()
    console.log("I'm listening in port:" + client.address().port); // porta
    // Inicia codigo de envio
    // setInterval(sendBroadcastMessage, 5000);
})

// Seta o que vai acontecer quando receber uma mensagem
client.on('message', function(dado, info){
    if(info.address == USER_ADDRESS) // SE FOI VOCE NÃO MOSTRARÁ
      return;
    dado = JSON.parse(dado);
    console.log(dado)

    // Envio da mensagem de resposta broadcast ~ detalhe isso entra em loop de envio, então nunca usar
    // sendBroadcastMessage("Recebi sua msg, " + info.address);
})

// Iniciando o cliente
client.bind(PORT);


// SET GLOBAL VARS

setInterval(function(){
  sendBroadcastMessage(USER_ADDRESS);
}, 200)
