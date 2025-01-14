import { register } from 'yimi-webrtc-phone';
import { useRef, useEffect } from 'react';
import debug from 'debug';
import './App.css';

console.log = debug('app:log');
debug.enable('app:log');

const App = () => {
  // dom 节点的 ref
  const phoneRef = useRef(null);
  // 标记是否调用了 register();
  // 避免重复注册报错
  const initialized = useRef(false);
  const configed = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      // 注册为 Web Component
      register();
      initialized.current = true;
    }
    return () => {};
  }, []);
  useEffect(() => {
    if (configed.current) {
      console.log('Called initconfig()!')
      return;
    }
    if (phoneRef.current) {
      // 注册事件监听
      phoneRef.current.addEventListener('phone-message', (message) => {
        const { type, data } = message.detail[0];
        switch (type) {
          case 'status':
            console.log('status', data);
            break;
          case 'register':
            console.log('register', data);
            break;
          case 'newPBXCall':
            console.log('newPBXCall', data);
            break;
          case 'cancelPBXCall':
            console.log('cancelPBXCall', data);
            break;
          case 'calloutResponse':
            console.log('calloutResponse', data);
            break;
          case 'answeredPBXCall':
            console.log('answeredPBXCall', data);
            break;
          case 'endPBXCall':
            console.log('endPBXCall', data);
            break;
          case 'kickedOffLine':
            console.log('kickedOffLine', data);
            break;
        }
      });
      // 初始化配置项
      try {
        phoneRef.current.initConfig({
          server: process.env.APP_SERVER,
          officeNumber: process.env.APP_OFFICE_NUMBER,
          number: process.env.APP_NUMBER,
          password: process.env.APP_PASSWORD,
          type: '2',
          phone: '',
          autoLogin: true
        });
        configed.current = true;
      } catch (error) {
        console.error('error:', error);
      }
    }
  }, [phoneRef.current]);
  return (
    <div className="content">
      <yimi-webrtc-phone ref={phoneRef} size="large"></yimi-webrtc-phone>
    </div>
  );
};
export default App;
