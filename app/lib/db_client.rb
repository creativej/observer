class DBClient
  def self.create(conn)
    self.new({
      :host => conn.host,
      :db => conn.database,
      :user => conn.username,
      :password => conn.decrypt_password,
    })
  end

  def initialize(options)
    @host = options[:host]
    @db = options[:db]
    @user = options[:user]
    @password = options[:password]
  end

  def connect
    if @client.nil?
      @client = Mysql2::Client.new(
          :host => @host,
          :database => @db,
          :username => @user,
          :password => @password,
          :read_timeout => 150
        )
    end
  end

  def query(q)
    connect
    begin
      @client.query(q)
    rescue Mysql2::Error => error
      @last_query_error = error
      result = false
    end
  end

  def close
    @client.close
  end

  def last_query_error
    @last_query_error
  end
end
