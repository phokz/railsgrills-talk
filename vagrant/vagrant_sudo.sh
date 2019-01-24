#!/bin/bash

dst=~/railsgoat

[ ! -d "$dst" ] && git clone https://github.com/OWASP/railsgoat.git "$dst"

cd "$dst"

# use system Ruby
sed -i 's/ruby "2.5.3"/ruby "2.3.3"/' Gemfile

bundle install
bundle exec rails db:migrate
bundle exec rails db:seed

#
# http://localhost:3000/users/1/benefit_forms
# curl http://localhost:3000/data/railsgoat.sh

# FIXME: mysql
# RAILS_ENV=mysql bundle exec rails db:migrate
