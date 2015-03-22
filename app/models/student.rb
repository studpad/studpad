class Student < User
  belongs_to :classroom
  authenticates_with_sorcery!

  def student?
    true
  end
end
