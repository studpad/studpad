

set :stage, 'production'
set :rails_env, 'production'
set :migration_role, :db
set :conditionally_migrate, true

server "104.236.236.210", roles: %{web app db}, ssh_options: {
    user: "deploy",
    forward_agent: true
}
