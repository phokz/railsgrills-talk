# Rails security in 20 minutes.

Lišák a Vráťa
Railsgrills 3.0 

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

- 
