
access_list = [ 
  "College",
  "Faculty",
  "Members of the University",
  "Anyone (public)"
]

access_list.each do |title|
  Access.create( title: title )
end