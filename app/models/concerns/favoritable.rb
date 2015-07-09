module Favoritable
  extend ActiveSupport::Concern

  included do
    has_many :favorites, as: :favoritable, dependent: :destroy
    has_many :users, through: :favorites
  end
end
