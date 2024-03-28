---
title: Linux系统批量安装
date: 2022-11-01
updated: 2022-11-01
categories: Yr的学习
tags:
  - linux
---
## PXE批量系统安装
### 实验环境搭建
>[第十九讲](https://www.bilibili.com/video/BV1QK4y1v7sn?spm_id_from=333.999.0.0&vd_source=f6084efc3a58368dd53ce40762a1514a)
### 无人值守安装
>[第二十讲](https://www.bilibili.com/video/BV1ZV411z7Vp?share_source=copy_web&vd_source=58c00d10f6293fd8d6cf9b5061c57f5e)
<!-- more -->

### Centos7 pxe 服务准备
1. 关闭防火墙 
 `systemctl stop firewalld.service`
 
2. 关闭selinux
 `setenforce 0 //临时关闭`

3. 查看光盘是否连接
 `lsblk`

4. 配置yum源
- Red Hat 企业版需更换centos源
- `cd /etc/yum.repos.d`
- `rename .repo .bak *.repo //修改初始yum源文件`
- 挂载本地yum源
- `mkdir  /mnt/cdrom`
- `mount /dev/sr0 /mnt/cdrom`
	```php
	tee >/etc/yum.repos.d/local.repo<<EOF 
	[mnt]
	name=mnt
	baseurl=file:///mnt/cdrom
	enabled=1
	gpgcheck=0
	EOF
	```
- `yum clean all && yum makecache`

5. 安装dhcp、tftp-server、http、syslinux
- `yum -y install dhcp tftp-server httpd syslinux`

6. 开启dhcp服务
- `vi /etc/dhcp/dhcpd.conf` 
- 修改dhcp配置
```php
subnet 192.168.192.0 netmask 255.255.255.0 { 
        range 192.168.192.2 192.168.192.253; 
        default-lease-time 3600; 
        filename "pxelinux.0"; 
        next-server 192.168.192.254; 
}
```
- 重启dhcpd服务：`systemctl restart dhcpd`
- 检查dhcpd服务：`systemctl status dhcpd`

7. 启用tftp服务
- 进入文件： `vi /etc/xinetd.d/tftp`
- 将disable的yes改成no
- 重启tftp服务：`systemctl restart tftp.socket`
- 检查tftp服务：`systemctl status tftp.socket`

8. 拷贝PXE服务器的相关文件
- 进入tftp的根目录：`cd /var/lib/tftpboot`
- 引导文件：`cp /usr/share/syslinux/pxelinux.0 ./`
- 菜单文件：`cp /usr/share/syslinux/menu.c32 ./`
- 安装引导文件1：`cp /mnt/cdrom/isolinux/vmlinuz ./`
- 安装- 引导文件2：`cp /mnt/cdrom/isolinux/initrd.img ./`

9. 制作安装菜单
- `mkdir /var/lib/tftpboot/pxelinux.cfg/`
- `touch /var/lib/tftpboot/pxelinux.cfg/default`
- 编辑default文件
```php
default menu.c32 
timeout 300 
prompt 0 

label 1 
menu label ^1) Install CentOS menu default 
kernel vmlinuz 
append initrd=initrd.img method=http://192.168.192.254/CentOS ks=http://192.168.192.254/ks.cfg 
```

10. 制作阿帕奇服务器
- 重启http服务:`systemctl restart httpd`
- 进入阿帕奇根目录: `cd /var/www/html`
- 创建CentOS文件夹:`mkdir CentOS`
- 挂载安装文件到该目录:`mount /dev/sr0 /var/www/html/CentOS`

11. 制作ks.cfg
- 根目录拷贝ks.cfg到服务器目录:`cp anaconda-ks.cfg /var/www/html/`
- 改名:`mv anaconda-ks.cfg ks.cfg`
- `chmod +r ks.cfg`浏览器访问能正常显示
- 修改ks.cfg，或者图形化安装 `yum install system-config-kickstart -y` 打开再配置`system-config-kickstart`
- [图形化教程](https://blog.csdn.net/xiaolinyouni/article/details/114014281)

```php

#version=DEVEL
# System authorization information
auth --useshadow --enablemd5
# Install OS instead of upgrade
install
# Use CDROM installation media
#cdrom
url --url http://192.168.192.254/CentOS
# Use text mode install
text
# Firewall configuration
firewall --enabled
firstboot --disable
ignoredisk --only-use=sda
# Keyboard layouts
# old format: keyboard us
# new format:
keyboard --vckeymap=us --xlayouts='us'
# System language
lang en_US.UTF-8

# Network information
network  --bootproto=dhcp --device=link --activate
network  --hostname=localhost.localdomain
# Reboot after installation
reboot
# Root password
rootpw --iscrypted $1$VrBVcEjp$CrZdLE.nC8WrUEkuSTBxK.
# System services
services --enabled="chronyd"
# System timezone
timezone America/Los_Angeles --isUtc
# X Window System configuration information
xconfig  --startxonboot
# System bootloader configuration
bootloader --append=" crashkernel=auto" --location=mbr --boot-drive=sda
# Clear the Master Boot Record
zerombr
# Partition clearing information
clearpart --all --initlabel
# Disk partitioning information
part swap --fstype="swap" --size=2048
part /boot --fstype="xfs" --size=300
part / --fstype="xfs" --size=18131

%post
/usr/sbin/adduser admin
/usr/sbin/usermod -p '$1$VrBVcEjp$CrZdLE.nC8WrUEkuSTBxK.' admin
/usr/bin/chfn -f "CentOS7" admin
mv /etc/rc.d/rc.local /etc/rc.d/rc.local.00
echo '#!/bin/bash' > /etc/rc.d/rc.local
ln -s ../rc.local /etc/rc.d/rc5.d/S99rclocal
chmod 755 /etc/rc.d/rc.local
echo 'mkdir -p /var/log/vmware' >> /etc/rc.d/rc.local
echo 'exec 1> /var/log/vmware/rc.local.log' >> /etc/rc.d/rc.local
echo 'exec 2>&1' >> /etc/rc.d/rc.local
echo 'set -x' >> /etc/rc.d/rc.local
echo 'echo Installing Open VM Tools' >> /etc/rc.d/rc.local
echo 'set -x' >> /etc/rc.d/rc.local
echo '/bin/eject sr0 || /bin/true' >> /etc/rc.d/rc.local
echo '/bin/eject sr1 || /bin/true' >> /etc/rc.d/rc.local
echo '/bin/vmware-rpctool' \'guest.upgrader_send_cmd_line_args --default\' >> /etc/rc.d/rc.local
echo '/bin/vmware-rpctool' \'upgrader.setGuestFileRoot /tmp\' >> /etc/rc.d/rc.local
echo '/bin/vmware-rpctool' \'toolinstall.installerActive 1\' >> /etc/rc.d/rc.local
echo '/bin/vmware-rpctool' \'toolinstall.installerActive 100\' >> /etc/rc.d/rc.local
echo 'rm -f /etc/rc.d/rc.local' >> /etc/rc.d/rc.local
echo 'rm -f /etc/rc.d/rc5.d/S99rclocal' >> /etc/rc.d/rc.local
echo 'mv /etc/rc.d/rc.local.00 /etc/rc.d/rc.local' >> /etc/rc.d/rc.local
/bin/echo done
%end

%packages
@base
@core
@desktop-debugging
@dial-up
@directory-client
@fonts
@gnome-desktop
@guest-desktop-agents
@input-methods
@internet-browser
@java-platform
@multimedia
@network-file-system-client
@print-client
@x11
binutils
chrony
ftp
gcc
kernel-devel
kexec-tools
make
open-vm-tools
patch
python

%end

%addon com_redhat_kdump --enable --reserve-mb='auto'

%end

reboot

```
-   重启http服务:`systemctl restart httpd`

### 批量安装
- 服务器连接PXE服务器局域网
- 服务器设置PXE引导启动
## H3C 服务器系统安装
### 前言
这次在H3C UniServer R4900 G5 批量安装RHEL 7.6。 因第一次接触前期准备使用PXE批量安装系统（只能做软Raid），但到现场实际发现厂商是有自己的管理平台批量安装的。

H3C有硬件管理“HDM”、单机系统管理“iFist”、批量管理平台“Fist”，然后开始研究这三个平台。因服务器需要做硬Raid，硬Raid基于物理设备基于Riad卡。（相当于服务器不是直接识别硬盘而是被硬件做了Raid的单磁盘）后续研究该平台的Raid设置方式。

Fist平台尽量安装在服务器上，因这次安装时安装在win10上，批量安装时占用CPU很大。
经过一段时间研究和试验，具体过程为：
1. 进入HDM配置带外IP。
2. 进入Fist添加管理服务器，配置“服务器配置模板”（用于批量系统安装）
3. Riad配置（需在HDM获取Raid卡信息，可以单机配置或Fist批量设置）、系统配置（自定义设置，配置Ks应答文件，选择创建的Raid逻辑盘）
4. 然后服务器配置模板应用开始批量安装（其实就是进入每台单机的iFist安装系统）

### HDM配置带外IP
配置HDM管理IP。由于是本地配置，没有留下照片截图，配置很简单。

### Fist添加管理服务器
![](https://r2.redcrew.cn/image/fa74f0dc41e1112a701ca4713629f066.png)
### 上传系统镜像
![](https://r2.redcrew.cn/image/190d9dd5918088d2fc99338150edcc5e.png)
### 配置服务器模板
![](https://r2.redcrew.cn/image/98293241f42a55a428dd627ce16871e9.png)
![](https://r2.redcrew.cn/image/354f3b8ddef9242fb3f9378c1e8cc826.png)
![](https://r2.redcrew.cn/image/04f0f1bb224fa3b608a1aeb4967217cb.png)
### 服务器模板应用
- 等待安装完成即可

## Liunx网卡绑定
[Liunx网卡绑定](https://redcrew.cn/posts/linux-bond)


### 注意事项

Ks文件需要使用H3C的模板（因需要iFist驱动、Raid卡驱动相关命令），系统分区必须要必要的分区（可以使用图形化安装里磁盘手动分区得出需要的分区，在H3C Ks模板内调整）

硬Raid建立好后有逻辑盘名称，Fist服务器配置模板选择后，Ks文件分区可以写 ' --ondisk=$disk '（自动选择给出的逻辑盘名称变量）

---
#linux 
