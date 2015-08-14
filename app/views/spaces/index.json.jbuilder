json.results do
  json.partial! partial: 'spaces/space', collection: @spaces, as: :space
end
json.set! :total_count, @spaces.total_count
