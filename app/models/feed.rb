require 'open-uri'

class Feed < ActiveRecord::Base
  include Favoritable

  has_many :entries, :dependent => :destroy
  validates :title, :url, presence: true

  belongs_to :user

  def self.find_or_create_by_url_and_user_id(url, user_id)
    feed = Feed.find_by(url: url, user_id: user_id)
    return feed if feed

    begin
      feed_data = SimpleRSS.parse(open(url))
      feed = Feed.create!(title: feed_data.title, url: url, user_id: user_id)
      feed_data.entries.each do |entry_data|
        Entry.create_from_json!(entry_data, feed)
      end
    rescue SimpleRSSError
      return nil
    end

    feed
  end

  def reload
    # reloads entries
    self.touch #this causes the updated_at column to be updated
    begin
      feed_data = SimpleRSS.parse(open(url))
      existing_entry_guids = Entry.pluck(:guid).sort
      feed_data.entries.each do |entry_data|
        unless existing_entry_guids.include?(entry_data.guid)
          Entry.create_from_json!(entry_data, self)
        end
      end

      self
    rescue SimpleRSSError
      return false
    end
  end

  def latest_entries
    if updated_at < 30.seconds.ago
      reload
    end

    entries
  end
end
