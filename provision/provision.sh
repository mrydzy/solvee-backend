#!/usr/bin/env bash

machine_name="decisions-api.local"

IPADDR=$(/sbin/ifconfig eth0 | awk '/inet / { print $2 }' | sed 's/addr://')
sudo sed -i "s/^${IPADDR}.*//" /etc/hosts
   echo $IPADDR ${machine_name} | sudo tee -a /etc/hosts

# Set Locale and Timezone

echo LC_ALL="en_US.UTF-8" | sudo tee -a /etc/environment
echo "Europe/Oslo" | sudo tee /etc/timezone
sudo dpkg-reconfigure --frontend noninteractive tzdata

# Install PostgreSQL
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" >> /etc/apt/sources.list.d/pgdg.list'
wget -q https://www.postgresql.org/media/keys/ACCC4CF8.asc -O - | sudo apt-key add -

sudo apt-get update

sudo apt-get install -y postgresql postgresql-contrib  postgresql-client
sudo cp /vagrant/provision/conf/pg_hba.conf /etc/postgresql/9.5/main/pg_hba.conf
sudo cp /vagrant/provision/conf/postgresql.conf /etc/postgresql/9.5/main/postgresql.conf

sudo -u postgres createuser --superuser dev
sudo -u postgres createuser api
sudo -u postgres createuser deploy
sudo -u postgres psql -U postgres -c "CREATE DATABASE decisions;"
sudo -u postgres psql -U postgres -c "CREATE DATABASE decisions_test;"
sudo -u postgres psql -U postgres -d decisions -f /vagrant/provision/sql/setupDatabase.sql
sudo service postgresql restart

# Install NodeJS

sudo apt-get install -y nodejs npm
sudo npm install -g n
sudo n 4.2