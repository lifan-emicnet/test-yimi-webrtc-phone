import Phone from './App';
import './App.css';

const App = () => {
  return (
    <div>
      <header>
        <h1>YimiWebRTC Phone 介绍</h1>
        <p>高效、灵活的 WebRTC 通话解决方案</p>
      </header>

      <section>
        <h2>产品简介</h2>
        <p>
          YimiWebRTC Phone 是一款基于 Vue3 开发的 WebRTC
          电话组件，旨在满足呼叫中心等在线通话场景的需求。通过封装为 Web
          Component，该产品实现了跨框架复用，支持 ES Module 和 IIFE
          两种引入方式，可在任意前端项目中轻松集成。
        </p>
      </section>
      <section>
        <h2>产品演示</h2>
        <p style={{ textAlign: 'center' }}>
          该组件的 UI 使用{' '}
          <a href="https://ant.design/docs/spec/introduce" target="_blank">
            Ant Design 组件库
          </a>{' '}
          进行自定义
        </p>
        <Phone />
      </section>

      <section>
        <h2>主要功能</h2>
        <ul>
          <li>
            <strong>支持多种设备</strong>
            ：支持在现代浏览器中直接使用，支持回拨到手机上，支持绑定到传统座机。
          </li>
          <li>
            <strong>坐席状态管理</strong>
            ：支持空闲、忙碌、通话中、话后处理等多种状态。
          </li>
          <li>
            <strong>通话操作</strong>：提供拨打、接听、挂断、静音等基础操作。
          </li>
          <li>
            <strong>高度自定义</strong>：可自定义主题、尺寸及按钮 UI。
          </li>
          <li>
            <strong>事件系统</strong>
            ：支持丰富的事件类型，方便开发者接入自定义逻辑。
          </li>
          <li>
            <strong>本地日志记录</strong>：操作记录可导出，便于分析与排查。
          </li>
        </ul>
      </section>

      <section>
        <h2>使用场景</h2>
        <p>呼叫中心、在线客服系统等场景均可使用。</p>
      </section>

      <section>
        <h2>快速集成示例</h2>
        <div className="code-box">
          <code>npm i yimi-webrtc-phone</code>
        </div>
        <div className="code-box">
          <code>
            &lt;yimi-webrtc-phone id="phone"&gt;&lt;/yimi-webrtc-phone&gt;
            <br />
            &lt;script&gt;
            <br />
            &nbsp;&nbsp;const phoneBar = document.getElementById("phone");
            <br />
            &nbsp;&nbsp;phoneBar.initConfig(&#123; &#46;&#46;&#46; &#125;); //
            初始化配置
            <br />
            &nbsp;&nbsp;phoneBar.handleCall("10010"); // 调用接口拨打电话
            <br />
            &lt;/script&gt;
          </code>
        </div>
      </section>

      <section>
        <h2>目标用户</h2>
        <ul>
          <li>呼叫中心解决方案提供商</li>
          <li>企业 IT 部门和开发团队</li>
          <li>希望优化在线客户服务体验的企业</li>
        </ul>
      </section>

      <section>
        <h2>联系我们</h2>
        <p>
          访问 <a href="https://www.emicnet.com/">官网</a>{' '}
          或联系我们，获取更多关于呼叫中心、智能语音机器人等的详细信息和技术支持。
        </p>
      </section>

      <footer>
        <p>
          Copyright © 2018-2025 EMI. ALL rights reserved
          南京易米云通网络科技有限公司 版权所有 苏ICP备14035390号-4
        </p>
      </footer>
    </div>
  );
};

export default App;
