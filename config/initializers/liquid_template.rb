class GroupTag < Liquid::Tag
  def initialize(tag_name, content, tokens)
    super
    @name = content.sub(/by (.+)$/, '').strip
    @period = content.sub(/^(.+) by/, '').strip
  end

  def render(context)
    date = "FROM_UNIXTIME(#{@name})"

    year = "YEAR(#{date})"
    month = "MONTH(#{date})"
    day = "DAY(#{date})"
    hour = "HOUR(#{date})"

    vars = context.environments.first

    if vars.has_key?('group_by')
      @period = vars['group_by']
    end
    @period = @period.downcase

    if @period == 'year'
      return year
    elsif @period == 'month'
      return "CONCAT(#{year}, '-', #{month})"
    elsif @period == 'day'
      return "CONCAT(#{year}, '-', #{month}, '-', #{day})"
    elsif @period == 'hour'
      return "CONCAT(#{year}, '-', #{month}, '-', #{day}, '-', #{hour})"
    end
  end
end

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

Liquid::Template.register_tag('group', GroupTag)
Liquid::Template.register_tag('datefrom', DateRangeBlock)
Liquid::Template.register_tag('datetill', DateRangeBlock)
