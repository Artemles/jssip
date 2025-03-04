import JsSIP from 'jssip';

// === 1. Настройка WebSocket и учетных данных SIP ===
const socket = new JsSIP.WebSocketInterface('wss://sip.example.com:7443'); // Укажи свой WebSocket сервер
const configuration = {
  sockets: [socket],
  uri: 'sip:your_username@example.com',
  password: 'your_password',
};

const userAgent = new JsSIP.UA(configuration);

// === 2. Обработчики событий регистрации ===
userAgent.on('registered', () => console.log('✅ SIP-аккаунт успешно зарегистрирован'));
userAgent.on('unregistered', () => console.log('❌ SIP-аккаунт отключён'));
userAgent.on('registrationFailed', (e) => console.error('⚠ Ошибка регистрации:', e.cause));

// === 3. Запуск SIP-клиента ===
userAgent.start();

// === 4. Исходящий вызов ===
function makeCall(destination) {
  const eventHandlers = {
    progress: () => console.log('📞 Звонок в процессе...'),
    failed: (e) => console.error('❌ Звонок не удался:', e.cause),
    confirmed: () => console.log('✅ Звонок подтверждён'),
    ended: () => console.log('📴 Звонок завершён'),
  };

  const options = { eventHandlers, mediaConstraints: { audio: true, video: false } };
  const session = userAgent.call(destination, options);
}

// === 5. Обработчик входящих звонков ===
userAgent.on('newRTCSession', (e) => {
  const session = e.session;
  console.log('📲 Входящий вызов от:', session.remote_identity.uri.toString());

  session.on('accepted', () => console.log('✅ Вызов принят'));
  session.on('ended', () => console.log('📴 Вызов завершён'));

  // Автоматический ответ
  session.answer({ mediaConstraints: { audio: true, video: false } });
});

// === 6. Экспорт функций (если нужно использовать в других файлах) ===
export { makeCall };
