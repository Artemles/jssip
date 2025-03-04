

// Подключение JsSIP из CDN (если импорт из npm не подходит)
const socket = new JsSIP.WebSocketInterface('wss://147.45.157.8:7443'); // Замени на свой сервер
const configuration = {
  sockets: [socket],
  uri: 'sip:205@147.45.157.8',
  password: '205',
};

const userAgent = new JsSIP.UA(configuration);

// Обработчики событий
userAgent.on('registered', () => console.log('✅ Успешно зарегистрирован'));
userAgent.on('registrationFailed', (e) => console.error('❌ Ошибка регистрации:', e.cause));
userAgent.start();

// Функция вызова
function makeCall() {
  const destination = prompt('Введите SIP-адрес (например, sip:user@your-sip-server.com):');
  if (!destination) return;

  const options = {
    mediaConstraints: { audio: true, video: false },
  };

  userAgent.call(destination, options);
}

// Привязка кнопки
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('callButton').addEventListener('click', makeCall);
});
