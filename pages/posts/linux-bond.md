---
title: Linux网卡绑定
date: 2022-11-01
updated: 2022-11-01
categories: Yr的学习
tags:
  - linux
---
## bond概念
将两张网卡绑定，共用一个IP，实现冗余效果。实际上Linux双网卡的绑定模式有7种，而在这里常用的是active-backup，一个设备如果只有一个网卡，那么当这个网卡损坏时设备的网络就会瘫痪。绑定接口的作用就是让多个物理网卡服务于一个IP地址，使得这个网络的抵抗性强。一个设备只能有一个bound接口，配置好以后每个网卡需要一根网线，需要插两个网线，交换机也需要做链路聚合。  
<!-- more -->

1. mode=0(balance-rr)(平衡抡循环策略)
	- 链路负载均衡，增加带宽，支持容错，一条链路故障会自动切换正常链路。交换机需要配置聚合口，思科叫port channel。
	- 特点：传输数据包顺序是依次传输（即：第1个包走eth0，下一个包就走eth1….一直循环下去，直到最后一个传输完毕），此模式提供负载平衡和容错能力；但是我们知道如果一个连接或者会话的数据包从不同的接口发出的话，中途再经过不同的链路，在客户端很有可能会出现数据包无序到达的问题，而无序到达的数据包需要重新要求被发送，这样网络的吞吐量就会下降
 
2. mode=1(active-backup)(主-备份策略)
	- 这个是主备模式，只有一块网卡是active，另一块是备用的standby，所有流量都在active链路上处理，交换机配置的是捆绑的话将不能工作，因为交换机往两块网卡发包，有一半包是丢弃的。
	- 特点：只有一个设备处于活动状态，当一个宕掉另一个马上由备份转换为主设备。mac地址是外部可见得，从外面看来，bond的MAC地址是唯一的，以避免switch(交换机)发生混乱。此模式只提供了容错能力；由此可见此算法的优点是可以提供高网络连接的可用性，但是它的资源利用率较低，只有一个接口处于工作状态，在有 N 个网络接口的情况下，资源利用率为1/N
 
3. mode=2(balance-xor)(平衡策略)
	- 表示XOR Hash负载分担，和交换机的聚合强制不协商方式配合。（需要xmit_hash_policy，需要交换机配置port channel）
	- 特点：基于指定的传输HASH策略传输数据包。缺省的策略是：(源MAC地址 XOR 目标MAC地址) % slave数量。其他的传输策略可以通过xmit_hash_policy选项指定，此模式提供负载平衡和容错能力
 
4. mode=3(broadcast)(广播策略)
	- 表示所有包从所有网络接口发出，这个不均衡，只有冗余机制，但过于浪费资源。此模式适用于金融行业，因为他们需要高可靠性的网络，不允许出现任何问题。需要和交换机的聚合强制不协商方式配合。
	- 特点：在每个slave接口上传输每个数据包，此模式提供了容错能力
 
5. mode=4(802.3ad)(IEEE 802.3ad 动态链接聚合)
	- 表示支持802.3ad协议，和交换机的聚合LACP方式配合（需要xmit_hash_policy）.标准要求所有设备在聚合操作时，要在同样的速率和双工模式，而且，和除了balance-rr模式外的其它bonding负载均衡模式一样，任何连接都不能使用多于一个接口的带宽。
	- 特点：创建一个聚合组，它们共享同样的速率和双工设定。根据802.3ad规范将多个slave工作在同一个激活的聚合体下。外出流量的slave选举是基于传输hash策略，该策略可以通过xmit_hash_policy选项从缺省的XOR策略改变到其他策略。需要注意的 是，并不是所有的传输策略都是802.3ad适应的，尤其考虑到在802.3ad标准43.2.4章节提及的包乱序问题。不同的实现可能会有不同的适应性。
	- 必要条件：
		条件1：ethtool支持获取每个slave的速率和双工设定
		条件2：switch(交换机)支持IEEE 802.3ad Dynamic link aggregation
		条件3：大多数switch(交换机)需要经过特定配置才能支持802.3ad模式
 
6. mode=5(balance-tlb)(适配器传输负载均衡)
	- 是根据每个slave的负载情况选择slave进行发送，接收时使用当前轮到的slave。该模式要求slave接口的网络设备驱动有某种ethtool支持；而且ARP监控不可用。
	- 特点：不需要任何特别的switch(交换机)支持的通道bonding。在每个slave上根据当前的负载（根据速度计算）分配外出流量。如果正在接受数据的slave出故障了，另一个slave接管失败的slave的MAC地址。
	- 必要条件：
		ethtool支持获取每个slave的速率
