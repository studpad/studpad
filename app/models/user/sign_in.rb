class User::SignIn < ActiveType::Object
  attribute :email, :string
  attribute :password, :string

  validates :email, presence: true
  validates :password, presence: true

  def set_error
    errors.add(:email, 'Неверные данные')
    errors.add(:password, ' ')
  end
end
