class Student < User
  belongs_to :classroom

  def student?
    true
  end
end
