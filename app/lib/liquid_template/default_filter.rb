module DefaultFilter
  def default(input, default)
    if input.nil?
        default
    else
        input
    end
  end
end
