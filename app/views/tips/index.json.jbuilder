
json.array!(@tips) do |tip|
  json.extract! tip, :id, :comment, :updated_at, :response
  json.user do
    json.name tip.user.name
    json.profile_image tip.user.avatar.url(:resized, escape: false)
    json.discipline tip.user.discipline
  end
  unless tip.response.blank? then
    json.responding_user do
      json.name tip.responding_user.name
      json.profile_image tip.responding_user.avatar.url(:resized, escape: false)
      json.discipline tip.responding_user.discipline
    end
  end
end
