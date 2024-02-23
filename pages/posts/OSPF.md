---
title: OSFP
date: 2023-01-01
updated: 2023-01-01
categories: Yr的学习
tags:
  - Datacom
---

## OSFP概述

- Open Shortest Path First，开放最短路径优先
- 典型的链路状态路由协议，是目前业内使用非常广泛的IGP协议之一。
- 版本：IPv4-OSPFv2（RFC 2328）；IPv6-OSPFv3（RFC 2740）。
- 交互LS（Link State，链路状态）信息，而不是直接交互路由。
- 使用组播（224.0.0.5 和 224.0.0.6）。
- 收敛较快。
- 以接口开销作为度量值。
- 采用的SPF算法可以有效的避免环路。
- 触发式更新（以较低的频率（每30分钟）发送定期更新，被称为链路状态泛洪）
- 不支持自动汇总，支持手动汇总。
- 多区域的设计使得OSPF能够支持更大规模的网络。
- 基于SPF算法，以“累计链路开销”作为选路参考值
- 采用组播形式收发部分协议报文
- 支持区域划分
- 支持对等价路由进行负载分担
- 支持报文认证
- 支持手工汇总
<!-- more -->

## OSPF核心工作流程
>链路状态工作流程
1.  发现并建立邻居
2.  邻居之间交互链路状态信息并同步LSDB（链路状态数据库、地图）
3.  使用SPF算法计算到每个目标网络的最短距离
4.  生成路由表项加载路由表中

## OSPF三张表
- **邻居表**：记录所有邻居信息
- **链路状态数据库表（LSDB）**：记录所有链路状态信息
- **路由表**：记录最佳路由
## OSPF报文结构和类型
> 封装于IP协议之上，IP协议号 = 89

| ***数据包类型*** |             ***备注***             |
|:----------------:|:----------------------------------:|
|    **Hello**     |           发现和维护邻居           |
|    **DD/DBD**    | LSDB的摘要信息，用于对比和同步LSDB |
|      **LSR**     |       请求所需要的LSA              |
|     **LSU**    |              发送所需要的LSA        |
|       **LSAck**           |          确认收到的LSA                           |

