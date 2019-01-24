#!/bin/bash


PATH=/usr/games/:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
sudo apt-get -y install --no-install-recommends build-essential ruby ruby-dev ruby-bundler git-core cowsay mysql-server default-libmysqlclient-dev libsqlite3-dev

su -c /vagrant/vagrant_sudo.sh vagrant

cat <<EOF >/etc/systemd/system/puma.service
[Unit]
Description=Puma HTTP Server
After=network.target

[Service]
Type=simple


User=vagrant
WorkingDirectory=/home/vagrant/railsgoat

ExecStart=/usr/local/bin/puma -b tcp://0.0.0.0:3000
Restart=always

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable puma.service
systemctl start puma.service

systemctl status puma.service
