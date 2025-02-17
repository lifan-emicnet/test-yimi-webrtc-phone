import { register } from 'yimi-webrtc-phone';
// import { register } from '../../yimi-webrtc-phone/dist/yimi-webrtc-phone.es';
import { useRef, useEffect, useState } from 'react';
import { Button, Select, Form, Input, Popover } from 'antd';
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
    console.log('Failed:', errorInfo);
  };

  const onFormFinish = (values) => {
    console.log('Success:', values);
    if (phoneRef.current) {
      phoneRef.current.initConfig(values);
    }
  };

  const onFormFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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
      <yimi-webrtc-phone
        ref={phoneRef}
        size="large"
        colors={JSON.stringify(colors.current)}
      >
        <span slot="login">
          <Popover content="Login">
            <Button size="large" color="#4096ff" shape="square" type="primary">
              Login
            </Button>
          </Popover>
        </span>
        <span slot="logout">
          <Popover content="Logout">
            <Button size="large" color="#4096ff" shape="square" type="primary">
              Logout
            </Button>
          </Popover>
        </span>
        <span slot="call">
          <Popover content="Type a number to call">
            <Button size="large" shape="square">
              <PhoneOutlined style={{ color: colors.current.free }} />
            </Button>
          </Popover>
        </span>
        <span slot="hangup">
          <Popover content="End/Reject the call">
            <Button size="large" shape="square">
              <PoweroffOutlined style={{ color: colors.current.busy }} />
            </Button>
          </Popover>
        </span>
        <span slot="cancel-mute">
          <Popover content="Unmute the call">
            <Button size="large" shape="square">
              <AudioMutedOutlined style={{ color: colors.current.ringing }} />
            </Button>
          </Popover>
        </span>
        <span slot="mute">
          <Popover content="Mute the call">
            <Button size="large" shape="square">
              <AudioOutlined style={{ color: colors.current.ringing }} />
            </Button>
          </Popover>
        </span>
        <span slot="answer" className="blink">
          <Popover content="Answer the call">
            <Button size="large" shape="square">
              <CustomerServiceOutlined style={{ color: colors.current.free }} />
            </Button>
          </Popover>
        </span>
        <span slot="endAfterCall">
          <Popover content="End the status of after call">
            <Button size="large" shape="square">
              <CloseOutlined style={{ color: colors.current.after_call }} />
            </Button>
          </Popover>
        </span>
        <span slot="status">
          <Popover content="Change status of the seat">
            <Select
              size="large"
              defaultValue="空闲"
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: 1, label: '空闲' },
                { value: 2, label: '忙碌' },
              ]}
            />
          </Popover>
        </span>

        <Form
          size="large"
          className="phone-form"
          slot="phoneForm"
          name="basic"
          labelCol={{
            span: 12,
          }}
          wrapperCol={{
            span: 12,
          }}
          style={{
            width: '450px',
          }}
          initialValues={{
            number: '',
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Phone Number"
            name="number"
            rules={[
              {
                required: true,
                message: 'Please input phone number!',
              },
            ]}
          >
            <Input placeholder="Input phone number" />
          </Form.Item>

          <div
            label={null}
            style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button onClick={handleCall}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Confirm
            </Button>
          </div>
        </Form>
        <Form
          size="large"
          className="phone-form"
          slot="loginForm"
          name="login"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            width: '450px',
          }}
          initialValues={{
            server: process.env.APP_SERVER,
            officeNumber: process.env.APP_OFFICE_NUMBER,
            number: process.env.APP_NUMBER,
            password: process.env.APP_PASSWORD,
            type: 2,
            phone: '',
            preStatus: 1,
          }}
          onFinish={onFormFinish}
          onFinishFailed={onFormFinishFailed}
          onValuesChange={onValuesChange}
          autoComplete="off"
        >
          <Form.Item
            label="Server"
            name="server"
            rules={[
              {
                required: true,
                message: 'Please input server!',
              },
            ]}
          >
            <Input placeholder="Input server" />
          </Form.Item>
          <Form.Item
            label="Office Number"
            name="officeNumber"
            rules={[
              {
                required: true,
                message: 'Please input office number!',
              },
            ]}
          >
            <Input placeholder="Input office number" />
          </Form.Item>
          <Form.Item
            label="Number"
            name="number"
            rules={[
              {
                required: true,
                message: 'Please input number!',
              },
            ]}
          >
            <Input placeholder="Input number" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input password!',
              },
            ]}
          >
            <Input.Password placeholder="Input password" />
          </Form.Item>
          <Form.Item
            label="Type"
            name="type"
            rules={[
              {
                required: true,
                message: 'Please select type!',
              },
            ]}
          >
            <Select
              size="large"
              defaultValue={{ value: 2, label: 'voip' }}
              options={[
                { value: 2, label: 'voip' },
                { value: 5, label: 'sip 话机' },
                { value: 4, label: '回拨话机' },
              ]}
            />
          </Form.Item>
          {isVoip ? null : (
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: 'Please input phone!',
                },
              ]}
            >
              <Input placeholder="Input phone" />
            </Form.Item>
          )}
          <Form.Item
            label="Preset Status"
            name="preStatus"
            rules={[
              {
                required: true,
                message: 'Please select preStatus!',
              },
            ]}
          >
            <Select
              size="large"
              defaultValue={{ value: 1, label: '空闲' }}
              options={[
                { value: 1, label: '空闲' },
                { value: 2, label: '忙碌' },
              ]}
            />
          </Form.Item>
          <div
            label={null}
            style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button onClick={handleSubmit}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Confirm
            </Button>
          </div>
        </Form>
      </yimi-webrtc-phone>
    </div>
  );
};
export default App;
