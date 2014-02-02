class ReencryptPasswordConnections < ActiveRecord::Migration
  def up
    Connection.all.each do |c|
      secret = Digest::SHA1.hexdigest(
        TheObserver::Application.config.connection_secret
      )
      encryptor = ActiveSupport::MessageEncryptor.new(secret)

      password = encryptor.decrypt c.encrypted_password

      c.password = password
      c.encrypt_password
      c.save
    end
  end

  def down
  end
end