![](http://192.168.100.7/image/b2994f4cb2682d16e0be24cb335494b7.png)

## OSPF状态机制

|***状态***|***备注***|
|:---:|:---:|
|**Down（失效状态）**|没有收到Hello包|
|**Init（初始状态）**|收到Hello包，但没有看到自己|
| **Two-Way（双向通讯状态）** |收到Hello包，且看到了自己，形成邻居关系|
| **ExStart（交换初始状态）** |协商主/从关系，保证DD包能有序的发送|
| **ExChange（交换状态）**    |交换DD包，对比LSDB|
| **Loading（加载状态）**     |正在同步LSDB，LSR和LSU交换|
| **Full（完全邻接状态）**    |LSDB完成同步，形成邻接关系|
| **PS**                    |只有Two-Way和Full是稳定状态|

![](http://192.168.100.7/image/611f99ee0655c32c287c650ac84969dd.png)


## OSPF邻居建立条件

|       ***条件***       |          ***要求***          |
| :------------------: | :------------------------: |
|       **RID**        |            唯一            |
| **Hello/Dead定时器** |            一致            |
|     **Area ID**      |            一致            |
|       **认证**       |            一致            |
|       **MTU**        |   一致（华为默认不检查）   |
|     **子网掩码**     | 一致（除了点到点和虚连接） |
|     **网络地址**     |            一致            |
|      **Option**      |            一致            |
|     **静默端口**     |           未开启           |

## OSPF工作流程（数据包和状态切换过程）
![](http://192.168.100.7/image/ba8bb46a3ba16a90765830137baf94af.png)
![](http://192.168.100.7/image/c8df4baf4b8d0bf00b1dff8b7e0a5e8c.png)

![](http://192.168.100.7/image/ea04332907d2997ecdf7cb265a0f943f.png)
![](http://192.168.100.7/image/2dc29b83b6cf30314aa106bc651ce752.png)

## OSPF邻居维护时间

-   **缺省情况下，** P2P、Broadcast类型接口的OSPF邻居失效时间为40秒，NBMA类型接口的OSPF邻居失效时间为120秒。
-   **OSPF邻居的失效时间是指：** 在该时间间隔内，若未收到邻居的Hello报文，就认为该邻居已失效。运行OSPF接口上的邻居失效时间dead interval必须大于发送Hello报文的时间间隔hello interval，且同一网段上的设备的dead interval值也必须相同。缺省情况下，邻居失效时间为发送Hello报文时间间隔的4倍。
-   **Hello报文用于建立和维护邻接关系，** 周期性的在使能了OSPF的接口上发送。报文内容包括一些定时器的数值、DR、BDR以及自己已知的邻居。hello interval的值写入Hello报文中后随之发送。hello interval的值越小，发现网络拓扑改变的速度越快，路由开销也就越大。确定接口和邻接设备的参数要保持一致。
-   **当链路发生故障时，** 为加快OSPF协议的收敛速度，建议配置BFD For OSPF功能。但是当对端不支持配置BFD For OSPF功能或用户不想配置BFD For OSPF功能时，建议配置conservative参数，使通过命令ospf timer dead配置的邻居失效时间间隔小于10秒时按照实际配置值生效，否则依靠OSPF的邻居失效时间来进行收敛，时间长，对业务影响比较大。

 

 

## LSA类型

>Link State Advertisement，链路状态宣告（路况信息）

-   LSA是OSPF进行路由计算的关键依据。
-   OSPF的LSU报文可以携带多种不同类型的LSA。
-   各种类型的LSA拥有相同的报文头部。
-   LS Type、Link State ID和Advertising Router唯一标识一个LSA
-   LS Age、Sequence Number、Checksum用于判断LSA的新旧


### Router-LSA（1类LSA）
- 由每台OSPF路由生成。
- 描述了该路由器直连接口的信息。
- 只能在所属的区域内泛洪。

### Network-LSA（2类LSA） 
- 由DR产生。
- 描述本网段的链路状态（所有与DR建立邻接关系的路由器+掩码）
- 只能在所属的区域内泛洪。

### Network-Summary-LSA（3类LSA）
-   由ABR产生。
-   用于向一个区域通告到达另一个区域的路由。


### AS-External-LSA（5类LSA）
- 由ASBR产生。
- 描述到达AS外部的路由。
- 会被通告到所有的区域（除了Stub区域和NSSA区域）。
- 类型Type-1计算内部开销，类型Type-2忽略内部开销

### ASBR-Summary-LSA（4类LSA）
- 由ABR产生。
- 描述到ASBR的路由。
- 通告给除ASBR所在区域的其它相关区域。



## 特殊区域

### Totally Stub
- 完全末节，屏蔽 LSA 3/4/5
- 域内不能有ASBR，不能是区域0，不能有虚链路
- 除了ABR向该区域内发送一条LSA 3的缺省路由

### Totally NSSA

- 完全不是那么末节的区域，屏蔽 LSA 3/4/5
- 但区域内允许有ASBR（即打破了末节规则），因此为了传递由，该区域内使用LSA 7代替LSA 5，到其它正常区域再转换成LSA 5
- 该区域ABR会发送一条LSA 3和LSA 7的缺省路由


## OSPF域间路由防环机制

-   **只允许：** ABR在骨干区域和非骨干区域间发布3类LSA。
-   **不允许：** ABR直接在两个非骨干区域间发布3类LSA。
-   因此，每个ABR都必须连接到骨干区域，即要求所有非骨干区域必须和骨干区域相连，同时骨干区域也必须连续。
-   ABR也不会将一个区域的路由再传回该区域（水平分割）。
-   ABR从非骨干区域收到的3类LSA不能用于SPF计算（仅数据库保留）。


## LSA处理原则

### LS Age

-   单位秒，随时间而增长，越小代表该LSA越新。
-   一条LSA在向外泛洪之前，LS Age的值需要增加InfTransDelay（1秒，该值可以在端口上设置，表示在链路上传输的延迟）。
-   如果一条LSA的LS Age达到了LSRefreshTime（30分钟），重新生成该LSA。
-   如果一条LSA的LS Age达到了MaxAge（60分钟），这条LSA就要被删除。
-   如果路由器希望从网络中删除一条自己此前生成的LSA，则重新生成该条LSA的一个实例，将LS Age设置为Max Age即可。
-   如果路由器收到一条LS Age设置为Max Age的LSA，则从LSDB中删除此LSA（如果LSDB中存在此LSA）。

### LSA多实例比较规则


![](http://192.168.100.7/image/f4844f6e1c0ff2e3abb9cea35f6c9dde.png)

**PS：** Age课件于RFC文档逻辑相反。

## 命令解析：

```php
## 创建OSPF进程，手动配置RID
ospf 1 router-id 1.1.1.1
## 配置区域
 area 0 | 0.0.0.0
## 宣告网络，即指定运行OSPF的接口
network 192.168.0.0 0.0.0.255	
## 调整带宽参考值，默认=100Mbps
bandwidth-reference 1000

## 显示OSPF邻居信息
display ospf peer {brief}
## 修改Hello包发送间隔
ospf timer hello 10	
## 修改Hello包超时时间
ospf timer dead 40
## 修改OSPF接口优先级，默认=1
ospf dr-priority 100
## 修改OSPF接口开销
ospf cost 10
## 显示OSPF接口信息
display ospf interface g0/0/1
## 重启OSPF进程
reset ospf process

## 发布缺省路由
default-route-advertise [always] //always：不需要路由表事先存在缺省路由强制发布



## 特殊区域
## 配置区域为Stub，在区域内所有路由器配置
stub
## 禁止ABR向Stub区域内发送Type-3 LSA
no-summary

## 配置区域为NSSA，在区域内所有路由器上配置
nssa
## 禁止ABR向NSSA区域内发送Type-3 LSAs
no-summary
## 在ASBR上产生缺省的Type7 LSA到NSSA区域。
default-route-advertise
## 在ABR上，无论路由表中是否存在缺省路由0.0.0.0/0，都会产生Type7 LSA缺省路由。
## 在ASBR上，只有当路由表中存在缺省路由0.0.0.0/0，才会产生Type7 LSA缺省路由。


## 路由汇总
## 配置ABR汇总区域间路由
abr-summary 192.168.0.0 255.255.252.0
## 配置ASBR汇总外部路由
asbr-summary 192.168.0.0 255.255.252.0
```

## 总结
| ***LSA类型*** | ***英文名称***  |   ***中文名称***   |
|:-------------:|:---------------:|:------------------:|
|   **Type1**   |     Router      |       路由器       |
|   **Type2**   |     Network     |        网络        |
|   **Type3**   | Network-Summary |        汇总        |
|   **Type4**   |  ASBR-Summary   |        汇总        |
|   **Type5**   |   AS-External   |    自治系统外部    |
|   **Type7**   |    NSSA-LSA     | NSSA域外部路由信息 |

| ***LSA类型*** | ***通告路由器*** |     ***LSA内容***      |      ***传播范围***      |
|:-------------:|:----------------:|:----------------------:|:------------------------:|
|   **Type1**   |  All OSPF Router   |   拓扑信息+路由信息    |         本区域内         |
|   **Type2**   |        DR        |   拓扑信息+路由信息    |         本区域内         |
|   **Type3**   |       ABR        |      域间路由信息      | 非TotallyStub或NSSA区域  |
|   **Type4**   |       ABR        |     ASBR'sRouterID     | 除ASBR所在区域的其它区域 |
|   **Type5**   |       ASBR       | 路由进程域外部路由信息 |     非Stub或NSSA区域     |
|   **Type7**   |       ASBR       |   NSSA域外部路由信息   |         NSSA区域         |

| ***LSA类型*** |  ***LinkStateID内容***   |
|:-------------:|:------------------------:|
|   **Type1**   | 生成这条LSA的路由器的RID |
|   **Type2**   |        DR的端口IP        |
|   **Type3**   |         目标网络         |
|   **Type4**   |        ASBR的RID         |
|   **Type5**   |         目标网络         |
|   **Type7**   |         目标网络         |

|   ***区域类型***    | ***Type1*** | ***Type2*** | ***Type3*** | ***Type4*** | ***Type5*** | ***Type7*** |
|:-------------------:|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|
|    **普通区域**     |      √      |      √      |      √      |      √      |      √      |      ×      |
|    **Stub区域**     |      √      |      √      |      √      |      ×      |      ×      |      ×      |
| **TotallyStub区域** |      √      |      √      |      ×      |      ×      |      ×      |      ×      |
|    **NSSA区域**     |      √      |      √      |      √      |      ×      |      ×      |      √      |
| **TotallyNSSA区域** |      √      |      √      |      ×      |      ×      |      ×      |      √      |




---
#datacom