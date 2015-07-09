class Favorite < ActiveRecord::Base
  belongs_to :favoritable
  belongs_to :user
end
