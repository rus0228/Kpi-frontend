// https://umijs.org/config/
import { defineConfig } from 'umi';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      layout: false,
      routes: [
        {
          path: '/user/login',
          layout: false,
          name: 'login',
          component: './user/Login',
        },
        {
          path: '/user',
          redirect: '/user/login',
        },
        {
          name: 'register-result',
          icon: 'smile',
          path: '/user/register-result',
          component: './user/register-result',
        },
        {
          name: 'register',
          icon: 'smile',
          path: '/user/register',
          component: './user/register',
        },
        {
          component: '404',
        },
      ],
    },
    {
      path: '/dashboard/analysis',
      name: 'revenue',
      icon: 'stock',
      component: './dashboard/analysis'
    },
    {
      path: '/dashboard/products',
      name: 'products',
      icon: 'sketch',
      component: './dashboard/monitor'
    },
    {
      path: '/dashboard/purchases',
      name: 'purchases',
      icon: 'database',
      component: './dashboard/purchases'
    },
    {
      path: '/dashboard/clients',
      name: 'clients',
      icon: 'smile',
      component: './dashboard/clients'
    },
    {
      path: '/dashboard/inventory-losses',
      name: 'inventory-losses',
      icon: 'disconnect',
      component: './dashboard/inventoryLosses'
    },
    {
      path: '/dashboard/sell-my-phone',
      name: 'sell-my-phone',
      icon: 'mobile',
      component: './dashboard/sellPhone'
    },
    {
      path: '/dashboard/sos',
      name: 'sos',
      icon: 'compass',
      component: './dashboard/sos'
    },
    {
      path: '/dashboard/customer-satisfaction',
      name: 'customer-satisfaction',
      icon: 'like',
      component: './dashboard/satisfaction'
    },
    {
      path: '/dashboard/repairs',
      name: 'repairs',
      icon: 'tool',
      component: './dashboard/repairs'
    },
    {
      path: '/',
      redirect: '/dashboard/analysis',
    },
    {
      component: '404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  openAPI: [
    {
      requestLibPath: "import { request } from 'umi'",
      // 或者使用在线的版本
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    {
      requestLibPath: "import { request } from 'umi'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
  nodeModulesTransform: {
    type: 'none',
  },
  mfsu: {},
  webpack5: {},
  exportStatic: {},
});
