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

ActiveRecord::Schema.define(version: 20150804144739) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accesses", force: :cascade do |t|
    t.string   "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "identities", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "provider"
    t.string   "uid"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "identities", ["user_id"], name: "index_identities_on_user_id", using: :btree

  create_table "libraries", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "noises", force: :cascade do |t|
    t.string   "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "opening_hours_days", force: :cascade do |t|
    t.boolean  "open"
    t.boolean  "allday"
    t.string   "from"
    t.string   "to"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "opening_hours_weeks", force: :cascade do |t|
    t.integer  "monday_id"
    t.integer  "tuesday_id"
    t.integer  "wednesday_id"
    t.integer  "thursday_id"
    t.integer  "friday_id"
    t.integer  "saturday_id"
    t.integer  "sunday_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "opening_hours_weeks", ["friday_id"], name: "index_opening_hours_weeks_on_friday_id", using: :btree
  add_index "opening_hours_weeks", ["monday_id"], name: "index_opening_hours_weeks_on_monday_id", using: :btree
  add_index "opening_hours_weeks", ["saturday_id"], name: "index_opening_hours_weeks_on_saturday_id", using: :btree
  add_index "opening_hours_weeks", ["sunday_id"], name: "index_opening_hours_weeks_on_sunday_id", using: :btree
  add_index "opening_hours_weeks", ["thursday_id"], name: "index_opening_hours_weeks_on_thursday_id", using: :btree
  add_index "opening_hours_weeks", ["tuesday_id"], name: "index_opening_hours_weeks_on_tuesday_id", using: :btree
  add_index "opening_hours_weeks", ["wednesday_id"], name: "index_opening_hours_weeks_on_wednesday_id", using: :btree

  create_table "space_types", force: :cascade do |t|
    t.string   "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "spaces", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.text     "address"
    t.string   "floor"
    t.decimal  "lat",                       precision: 10, scale: 6
    t.decimal  "lng",                       precision: 10, scale: 6
    t.text     "opening_hours"
    t.boolean  "restricted"
    t.string   "restriction"
    t.boolean  "disabled_access"
    t.string   "url"
    t.string   "phone_number"
    t.string   "twitter_screen_name"
    t.string   "facebook_url"
    t.boolean  "atmosphere_disciplined"
    t.boolean  "atmosphere_relaxed"
    t.boolean  "atmosphere_historic"
    t.boolean  "atmosphere_modern"
    t.boolean  "atmosphere_inspiring"
    t.boolean  "atmosphere_cosy"
    t.boolean  "atmosphere_social"
    t.boolean  "atmosphere_friendly"
    t.boolean  "facility_food_drink"
    t.boolean  "facility_daylight"
    t.boolean  "facility_views"
    t.boolean  "facility_large_desks"
    t.boolean  "facility_free_wifi"
    t.boolean  "facility_no_wifi"
    t.boolean  "facility_computers"
    t.boolean  "facility_laptops_allowed"
    t.boolean  "facility_sockets"
    t.boolean  "facility_signal"
    t.boolean  "facility_printers_copiers"
    t.boolean  "facility_whiteboards"
    t.boolean  "facility_projector"
    t.boolean  "facility_outdoor_seating"
    t.boolean  "facility_bookable"
    t.boolean  "facility_toilets"
    t.boolean  "facility_refreshments"
    t.boolean  "facility_break"
    t.integer  "expensive"
    t.datetime "created_at",                                         null: false
    t.datetime "updated_at",                                         null: false
    t.integer  "access_id"
    t.integer  "space_type_id"
    t.integer  "library_id"
    t.integer  "noise_id"
    t.boolean  "work_private"
    t.boolean  "work_close"
    t.boolean  "work_friends"
    t.boolean  "work_group"
    t.integer  "term_time_hours_id"
    t.integer  "out_of_term_hours_id"
  end

  add_index "spaces", ["access_id"], name: "index_spaces_on_access_id", using: :btree
  add_index "spaces", ["library_id"], name: "index_spaces_on_library_id", using: :btree
  add_index "spaces", ["noise_id"], name: "index_spaces_on_noise_id", using: :btree
  add_index "spaces", ["out_of_term_hours_id"], name: "index_spaces_on_out_of_term_hours_id", using: :btree
  add_index "spaces", ["space_type_id"], name: "index_spaces_on_space_type_id", using: :btree
  add_index "spaces", ["term_time_hours_id"], name: "index_spaces_on_term_time_hours_id", using: :btree

  create_table "taggings", force: :cascade do |t|
    t.integer  "tag_id"
    t.integer  "taggable_id"
    t.string   "taggable_type"
    t.integer  "tagger_id"
    t.string   "tagger_type"
    t.string   "context",       limit: 128
    t.datetime "created_at"
  end

  add_index "taggings", ["tag_id", "taggable_id", "taggable_type", "context", "tagger_id", "tagger_type"], name: "taggings_idx", unique: true, using: :btree
  add_index "taggings", ["taggable_id", "taggable_type", "context"], name: "index_taggings_on_taggable_id_and_taggable_type_and_context", using: :btree

  create_table "tags", force: :cascade do |t|
    t.string  "name"
    t.integer "taggings_count", default: 0
  end

  add_index "tags", ["name"], name: "index_tags_on_name", unique: true, using: :btree

  create_table "tips", force: :cascade do |t|
    t.text     "comment"
    t.boolean  "atmosphere_disciplined"
    t.boolean  "noise_quiet"
    t.boolean  "facility_large_desks"
    t.boolean  "work_friends"
    t.boolean  "atmosphere_relaxed"
    t.boolean  "facility_views"
    t.boolean  "atmosphere_inspiring"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.integer  "space_id"
    t.integer  "user_id"
  end

  add_index "tips", ["space_id"], name: "index_tips_on_space_id", using: :btree
  add_index "tips", ["user_id"], name: "index_tips_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",               default: ""
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",       default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
    t.string   "name"
    t.string   "profile_image"
    t.string   "discipline"
  end

  add_foreign_key "identities", "users"
  add_foreign_key "spaces", "accesses"
  add_foreign_key "spaces", "libraries"
  add_foreign_key "spaces", "noises"
  add_foreign_key "spaces", "space_types"
  add_foreign_key "tips", "spaces"
  add_foreign_key "tips", "users"
end
