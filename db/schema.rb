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

ActiveRecord::Schema.define(version: 20151201195533) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_admin_comments", force: :cascade do |t|
    t.string   "namespace"
    t.text     "body"
    t.string   "resource_id",   null: false
    t.string   "resource_type", null: false
    t.integer  "author_id"
    t.string   "author_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "active_admin_comments", ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id", using: :btree
  add_index "active_admin_comments", ["namespace"], name: "index_active_admin_comments_on_namespace", using: :btree
  add_index "active_admin_comments", ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id", using: :btree

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

  create_table "baskets", force: :cascade do |t|
    t.text     "post_ids",   default: [],              array: true
    t.integer  "user_id"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  add_index "baskets", ["user_id"], name: "index_baskets_on_user_id", using: :btree

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
    t.string   "name",                    null: false
    t.integer  "status",      default: 0
    t.integer  "creator_id"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.integer  "founder_id"
    t.string   "description"
    t.string   "avatar"
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

  create_table "feedbacks", force: :cascade do |t|
    t.text     "message"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "feedbacks", ["user_id"], name: "index_feedbacks_on_user_id", using: :btree

  create_table "follows", force: :cascade do |t|
    t.integer  "followable_id",                   null: false
    t.string   "followable_type",                 null: false
    t.integer  "follower_id",                     null: false
    t.string   "follower_type",                   null: false
    t.boolean  "blocked",         default: false, null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "follows", ["followable_id", "followable_type"], name: "fk_followables", using: :btree
  add_index "follows", ["follower_id", "follower_type"], name: "fk_follows", using: :btree

  create_table "groups", force: :cascade do |t|
    t.string   "name",                    null: false
    t.string   "description"
    t.string   "avatar"
    t.string   "type"
    t.integer  "status",      default: 0
    t.integer  "user_id"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  add_index "groups", ["user_id"], name: "index_groups_on_user_id", using: :btree

  create_table "groups_users", force: :cascade do |t|
    t.integer "user_id"
    t.integer "group_id"
  end

  add_index "groups_users", ["group_id"], name: "index_groups_users_on_group_id", using: :btree
  add_index "groups_users", ["user_id"], name: "index_groups_users_on_user_id", using: :btree

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

  create_table "notifications", force: :cascade do |t|
    t.integer  "mode"
    t.string   "text"
    t.boolean  "public",     default: true
    t.integer  "user_id"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.integer  "post_id"
    t.integer  "who_id"
    t.boolean  "viewed",     default: false
  end

  add_index "notifications", ["user_id"], name: "index_notifications_on_user_id", using: :btree

  create_table "photos", force: :cascade do |t|
    t.string   "link"
    t.string   "image"
    t.integer  "user_id"
    t.integer  "post_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "photos", ["user_id"], name: "index_photos_on_user_id", using: :btree

  create_table "posts", force: :cascade do |t|
    t.string   "text"
    t.string   "title"
    t.integer  "post_type",                         null: false
    t.integer  "user_id"
    t.integer  "group_id"
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
    t.string   "linkdata",     default: "--- {}\n"
    t.string   "youtube_id"
    t.text     "user_add_ids", default: [],                      array: true
  end

  add_index "posts", ["group_id"], name: "index_posts_on_group_id", using: :btree
  add_index "posts", ["user_id"], name: "index_posts_on_user_id", using: :btree

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

  create_table "teacher_categories", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "teacher_specializations", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "text_elements", force: :cascade do |t|
    t.string   "text"
    t.integer  "text_type",  default: 0
    t.integer  "position",               null: false
    t.string   "image"
    t.integer  "post_id",                null: false
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "text_elements", ["post_id"], name: "index_text_elements_on_post_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                                           null: false
    t.string   "name"
    t.string   "crypted_password"
    t.string   "salt"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "classroom_id"
    t.string   "type"
    t.string   "avatar"
    t.string   "school"
    t.string   "reset_password_token"
    t.datetime "reset_password_token_expires_at"
    t.datetime "reset_password_email_sent_at"
    t.boolean  "admin",                           default: false
    t.datetime "destroyed_at"
    t.integer  "teacher_type",                    default: 0
    t.integer  "teacher_category_id"
    t.integer  "teacher_specialization_id"
  end

  add_index "users", ["classroom_id"], name: "index_users_on_classroom_id", using: :btree
  add_index "users", ["destroyed_at"], name: "index_users_on_destroyed_at", where: "(destroyed_at IS NOT NULL)", using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", using: :btree

  create_table "votes", force: :cascade do |t|
    t.integer  "votable_id"
    t.string   "votable_type"
    t.integer  "voter_id"
    t.string   "voter_type"
    t.boolean  "vote_flag"
    t.string   "vote_scope"
    t.integer  "vote_weight"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "votes", ["votable_id", "votable_type", "vote_scope"], name: "index_votes_on_votable_id_and_votable_type_and_vote_scope", using: :btree
  add_index "votes", ["voter_id", "voter_type", "vote_scope"], name: "index_votes_on_voter_id_and_voter_type_and_vote_scope", using: :btree

  add_foreign_key "communities_users", "communities"
  add_foreign_key "communities_users", "users"
end
