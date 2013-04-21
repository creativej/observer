class DBClient
  def self.create
    self.new({
      :host => 'localhost',
      :user => 'root'
    })
  end

  def initialize(options)
    @host = options[:host]
    @db = options[:db]
    @user = options[:user]
    @password = options[:password]
  end

  def client
      Mysql2::Client.new(
        :host => @host,
        :db => @db,
        :username => @user,
        :password => @password
      )
  end
  private :client

  def query(q)
    begin
      client.query(q)
    rescue Mysql2::Error => error
      @last_query_error = error
      false
    end
  end

  def last_query_error
    @last_query_error
  end
end
