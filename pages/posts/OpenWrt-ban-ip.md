---
title: OpenWrt自动封禁爆破IP
date: 2022-09-20
updated: 2023-09-20
categories: Yr的学习
tags:
  - openwrt
  - linux
---

## 需求
- OpenWrt没有自动封禁IP的功能，在GitHub找到遍历Log封禁IP脚本。

### 个性化需求
- 添加封禁IP脚本`DenyPwdHack.sh`（无邮件通知，且遍历logread系统日志。导致IP存在就会封禁无法过期删除。）
- 配置封禁IP脚本`DenyPwdHack.sh`的遍历logread系统日志最后100行。
- 添加封禁IP脚本`DenyPwdHack.sh`的封禁IP通知发送至邮箱。
<!-- more -->

### 安装邮件通知功能
- OpenWrt安装msmtp、mutt。
- msmtp添加发送邮件功能。
- mutt邮件客户端，使邮件正常发送，对端不误报垃圾邮件。

#### 配置msmtp
- `vim /etc/msmtprc`

```php
# Example for a system wide configuration file

# A system wide configuration file is optional.
# If it exists, it usually defines a default account.
# This allows msmtp to be used like /usr/sbin/sendmail.
account default

# The SMTP smarthost
host smtp.163.com // 163邮箱smtp地址

# Use TLS on port 465
port 465
tls on
tls_starttls off

# Construct envelope-from addresses of the form "user@oursite.example"
from xxxxxxxx@163.com // 邮件的发件方地址
auth login // 自动登录
user xxxxxxxx@163.com // 邮箱用户名，有些是不要@邮箱地址
password XXXXXXXXXXXXX // 邮箱开启SMTP给的授权码


# Syslog logging with facility LOG_MAIL instead of the default LOG_USER
logfile /etc/msmtp.log
```


#### 配置mutt
- `vim /etc/Muttrc`

```php
set charset="utf-8"

set rfc2047_parameters=yes

set envelope_from=yes

set sendmail="/usr/bin/msmtp" //发邮件的程序

set use_from=yes

set from=xxxxxxxx@163.com //发件方

set realname="OpenWrt" //发件方名称

set editor="vim"
```

