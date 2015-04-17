# config valid only for current version of Capistrano
lock '3.4.0'

set :application, 'studpad'
set :repo_url, 'git@github.com:studpad/studpad.git'

# Ветка по-умолчанию
set :branch, 'master'
# Директория для деплоя
set :deploy_to, '/var/www/studpad'

set :log_level, :debug
# Копирующиеся файлы и директории (между деплоями)
set :linked_files, %w{config/database.yml config/secrets.yml}
set :linked_dirs, %w{bin log tmp/pids tmp/cache tmp/sockets public/uploads}


namespace :deploy do

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      # within release_path do
      #   execute :rake, 'cache:clear'
      # end
    end
  end

end
