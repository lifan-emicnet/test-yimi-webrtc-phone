# Rsbuild Project

平安万里通需要 React 的例子，所以使用 React 构建这个简单的测试项目。

记录老版 phonebar 的 tag。
<!-- registry-vpc.cn-beijing.aliyuncs.com/web-cm/new-phonebar:2.1.12-2cf117d -->

## Setup

Install the dependencies:

```bash
npm install
```

## Get Started

Start the dev server:

```bash
npm dev
```



# npm update "yimi-webrtc-phone" 失败原因调查

## 过程

```
npm update "yimi-webrtc-phone"
npm list "yimi-webrtc-phone"
test-yimi-webrtc-phone@1.0.0 /Users/langqiu/Projects/call-center/test-yimi-webrtc-phone
└── yimi-webrtc-phone@1.1.28


npm install yimi-webrtc-phone@1.1.29
npm ERR! code ETARGET
npm ERR! notarget No matching version found for yimi-webrtc-phone@1.1.29.
npm ERR! notarget In most cases you or one of your dependencies are requesting
npm ERR! notarget a package version that doesn't exist.

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/langqiu/.npm/_logs/2025-06-18T03_19_07_857Z-debug-0.log

npm view yimi-webrtc-phone versions
[
  '1.0.0',  '1.0.1',  '1.0.2',  '1.0.3',
  '1.0.4',  '1.0.5',  '1.0.6',  '1.0.7',
  '1.0.8',  '1.0.9',  '1.1.0',  '1.1.1',
  '1.1.2',  '1.1.3',  '1.1.4',  '1.1.5',
  '1.1.6',  '1.1.7',  '1.1.8',  '1.1.9',
  '1.1.10', '1.1.11', '1.1.12', '1.1.13',
  '1.1.14', '1.1.15', '1.1.16', '1.1.17',
  '1.1.18', '1.1.19', '1.1.20', '1.1.21',
  '1.1.22', '1.1.23', '1.1.24', '1.1.25',
  '1.1.26', '1.1.27', '1.1.28', '2.0.0',
  '2.0.1',  '2.0.2',  '2.0.3',  '2.0.4',
  '2.0.5',  '2.0.6',  '2.0.7',  '2.0.8'
]

npm config get registry
https://registry.npmmirror.com/

npm update yimi-webrtc-phone --registry https://registry.npmjs.org
npm list "yimi-webrtc-phone"
test-yimi-webrtc-phone@1.0.0 /Users/langqiu/Projects/call-center/test-yimi-webrtc-phone
└── yimi-webrtc-phone@1.1.29
```



## claude 瞎扯

