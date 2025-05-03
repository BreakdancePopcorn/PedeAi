// leitor de qr code
const qrcode = require('qrcode-terminal');
const { Client, Buttons, List, MessageMedia } = require('whatsapp-web.js'); // Mudança Buttons
const client = new Client();
// serviço de leitura do qr code
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});
// apos isso ele diz que foi tudo certo
client.on('ready', () => {
    console.log('✅ Bot conectado com sucesso!');
});
// E inicializa tudo 
client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms)); // Função que usamos para criar o delay entre uma ação e outra

// Funil

client.on('message', async msg => {

    if (msg.body.match(/(menu|Menu|dia|tarde|noite|oi|Oi|Olá|olá|ola|Ola)/i) && msg.from.endsWith('@c.us')) {

        const chat = await msg.getChat();

        await delay(1000); //delay de 1 segundo
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(1000); //Delay de 1000 milisegundos mais conhecido como 1 segundo
        const contact = await msg.getContact(); //Pegando o contato
        const name = contact.pushname; //Pegando o nome do contato
        await client.sendMessage(msg.from,'Olá, ' + name.split(" ")[0] + '! Sou o assistente virtual da lanchonete X. Como posso ajudá-lo hoje? \n\nPara acessar o cardápio, digite 1'); //Primeira mensagem de texto        

        await delay(1000); //delay de 1 segundo
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(2000); //Delay de 5 segundos
    
        
    }




    if (msg.body !== null && msg.body === '1' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
    
        await delay(1000); // delay de 1 segundo
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(1000);
    
        await client.sendMessage(msg.from, 'Mensagem Exemplo 1');
        const media = MessageMedia.fromFilePath('./images/Rickrolling_QR_code.png');
        await client.sendMessage(msg.from, media);
    
        await delay(1000); // delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(1000);
    
        await client.sendMessage(msg.from, 'Mensagem Exemplo 2');
    }
    




});