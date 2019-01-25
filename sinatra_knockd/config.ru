require 'sinatra'
require 'rack'

require './server'

run Sinatra::Application

# To flush output immediately
$stdout.sync = true
