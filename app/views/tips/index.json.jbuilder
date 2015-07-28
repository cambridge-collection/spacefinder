forenames = ["Addison",
"Adrian",
"Ainsley",
"Alex",
"Andy",
"Ari",
"Ash",
"Aspen",
"Aubrey",
"Bailey",
"Bay",
"Blaine",
"Bobbie",
"Brett",
"Brook",
"Caelan",
"Campbell",
"Carroll",
"Charlie",
"Chris",
"Clay",
"Corey",
"Dana",
"Dakota",
"Dale",
"Daryl",
"Devin",
"Dorian",
"Drew",
"Eddie",
"Eli",
"Elliott",
"Frances",
"Frankie",
"Gabriel",
"Glenn",
"Gray",
"Harper",
"Hayden",
"Jamie",
"Jean",
"Jesse",
"Jordan",
"Jules",
"Julian",
"Kaden",
"Kelly",
"Kennedy",
"Lake",
"Logan",
"Max",
"Morgan",
"Pat",
"Peyton",
"Ray",
"Reed",
"Riley",
"River",
"Roan",
"Rudy",
"Ryan",
"Sage",
"Sam",
"Shawn",
"Sean",
"Stevie",
"Tanner",
"Taylor",
"Toby",
"Tyler",
"Val",
"West",
"Winter"]
surnames = ["Smith",
"Jones",
"Williams",
"Taylor",
"Brown",
"Davies",
"Evans",
"Wilson",
"Thomas",
"Patel",
"Morris",
"Morgan"]
disciplines = ["Architecture", "History of Art", "Biology", "Law", "Pharmacology", "Zoology", "Veterinary Medicine", "Latin American Studies", "McDonald Institute for Archaeological Research", "Department of Theoretical and Applied Linguistics"]

json.array!(@tips) do |tip|
  json.extract! tip, :id, :comment, :updated_at
  json.user do
    json.name forenames.sample + " " + surnames.sample
    json.profile_image "http://"
    json.discipline disciplines.sample
  end
end
