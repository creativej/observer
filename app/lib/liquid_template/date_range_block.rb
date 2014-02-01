class DateRangeBlock < Liquid::Block
  def initialize(tag_name, content, tokens)
    super
    @tag_name = tag_name
    @name = content.strip
    @tokens = tokens
  end

  def render(context)
    vars = context.environments.first

    operators = {
      "datefrom" => '>',
      "datetill" => '<='
    }

    if vars.has_key?(@tag_name)
      return "#{@name} #{operators[@tag_name]} #{vars[@tag_name]}"
    end

    super
  end
end
