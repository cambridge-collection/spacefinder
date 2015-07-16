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

ActiveRecord::Schema.define(version: 20150716135434) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accesses", force: :cascade do |t|
    t.string   "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

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
  end

  add_index "spaces", ["access_id"], name: "index_spaces_on_access_id", using: :btree
  add_index "spaces", ["space_type_id"], name: "index_spaces_on_space_type_id", using: :btree

  add_foreign_key "spaces", "accesses"
  add_foreign_key "spaces", "space_types"
end
