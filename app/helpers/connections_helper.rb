module ConnectionsHelper
  def connection_name(connection)
    if connection.name.present?
      return connection.name
    end

    return connection.host
  end
end
