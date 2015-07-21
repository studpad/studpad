class Notification < ActiveRecord::Base
  belongs_to :notable, polymorphic: true
  belongs_to :user
  enum mode: { request: 0, join: 1, share: 2 }

  def mode_rus
    hash = {
      'request' => 'Запрос на присоединение',
      'join' => 'Присоединение',
      'share' => 'Поделился материалом',
      nil  => 'Неопределено !!!'
    }
    hash[mode]
  end
end
