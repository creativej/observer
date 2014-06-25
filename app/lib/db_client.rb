class DBClient
  def self.create(conn)
    self.new({
      :host => conn.host,
      :db => conn.database,
      :user => conn.username,
      :password => conn.decrypt_password,
      :port => conn.port
    })
  end

  def initialize(options)
    @host = options[:host]
    @db = options[:db]
    @user = options[:user]
    @password = options[:password]
    @port = options[:port]
  end

  def connect
    if @client.nil?
      @client = Mysql2::Client.new(
          :host => @host,
          :database => @db,
          :username => @user,
          :password => @password,
          :port => @port,
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
    end
  end

  def close
    @client.close
  end

  def last_query_error
    @last_query_error
  end
end
