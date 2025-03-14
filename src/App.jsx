import { register } from 'yimi-webrtc-phone';
// import { register } from '../../yimi-webrtc-phone/dist/yimi-webrtc-phone.es';
import { useRef, useEffect, useState } from 'react';
import { Button, Select, Form, Input, Popover, Switch } from 'antd';
import {
  CloseOutlined,
  PhoneOutlined,
  PoweroffOutlined,
  AudioMutedOutlined,
  AudioOutlined,
  CustomerServiceOutlined,
} from '@ant-design/icons';
import debug from 'debug';
import './App.css';

console.log = debug('app:log');
debug.enable('app:log,yimi-webrtc-phone');

const App = () => {
  // dom 节点的 ref
  const phoneRef = useRef(null);
  // 标记是否调用了 register();
  // 避免重复注册报错
  const initialized = useRef(false);
  const configed = useRef(false);
  const colors = useRef({
    free: '#95de64',
    offline: '#d9d9d9',
    ringing: '#ffc53d',
    talking: '#95de64',
    busy: '#ffa940',
    after_call: '#ff7a45',
  });
  const [isVoip, setIsVoip] = useState(true);
  const autuAnswer = useRef(false);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    if (phoneRef.current) {
      phoneRef.current.changeSeatStatus(value);
    }
  };

  const onFinish = (values) => {
    console.log('Success:', values);
    if (phoneRef.current) {
      phoneRef.current.handleCall(values.number);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('onFinishFailed:', errorInfo);
  };

  const onFormFinish = (values) => {
    console.log('onFormFinish:', values);
    if (phoneRef.current) {
      phoneRef.current.initConfig(values);
    }
  };

  const onFormFinishFailed = (errorInfo) => {
    console.log('onFormFinishFailed:', errorInfo);
  };

  const handleCall = () => {
    console.log('handleCall');
    if (phoneRef.current) {
      phoneRef.current.handleCall();
    }
  };

  const handleSubmit = (values) => {
    console.log('handleCall');
    if (phoneRef.current) {
      phoneRef.current.initConfig();
    }
  };

  const onValuesChange = (changedValues, allValues) => {
    console.log('changedValues:', changedValues);
    if (changedValues.type) {
      setIsVoip(changedValues.type === 2);
      console.log('isVoip:', isVoip);
    }
  };

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
    autuAnswer.current = checked;
  };

  useEffect(() => {
    if (!initialized.current) {
      // 注册为 Web Component
      register();
      initialized.current = true;
      document.title = 'yimi-webrtc-phone';
    }
    return () => {};
  }, []);
  useEffect(() => {
    if (configed.current) {
      console.log('Called initconfig()!');
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
            if (autuAnswer.current) {
              phoneRef.current.handleAnswer();
            }
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
        // phoneRef.current.initConfig(config.current);
        configed.current = true;
      } catch (error) {
        console.error('error:', error);
      }
    }
  }, [phoneRef.current]);

  return (
    <div className="content">
      <yimi-webrtc-phone ref={phoneRef}></yimi-webrtc-phone>
    </div>
  );
};
export default App;
