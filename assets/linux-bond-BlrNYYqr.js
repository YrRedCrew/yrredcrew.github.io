import{_ as r}from"./ValaxyMain.vue_vue_type_style_index_0_lang-068IHmgZ.js";import{c as p,w as a,f as g,a as y,p as F,o,g as i,q as s,m as B,r as k}from"./app-DYthNE-R.js";import"./YunFooter-Zae0V-5m.js";import"./YunCard.vue_vue_type_script_setup_true_lang-DAcOL4KL.js";import"./YunPageHeader.vue_vue_type_script_setup_true_lang-BhN51dU1.js";import"./index-C7yU5XnD.js";const f={__name:"linux-bond",setup(m,{expose:d}){const t=JSON.parse('{"title":"Linux网卡绑定","description":"","frontmatter":{"title":"Linux网卡绑定","date":"2022-11-01T00:00:00.000Z","updated":"2022-11-01T00:00:00.000Z","categories":"Yr的学习","tags":["linux"]},"headers":[{"level":2,"title":"bond概念","slug":"bond概念","link":"#bond概念","children":[]},{"level":2,"title":"linux有七种网卡绑定模式","slug":"linux有七种网卡绑定模式","link":"#linux有七种网卡绑定模式","children":[]},{"level":2,"title":"配置方法","slug":"配置方法","link":"#配置方法","children":[{"level":3,"title":"命令行方式","slug":"命令行方式","link":"#命令行方式","children":[]},{"level":3,"title":"nmtui","slug":"nmtui","link":"#nmtui","children":[]},{"level":3,"title":"图形化","slug":"图形化","link":"#图形化","children":[]}]}],"relativePath":"pages/posts/linux-bond.md","path":"/home/runner/work/yrredcrew.github.io/yrredcrew.github.io/pages/posts/linux-bond.md","lastUpdated":1727593238000}'),e=y(),n=t.frontmatter||{};return e.meta.frontmatter=Object.assign(e.meta.frontmatter||{},t.frontmatter||{}),F("pageData",t),F("valaxy:frontmatter",n),globalThis.$frontmatter=n,d({frontmatter:{title:"Linux网卡绑定",date:"2022-11-01T00:00:00.000Z",updated:"2022-11-01T00:00:00.000Z",categories:"Yr的学习",tags:["linux"]}}),(h,l)=>{const C=r;return o(),p(C,{frontmatter:g(n)},{"main-content-md":a(()=>[l[0]||(l[0]=i("h2",{id:"bond概念",tabindex:"-1"},[s("bond概念 "),i("a",{class:"header-anchor",href:"#bond概念","aria-label":'Permalink to "bond概念"'},"​")],-1)),l[1]||(l[1]=i("p",null,"将两张网卡绑定，共用一个IP，实现冗余效果。实际上Linux双网卡的绑定模式有7种，而在这里常用的是active-backup，一个设备如果只有一个网卡，那么当这个网卡损坏时设备的网络就会瘫痪。绑定接口的作用就是让多个物理网卡服务于一个IP地址，使得这个网络的抵抗性强。一个设备只能有一个bound接口，配置好以后每个网卡需要一根网线，需要插两个网线，交换机也需要做链路聚合。",-1)),B(" more "),l[2]||(l[2]=i("ol",null,[i("li",null,[i("p",null,"mode=0(balance-rr)(平衡抡循环策略)"),i("ul",null,[i("li",null,"链路负载均衡，增加带宽，支持容错，一条链路故障会自动切换正常链路。交换机需要配置聚合口，思科叫port channel。"),i("li",null,"特点：传输数据包顺序是依次传输（即：第1个包走eth0，下一个包就走eth1….一直循环下去，直到最后一个传输完毕），此模式提供负载平衡和容错能力；但是我们知道如果一个连接或者会话的数据包从不同的接口发出的话，中途再经过不同的链路，在客户端很有可能会出现数据包无序到达的问题，而无序到达的数据包需要重新要求被发送，这样网络的吞吐量就会下降")])]),i("li",null,[i("p",null,"mode=1(active-backup)(主-备份策略)"),i("ul",null,[i("li",null,"这个是主备模式，只有一块网卡是active，另一块是备用的standby，所有流量都在active链路上处理，交换机配置的是捆绑的话将不能工作，因为交换机往两块网卡发包，有一半包是丢弃的。"),i("li",null,"特点：只有一个设备处于活动状态，当一个宕掉另一个马上由备份转换为主设备。mac地址是外部可见得，从外面看来，bond的MAC地址是唯一的，以避免switch(交换机)发生混乱。此模式只提供了容错能力；由此可见此算法的优点是可以提供高网络连接的可用性，但是它的资源利用率较低，只有一个接口处于工作状态，在有 N 个网络接口的情况下，资源利用率为1/N")])]),i("li",null,[i("p",null,"mode=2(balance-xor)(平衡策略)"),i("ul",null,[i("li",null,"表示XOR Hash负载分担，和交换机的聚合强制不协商方式配合。（需要xmit_hash_policy，需要交换机配置port channel）"),i("li",null,"特点：基于指定的传输HASH策略传输数据包。缺省的策略是：(源MAC地址 XOR 目标MAC地址) % slave数量。其他的传输策略可以通过xmit_hash_policy选项指定，此模式提供负载平衡和容错能力")])]),i("li",null,[i("p",null,"mode=3(broadcast)(广播策略)"),i("ul",null,[i("li",null,"表示所有包从所有网络接口发出，这个不均衡，只有冗余机制，但过于浪费资源。此模式适用于金融行业，因为他们需要高可靠性的网络，不允许出现任何问题。需要和交换机的聚合强制不协商方式配合。"),i("li",null,"特点：在每个slave接口上传输每个数据包，此模式提供了容错能力")])]),i("li",null,[i("p",null,"mode=4(802.3ad)(IEEE 802.3ad 动态链接聚合)"),i("ul",null,[i("li",null,"表示支持802.3ad协议，和交换机的聚合LACP方式配合（需要xmit_hash_policy）.标准要求所有设备在聚合操作时，要在同样的速率和双工模式，而且，和除了balance-rr模式外的其它bonding负载均衡模式一样，任何连接都不能使用多于一个接口的带宽。"),i("li",null,"特点：创建一个聚合组，它们共享同样的速率和双工设定。根据802.3ad规范将多个slave工作在同一个激活的聚合体下。外出流量的slave选举是基于传输hash策略，该策略可以通过xmit_hash_policy选项从缺省的XOR策略改变到其他策略。需要注意的 是，并不是所有的传输策略都是802.3ad适应的，尤其考虑到在802.3ad标准43.2.4章节提及的包乱序问题。不同的实现可能会有不同的适应性。"),i("li",null,"必要条件： 条件1：ethtool支持获取每个slave的速率和双工设定 条件2：switch(交换机)支持IEEE 802.3ad Dynamic link aggregation 条件3：大多数switch(交换机)需要经过特定配置才能支持802.3ad模式")])]),i("li",null,[i("p",null,"mode=5(balance-tlb)(适配器传输负载均衡)"),i("ul",null,[i("li",null,"是根据每个slave的负载情况选择slave进行发送，接收时使用当前轮到的slave。该模式要求slave接口的网络设备驱动有某种ethtool支持；而且ARP监控不可用。"),i("li",null,"特点：不需要任何特别的switch(交换机)支持的通道bonding。在每个slave上根据当前的负载（根据速度计算）分配外出流量。如果正在接受数据的slave出故障了，另一个slave接管失败的slave的MAC地址。"),i("li",null,"必要条件： ethtool支持获取每个slave的速率")])]),i("li",null,[i("p",null,"mode=6(balance-alb)(适配器适应性负载均衡)"),i("ul",null,[i("li",null,"在5的tlb基础上增加了rlb(接收负载均衡receive load balance).不需要任何switch(交换机)的支持。接收负载均衡是通过ARP协商实现的."),i("li",null,"特点：该模式包含了balance-tlb模式，同时加上针对IPV4流量的接收负载均衡(receive load balance, rlb)，而且不需要任何switch(交换机)的支持。接收负载均衡是通过ARP协商实现的。bonding驱动截获本机发送的ARP应答，并把源硬件地址改写为bond中某个slave的唯一硬件地址，从而使得不同的对端使用不同的硬件地址进行通信。来自服务器端的接收流量也会被均衡。当本机发送ARP请求时，bonding驱动把对端的IP信息从ARP包中复制并保存下来。当ARP应答从对端到达 时，bonding驱动把它的硬件地址提取出来，并发起一个ARP应答给bond中的某个slave。使用ARP协商进行负载均衡的一个问题是：每次广播 ARP请求时都会使用bond的硬件地址，因此对端学习到这个硬件地址后，接收流量将会全部流向当前的slave。这个问题可以通过给所有的对端发送更新 （ARP应答）来解决，应答中包含他们独一无二的硬件地址，从而导致流量重新分布。当新的slave加入到bond中时，或者某个未激活的slave重新 激活时，接收流量也要重新分布。接收的负载被顺序地分布（round robin）在bond中最高速的slave上当某个链路被重新接上，或者一个新的slave加入到bond中，接收流量在所有当前激活的slave中全部重新分配，通过使用指定的MAC地址给每个 client发起ARP应答。下面介绍的updelay参数必须被设置为某个大于等于switch(交换机)转发延时的值，从而保证发往对端的ARP应答 不会被switch(交换机)阻截。")])])],-1)),l[3]||(l[3]=i("h2",{id:"linux有七种网卡绑定模式",tabindex:"-1"},[s("linux有七种网卡绑定模式 "),i("a",{class:"header-anchor",href:"#linux有七种网卡绑定模式","aria-label":'Permalink to "linux有七种网卡绑定模式"'},"​")],-1)),l[4]||(l[4]=i("ol",{start:"0"},[i("li",null,"round robin"),i("li",null,"active-backup"),i("li",null,"load balancing (xor)"),i("li",null,"fault-tolerance (broadcast)"),i("li",null,"lacp"),i("li",null,"transmit load balancing"),i("li",null,"adaptive load balancing")],-1)),l[5]||(l[5]=i("div",{style:{"max-height":"300px"},class:"language-php vp-adaptive-theme"},[i("button",{title:"Copy Code",class:"copy"}),i("span",{class:"lang"},"php"),i("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[i("code",{"v-pre":""},[i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"mode"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"0"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," 表示"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," load"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," balancing"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," ("),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"round"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"-"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"robin"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"为负载均衡方式，两块网卡都工作。")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"mode"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"1"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," 表示"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," fault"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"-"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"tolerance"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," ("),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"active"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"-"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"backup"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"提供冗余功能，工作方式是主"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," 从的工作方式"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},","),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"也就是说默认情况下只有一块网卡工作"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},","),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"另一块做备份。"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"  ")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"mode"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"2"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," 表示"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," XOR"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," policy"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," 为平衡策略。此模式提供负载平衡和容错能力"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"  ")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"mode"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"3"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," 表示"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," broadcast"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," 为广播策略。此模式提供了容错能力"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"  ")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"mode"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"4"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," 表示"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," IEEE"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," 802.3ad"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," Dynamic"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," link"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," aggregation"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," 为"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," IEEE"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," 802.3ad"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," 为"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," 动态链接聚合。该策略可以通过"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," xmit_hash_policy"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," 选项从缺省的"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," XOR"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," 策略改变到其他策略。"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"  ")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"mode"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"5"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," 表示"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," Adaptive"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," transmit"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," load"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," balancing"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," 为适配器传输负载均衡。该"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," 模式的必要条件：ethtool"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," 支持获取每个"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," slave"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," 的速率"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"  ")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"mode"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"6"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," 表示"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," Adaptive"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," load"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," balancing"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," 为适配器适应性负载均衡。该模式包含"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," 了"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," balance"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"-"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"tlb"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," 模式，同时加上针对"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," IPV4"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," 流量的接收负载均衡"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"("),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"receive"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," load"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"   balance"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},", "),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"rlb"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"，而且不需要任何"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," switch"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"("),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"交换机"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")的支持。")])])]),i("button",{class:"collapse"})],-1)),l[6]||(l[6]=i("h2",{id:"配置方法",tabindex:"-1"},[s("配置方法 "),i("a",{class:"header-anchor",href:"#配置方法","aria-label":'Permalink to "配置方法"'},"​")],-1)),l[7]||(l[7]=i("ul",null,[i("li",null,"Centeros7下面的网卡绑定有2种方式，一种是team，一种是bond"),i("li",null,"实现方式有三种")],-1)),l[8]||(l[8]=i("h3",{id:"命令行方式",tabindex:"-1"},[s("命令行方式 "),i("a",{class:"header-anchor",href:"#命令行方式","aria-label":'Permalink to "命令行方式"'},"​")],-1)),l[9]||(l[9]=i("ul",null,[i("li",null,"Bond命令行实现方式")],-1)),l[10]||(l[10]=i("div",{style:{"max-height":"300px"},class:"language-php vp-adaptive-theme"},[i("button",{title:"Copy Code",class:"copy"}),i("span",{class:"lang"},"php"),i("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[i("code",{"v-pre":""},[i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"nmcli"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," connection"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," add"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," type"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," bond"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," con"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"-"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"name"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," bond0"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," ifname"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," bond0"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," mode"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," active"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"-"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"backup"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," ipv4"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"."),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"method"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," manual"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," ipv4"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"."),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"addresses"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," 10.68.15.56"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"/"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"24"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," ipv4"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"."),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"dns"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," 114.114.114.144"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," ipv4"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"."),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"gateway"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," 10.68.15.254"),i("span",{style:{"--shiki-light":"#6A737D","--shiki-dark":"#6A737D"}},"  #将ip地址，网关修改为目标网络规划的ip地址")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"nmcli"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," connection"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," add"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," con"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"-"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"name"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," bond"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"-"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"slave0"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," type"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," bond"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"-"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"slave"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," ifname"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," eno3"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," master"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," bond0"),i("span",{style:{"--shiki-light":"#6A737D","--shiki-dark":"#6A737D"}},"#实体网卡对应绑定")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"nmcli"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," connection"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," add"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," con"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"-"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"name"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," bond"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"-"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"slave1"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," type"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," bond"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"-"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"slave"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," ifname"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," eno4"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," master"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," bond0"),i("span",{style:{"--shiki-light":"#6A737D","--shiki-dark":"#6A737D"}},"#实体网卡对应绑定")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"nmcli"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," connection"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," up"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," bond"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"-"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"slave0"),i("span",{style:{"--shiki-light":"#6A737D","--shiki-dark":"#6A737D"}}," #启用实体网卡对应的虚拟网卡")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"nmcli"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," connection"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," up"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," bond"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"-"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"slave1"),i("span",{style:{"--shiki-light":"#6A737D","--shiki-dark":"#6A737D"}},"#启用实体网卡对应的虚拟网卡")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"nmcli"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," connection"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," up"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," bond0"),i("span",{style:{"--shiki-light":"#6A737D","--shiki-dark":"#6A737D"}}," #启动绑定")])])]),i("button",{class:"collapse"})],-1)),l[11]||(l[11]=i("ul",null,[i("li",null,"team命令行实现方式")],-1)),l[12]||(l[12]=i("div",{style:{"max-height":"300px"},class:"language-php vp-adaptive-theme"},[i("button",{title:"Copy Code",class:"copy"}),i("span",{class:"lang"},"php"),i("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[i("code",{"v-pre":""},[i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"nmcli"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," connection"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," add"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," type"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," team"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," con"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"-"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"name"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," team0"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," ifname"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," agg"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"-"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"eth0"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," config"),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},` '{"runner":{"name":"activebackup"}}'`),i("span",{style:{"--shiki-light":"#6A737D","--shiki-dark":"#6A737D"}}," #创建 team 口 ,  con-name team0 ,  con-name team0 ")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"nmcli"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," con"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," add"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," type"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," team"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," con"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"-"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"name"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," CNAME"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," ifname"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," INAME"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," ["),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"config"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," JSON"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"] "),i("span",{style:{"--shiki-light":"#6A737D","--shiki-dark":"#6A737D"}},"#创建连接")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"nmcli"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," connection"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," modify"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," team0"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," ipv4"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"."),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"addresses"),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},' "192.168.1.250/24"'),i("span",{style:{"--shiki-light":"#6A737D","--shiki-dark":"#6A737D"}},"  #给team0 配置IP Gateway DNS")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"nmcli"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," connection"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," modify"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," team0"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," ipv4"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"."),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"gateway"),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},' "192.168.1.1"')]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"nmcli"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," connection"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," modify"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," team0"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," ipv4"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"."),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"dns"),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},' "192.168.1.1"')]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"nmcli"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," connection"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," modify"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," team0"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," ipv4"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"."),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"method"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," manual")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"nmcli"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," connection"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," add"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," type"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," team"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"-"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"slave"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," con"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"-"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"name"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," team0"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"-"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"port1"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," ifname"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," ens37"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," master"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," team0  "),i("span",{style:{"--shiki-light":"#6A737D","--shiki-dark":"#6A737D"}}," #将 ens37 ens38 加入team0,")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"nmcli"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," connection"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," add"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," type"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," team"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"-"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"slave"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," con"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"-"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"name"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," team0"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"-"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"port2"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," ifname"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," ens38"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," master"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," team0")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"nmcli"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," connection"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," up"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," team0"),i("span",{style:{"--shiki-light":"#6A737D","--shiki-dark":"#6A737D"}}," #激活 team0  team0-port1 team0-port2")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"nmcli"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," connection"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," up"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," team0"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"-"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"port1")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"nmcli"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," connection"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," up"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," team0"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"-"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"port2")])])]),i("button",{class:"collapse"})],-1)),l[13]||(l[13]=i("p",null,"虽然team和bond都可以实现网卡绑定，但是bond仅支持双网口，team组最多支持8个网口",-1)),l[14]||(l[14]=i("h3",{id:"nmtui",tabindex:"-1"},[s("nmtui "),i("a",{class:"header-anchor",href:"#nmtui","aria-label":'Permalink to "nmtui"'},"​")],-1)),l[15]||(l[15]=i("ul",null,[i("li",null,"半图形界面工具"),i("li",null,"在终端键入nmtui后，弹出半图形化管理方式"),i("li",null,"选择编辑连接，弹出下面的界面，然后点添加选择绑定，或者组队"),i("li",null,"然后在弹出界面设置bond，或者team（绑定物理网卡前记好需绑定的网卡名称，然后删除网卡后在绑定）")],-1)),l[16]||(l[16]=i("h3",{id:"图形化",tabindex:"-1"},[s("图形化 "),i("a",{class:"header-anchor",href:"#图形化","aria-label":'Permalink to "图形化"'},"​")],-1)),l[17]||(l[17]=i("p",null,"略",-1)),l[18]||(l[18]=i("p",null,"#linux",-1))]),"main-header":a(()=>[k(h.$slots,"main-header")]),"main-header-after":a(()=>[k(h.$slots,"main-header-after")]),"main-nav":a(()=>[k(h.$slots,"main-nav")]),"main-content":a(()=>[k(h.$slots,"main-content")]),"main-content-after":a(()=>[k(h.$slots,"main-content-after")]),"main-nav-before":a(()=>[k(h.$slots,"main-nav-before")]),"main-nav-after":a(()=>[k(h.$slots,"main-nav-after")]),comment:a(()=>[k(h.$slots,"comment")]),footer:a(()=>[k(h.$slots,"footer")]),aside:a(()=>[k(h.$slots,"aside")]),"aside-custom":a(()=>[k(h.$slots,"aside-custom")]),default:a(()=>[k(h.$slots,"default")]),_:3},8,["frontmatter"])}}};export{f as default};
