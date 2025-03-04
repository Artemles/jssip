document.addEventListener("DOMContentLoaded", () => {
    console.log("JsSIP загружен?", typeof JsSIP !== "undefined" ? "Да" : "Нет");

    if (typeof JsSIP === "undefined") {
        console.error("❌ Ошибка: JsSIP не загружен! Проверь подключение в index.html.");
        return;
    }

    const socket = new JsSIP.WebSocketInterface('wss://147.45.157.8:7443');
    const configuration = {
        sockets: [socket],
        uri: 'sip:205@147.45.157.8',
        password: '205',
    };

    const userAgent = new JsSIP.UA(configuration);

    userAgent.on('registered', () => console.log('✅ Успешно зарегистрирован'));
    userAgent.on('registrationFailed', (e) => console.error('❌ Ошибка регистрации:', e.cause));
    userAgent.start();

    document.getElementById('callButton').addEventListener('click', () => {
        const destination = prompt('Введите SIP-адрес (например, sip:user@your-sip-server.com):');
        if (!destination) return;

        const options = { mediaConstraints: { audio: true, video: false } };
        userAgent.call(destination, options);
    });
});