## 项目地址
- [项目地址](https://github.com/xwsnet/deny-ssh-password-attack)

## 初始源码

```php
#!/bin/ash


## OpenWRT 版本判断
Vfile=/etc/banner
OWTV=`awk 'BEGIN{IGNORECASE=1}/openwrt/ {split($2,v,"."); print v[1]}' $Vfile`
[[ $OWTV -lt 18 ]] && echo "OpenWRT version must be >= 18" && exit 1


## 黑名单所在iptables链表
ChainName=DenyPwdHack


## 日志路径
LOG_DEST=/tmp/DenyPwdHack.log


## 检测到攻击时需要针对攻击IP封禁的端口,可以将ssh/luci/ftp等端口加上
Deny_Port="22,443"
INPUT_RULE="INPUT -p tcp -m multiport --dports $Deny_Port -j $ChainName"


## 日志关键字,每个关键字可以用"|"号隔开,支持grep的正则表达式

## 注: SSH 攻击可以大量出现四种关键字：Invalid user/Failed password for/Received disconnect from/Disconnected from authenticating

##     Luci 攻击可以出现"luci: failed login on / for root from xx.xx.xx.xx"
LOG_KEY_WORD="auth\.info\s+sshd.*Failed password for|luci:\s+failed\s+login|auth\.info.*sshd.*Connection closed by.*port.*preauth"


## 白名单IP可以用"|"号隔开,支持grep的正则表达式
exclude_ip="192.168.|127.0.0.1"


## 失败次数
Failed_times=5


## 黑名单过期时间,单位小时,3个月2160小时
BlackList_exp=2160


## 日志时间
LOG_DT=`date "+%Y-%m-%d %H:%M:%S"`


## 判断链是否存在
iptables -n --list $ChainName > /dev/null 2>&1
if [[ $? -ne 0 ]] ; then
  iptables -N $ChainName
  echo "[$LOG_DT] iptables -N $ChainName" >> $LOG_DEST
fi


## 判断INPUT跳到链的规则是否存在
iptables -C $INPUT_RULE > /dev/null 2>&1
if [[ $? -ne 0 ]] ; then
  iptables -I $INPUT_RULE
  echo "[$LOG_DT] iptables -I $INPUT_RULE" >> $LOG_DEST
fi

DenyIPLIst=`logread \
  | awk '/'"$LOG_KEY_WORD"'/ {for(i=1;i<=NF;i++) \
  if($i~/^(([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/) \
  print $i}' \
  | grep -v "${exclude_ip}" \
  | sort | uniq -c \
  | awk '{if($1>'"$Failed_times"') print $2}'`
IPList_sum=`echo "${DenyIPLIst}" | wc -l`
if [[ $IPList_sum -ne 0 ]];then
  for i in ${DenyIPLIst}
    do
    iptables -vnL $ChainName | grep -q $i
    [[ $? -ne 0 ]] && iptables -A $ChainName -s $i -m comment --comment "Added at $LOG_DT by DenyPwdHack" -j DROP \
     && echo "[$LOG_DT] iptables -A $ChainName -s $i -j DROP" >> $LOG_DEST
    done
fi


## 黑名单过期删除
ChainList=`iptables --line-numbers -nL $ChainName |\
  awk '/Added at/ {for(i=1;i<=NF;i++) if($i~/[0-9]{4}(-[0-9]{2}){2}/) print $1","$i" "$(i+1)}' |\
  sort -rn`


## 链表必须从后端删除,如果从前端删除,后端的实际rulenum会变
ChainList_num=`echo "${ChainList}" | grep -v "^$" | wc -l`
if [[ ${#ChainList} -ne 0 ]] && [[ $ChainList_num -gt 0 ]] ; then
for tl in `seq 1 $ChainList_num`
do
  Dtime=`echo "${ChainList}" | sed -n ''"$tl"'p' | awk -F, '{print $2}'`
  Stime=`date -d "$Dtime" +%s`
  Ntime=`date +%s`
  if [[ $(($Ntime - $Stime)) -ge $(($BlackList_exp * 3600)) ]] ; then
    RuleNum=`echo "${ChainList}" | sed -n ''"$tl"'p' | awk -F, '{print $1}'`
    iptables -D $ChainName $RuleNum
    if [[ $? -eq 0 ]] ; then
      echo "[$LOG_DT] iptables -D $ChainName $RuleNum" >> $LOG_DEST
    else
      echo "[$LOG_DT] execute delete failed: iptables -D $ChainName $RuleNum" >> $LOG_DEST
    fi
  fi
done
fi

```

## 实际使用源码（邮件通知BUG，后续修复）


### 添加修改自定义功能

#### 读取logread系统日志最后100行

```php
#!/bin/bash

# 获取文件最后100行数据
tail -n -100 /tmp/system.log
```

### 封禁IP通知发送至邮箱
```php

## 通知邮件发送
if [[ $? -eq 0 ]] ; then //判断上一步命令（封禁IP或初始创建iptables链）是否成功，成功则发送邮件
  # 获取文件包含“iptables -A DenyPwdHack -s”且读取最后10行
  DenyIpList=`cat /root/DenyPwdHack.log | grep "iptables -A DenyPwdHack -s" | tail -n -10`

  # 发送至个人邮箱
  echo "$DenyIpList" | mutt -s "IP封禁提醒" xxxxxxxx@qq.com
fi
```



### DenyPwdHack.sh（集成自定义功能版）

```php
#!/bin/ash


## OpenWRT 版本判断

## Vfile=/etc/banner

## OWTV=`awk 'BEGIN{IGNORECASE=1}/openwrt/ {split($2,v,"."); print v[1]}' $Vfile`

## [[ $OWTV -lt 18 ]] && echo "OpenWRT version must be >= 18" && exit 1


## 黑名单所在iptables链表
ChainName=DenyPwdHack


## 日志路径
LOG_DEST=/root/DenyPwdHack.log


## 检测到攻击时需要针对攻击IP封禁的端口,可以将ssh/luci/ftp等端口加上
Deny_Port="36875"
INPUT_RULE="INPUT -p tcp -m multiport --dports $Deny_Port -j $ChainName"


## 日志关键字,每个关键字可以用"|"号隔开,支持grep的正则表达式

## 注: SSH 攻击可以大量出现四种关键字：Invalid user/Failed password for/Received disconnect from/Disconnected from authenticating

##     Luci 攻击可以出现"luci: failed login on / for root from xx.xx.xx.xx"
LOG_KEY_WORD="auth\.info\s+sshd.*Failed password for|luci:\s+failed\s+login|auth\.info.*sshd.*Connection closed by.*port.*preauth|Received disconnect from"


## 白名单IP可以用"|"号隔开,支持grep的正则表达式
exclude_ip="192.168.\|127.0.0.1\|112.45.125."


## 失败次数
Failed_times=10


## 黑名单过期时间,单位分钟
BlackList_exp=20


## 日志时间
LOG_DT=`date "+%Y-%m-%d %H:%M:%S"`


## 判断链是否存在
iptables -n --list $ChainName > /dev/null 2>&1
if [[ $? -ne 0 ]] ; then
  iptables -N $ChainName
  echo "[$LOG_DT] iptables -N $ChainName" >> $LOG_DEST
fi


## 判断INPUT跳到链的规则是否存在
iptables -C $INPUT_RULE > /dev/null 2>&1
if [[ $? -ne 0 ]] ; then
  iptables -I $INPUT_RULE
  echo "[$LOG_DT] iptables -I $INPUT_RULE" >> $LOG_DEST
fi

DenyIPLIst=`tail -n -100 /tmp/system.log \
  | awk '/'"$LOG_KEY_WORD"'/ {for(i=1;i<=NF;i++) \
  if($i~/^(([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/) \
  print $i}' \
  | grep -v "${exclude_ip}" \
  | sort | uniq -c \
  | awk '{if($1>'"$Failed_times"') print $2}'`
IPList_sum=`echo "${DenyIPLIst}" | wc -l`
if [[ $IPList_sum -ne 0 ]];then
  for i in ${DenyIPLIst}
    do
    iptables -vnL $ChainName | grep -q $i
    [[ $? -ne 0 ]] && iptables -A $ChainName -s $i -m comment --comment "Added at $LOG_DT by DenyPwdHack" -j DROP \
     && echo "[$LOG_DT] iptables -A $ChainName -s $i -j DROP" >> $LOG_DEST
    done
fi


## 通知邮件发送
if [[ $? -eq 0 ]] ; then
  # 获取文件包含“iptables -A DenyPwdHack -s”
  DenyIpList=`cat /root/DenyPwdHack.log | grep "iptables -A DenyPwdHack -s" | tail -n -10`

  # 发送至个人邮箱
  echo "$DenyIpList" | mutt -s "IP封禁提醒" xxxxxxxx@qq.com
fi


## 黑名单过期删除
ChainList=`iptables --line-numbers -nL $ChainName |\
  awk '/Added at/ {for(i=1;i<=NF;i++) if($i~/[0-9]{4}(-[0-9]{2}){2}/) print $1","$i" "$(i+1)}' |\
  sort -rn`


## 链表必须从后端删除,如果从前端删除,后端的实际rulenum会变
ChainList_num=`echo "${ChainList}" | grep -v "^$" | wc -l`
if [[ ${#ChainList} -ne 0 ]] && [[ $ChainList_num -gt 0 ]] ; then
for tl in `seq 1 $ChainList_num`
do
  Dtime=`echo "${ChainList}" | sed -n ''"$tl"'p' | awk -F, '{print $2}'`
  Stime=`date -d "$Dtime" +%s`
  Ntime=`date +%s`
  if [[ $(($Ntime - $Stime)) -ge $(($BlackList_exp * 60)) ]] ; then
    RuleNum=`echo "${ChainList}" | sed -n ''"$tl"'p' | awk -F, '{print $1}'`
    iptables -D $ChainName $RuleNum
    if [[ $? -eq 0 ]] ; then
      echo "[$LOG_DT] iptables -D $ChainName $RuleNum" >> $LOG_DEST
    else
      echo "[$LOG_DT] execute delete failed: iptables -D $ChainName $RuleNum" >> $LOG_DEST
    fi
  fi
done
fi


```


### 添加计划任务

- `*/10 * * * * /root/DenyPwdHack.sh`


### 查询


#### 封堵日志

- `cat DenyPwdHack.log`

#### 查询iptables条目

- `iptables -L DenyPwdHack`

#### 删除链

- `iptables -D DenyPwdHack 1`

## 邮件通知BUG修复
- 运行一段发现，在无封禁IP时，任然触发邮件通知。


### 改进
- 改变增加iptables DenyPwdHack条目的日志位置。
- shell判断文件MD5是否有变化。


### 检测MD5脚本

```php
#!/bin/bash

## 检测DenyPwdHackIP.log是否有新增IP。发送通知邮件
#读取封禁IP日志
DenyIpList=$(cat /root/DenyPwdHackIP.log)
cd /root
#判断DenyPwdHackIP.log文件有无改变，如果改变了需要发送通知邮件
md5_old=`cat DenyPwdHackIP.md5`
md5_new=`md5sum DenyPwdHackIP.log |awk '{print $1}'`
if [[ $md5_old != $md5_new ]];then
  echo "$md5_new" > DenyPwdHackIP.md5
  echo "$DenyIpList" | mutt -s "IP封禁提醒" xxxxxxxx@qq.com
fi
```


### DenyPwdHack.sh（改进后命令）

```php
#!/bin/bash


## OpenWRT 版本判断

## Vfile=/etc/banner

## OWTV=`awk 'BEGIN{IGNORECASE=1}/openwrt/ {split($2,v,"."); print v[1]}' $Vfile`

## [[ $OWTV -lt 18 ]] && echo "OpenWRT version must be >= 18" && exit 1


## 黑名单所在iptables链表
ChainName=DenyPwdHack


## 日志路径
LOG_Deny_IP=/root/DenyPwdHackIP.log
LOG_DEST=/root/DenyPwdHack.log


## 检测到攻击时需要针对攻击IP封禁的端口,可以将ssh/luci/ftp等端口加上
Deny_Port="36875"
INPUT_RULE="INPUT -p tcp -m multiport --dports $Deny_Port -j $ChainName"


## 日志关键字,每个关键字可以用"|"号隔开,支持grep的正则表达式

## 注: SSH 攻击可以大量出现四种关键字：Invalid user/Failed password for/Received disconnect from/Disconnected from authenticating

##     Luci 攻击可以出现"luci: failed login on / for root from xx.xx.xx.xx"
LOG_KEY_WORD="auth\.info\s+sshd.*Failed password for|luci:\s+failed\s+login|auth\.info.*sshd.*Connection closed by.*port.*preauth|Received disconnect from"


## 白名单IP可以用"|"号隔开,支持grep的正则表达式
exclude_ip="192.168.\|127.0.0.1\|112.45.125."


## 失败次数
Failed_times=10


## 黑名单过期时间,单位分钟
BlackList_exp=20


## 日志时间
LOG_DT=`date "+%Y-%m-%d %H:%M:%S"`


## 判断链是否存在
iptables -n --list $ChainName > /dev/null 2>&1
if [[ $? -ne 0 ]] ; then
  iptables -N $ChainName
  echo "[$LOG_DT] iptables -N $ChainName" >> $LOG_DEST
fi


## 判断INPUT跳到链的规则是否存在
iptables -C $INPUT_RULE > /dev/null 2>&1
if [[ $? -ne 0 ]] ; then
  iptables -I $INPUT_RULE
  echo "[$LOG_DT] iptables -I $INPUT_RULE" >> $LOG_DEST
fi

DenyIPLIst=`tail -n -100 /tmp/system.log \
  | awk '/'"$LOG_KEY_WORD"'/ {for(i=1;i<=NF;i++) \
  if($i~/^(([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/) \
  print $i}' \
  | grep -v "${exclude_ip}" \
  | sort | uniq -c \
  | awk '{if($1>'"$Failed_times"') print $2}'`
IPList_sum=`echo "${DenyIPLIst}" | wc -l`
if [[ $IPList_sum -ne 0 ]];then
  for i in ${DenyIPLIst}
    do
    iptables -vnL $ChainName | grep -q $i
    [[ $? -ne 0 ]] && iptables -A $ChainName -s $i -m comment --comment "Added at $LOG_DT by DenyPwdHack" -j DROP \
     && echo "[$LOG_DT] iptables -A $ChainName -s $i -j DROP" >> $LOG_Deny_IP
    done
fi


## 黑名单过期删除
ChainList=`iptables --line-numbers -nL $ChainName |\
  awk '/Added at/ {for(i=1;i<=NF;i++) if($i~/[0-9]{4}(-[0-9]{2}){2}/) print $1","$i" "$(i+1)}' |\
  sort -rn`


## 链表必须从后端删除,如果从前端删除,后端的实际rulenum会变
ChainList_num=`echo "${ChainList}" | grep -v "^$" | wc -l`
if [[ ${#ChainList} -ne 0 ]] && [[ $ChainList_num -gt 0 ]] ; then
for tl in `seq 1 $ChainList_num`
do
  Dtime=`echo "${ChainList}" | sed -n ''"$tl"'p' | awk -F, '{print $2}'`
  Stime=`date -d "$Dtime" +%s`
  Ntime=`date +%s`
  if [[ $(($Ntime - $Stime)) -ge $(($BlackList_exp * 60)) ]] ; then
    RuleNum=`echo "${ChainList}" | sed -n ''"$tl"'p' | awk -F, '{print $1}'`
    iptables -D $ChainName $RuleNum
    if [[ $? -eq 0 ]] ; then
      echo "[$LOG_DT] iptables -D $ChainName $RuleNum" >> $LOG_DEST
    else
      echo "[$LOG_DT] execute delete failed: iptables -D $ChainName $RuleNum" >> $LOG_DEST
    fi
  fi
done
fi


## 检测DenyPwdHackIP.log是否有新增IP。发送通知邮件
#读取封禁IP日志
DenyIpList=$(cat /root/DenyPwdHackIP.log | tail -n -10)
cd /root
#判断DenyPwdHackIP.log文件有无改变，如果改变了需要发送通知邮件
md5_old=`cat DenyPwdHackIP.md5`
md5_new=`md5sum DenyPwdHackIP.log |awk '{print $1}'`
if [[ $md5_old != $md5_new ]];then
  echo "$md5_new" > DenyPwdHackIP.md5
  echo "$DenyIpList" | mutt -s "IP封禁提醒" xxxxxxxx@qq.com
fi
```

---
#openwrt #linux 