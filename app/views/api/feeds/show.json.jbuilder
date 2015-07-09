json.id @feed.id
json.title @feed.title
json.updated_at @feed.updated_at
json.latest_entries do
  json.array! @feed.latest_entries do |entry|
    json.extract! entry, :id, :title, :link, :published_at
  end
end
