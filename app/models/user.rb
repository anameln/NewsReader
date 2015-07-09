class User < ActiveRecord::Base
  attr_reader :password

  validates :username, :session_token, :password_digest, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}
  before_save :ensure_session_token

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return unless user

    BCrypt::Password.create(user.password_digest).is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.new(@password)
  end

  def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64
    save!

    self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64
  end

end
