
json.array!(@tips) do |tip|
  json.extract! tip, :id, :comment, :updated_at
  json.user do
    json.name tip.user.name
    json.profile_image tip.user.profile_image
    json.discipline tip.user.discipline
  end
end
