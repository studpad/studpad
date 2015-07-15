class Community < ActiveRecord::Base
  enum status: { open: 0, secret: 1 }
end
