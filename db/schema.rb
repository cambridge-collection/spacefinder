# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_09_17_145808) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accesses", id: :serial, force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "identities", id: :serial, force: :cascade do |t|
    t.integer "user_id"
    t.string "provider"
    t.string "uid"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_identities_on_user_id"
  end

  create_table "libraries", id: :serial, force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "noises", id: :serial, force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "opening_hours_days", id: :serial, force: :cascade do |t|
    t.boolean "open"
    t.boolean "allday"
    t.string "from"
    t.string "to"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "opening_hours_weeks", id: :serial, force: :cascade do |t|
    t.integer "monday_id"
    t.integer "tuesday_id"
    t.integer "wednesday_id"
    t.integer "thursday_id"
    t.integer "friday_id"
    t.integer "saturday_id"
    t.integer "sunday_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["friday_id"], name: "index_opening_hours_weeks_on_friday_id"
    t.index ["monday_id"], name: "index_opening_hours_weeks_on_monday_id"
    t.index ["saturday_id"], name: "index_opening_hours_weeks_on_saturday_id"
    t.index ["sunday_id"], name: "index_opening_hours_weeks_on_sunday_id"
    t.index ["thursday_id"], name: "index_opening_hours_weeks_on_thursday_id"
    t.index ["tuesday_id"], name: "index_opening_hours_weeks_on_tuesday_id"
    t.index ["wednesday_id"], name: "index_opening_hours_weeks_on_wednesday_id"
  end

  create_table "roles", id: :serial, force: :cascade do |t|
    t.string "name"
    t.integer "resource_id"
    t.string "resource_type"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["name", "resource_type", "resource_id"], name: "index_roles_on_name_and_resource_type_and_resource_id"
    t.index ["name"], name: "index_roles_on_name"
    t.index ["resource_id", "resource_type"], name: "index_roles_on_resource_id_and_resource_type"
  end

  create_table "space_photos", id: :serial, force: :cascade do |t|
    t.integer "space_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "photo_file_name"
    t.string "photo_content_type"
    t.integer "photo_file_size"
    t.datetime "photo_updated_at"
    t.index ["space_id"], name: "index_space_photos_on_space_id"
  end

  create_table "space_types", id: :serial, force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "spaces", id: :serial, force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.text "address"
    t.string "floor"
    t.decimal "lat", precision: 10, scale: 6
    t.decimal "lng", precision: 10, scale: 6
    t.boolean "restricted"
    t.string "restriction"
    t.boolean "disabled_access"
    t.string "url"
    t.string "phone_number"
    t.string "twitter_screen_name"
    t.string "facebook_url"
    t.boolean "atmosphere_disciplined"
    t.boolean "atmosphere_relaxed"
    t.boolean "atmosphere_historic"
    t.boolean "atmosphere_modern"
    t.boolean "atmosphere_inspiring"
    t.boolean "atmosphere_cosy"
    t.boolean "atmosphere_social"
    t.boolean "atmosphere_friendly"
    t.boolean "facility_food_drink"
    t.boolean "facility_daylight"
    t.boolean "facility_views"
    t.boolean "facility_large_desks"
    t.boolean "facility_free_wifi"
    t.boolean "facility_no_wifi"
    t.boolean "facility_computers"
    t.boolean "facility_laptops_allowed"
    t.boolean "facility_sockets"
    t.boolean "facility_signal"
    t.boolean "facility_printers_copiers"
    t.boolean "facility_whiteboards"
    t.boolean "facility_projector"
    t.boolean "facility_outdoor_seating"
    t.boolean "facility_bookable"
    t.boolean "facility_toilets"
    t.boolean "facility_refreshments"
    t.boolean "facility_break"
    t.integer "expensive"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "access_id"
    t.integer "space_type_id"
    t.integer "library_id"
    t.integer "noise_id"
    t.boolean "work_private"
    t.boolean "work_close"
    t.boolean "work_friends"
    t.boolean "work_group"
    t.integer "term_time_hours_id"
    t.integer "out_of_term_hours_id"
    t.string "email_address"
    t.string "editors"
    t.boolean "facility_wheelchair_accessible", default: false
    t.boolean "facility_blue_badge_parking", default: false
    t.boolean "facility_accessible_toilets", default: false
    t.boolean "facility_induction_loops", default: false
    t.boolean "facility_adjustable_furniture", default: false
    t.boolean "facility_individual_study_space", default: false
    t.boolean "facility_gender_neutral_toilets", default: false
    t.boolean "facility_bike_racks", default: false
    t.boolean "facility_smoking_area", default: false
    t.boolean "facility_baby_changing", default: false
    t.boolean "facility_prayer_room", default: false
    t.boolean "opentimes_before_9am"
    t.boolean "opentimes_after_7pm"
    t.boolean "opentimes_saturday"
    t.boolean "opentimes_sunday"
    t.string "booking_url"
    t.boolean "work_in_a_library"
    t.index ["access_id"], name: "index_spaces_on_access_id"
    t.index ["library_id"], name: "index_spaces_on_library_id"
    t.index ["noise_id"], name: "index_spaces_on_noise_id"
    t.index ["out_of_term_hours_id"], name: "index_spaces_on_out_of_term_hours_id"
    t.index ["space_type_id"], name: "index_spaces_on_space_type_id"
    t.index ["term_time_hours_id"], name: "index_spaces_on_term_time_hours_id"
  end

  create_table "taggings", id: :serial, force: :cascade do |t|
    t.integer "tag_id"
    t.integer "taggable_id"
    t.string "taggable_type"
    t.integer "tagger_id"
    t.string "tagger_type"
    t.string "context", limit: 128
    t.datetime "created_at"
    t.index ["tag_id", "taggable_id", "taggable_type", "context", "tagger_id", "tagger_type"], name: "taggings_idx", unique: true
    t.index ["taggable_id", "taggable_type", "context"], name: "index_taggings_on_taggable_id_and_taggable_type_and_context"
  end

  create_table "tags", id: :serial, force: :cascade do |t|
    t.string "name"
    t.integer "taggings_count", default: 0
    t.index ["name"], name: "index_tags_on_name", unique: true
  end

  create_table "tips", id: :serial, force: :cascade do |t|
    t.text "comment"
    t.boolean "atmosphere_disciplined"
    t.boolean "noise_quiet"
    t.boolean "facility_large_desks"
    t.boolean "work_friends"
    t.boolean "atmosphere_relaxed"
    t.boolean "facility_views"
    t.boolean "atmosphere_inspiring"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "space_id"
    t.integer "user_id"
    t.datetime "deleted_at"
    t.text "response"
    t.integer "responding_user_id"
    t.index ["deleted_at"], name: "index_tips_on_deleted_at"
    t.index ["responding_user_id"], name: "index_tips_on_responding_user_id"
    t.index ["space_id"], name: "index_tips_on_space_id"
    t.index ["user_id"], name: "index_tips_on_user_id"
  end

  create_table "users", id: :serial, force: :cascade do |t|
    t.string "email", default: ""
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.string "discipline"
    t.string "avatar_file_name"
    t.string "avatar_content_type"
    t.integer "avatar_file_size"
    t.datetime "avatar_updated_at"
  end

  create_table "users_roles", id: false, force: :cascade do |t|
    t.integer "user_id"
    t.integer "role_id"
    t.index ["user_id", "role_id"], name: "index_users_roles_on_user_id_and_role_id"
  end

  add_foreign_key "identities", "users"
  add_foreign_key "spaces", "accesses"
  add_foreign_key "spaces", "libraries"
  add_foreign_key "spaces", "noises"
  add_foreign_key "spaces", "space_types"
  add_foreign_key "tips", "spaces"
  add_foreign_key "tips", "users"
end
