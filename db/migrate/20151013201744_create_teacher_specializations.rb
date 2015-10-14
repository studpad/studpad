class CreateTeacherSpecializations < ActiveRecord::Migration
  def change
    create_table :teacher_specializations do |t|
      t.string :name

      t.timestamps null: false
    end
  end

  def data
    TeacherCategory.create([
      {name: 'Воспитатель'},
      {name: 'Педагог начальной школы'},
      {name: 'Педагог средней школы'},
      {name: 'Педагог дополнительно образования'}
    ])

    TeacherSpecialization.create([
      {name: 'Русский язык и литература'},
      {name: 'История'},
      {name: 'Обществознание'},
      {name: 'Математика'},
      {name: 'Физика'},
      {name: 'Информатика и ИКТ'},
      {name: 'Программирование'},
      {name: 'Химия'},
      {name: 'Биология'},
      {name: 'География'},
      {name: 'Технология'}
    ])
  end
end
