json.array! @feeds do |feed|
  json.extract! feed, :id, :title
end