7. mode=6(balance-alb)(适配器适应性负载均衡)
	- 在5的tlb基础上增加了rlb(接收负载均衡receive load balance).不需要任何switch(交换机)的支持。接收负载均衡是通过ARP协商实现的.
	- 特点：该模式包含了balance-tlb模式，同时加上针对IPV4流量的接收负载均衡(receive load balance, rlb)，而且不需要任何switch(交换机)的支持。接收负载均衡是通过ARP协商实现的。bonding驱动截获本机发送的ARP应答，并把源硬件地址改写为bond中某个slave的唯一硬件地址，从而使得不同的对端使用不同的硬件地址进行通信。来自服务器端的接收流量也会被均衡。当本机发送ARP请求时，bonding驱动把对端的IP信息从ARP包中复制并保存下来。当ARP应答从对端到达 时，bonding驱动把它的硬件地址提取出来，并发起一个ARP应答给bond中的某个slave。使用ARP协商进行负载均衡的一个问题是：每次广播 ARP请求时都会使用bond的硬件地址，因此对端学习到这个硬件地址后，接收流量将会全部流向当前的slave。这个问题可以通过给所有的对端发送更新 （ARP应答）来解决，应答中包含他们独一无二的硬件地址，从而导致流量重新分布。当新的slave加入到bond中时，或者某个未激活的slave重新 激活时，接收流量也要重新分布。接收的负载被顺序地分布（round robin）在bond中最高速的slave上当某个链路被重新接上，或者一个新的slave加入到bond中，接收流量在所有当前激活的slave中全部重新分配，通过使用指定的MAC地址给每个 client发起ARP应答。下面介绍的updelay参数必须被设置为某个大于等于switch(交换机)转发延时的值，从而保证发往对端的ARP应答 不会被switch(交换机)阻截。

## linux有七种网卡绑定模式

0. round robin
1. active-backup
2. load balancing (xor)
3. fault-tolerance (broadcast)
4. lacp
5. transmit load balancing
6. adaptive load balancing

```php
mode=0 表示 load balancing (round-robin)为负载均衡方式，两块网卡都工作。
mode=1 表示 fault-tolerance (active-backup)提供冗余功能，工作方式是主 从的工作方式,也就是说默认情况下只有一块网卡工作,另一块做备份。  
mode=2 表示 XOR policy 为平衡策略。此模式提供负载平衡和容错能力  
mode=3 表示 broadcast 为广播策略。此模式提供了容错能力  
mode=4 表示 IEEE 802.3ad Dynamic link aggregation 为 IEEE 802.3ad 为 动态链接聚合。该策略可以通过 xmit_hash_policy 选项从缺省的 XOR 策略改变到其他策略。  
mode=5 表示 Adaptive transmit load balancing 为适配器传输负载均衡。该 模式的必要条件：ethtool 支持获取每个 slave 的速率  
mode=6 表示 Adaptive load balancing 为适配器适应性负载均衡。该模式包含 了 balance-tlb 模式，同时加上针对 IPV4 流量的接收负载均衡(receive load   balance, rlb)，而且不需要任何 switch(交换机)的支持。
```

## 配置方法
- Centeros7下面的网卡绑定有2种方式，一种是team，一种是bond
- 实现方式有三种

### 命令行方式
- Bond命令行实现方式
```php
nmcli connection add type bond con-name bond0 ifname bond0 mode active-backup ipv4.method manual ipv4.addresses 10.68.15.56/24 ipv4.dns 114.114.114.144 ipv4.gateway 10.68.15.254  #将ip地址，网关修改为目标网络规划的ip地址

nmcli connection add con-name bond-slave0 type bond-slave ifname eno3 master bond0#实体网卡对应绑定

nmcli connection add con-name bond-slave1 type bond-slave ifname eno4 master bond0#实体网卡对应绑定

nmcli connection up bond-slave0 #启用实体网卡对应的虚拟网卡

nmcli connection up bond-slave1#启用实体网卡对应的虚拟网卡

nmcli connection up bond0 #启动绑定
```

- team命令行实现方式

```php
nmcli connection add type team con-name team0 ifname agg-eth0 config '{"runner":{"name":"activebackup"}}' #创建 team 口 ,  con-name team0 ,  con-name team0 

nmcli con add type team con-name CNAME ifname INAME [config JSON] #创建连接

nmcli connection modify team0 ipv4.addresses "192.168.1.250/24"  #给team0 配置IP Gateway DNS

nmcli connection modify team0 ipv4.gateway "192.168.1.1"

nmcli connection modify team0 ipv4.dns "192.168.1.1"

nmcli connection modify team0 ipv4.method manual

nmcli connection add type team-slave con-name team0-port1 ifname ens37 master team0   #将 ens37 ens38 加入team0,

nmcli connection add type team-slave con-name team0-port2 ifname ens38 master team0

nmcli connection up team0 #激活 team0  team0-port1 team0-port2

nmcli connection up team0-port1

nmcli connection up team0-port2
```
虽然team和bond都可以实现网卡绑定，但是bond仅支持双网口，team组最多支持8个网口


### nmtui
- 半图形界面工具 
- 在终端键入nmtui后，弹出半图形化管理方式
- 选择编辑连接，弹出下面的界面，然后点添加选择绑定，或者组队
- 然后在弹出界面设置bond，或者team（绑定物理网卡前记好需绑定的网卡名称，然后删除网卡后在绑定）

### 图形化
略


#linux 