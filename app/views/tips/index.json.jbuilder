disciplines = ["Architecture", "History of Art", "Biology", "Law", "Pharmacology", "Zoology", "Veterinary Medicine", "Latin American Studies", "McDonald Institute for Archaeological Research", "Department of Theoretical and Applied Linguistics"]

json.array!(@tips) do |tip|
  json.extract! tip, :id, :comment, :updated_at
  json.user do
    json.name tip.user.name
    json.profile_image tip.user.profile_image
    json.discipline disciplines.sample
  end
end
