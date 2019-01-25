#!/usr/bin/env ruby

require 'sinatra'

get '/' do
  erb :form
end

post '/sesame' do
  if request.params['code'].downcase == 'railsgrills'
     system "/sbin/iptables -I INPUT -s #{request.env['REMOTE_ADDR']} -p tcp --dport 3000 -j ACCEPT"
     redirect 'http://railsgoat.fqdn.cz:3000/'
   else
     redirect '/'
   end
end