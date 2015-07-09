json.id @feed.id
json.title @feed.title
json.latest_entries do
  json.array! @feed.latest_entries do |entry|
    json.extract! entry, :id, :title
  end
end
