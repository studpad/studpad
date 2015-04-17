

set :stage, 'production'
set :rails_env, 'production'
set :migration_role, :db
set :conditionally_migrate, true

server "178.62.177.239", roles: %{web app db}, ssh_options: {
    user: "deploy",
    forward_agent: true
}
