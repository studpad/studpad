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

ActiveRecord::Schema.define(version: 20150716151628) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "attachments", force: :cascade do |t|
    t.string   "file"
    t.integer  "user_id"
    t.integer  "attachable_id"
    t.string   "attachable_type"
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.boolean  "main",            default: false
  end

  add_index "attachments", ["attachable_type", "attachable_id"], name: "index_attachments_on_attachable_type_and_attachable_id", using: :btree
  add_index "attachments", ["user_id"], name: "index_attachments_on_user_id", using: :btree

  create_table "classrooms", force: :cascade do |t|
    t.string   "name",            null: false
    t.integer  "main_teacher_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "secretphrase"
  end

  add_index "classrooms", ["main_teacher_id"], name: "index_classrooms_on_main_teacher_id", using: :btree

  create_table "classrooms_materials", force: :cascade do |t|
    t.integer "classroom_id"
    t.integer "material_id"
  end

  add_index "classrooms_materials", ["classroom_id"], name: "index_classrooms_materials_on_classroom_id", using: :btree
  add_index "classrooms_materials", ["material_id"], name: "index_classrooms_materials_on_material_id", using: :btree

  create_table "classrooms_teachers", force: :cascade do |t|
    t.integer "teacher_id"
    t.integer "classroom_id"
  end

  add_index "classrooms_teachers", ["classroom_id"], name: "index_classrooms_teachers_on_classroom_id", using: :btree
  add_index "classrooms_teachers", ["teacher_id"], name: "index_classrooms_teachers_on_teacher_id", using: :btree

  create_table "comments", force: :cascade do |t|
    t.text     "text"
    t.integer  "user_id"
    t.integer  "commentable_id"
    t.string   "commentable_type"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  add_index "comments", ["commentable_type", "commentable_id"], name: "index_comments_on_commentable_type_and_commentable_id", using: :btree
  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "communities", force: :cascade do |t|
    t.string   "name",                   null: false
    t.integer  "status",     default: 0
    t.integer  "creator_id"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.integer  "founder_id"
  end

  add_index "communities", ["creator_id"], name: "index_communities_on_creator_id", using: :btree
  add_index "communities", ["founder_id"], name: "index_communities_on_founder_id", using: :btree

  create_table "communities_materials", force: :cascade do |t|
    t.integer "community_id"
    t.integer "material_id"
  end

  add_index "communities_materials", ["community_id"], name: "index_communities_materials_on_community_id", using: :btree
  add_index "communities_materials", ["material_id"], name: "index_communities_materials_on_material_id", using: :btree

  create_table "communities_users", force: :cascade do |t|
    t.integer "user_id"
    t.integer "community_id"
  end

  add_index "communities_users", ["community_id"], name: "index_communities_users_on_community_id", using: :btree
  add_index "communities_users", ["user_id"], name: "index_communities_users_on_user_id", using: :btree

  create_table "homeworks", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.integer  "classroom_id"
    t.integer  "user_id"
    t.integer  "subject_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "homeworks", ["classroom_id"], name: "index_homeworks_on_classroom_id", using: :btree
  add_index "homeworks", ["subject_id"], name: "index_homeworks_on_subject_id", using: :btree
  add_index "homeworks", ["user_id"], name: "index_homeworks_on_user_id", using: :btree

  create_table "materials", force: :cascade do |t|
    t.integer  "classroom_id"
    t.integer  "user_id"
    t.string   "description"
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.integer  "subject_id"
    t.integer  "classrooms_count",  default: 0
    t.integer  "communities_count", default: 0
  end

  add_index "materials", ["classroom_id"], name: "index_materials_on_classroom_id", using: :btree
  add_index "materials", ["subject_id"], name: "index_materials_on_subject_id", using: :btree
  add_index "materials", ["user_id"], name: "index_materials_on_user_id", using: :btree

  create_table "news_items", force: :cascade do |t|
    t.integer  "user_id"
    t.text     "text"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "source_id"
    t.string   "source_type"
  end

  add_index "news_items", ["source_type", "source_id"], name: "index_news_items_on_source_type_and_source_id", using: :btree
  add_index "news_items", ["user_id"], name: "index_news_items_on_user_id", using: :btree

  create_table "subjects", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "cssclass"
  end

  create_table "subjects_teachers", force: :cascade do |t|
    t.integer "subject_id"
    t.integer "teacher_id"
  end

  add_index "subjects_teachers", ["subject_id"], name: "index_subjects_teachers_on_subject_id", using: :btree
  add_index "subjects_teachers", ["teacher_id"], name: "index_subjects_teachers_on_teacher_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",            null: false
    t.string   "name"
    t.string   "crypted_password"
    t.string   "salt"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "classroom_id"
    t.string   "type"
    t.string   "avatar"
  end

  add_index "users", ["classroom_id"], name: "index_users_on_classroom_id", using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree

  add_foreign_key "communities_users", "communities"
  add_foreign_key "communities_users", "users"
end
