access_list = [ 
  "College",
  "Faculty",
  "Members of the University",
  "Anyone (public)"
]

access_list.each do |title|
  Access.create( title: title )
end

space_type_list = [ 
  "Bar",
  "Café",
  "Lab",
  "Lecture room",
  "Library space",
  "Meeting room",
  "Restaurant",
  "Seminar room",
]

space_type_list.each do |title|
  SpaceType.create( title: title )
end
