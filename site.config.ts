import { defineSiteConfig } from 'valaxy'

export default defineSiteConfig({
  lang: 'zh-CN',
  title: 'YrRedCrew',
  subtitle: '现实与实现',
  description: '生命可以违抗一切 但唯独不能违抗岁月',
  author: {
    name: 'YangRan',
    avatar: 'https://redcrew.cn/images/Yr.jpg',
    status: {
      emoji: '👻',
    },
  },
  url: 'https://redcrew.cn/',
  mediumZoom: { enable: true },
  social: [
    /* {
      name: 'RSS',
      link: '/atom.xml',
      icon: 'i-ri-rss-line',
      color: 'orange',
    }, */
    /* {
      name: 'QQ 群 1050458482',
      link: 'https://qm.qq.com/cgi-bin/qm/qr?k=kZJzggTTCf4SpvEQ8lXWoi5ZjhAx0ILZ&jump_from=webapi',
      icon: 'i-ri-qq-line',
      color: '#12B7F5',
    }, */
    {
      name: 'GitHub',
      link: 'https://github.com/YrRedCrew',
      icon: 'i-ri-github-line',
      color: '#6e5494',
    },
    /* {
      name: '微博',
      link: 'https://weibo.com/jizhideyunyoujun',
      icon: 'i-ri-weibo-line',
      color: '#E6162D',
    }, */
    /* {
      name: '豆瓣',
      link: 'https://www.douban.com/people/yunyoujun/',
      icon: 'i-ri-douban-line',
      color: '#007722',
    }, */
    /* {
      name: '网易云音乐',
      link: 'https://music.163.com/#/user/home?id=247102977',
      icon: 'i-ri-netease-cloud-music-line',
      color: '#C20C0C',
    }, */
    /* {
      name: '知乎',
      link: 'https://www.zhihu.com/people/yunyoujun/',
      icon: 'i-ri-zhihu-line',
      color: '#0084FF',
    }, */
    /* {
      name: '哔哩哔哩',
      link: 'https://space.bilibili.com/1579790',
      icon: 'i-ri-bilibili-line',
      color: '#FF8EB3',
    }, */
    /* {
      name: '微信公众号',
      link: 'https://cdn.yunyoujun.cn/img/about/white-qrcode-and-search.jpg',
      icon: 'i-ri-wechat-2-line',
      color: '#1AAD19',
    }, */
    /* {
      name: 'Twitter',
      link: 'https://twitter.com/YunYouJun',
      icon: 'i-ri-twitter-line',
      color: '#1da1f2',
    }, */
    /* {
      name: 'Telegram Channel',
      link: 'https://t.me/elpsycn',
      icon: 'i-ri-telegram-line',
      color: '#0088CC',
    }, */
    {
      name: '图床',
      link: 'https://tc.redcrew.cn/',
      icon: 'i-ri-image-line',
      color: '#F0BB40;',
    },
    {
      name: 'E-Mail',
      link: 'mailto:1144586076@qq.com',
      icon: 'i-ri-mail-line',
      color: '#8E71C1',
    },
    {
      name: 'Zabbix',
      link: 'https://zabbix.redcrew.cn/',
      icon: 'i-ri-bar-chart-2-line',
      color: '#D40000',
    },
    {
      name: 'Travelling',
      link: 'https://www.travellings.cn/go.html',
      icon: 'i-ri-train-line',
      color: 'var(--va-c-text)',
    },
  ],
  // 搜索功能
  search: {
    enable: true,
    type: 'fuse',
  },
  fuse: {
    options: {
      keys: ['title', 'tags', 'categories', 'excerpt', 'content'],
      /**
       * @default 0.6
       * @see https://www.fusejs.io/api/options.html#threshold
       * 设置匹配阈值，越低越精确
       */
      // threshold: 0.6,
      /**
       * @default false
       * @see https://www.fusejs.io/api/options.html#ignoreLocation
       * 忽略位置
       * 这对于搜索文档全文内容有用，若无需全文搜索，则无需设置此项
       */
      ignoreLocation: true,
    },
  },

  // 评论功能
  comment: {
    enable: true,
  },
  // 字数与阅读时间统计功能
  statistics: {
    enable: true,
  },

  sponsor: {
    enable: true,
    title: '我很可爱，请给我钱！',
    methods: [
      /* {
        name: '支付宝',
        url: 'https://cdn.yunyoujun.cn/img/donate/alipay-qrcode.jpg',
        color: '#00A3EE',
        icon: 'i-ri-alipay-line',
      },
      {
        name: 'QQ 支付',
        url: 'https://cdn.yunyoujun.cn/img/donate/qqpay-qrcode.png',
        color: '#12B7F5',
        icon: 'i-ri-qq-line',
      },
      {
        name: '微信支付',
        url: 'https://cdn.yunyoujun.cn/img/donate/wechatpay-qrcode.jpg',
        color: '#2DC100',
        icon: 'i-ri-wechat-pay-line',
      }, */
    ],
  },

  // 加密功能
  encrypt: {
    enable: true,
  },
})

