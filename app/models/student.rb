class Student < User
  belongs_to :grade
  authenticates_with_sorcery!
end
