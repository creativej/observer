module QueriesHelper
  def handle_query_post(request)
    if (!request.params[:value].nil?)
      query = request.params[:value]
      client = Mysql2::Client.new(
        :host => "localhost",
        :username => "root"
      )

      return client.query(query)
    end
  end
  end
