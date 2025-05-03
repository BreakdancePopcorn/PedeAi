const qrcode = require('qrcode-terminal');
const { Client, Buttons } = require('whatsapp-web.js');

const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ Bot conectado!');
});

client.on('message', async msg => {
    if (msg.body.toLowerCase() === 'teste') {
        const button = new Buttons(
            'Clique no botão abaixo:',
            [{ body: 'Exibir cardápio' }],
            'Botão de Teste',
            'Toque aqui'
        );

        try {
            await client.sendMessage(msg.from, button);
            console.log('✅ Botão enviado!');
        } catch (err) {
            console.error('❌ Erro ao enviar botão:', err);
        }
    }
});

client.initialize();
