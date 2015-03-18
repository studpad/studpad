# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150318171808) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "grades", force: :cascade do |t|
    t.string   "name",            null: false
    t.integer  "school_id"
    t.integer  "main_teacher_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "grades", ["main_teacher_id"], name: "index_grades_on_main_teacher_id", using: :btree
  add_index "grades", ["school_id"], name: "index_grades_on_school_id", using: :btree

  create_table "grades_teachers", force: :cascade do |t|
    t.integer "teacher_id"
    t.integer "grade_id"
  end

  add_index "grades_teachers", ["grade_id"], name: "index_grades_teachers_on_grade_id", using: :btree
  add_index "grades_teachers", ["teacher_id"], name: "index_grades_teachers_on_teacher_id", using: :btree

  create_table "news_items", force: :cascade do |t|
    t.integer  "grade_id"
    t.text     "text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "questions", force: :cascade do |t|
    t.string   "text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "schools", force: :cascade do |t|
    t.string   "name",       null: false
    t.string   "ogrn_ident"
    t.string   "kpp_ident"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",            null: false
    t.string   "name"
    t.string   "crypted_password"
    t.string   "salt"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "grade_id"
    t.string   "type"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["grade_id"], name: "index_users_on_grade_id", using: :btree

end
