set :application, 'studpad'
# Путь к git репозиторию
set :repo_url, 'git@github.com:studpad/studpad.git'
# Ветка по-умолчанию
set :branch, 'master'
# Директория для деплоя
set :deploy_to, '/home/deploy/applications/studpad'

set :log_level, :info
# Копирующиеся файлы и директории (между деплоями)
set :linked_files, %w{config/database.yml config/settings.yml}
set :linked_dirs, %w{bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/uploads}

# Ruby свистелки
set :rbenv_type, :user
set :rbenv_ruby, '2.1.5'
set :rbenv_prefix, "RBENV_ROOT=#{fetch(:rbenv_path)} RBENV_VERSION=#{fetch(:rbenv_ruby)} #{fetch(:rbenv_path)}/bin/rbenv exec"
set :rbenv_roles, :all

# А это рекомендуют добавить для приложений, использующих ActiveRecord
set :puma_init_active_record, true

set :stage, 'production'
set :rails_env, 'production'

server "104.131.182.99", roles: %{web app db}, ssh_options: {
    user: "deploy",
    forward_agent: true
}

